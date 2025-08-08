//declare global variables

var allStatsLevels = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54 ,55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115]
var conversionStats = [212, 218, 224, 230, 236, 242, 248, 254, 260, 266, 272, 278, 284, 290, 296, 302, 308, 314, 320, 326, 332, 338, 344, 350, 357, 363, 369, 375, 381, 387, 393, 399, 403, 406, 409, 411, 414, 417, 420, 423, 426, 429, 432, 435, 437, 438, 440, 442, 444, 445, 447, 449, 451, 452, 454, 456, 458, 459, 461, 463, 464, 466, 468, 469, 471, 473, 475, 476, 478, 480, 481, 483, 485, 486, 488, 490, 492, 493, 495, 497, 498, 500, 504, 508, 512, 516, 520, 524, 528, 532, 536, 540, 544, 548, 554, 557]
var range;
var arm;
var turnDP;
var catchBLK;
var catchFRM;
var babipVsLHP;
var babipVsRHP;
var avoidKLHP;
var avoidKRHP;
var gapVsLHP;
var gapVsRHP;
var powerVsLHP;
var powerVsRHP;
var eyeVsRHP;
var eyeVsLHP;
var speed;
var steal;
var bunt;
var fError; 
var tpeEarned;
var tpeToSpend;
var pitchesBought = 0;
var mins=[];
var max=[];
var firstName;
var lastName;
//pitchesBought variable declared to stop NaN on updateStats()

//receives longString from pullData.js
//gets Banked TPE in one of three ways
function getStats(longString){	
	banked = findString(longString, "Banked: ", "Bank: ");
	if(isNaN(banked)){
		banked = findString(longString, "Banked TPE: ", "TPE Available: ");
		if(isNaN(banked)){
			banked = 0;
		}
	}

	const username = findStringButActuallyString(longString, ">Username:</span> ");
	
	if(!isNaN(banked)){
	    $('#error').html("");
		$('#putBNK').html("Banked: " + banked);
	    $('#putUSN').html("Username: " + username);
	    getStatsBatter(longString);
    	getStatsFielding(longString);
		minMax(longString);
    	//Launches the smooth scrolling down to Step 2 in moveSteps.js
		
    	stepTwo();
	}
}

//experimental function to get mins/maxes WITHOUT archetype

function minMax(str){
	var toSearch = "MIN:";
	var indices = [];
    for(var pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
        indices.push(pos);
    }

	mins = [];
	for(var uses = 0 ; uses < indices.length ; uses++){
		var number = parseInt(str.substring(indices[uses]+4,indices[uses]+8));
		mins.push(number);
	}
	
	toSearch = "MAX:";
	indices = [];
    for(var pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
        indices.push(pos);
    }
	
	max = [];
	for(var uses = 0 ; uses < indices.length ; uses++){
		var number = parseInt(str.substring(indices[uses]+4,indices[uses]+8));
		max.push(number);
	}
	
}

//htmlCode is the roster page info
//stringToFind is the main string used in roster pages
//secondaryString is a different version I've found randomly throughout
//Splits postGET where the TPE value should below
//Saves it to a variable for later
//length of 3 is chosen for even if a value is 100 it will still be grabbed
//if the length of the number is less than 3 then parseInt will remove any extra information

function findString(htmlCode, stringToFind, secondaryString){
	if(stringToFind.includes("(") == true){
		n = htmlCode.indexOf(stringToFind);
		value = parseInt(htmlCode.substring(n+stringToFind.length,n+stringToFind.length+3));
		if(isNaN(value) && secondaryString != null){
			n = htmlCode.indexOf(secondaryString);
			value = parseInt(htmlCode.substring(n+secondaryString.length,n+secondaryString.length+3));
		}
	}
	else{
		n = htmlCode.search(stringToFind);
		value = parseInt(htmlCode.substring(n+stringToFind.length,n+stringToFind.length+3));
		if(isNaN(value) && secondaryString != null){
			n = htmlCode.search(secondaryString);
			value = parseInt(htmlCode.substring(n+secondaryString.length,n+secondaryString.length+3));
		}
	}
	
	return value;
}

// Return the rest of the first line containing the specified string
// Provided by Khuldraeseth
function findStringButActuallyString(htmlCode, stringToFind) {
	//htmlCode = htmlCode.replaceAll("<br", "\n");
	htmlCode = htmlCode.replaceAll('<span style="font-weight: bold;" class="mycode_b"', "\n");
	htmlCode = htmlCode.replaceAll('<br>', "\n");
	//alert(htmlCode)
	const re = new RegExp(`${stringToFind}(.+)`);
	const match = re.exec(htmlCode);
	return match ? match[1] : "nopity nope";
}

//Function designed to pull fielding and hitting archetypes from the string in getStats()
//Also pulls all fielding stats

function getStatsFielding(postGET){
	//postGET is the roster page info
	
	fError = findString(postGET, "Fielding Error: ", "Error: ");
	range = findString(postGET, "Fielding Range: ", "Range: ");
	arm = findString(postGET, "Fielding/Catching Arm: ", "Arm: ");
	turnDP = findString(postGET, "Turn Double Play: ", "Turn Double Play ");	    
	catchBLK = findString(postGET, "Catcher Blocking: ", null);
	catchFRM = findString(postGET, "Catcher Framing: ", null);
	
	//HTML part to place all values correctly
	$('#putERR').html("Fielding Error: " + fError);
	$('#putRNG').html("Fielding Range: " + range);
	$('#putARM').html("Fielding/Catching Arm: " + arm);
	$('#putTDP').html("Turn Double Play: " + turnDP);
	$('#putCBLK').html("Catcher Blocking: " + catchBLK);
	$('#putCFRM').html("Catcher Framing: " + catchFRM);
}

//Function designed to pull batting stats from the string in GetStats()

function getStatsBatter(postGET){
    //these should all look familar
	//Look for attribute, look for a range of 3 values
	//save to variable

	babipVsLHP = findString(postGET, "BABIP vs LHP: ", null);
	babipVsRHP = findString(postGET, "BABIP vs RHP: ", null);
	avoidKLHP = findString(postGET, "Avoid K&#39;s vs LHP: ", null);
	if(isNaN(avoidKLHP)){
		avoidKLHP = findString(postGET, "Avoid K's vs LHP: ", null);
	}
	avoidKRHP = findString(postGET, "Avoid K&#39;s vs RHP: ", null);
	if(isNaN(avoidKRHP)){
		avoidKRHP = findString(postGET, "Avoid K's vs RHP: ", null);
	}
	gapVsLHP = findString(postGET, "Gap vs LHP: ", null);
	gapVsRHP = findString(postGET, "Gap vs RHP: ", null);
	powerVsLHP = findString(postGET, "Power vs LHP: ", null);
	powerVsRHP = findString(postGET, "Power vs RHP: ", null);
	eyeVsLHP = findString(postGET, "Eye/Patience vs LHP: ", null);
	eyeVsRHP = findString(postGET, "Eye/Patience vs RHP: ", null);
	speed = findString(postGET, "Speed (Base &amp; Run): ", null);
	if(isNaN(speed)){
		speed = findString(postGET, "Speed (Base & Run): ", null);
	}
	steal = findString(postGET, "Stealing Ability: ", null);
	bunt = findString(postGET, "Bunting (Both): ", null);
	
	//HTML part to place all values correctly
	$('#putBVL').html("BABIP VS LHP: " + babipVsLHP);
	$('#putBVR').html("BABIP VS RHP: " + babipVsRHP);
	$('#putAKL').html("Avoid K's vs LHP: " + avoidKLHP);
	$('#putAKR').html("Avoid K's vs RHP: " + avoidKRHP);
	$('#putGVL').html("Gap vs LHP: " + gapVsLHP);
	$('#putGVR').html("Gap vs RHP: " + gapVsRHP);
	$('#putPVL').html("Power vs LHP: " + powerVsLHP);
	$('#putPVR').html("Power vs RHP: " + powerVsRHP);
	$('#putEVL').html("Eye/Patience vs LHP: " + eyeVsLHP);
	$('#putEVR').html("Eye/Patience vs RHP: " + eyeVsRHP);
	$('#putSPD').html("Speed: " + speed);
	$('#putSTL').html("Stealing Ability: " + steal);
	$('#putBNT').html("Bunting (Both): " + bunt);
}

//Using the data pulled from getStatsFielding() and getStatsBatter() fills in the table for step4
//Also fills in minimums and maximums from the roster page

function fillStats(){
    //$('#bankedTPE').html("Banked TPE: " + banked);
    //$('#tpeEarn').html("Earned TPE: " + tpeEarned);
    //tpeToSpend = banked + tpeEarned;
    //$('#tpeToUse').html("TPE to Spend: " + tpeToSpend);
	//for now to test
	/*if(isNaN(catchBLK)){
		catchBLK = 20
	}
	if(isNaN(catchFRM)){
		catchFRM = 20
	}*/
    
    $('#stat1').html(babipVsLHP);
    $('#stat2').html(babipVsRHP);
    $('#stat3').html(avoidKLHP);
    $('#stat4').html(avoidKRHP);
    $('#stat5').html(gapVsLHP);
    $('#stat6').html(gapVsRHP);
    $('#stat7').html(powerVsLHP);
    $('#stat8').html(powerVsRHP);
    $('#stat9').html(eyeVsLHP);
    $('#stat10').html(eyeVsRHP);
    $('#stat11').html(speed);
    $('#stat12').html(steal);
    $('#stat13').html(bunt);
    $('#stat14').html(range);
    $('#stat15').html(fError);
    $('#stat16').html(arm);
    $('#stat17').html(turnDP);
    $('#stat18').html(catchBLK);
	$('#stat19').html(catchFRM);

	
	var allStatsArray = [babipVsLHP, babipVsRHP, avoidKLHP, avoidKRHP, gapVsLHP, gapVsRHP, powerVsLHP, powerVsRHP, eyeVsLHP, eyeVsRHP, speed, steal, bunt, range, fError, arm, turnDP, catchBLK, catchFRM]

	for(var i = 0 ; i < allStatsArray.length ; i++){
		var statNumber = i+1;
		for(var j = 0 ; j < allStatsLevels.length ; j++){			
			if(allStatsArray[i] == allStatsLevels[j]){
				$('#maxStat' + statNumber).html(conversionStats[j]);
				break;
			}
		}
	}
	
    //calls tpespent.js
    //updateTPESpent();
}

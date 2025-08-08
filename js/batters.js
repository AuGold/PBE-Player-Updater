//declare global variables

var allStatsLevels = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54 ,55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115]
var conversionStats = [212, 218, 224, 230, 236, 242, 248, 254, 260, 266, 272, 278, 284, 290, 296, 302, 308, 314, 320, 326, 332, 338, 344, 350, 357, 363, 369, 375, 381, 387, 393, 399, 403, 406, 409, 411, 414, 417, 420, 423, 426, 429, 432, 435, 437, 438, 440, 442, 444, 445, 447, 449, 451, 452, 454, 456, 458, 459, 461, 463, 464, 466, 468, 469, 471, 473, 475, 476, 478, 480, 481, 483, 485, 486, 488, 490, 492, 493, 495, 497, 498, 500, 504, 508, 512, 516, 520, 524, 528, 532, 536, 540, 544, 548, 554, 557]
var range;
var arm;
var turnDP;
var catchAB;
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
	catchAB = findString(postGET, "Catcher Ability: ", null);
	
	//HTML part to place all values correctly
	$('#putERR').html("Fielding Error: " + fError);
	$('#putRNG').html("Fielding Range: " + range);
	$('#putARM').html("Fielding/Catching Arm: " + arm);
	$('#putTDP').html("Turn Double Play: " + turnDP);
	$('#putCAB').html("Catcher Ability: " + catchAB);
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
    $('#bankedTPE').html("Banked TPE: " + banked);
    $('#tpeEarn').html("Earned TPE: " + tpeEarned);
    tpeToSpend = banked + tpeEarned;
    $('#tpeToUse').html("TPE to Spend: " + tpeToSpend);
    
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
    $('#stat18').html(catchAB);
    
	for(var goThrough = 0; goThrough < mins.length ; goThrough++){
		var goThroughOne = goThrough + 1;
		$('#minStat' + goThroughOne).html(mins[goThrough]);
		$('#maxStat' + goThroughOne).html(max[goThrough]);
	}
	$('#newStat1').attr({min: mins[0],max: max[0],value: babipVsLHP});
    $('#newStat2').attr({min: mins[1],max: max[1],value: babipVsRHP});
    $('#newStat3').attr({min: mins[2],max: max[2],value: avoidKLHP});
    $('#newStat4').attr({min: mins[3],max: max[3],value: avoidKRHP});
    $('#newStat5').attr({min: mins[4],max: max[4],value: gapVsLHP});
    $('#newStat6').attr({min: mins[5],max: max[5],value: gapVsRHP});
    $('#newStat7').attr({min: mins[6],max: max[6],value: powerVsLHP});
    $('#newStat8').attr({min: mins[7],max: max[7],value: powerVsRHP});
    $('#newStat9').attr({min: mins[8],max: max[8],value: eyeVsLHP});
    $('#newStat10').attr({min: mins[9],max: max[9],value: eyeVsRHP});
    $('#newStat11').attr({min: mins[10],max: max[10],value: speed});
    $('#newStat12').attr({min: mins[11],max: max[11],value: steal});
    $('#newStat13').attr({min: mins[12],max: max[12],value: bunt});
	$('#newStat14').attr({min: mins[13],max: max[13],value: range});
    $('#newStat15').attr({min: mins[14],max: max[14],value: fError});
    $('#newStat16').attr({min: mins[15],max: max[15],value: arm});
    $('#newStat17').attr({min: mins[16],max: max[16],value: turnDP});
    $('#newStat18').attr({min: mins[17],max: max[17],value: catchAB});
	
    //calls tpespent.js
    updateTPESpent();
}

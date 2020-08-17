//declare global variables

var banked;
var hitArch;
var fError;
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
    var n = longString.search("First Name:</b>");
    var splitFirstName = longString.slice(n);
    var newN = splitFirstName.indexOf("Last Name:</b>");
    firstName = splitFirstName.substring("First Name:</b>".length+1,newN);
	
	var n = longString.search("Last Name:</b>");
    var splitLastName = longString.slice(n);
    var newN = splitLastName.indexOf("Number:</b>");
    lastName = splitLastName.substring("Last Name:</b>".length+1,newN);
	
	var n = longString.search('Banked: ');
	banked = parseInt(longString.substring(n+"Banked: ".length,n+"Banked: ".length+3));
	
	if(isNaN(banked)){
	    n = longString.search('Bank: ');
	    banked = parseInt(longString.substring(n+"Bank: ".length,n+"Bank: ".length+3));
    	if(isNaN(banked)){
    	    n = longString.search('Banked TPE: ');
	        banked = parseInt(longString.substring(n+"Banked TPE: ".length,n+"Banked TPE: ".length+3));
    	    if(isNaN(banked)){
    	        banked = 0;
    	    }
    	}
	}
	if(!isNaN(banked)){
	    $('#error').html("");
	    $('#putBNK').html("Banked: " + banked);
		$('#putFirst').html("First Name: " + firstName);
		$('#putLast').html("Last Name: " + lastName);
		console.log("firstName");
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

//Function designed to pull fielding and hitting archetypes from the string in getStats()
//Also pulls all fielding stats

function getStatsFielding(postGET){
	//postGET is the roster page info
	
	//Look for Player Archetype
    var n = postGET.search("Archetype:</b>");
    var splitHitArch = postGET.slice(n);
    var newN = splitHitArch.indexOf("(MI");
    hitArch = splitHitArch.substring("Archetype:</b>".length+1,newN);
    if(newN == -1){
        n = postGET.search("Archetype: ");
        splitHitArch = postGET.slice(n);
        newN = splitHitArch.indexOf("(MI");
        hitArch = splitHitArch.substring("Archetype:".length+1,newN);
    }
	
	//Look for Fielding Error
	//Splits postGET where the TPE value should below
	//Saves it to a variable for later
	n = postGET.search("Fielding Error: ");
	//length of 3 is chosen for even if a value is 100 it will still be grabbed
	//if the length of the number is less than 3 then parseInt will remove any extra information
	fError = parseInt(postGET.substring(n+"Fielding Error: ".length,n+"Fielding Error: ".length+3));
	if(isNaN(fError)){
	    n = postGET.search("Error: ");
	fError = parseInt(postGET.substring(n+"Error: ".length,n+"Error: ".length+3));
	}
	
	//Look for Fielding Range
	//Splits postGET where the TPE value should below
	//Saves it to a variable for later
    n = postGET.search('Fielding Range: ');
	range = parseInt(postGET.substring(n+"Fielding Range: ".length,n+"Fielding Range: ".length+3));
	if(isNaN(range)){
	    n = postGET.search('Range: ');
	    range = parseInt(postGET.substring(n+"Range: ".length,n+"Range: ".length+3));
	}
	
	//Look for Fielding Arm
	//Splits postGET where the TPE value should below
	//Saves it to a variable for later
	n = postGET.search("Fielding/Catching Arm: ");
	arm = parseInt(postGET.substring(n+"Fielding/Catching Arm: ".length,n+"Fielding/Catching Arm: ".length+3));
	if(isNaN(arm)){
	    n = postGET.search("Arm: ");
	    arm = parseInt(postGET.substring(n+"Arm: ".length,n+"Arm: ".length+3));
	}
		    
	//Look for Turn Double Play
	//Splits postGET where the TPE value should below
	//Saves it to a variable for later			
	n = postGET.search("Turn Double Play: ");
	turnDP = parseInt(postGET.substring(n+"Turn Double Play ".length,n+"Turn Double Play ".length+3));
	if(isNaN(turnDP)){
	    n = postGET.search("Turn Double Play ");
    	turnDP = parseInt(postGET.substring(n+"Turn Double Play: ".length,n+"Turn Double Play: ".length+3));
	}
	
	//Look for Catcher Ability
	//Splits postGET where the TPE value should below
	//Saves it to a variable for later
	n = postGET.search("Catcher Ability: ");
	catchAB = parseInt(postGET.substring(n+"Catcher Ability: ".length,n+"Catcher Ability: ".length+3));
	
	//HTML part to place all values correctly
	$('#putHAR').html("Hitting Archetype: " + hitArch);
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
	
	var n = postGET.search('BABIP vs LHP: ');
	babipVsLHP = parseInt(postGET.substring(n+"BABIP vs LHP: ".length,n+"BABIP vs LHP: ".length+3));
		     
	n = postGET.search("BABIP vs RHP: ");
	babipVsRHP = parseInt(postGET.substring(n+"BABIP vs RHP: ".length,n+"BABIP vs RHP: ".length+3));
		     
	n = postGET.search("Avoid K&#39;s vs LHP: ");
	avoidKLHP = parseInt(postGET.substring(n+"Avoid K&#39;s vs LHP: ".length,n+"Avoid K&#39;s vs LHP: ".length+3));
		     
	n = postGET.search("Avoid K&#39;s vs RHP: ");
	avoidKRHP = parseInt(postGET.substring(n+"Avoid K&#39;s vs RHP: ".length,n+"Avoid K&#39;s vs RHP: ".length+3));
	
	n = postGET.search("Gap vs LHP: ");
	gapVsLHP = parseInt(postGET.substring(n+"Gap vs LHP: ".length,n+"Gap vs LHP: ".length+3));
	
	n = postGET.search("Gap vs RHP: ");
	gapVsRHP = parseInt(postGET.substring(n+"Gap vs RHP: ".length,n+"Gap vs RHP: ".length+3));
	
	n = postGET.search("Power vs LHP: ");
	powerVsLHP = parseInt(postGET.substring(n+"Power vs LHP: ".length,n+"Power vs LHP: ".length+3));
	
	n = postGET.search("Power vs RHP: ");
	powerVsRHP = parseInt(postGET.substring(n+"Power vs RHP: ".length,n+"Power vs RHP: ".length+3));
	
	n = postGET.search("Eye/Patience vs LHP: ");
	eyeVsLHP = parseInt(postGET.substring(n+"Eye/Patience vs LHP: ".length,n+"Eye/Patience vs LHP: ".length+3));
	
	n = postGET.search("Eye/Patience vs RHP: ");
	eyeVsRHP = parseInt(postGET.substring(n+"Eye/Patience vs RHP: ".length,n+"Eye/Patience vs RHP: ".length+3));
	
	n = postGET.indexOf("Speed (Base &amp; Run): ");
	speed = parseInt(postGET.substring(n+"Speed (Base &amp; Run): ".length,n+"Speed (Base &amp; Run): ".length+3));
	
	n = postGET.search("Stealing Ability: ");
	steal = parseInt(postGET.substring(n+"Stealing Ability: ".length,n+"Stealing Ability: ".length+3));
	
	n = postGET.indexOf("Bunting (Both): ");
	bunt = parseInt(postGET.substring(n+"Bunting (Both): ".length,n+"Bunting (Both): ".length+3));
	
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
//Also fills in minimums and maximums for each archetype
//EDIT THIS SECTION IF ARCHETYPE MINS/MAXS ARE CHANGED

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
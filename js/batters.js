//declare global variables

var banked;
var hitArch;
var fieldArch;
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
//pitchesBought variable declared to stop NaN on updateStats()

//receives longString from pullData.js
//gets Banked TPE in one of three ways
function getStats(longString){
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
	    getStatsBatter(longString);
    	getStatsFielding(longString);
    	//Launches the smooth scrolling down to Step 2 in moveSteps.js
    	stepTwo();
	}
}


//Function designed to pull fielding and hitting archetypes from the string in getStats()
//Also pulls all fielding stats

function getStatsFielding(postGET){
    var n = postGET.search("Archetype:</b>");
    var splitHitArch = postGET.slice(n);
    var newN = splitHitArch.indexOf("(eg");
    hitArch = splitHitArch.substring("Archetype:</b>".length+1,newN);
    if(newN == -1){
        n = postGET.search("Archetype: ");
        splitHitArch = postGET.slice(n);
        newN = splitHitArch.indexOf("(eg");
        hitArch = splitHitArch.substring("Archetype:".length+1,newN);
    }
    if(newN == -1){
        n = postGET.search("Archetype: ");
        splitHitArch = postGET.slice(n);
        newN = splitHitArch.indexOf("Hitter");
        hitArch = splitHitArch.substring("Archetype".length+1,newN);
        hitArch += "Batter";
    }
	
	$('#putHAR').html("Hitting Archetype: " + hitArch);
	
	n = postGET.search("Fielding Archetype:</b>");
    var splitFieldArch = postGET.slice(n);
    newN = splitFieldArch.indexOf("(eg");
    if(newN==-1){
        newN = splitFieldArch.indexOf("<br");
    }
	fieldArch = splitFieldArch.substring("Fielding Archetype:</b>".length+1,newN);
	if(newN==-1){
	    n = postGET.search("Fielding Archetype: ");
        splitFieldArch = postGET.slice(n);
        newN = splitFieldArch.indexOf("Fielder");
        fieldArch = splitFieldArch.substring("Fielding Archetype:".length+1,newN);
        fieldArch += "Fielder";
	}
	if(newN>50){
	    n = postGET.search("Fielding Archetype:");
        splitFieldArch = postGET.slice(n);
        newN = splitFieldArch.indexOf("(eg");
        fieldArch = splitFieldArch.substring("Fielding Archetype:".length+1,newN);
	}
	$('#putFAR').html("Fielding Archetype: " + fieldArch);
		     
	n = postGET.search("Fielding Error: ");
	fError = parseInt(postGET.substring(n+"Fielding Error: ".length,n+"Fielding Error: ".length+3));
	if(isNaN(fError)){
	    n = postGET.search("Error: ");
	fError = parseInt(postGET.substring(n+"Error: ".length,n+"Error: ".length+3));
	}
	$('#putERR').html("Fielding Error: " + fError);
    
    n = postGET.search('Fielding Range: ');
	range = parseInt(postGET.substring(n+"Fielding Range: ".length,n+"Fielding Range: ".length+3));
	if(isNaN(range)){
	    n = postGET.search('Range: ');
	    range = parseInt(postGET.substring(n+"Range: ".length,n+"Range: ".length+3));
	}
	$('#putRNG').html("Fielding Range: " + range);
	
	n = postGET.search("Fielding/Catching Arm: ");
	arm = parseInt(postGET.substring(n+"Fielding/Catching Arm: ".length,n+"Fielding/Catching Arm: ".length+3));
	if(isNaN(arm)){
	    n = postGET.search("Arm: ");
	    arm = parseInt(postGET.substring(n+"Arm: ".length,n+"Arm: ".length+3));
	}
	$('#putARM').html("Fielding/Catching Arm: " + arm);
		     
	n = postGET.search("Turn Double Play ");
	turnDP = parseInt(postGET.substring(n+"Turn Double Play ".length,n+"Turn Double Play ".length+3));
	if(isNaN(turnDP)){
	    n = postGET.search("Turn Double Play: ");
    	turnDP = parseInt(postGET.substring(n+"Turn Double Play: ".length,n+"Turn Double Play: ".length+3));
	}
	$('#putTDP').html("Turn Double Play: " + turnDP);
	
	n = postGET.search("Catcher Ability: ");
	catchAB = parseInt(postGET.substring(n+"Catcher Ability: ".length,n+"Catcher Ability: ".length+3));
	$('#putCAB').html("Catcher Ability: " + catchAB);
}

//Function designed to pull batting stats from the string in GetStats()

function getStatsBatter(postGET){
    var n = postGET.search('BABIP vs LHP: ');
	babipVsLHP = parseInt(postGET.substring(n+"BABIP vs LHP: ".length,n+"BABIP vs LHP: ".length+3));
	$('#putBVL').html("BABIP VS LHP: " + babipVsLHP);
		     
	n = postGET.search("BABIP vs RHP: ");
	babipVsRHP = parseInt(postGET.substring(n+"BABIP vs RHP: ".length,n+"BABIP vs RHP: ".length+3));
	$('#putBVR').html("BABIP VS RHP: " + babipVsRHP);
		     
	n = postGET.search("Avoid K&#39;s vs LHP: ");
	avoidKLHP = parseInt(postGET.substring(n+"Avoid K&#39;s vs LHP: ".length,n+"Avoid K&#39;s vs LHP: ".length+3));
	$('#putAKL').html("Avoid K's vs LHP: " + avoidKLHP);
		     
	n = postGET.search("Avoid K&#39;s vs RHP: ");
	avoidKRHP = parseInt(postGET.substring(n+"Avoid K&#39;s vs RHP: ".length,n+"Avoid K&#39;s vs RHP: ".length+3));
	$('#putAKR').html("Avoid K's vs RHP: " + avoidKRHP);
	
	n = postGET.search("Gap vs LHP: ");
	gapVsLHP = parseInt(postGET.substring(n+"Gap vs LHP: ".length,n+"Gap vs LHP: ".length+3));
	$('#putGVL').html("Gap vs LHP: " + gapVsLHP);
	
	n = postGET.search("Gap vs RHP: ");
	gapVsRHP = parseInt(postGET.substring(n+"Gap vs RHP: ".length,n+"Gap vs RHP: ".length+3));
	$('#putGVR').html("Gap vs RHP: " + gapVsRHP);
	
	n = postGET.search("Power vs LHP: ");
	powerVsLHP = parseInt(postGET.substring(n+"Power vs LHP: ".length,n+"Power vs LHP: ".length+3));
	$('#putPVL').html("Power vs LHP: " + powerVsLHP);
	
	n = postGET.search("Power vs RHP: ");
	powerVsRHP = parseInt(postGET.substring(n+"Power vs RHP: ".length,n+"Power vs RHP: ".length+3));
	$('#putPVR').html("Power vs RHP: " + powerVsRHP);
	
	n = postGET.search("Eye/Patience vs LHP: ");
	eyeVsLHP = parseInt(postGET.substring(n+"Eye/Patience vs LHP: ".length,n+"Eye/Patience vs LHP: ".length+3));
	$('#putEVL').html("Eye/Patience vs LHP: " + eyeVsLHP);
	
	n = postGET.search("Eye/Patience vs RHP: ");
	eyeVsRHP = parseInt(postGET.substring(n+"Eye/Patience vs RHP: ".length,n+"Eye/Patience vs RHP: ".length+3));
	$('#putEVR').html("Eye/Patience vs RHP: " + eyeVsRHP);
	
	n = postGET.indexOf("Speed (Base &amp; Run): ");
	speed = parseInt(postGET.substring(n+"Speed (Base &amp; Run): ".length,n+"Speed (Base &amp; Run): ".length+3));
	$('#putSPD').html("Speed: " + speed);
	
	n = postGET.search("Stealing Ability: ");
	steal = parseInt(postGET.substring(n+"Stealing Ability: ".length,n+"Stealing Ability: ".length+3));
	$('#putSTL').html("Stealing Ability: " + steal);
	
	n = postGET.indexOf("Bunting (Both): ");
	bunt = parseInt(postGET.substring(n+"Bunting (Both): ".length,n+"Bunting (Both): ".length+3));
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
    
    if(hitArch.includes("Power Hitter")){
        $('#minStat1').html("25");
        $('#minStat2').html("25");
        $('#minStat3').html("20");
        $('#minStat4').html("20");
        $('#minStat5').html("30");
        $('#minStat6').html("30");
        $('#minStat7').html("40");
        $('#minStat8').html("40");
        $('#minStat9').html("40");
        $('#minStat10').html("40");
        $('#minStat11').html("25");
        $('#minStat12').html("15");
        $('#minStat13').html("15");
        $('#maxStat1').html("60");
        $('#maxStat2').html("60");
        $('#maxStat3').html("60");
        $('#maxStat4').html("60");
        $('#maxStat5').html("80");
        $('#maxStat6').html("80");
        $('#maxStat7').html("100");
        $('#maxStat8').html("100");
        $('#maxStat9').html("100");
        $('#maxStat10').html("100");
        $('#maxStat11').html("60");
        $('#maxStat12').html("40");
        $('#maxStat13').html("30");
        $('#newStat1').attr({min: 25,max: 60,value: babipVsLHP});
        $('#newStat2').attr({min: 25,max: 60,value: babipVsRHP});
        $('#newStat3').attr({min: 20,max: 60,value: avoidKLHP});
        $('#newStat4').attr({min: 20,max: 60,value: avoidKRHP});
        $('#newStat5').attr({min: 30,max: 80,value: gapVsLHP});
        $('#newStat6').attr({min: 30,max: 80,value: gapVsRHP});
        $('#newStat7').attr({min: 40,max: 100,value: powerVsLHP});
        $('#newStat8').attr({min: 40,max: 100,value: powerVsRHP});
        $('#newStat9').attr({min: 40,max: 100,value: eyeVsLHP});
        $('#newStat10').attr({min: 40,max: 100,value: eyeVsRHP});
        $('#newStat11').attr({min: 25,max: 60,value: speed});
        $('#newStat12').attr({min: 15,max: 40,value: steal});
        $('#newStat13').attr({min: 15,max: 30,value: bunt});
    }else if(hitArch.includes("Balanced Batter")){
        $('#minStat1').html("30");
        $('#minStat2').html("30");
        $('#minStat3').html("35");
        $('#minStat4').html("35");
        $('#minStat5').html("25");
        $('#minStat6').html("25");
        $('#minStat7').html("30");
        $('#minStat8').html("30");
        $('#minStat9').html("30");
        $('#minStat10').html("30");
        $('#minStat11').html("30");
        $('#minStat12').html("20");
        $('#minStat13').html("25");
        $('#maxStat1').html("80");
        $('#maxStat2').html("80");
        $('#maxStat3').html("80");
        $('#maxStat4').html("80");
        $('#maxStat5').html("80");
        $('#maxStat6').html("80");
        $('#maxStat7').html("80");
        $('#maxStat8').html("80");
        $('#maxStat9').html("90");
        $('#maxStat10').html("90");
        $('#maxStat11').html("70");
        $('#maxStat12').html("50");
        $('#maxStat13').html("50");
        $('#newStat1').attr({min: 30,max: 80,value: babipVsLHP});
        $('#newStat2').attr({min: 30,max: 80,value: babipVsRHP});
        $('#newStat3').attr({min: 35,max: 80,value: avoidKLHP});
        $('#newStat4').attr({min: 35,max: 80,value: avoidKRHP});
        $('#newStat5').attr({min: 25,max: 80,value: gapVsLHP});
        $('#newStat6').attr({min: 25,max: 80,value: gapVsRHP});
        $('#newStat7').attr({min: 30,max: 80,value: powerVsLHP});
        $('#newStat8').attr({min: 30,max: 80,value: powerVsRHP});
        $('#newStat9').attr({min: 30,max: 90,value: eyeVsLHP});
        $('#newStat10').attr({min: 30,max: 90,value: eyeVsRHP});
        $('#newStat11').attr({min: 30,max: 70,value: speed});
        $('#newStat12').attr({min: 20,max: 50,value: steal});
        $('#newStat13').attr({min: 25,max: 50,value: bunt});
    }else if(hitArch.includes("Contact Hitter")){
        $('#minStat1').html("35");
        $('#minStat2').html("35");
        $('#minStat3').html("35");
        $('#minStat4').html("35");
        $('#minStat5').html("20");
        $('#minStat6').html("20");
        $('#minStat7').html("20");
        $('#minStat8').html("20");
        $('#minStat9').html("30");
        $('#minStat10').html("30");
        $('#minStat11').html("35");
        $('#minStat12').html("35");
        $('#minStat13').html("35");
        $('#maxStat1').html("95");
        $('#maxStat2').html("95");
        $('#maxStat3').html("95");
        $('#maxStat4').html("95");
        $('#maxStat5').html("65");
        $('#maxStat6').html("65");
        $('#maxStat7').html("55");
        $('#maxStat8').html("55");
        $('#maxStat9').html("80");
        $('#maxStat10').html("80");
        $('#maxStat11').html("80");
        $('#maxStat12').html("60");
        $('#maxStat13').html("70");
        $('#newStat1').attr({min: 35,max: 95,value: babipVsLHP});
        $('#newStat2').attr({min: 35,max: 95,value: babipVsRHP});
        $('#newStat3').attr({min: 35,max: 95,value: avoidKLHP});
        $('#newStat4').attr({min: 35,max: 95,value: avoidKRHP});
        $('#newStat5').attr({min: 20,max: 65,value: gapVsLHP});
        $('#newStat6').attr({min: 20,max: 65,value: gapVsRHP});
        $('#newStat7').attr({min: 20,max: 55,value: powerVsLHP});
        $('#newStat8').attr({min: 20,max: 55,value: powerVsRHP});
        $('#newStat9').attr({min: 30,max: 80,value: eyeVsLHP});
        $('#newStat10').attr({min: 30,max: 80,value: eyeVsRHP});
        $('#newStat11').attr({min: 35,max: 80,value: speed});
        $('#newStat12').attr({min: 35,max: 60,value: steal});
        $('#newStat13').attr({min: 35,max: 70,value: bunt});
    }else if(hitArch.includes("Speed Demon")){
        $('#minStat1').html("30");
        $('#minStat2').html("30");
        $('#minStat3').html("30");
        $('#minStat4').html("30");
        $('#minStat5').html("15");
        $('#minStat6').html("15");
        $('#minStat7').html("15");
        $('#minStat8').html("15");
        $('#minStat9').html("30");
        $('#minStat10').html("30");
        $('#minStat11').html("50");
        $('#minStat12').html("45");
        $('#minStat13').html("50");
        $('#maxStat1').html("85");
        $('#maxStat2').html("85");
        $('#maxStat3').html("80");
        $('#maxStat4').html("80");
        $('#maxStat5').html("55");
        $('#maxStat6').html("55");
        $('#maxStat7').html("50");
        $('#maxStat8').html("50");
        $('#maxStat9').html("85");
        $('#maxStat10').html("85");
        $('#maxStat11').html("100");
        $('#maxStat12').html("100");
        $('#maxStat13').html("100");
        $('#newStat1').attr({min: 30,max: 85,value: babipVsLHP});
        $('#newStat2').attr({min: 30,max: 85,value: babipVsRHP});
        $('#newStat3').attr({min: 30,max: 80,value: avoidKLHP});
        $('#newStat4').attr({min: 30,max: 80,value: avoidKRHP});
        $('#newStat5').attr({min: 15,max: 55,value: gapVsLHP});
        $('#newStat6').attr({min: 15,max: 55,value: gapVsRHP});
        $('#newStat7').attr({min: 15,max: 50,value: powerVsLHP});
        $('#newStat8').attr({min: 15,max: 50,value: powerVsRHP});
        $('#newStat9').attr({min: 30,max: 85,value: eyeVsLHP});
        $('#newStat10').attr({min: 30,max: 85,value: eyeVsRHP});
        $('#newStat11').attr({min: 50,max: 100,value: speed});
        $('#newStat12').attr({min: 45,max: 100,value: steal});
        $('#newStat13').attr({min: 50,max: 100,value: bunt});
    }else{
        $('#error2').html("Something went wrong with your archetype import. Contact AuGold on Discord for assistance.");
    }
    
    if(fieldArch.includes("Strong Arm Fielder")){
        $('#minStat14').html("30");
        $('#minStat15').html("30");
        $('#minStat16').html("50");
        $('#minStat17').html("20");
        $('#minStat18').html("5");
        $('#maxStat14').html("80");
        $('#maxStat15').html("75");
        $('#maxStat16').html("100");
        $('#maxStat17').html("65");
        $('#maxStat18').html("25");
        $('#newStat14').attr({min: 30,max: 80,value: range});
        $('#newStat15').attr({min: 30,max: 75,value: fError});
        $('#newStat16').attr({min: 50,max: 100,value: arm});
        $('#newStat17').attr({min: 20,max: 65,value: turnDP});
        $('#newStat18').attr({min: 5,max: 25,value: catchAB});
    }else if(fieldArch.includes("Balanced Fielder")){
        $('#minStat14').html("35");
        $('#minStat15').html("40");
        $('#minStat16').html("35");
        $('#minStat17').html("30");
        $('#minStat18').html("5");
        $('#maxStat14').html("85");
        $('#maxStat15').html("85");
        $('#maxStat16').html("80");
        $('#maxStat17').html("75");
        $('#maxStat18').html("25");
        $('#newStat14').attr({min: 35,max: 85,value: range});
        $('#newStat15').attr({min: 40,max: 85,value: fError});
        $('#newStat16').attr({min: 35,max: 80,value: arm});
        $('#newStat17').attr({min: 30,max: 75,value: turnDP});
        $('#newStat18').attr({min: 5,max: 25,value: catchAB});
    }else if(fieldArch.includes("Speedy Fielder")){
        $('#minStat14').html("45");
        $('#minStat15').html("30");
        $('#minStat16').html("30");
        $('#minStat17').html("30");
        $('#minStat18').html("5");
        $('#maxStat14').html("90");
        $('#maxStat15').html("80");
        $('#maxStat16').html("60");
        $('#maxStat17').html("90");
        $('#maxStat18').html("25");
        $('#newStat14').attr({min: 45,max: 90,value: range});
        $('#newStat15').attr({min: 30,max: 80,value: fError});
        $('#newStat16').attr({min: 30,max: 60,value: arm});
        $('#newStat17').attr({min: 30,max: 90,value: turnDP});
        $('#newStat18').attr({min: 5,max: 25,value: catchAB});
    }else if(fieldArch.includes("React Catcher")){
        $('#minStat14').html("25");
        $('#minStat15').html("30");
        $('#minStat16').html("20");
        $('#minStat17').html("20");
        $('#minStat18').html("40");
        $('#maxStat14').html("65");
        $('#maxStat15').html("65");
        $('#maxStat16').html("85");
        $('#maxStat17').html("60");
        $('#maxStat18').html("95");
        $('#newStat14').attr({min: 25,max: 65,value: range});
        $('#newStat15').attr({min: 30,max: 65,value: fError});
        $('#newStat16').attr({min: 20,max: 85,value: arm});
        $('#newStat17').attr({min: 20,max: 60,value: turnDP});
        $('#newStat18').attr({min: 40,max: 95,value: catchAB});
    }else if(fieldArch.includes("Strong Arm Catcher")){
        $('#minStat14').html("15");
        $('#minStat15').html("15");
        $('#minStat16').html("40");
        $('#minStat17').html("10");
        $('#minStat18').html("20");
        $('#maxStat14').html("65");
        $('#maxStat15').html("65");
        $('#maxStat16').html("95");
        $('#maxStat17').html("60");
        $('#maxStat18').html("80");
        $('#newStat14').attr({min: 15,max: 65,value: range});
        $('#newStat15').attr({min: 15,max: 65,value: fError});
        $('#newStat16').attr({min: 40,max: 95,value: arm});
        $('#newStat17').attr({min: 10,max: 60,value: turnDP});
        $('#newStat18').attr({min: 20,max: 80,value: catchAB});
    }else if(fieldArch.includes("Designated Hitter")){
        $('#minStat14').html("25");
        $('#minStat15').html("20");
        $('#minStat16').html("25");
        $('#minStat17').html("20");
        $('#minStat18').html("5");
        $('#maxStat14').html("70");
        $('#maxStat15').html("70");
        $('#maxStat16').html("70");
        $('#maxStat17').html("50");
        $('#maxStat18').html("25");
        $('#newStat14').attr({min: 25,max: 70,value: range});
        $('#newStat15').attr({min: 20,max: 70,value: fError});
        $('#newStat16').attr({min: 25,max: 70,value: arm});
        $('#newStat17').attr({min: 20,max: 50,value: turnDP});
        $('#newStat18').attr({min: 5,max: 25,value: catchAB});
    }else if(fieldArch.includes("Utility Fielder")){
        $('#minStat14').html("25");
        $('#minStat15').html("20");
        $('#minStat16').html("25");
        $('#minStat17').html("20");
        $('#minStat18').html("5");
        $('#maxStat14').html("85");
        $('#maxStat15').html("85");
        $('#maxStat16').html("85");
        $('#maxStat17').html("85");
        $('#maxStat18').html("30");
        $('#newStat14').attr({min: 25,max: 85,value: range});
        $('#newStat15').attr({min: 20,max: 85,value: fError});
        $('#newStat16').attr({min: 25,max: 85,value: arm});
        $('#newStat17').attr({min: 20,max: 85,value: turnDP});
        $('#newStat18').attr({min: 5,max: 30,value: catchAB});
    }else{
        $('#error2').html("Something went wrong with your archetype import. Contact AuGold on Discord for assistance.");
    }
    //calls tpespent.js
    updateTPESpent();
}
//declare global variables

var banked;

var velo;
var moveVsLHB;
var moveVsRHB;
var babipVsLHB;
var babipVsRHB;
var conVsLHB;
var conVsRHB;
var stamina;
var holdRun;
var pitch1;
var pitch2;
var pitch3;
var pitch4;
var pitch5;
var tpeEarned;
var tpeToSpend;
var pitch1Name = "Pitch 1";
var pitch2Name = "Pitch 2";
var pitch3Name = "Pitch 3";
var pitch4Name = "Pitch 4";
var pitch5Name = "Pitch 5";
var gbPer;

var pitchesBought = 0;
var mins=[];
var max=[];
var firstName;
var lastName;
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
	    getStatsPitcher(longString);
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
	var minVeloStr = str.substring(indices[0]+5,indices[0]+13);
	minVeloStr = minVeloStr.replace(')','');
	mins.push(minVeloStr);

	for(var uses = 1 ; uses < indices.length ; uses++){
		var number = parseInt(str.substring(indices[uses]+4,indices[uses]+7));
		mins.push(number);
	}
	
	toSearch = "MAX:";
	indices = [];
    for(var pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
        indices.push(pos);
    }
	
	max = [];
	var maxVeloStr = str.substring(indices[0]+5,indices[0]+13);
	maxVeloStr = maxVeloStr.replace(')','');
	maxVeloStr = maxVeloStr.replace(/[^\d-]/g,'');
	if(maxVeloStr === "100"){
		maxVeloStr = "100+";
	}
	max.push(maxVeloStr);

	for(var uses = 1 ; uses < indices.length ; uses++){
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
	const re = new RegExp(`${stringToFind}(.+)`);
	const match = re.exec(htmlCode);
	return match ? match[1] : "nopity nope";
}

//Function designed to pull pitching archetype from the string in getStats()
//Also gets pitches and in the order that user has selected them

function getStatsPitcher(postGET){
    //postGET is the roster page info
	
	//Look for Velocity
	//Splits postGET where the TPE value should below
	//Saves it to a variable for later
    n = postGET.search('Velocity: ');
    var splitVelocity = postGET.slice(n);
    newN = splitVelocity.indexOf("<br");
	velo = splitVelocity.substring("Velocity:".length,newN);
	if(parseInt(velo) == "100"){
		velo = "100+";
	}
	
	moveVsLHB = findString(postGET, "Movement vs. LHB: ", "Movement vs LHB: ");
	moveVsRHB = findString(postGET, "Movement vs. RHB: ", "Movement vs RHB: ");
	babipVsLHB = findString(postGET, "BABIP vs. LHB: ", "pBABIP vs LHB: ");
	babipVsRHB = findString(postGET, "BABIP vs. RHB: ", "pBABIP vs RHB: ");
	conVsLHB = findString(postGET, "Control vs. LHB: ", "Control vs LHB: ");
	conVsRHB = findString(postGET, "Control vs. RHB: ", "Control vs RHB: ");
	stamina = findString(postGET, "Stamina: ", null);
	holdRun = findString(postGET, "Holding Runners: ", null);
	pitch1 = findString(postGET, "Pitch 1:", null);
	pitch2 = findString(postGET, "Pitch 2:", null);
	pitch3 = findString(postGET, "Pitch 3:", null);
	pitch4 = findString(postGET, "Pitch 4:", null);
	pitch5 = findString(postGET, "Pitch 5:", null);
	gbPer = findString(postGET, "GB%: ", "GB: ");
	
	//Put things into HTML
	$('#putVEL').html("Velocity: " + velo);
	$('#putMVL').html("Movement vs LHB: " + moveVsLHB);
	$('#putMVR').html("Movement vs RHB: " + moveVsRHB);
	$('#putBVL').html("BABIP vs LHB: " + babipVsLHB);
	$('#putBVR').html("BABIP vs RHB: " + babipVsRHB);
	$('#putCVL').html("Control vs LHB: " + conVsLHB);
	$('#putCVR').html("Control vs RHB: " + conVsRHB);
	$('#putSTA').html("Stamina: " + stamina);
	$('#putHRN').html("Holding Runners: " + holdRun);
	$('#putGB').html("GB%: " + gbPer);
	
	$('#putPI5').html("Pitch 5: " + pitch5);
	$('#putPI1').html("Pitch 1: " + pitch1);
	$('#putPI2').html("Pitch 2: " + pitch2);
	$('#putPI3').html("Pitch 3: " + pitch3);
	$('#putPI4').html("Pitch 4: " + pitch4);
	
	//This is the real part of the pitches section
	//If labeled correctly, pitches can be found and placed on the updater in the right order
	//The basic idea of this portion is that if we find a pitch, we can store it in an array
	//Once all pitches have been found, we can call them from the array for later
	var FastballLocation;
	var SinkerLocation;
	var CutterLocation;
	var CurveballLocation;
	var SliderLocation;
	var ChangeupLocation;
	var SplitterLocation;
	var ForkballLocation;
	var CircleChangeLocation;
	var ScrewballLocation;
	var KnuckleCurveLocation;
	var KnuckleballLocation;
	var LocationArray = [];
	if(isNaN(pitch1)){
	    FastballLocation = postGET.search("Fastball:" );
	    if(FastballLocation != -1){
	        LocationArray.push(FastballLocation);
	    }
	    SinkerLocation = postGET.search("Sinker:" );
	    if(SinkerLocation != -1){
	        LocationArray.push(SinkerLocation);
	    }
	    CutterLocation = postGET.search("Cutter:" );
	    if(CutterLocation != -1){
	        LocationArray.push(CutterLocation);
	    }
	    CurveballLocation = postGET.search("Curveball:" );
	    if(CurveballLocation != -1){
	        LocationArray.push(CurveballLocation);
	    }
	    SliderLocation = postGET.search("Slider:" );
	    if(SliderLocation != -1){
	        LocationArray.push(SliderLocation);
	    }
	    ChangeupLocation = postGET.search("Changeup:" );
	    if(ChangeupLocation != -1){
	        LocationArray.push(ChangeupLocation);
	    }
	    SplitterLocation = postGET.search("Splitter:" );
	    if(SplitterLocation != -1){
	        LocationArray.push(SplitterLocation);
	    }
	    ForkballLocation = postGET.search("Forkball:" );
	    if(ForkballLocation != -1){
	        LocationArray.push(ForkballLocation);
	    }
	    CircleChangeLocation = postGET.search("Circle Change:" );
	    if(CircleChangeLocation != -1){
	        LocationArray.push(CircleChangeLocation);
	    }
	    ScrewballLocation = postGET.search("Screwball:" );
	    if(ScrewballLocation != -1){
	        LocationArray.push(ScrewballLocation);
	    }
	    KnuckleCurveLocation = postGET.search("Knuckle Curve:" );
	    if(KnuckleCurveLocation != -1){
	        LocationArray.push(KnuckleCurveLocation);
	    }
	    KnuckleballLocation = postGET.search("Knuckleball:" );
	    if(KnuckleballLocation != -1){
	        LocationArray.push(KnuckleballLocation);
	    }
	    if(LocationArray.length == 0){
	        FastballLocation = postGET.search(" Fastball" );
    	    if(FastballLocation != -1){
    	        LocationArray.push(FastballLocation);
    	    }
    	    SinkerLocation = postGET.search(" Sinker" );
    	    if(SinkerLocation != -1){
    	        LocationArray.push(SinkerLocation);
    	    }
    	    CutterLocation = postGET.search(" Cutter" );
    	    if(CutterLocation != -1){
    	        LocationArray.push(CutterLocation);
    	    }
    	    CurveballLocation = postGET.search(" Curveball" );
    	    if(CurveballLocation != -1){
    	        LocationArray.push(CurveballLocation);
    	    }
    	    SliderLocation = postGET.search(" Slider" );
    	    if(SliderLocation != -1){
    	        LocationArray.push(SliderLocation);
    	    }
    	    ChangeupLocation = postGET.search(" Changeup" );
    	    if(ChangeupLocation != -1){
    	        LocationArray.push(ChangeupLocation);
    	    }
    	    SplitterLocation = postGET.search(" Splitter" );
    	    if(SplitterLocation != -1){
    	        LocationArray.push(SplitterLocation);
    	    }
    	    ForkballLocation = postGET.search(" Forkball" );
    	    if(ForkballLocation != -1){
    	        LocationArray.push(ForkballLocation);
    	    }
    	    CircleChangeLocation = postGET.search(" Circle Change" );
    	    if(CircleChangeLocation != -1){
    	        LocationArray.push(CircleChangeLocation);
    	    }
    	    ScrewballLocation = postGET.search(" Screwball" );
    	    if(ScrewballLocation != -1){
    	        LocationArray.push(ScrewballLocation);
    	    }
    	    KnuckleCurveLocation = postGET.search(" Knuckle Curve" );
    	    if(KnuckleCurveLocation != -1){
    	        LocationArray.push(KnuckleCurveLocation);
    	    }
    	    KnuckleballLocation = postGET.search("\\\) Knuckleball" );
    	    if(KnuckleballLocation != -1){
    	        LocationArray.push(KnuckleballLocation);
    	    }
	    }
		//This next part is calling looking for the TPE values
		//Then some HTML stuff
	    LocationArray.sort(function(a, b){return a-b});
	    if(1 <= LocationArray.length){
	        if(LocationArray[0] == FastballLocation){
	            pitch1 = parseInt(postGET.substring(FastballLocation+"Fastball: ".length,FastballLocation+"Fastball: ".length+3));
	            $('#putPI1').html("Fastball: " + pitch1);
	            pitch1Name = "Fastball";
	        }
	        else if(LocationArray[0] == SinkerLocation){
	            pitch1 = parseInt(postGET.substring(SinkerLocation+"Sinker: ".length,SinkerLocation+"Sinker: ".length+3));
	            $('#putPI1').html("Sinker: " + pitch1);
	            pitch1Name = "Sinker";
	        }
	        else if(LocationArray[0] == CutterLocation){
	            pitch1 = parseInt(postGET.substring(CutterLocation+"Cutter: ".length,CutterLocation+"Cutter: ".length+3));
	            $('#putPI1').html("Cutter: " + pitch1);
	            pitch1Name = "Cutter";
	        }
	        else if(LocationArray[0] == CurveballLocation){
	            pitch1 = parseInt(postGET.substring(CurveballLocation+"Curveball: ".length,CurveballLocation+"Curveball: ".length+3));
	            $('#putPI1').html("Curveball: " + pitch1);
	            pitch1Name = "Curveball";
	        }
	        else if(LocationArray[0] == SliderLocation){
	            pitch1 = parseInt(postGET.substring(SliderLocation+"Slider: ".length,SliderLocation+"Slider: ".length+3));
	            $('#putPI1').html("Slider: " + pitch1);
	            pitch1Name = "Slider";
	        }
	        else if(LocationArray[0] == ChangeupLocation){
	            pitch1 = parseInt(postGET.substring(ChangeupLocation+"Changeup: ".length,ChangeupLocation+"Changeup: ".length+3));
	            $('#putPI1').html("Changeup: " + pitch1);
	            pitch1Name = "Changeup";
	        }
	        else if(LocationArray[0] == SplitterLocation){
	            pitch1 = parseInt(postGET.substring(SplitterLocation+"Splitter: ".length,SplitterLocation+"Splitter: ".length+3));
	            $('#putPI1').html("Splitter: " + pitch1);
	            pitch1Name = "Splitter";
	        }
	        else if(LocationArray[0] == ForkballLocation){
	            pitch1 = parseInt(postGET.substring(ForkballLocation+"Forkball: ".length,ForkballLocation+"Forkball: ".length+3));
	            $('#putPI1').html("Forkball: " + pitch1);
	            pitch1Name = "Forkball";
	        }
	        else if(LocationArray[0] == CircleChangeLocation){
	            pitch1 = parseInt(postGET.substring(CircleChangeLocation+"Circle Change: ".length,CircleChangeLocation+"Circle Change: ".length+3));
	            $('#putPI1').html("Circle Change: " + pitch1);
	            pitch1Name = "Circle Change";
	        }
	        else if(LocationArray[0] == ScrewballLocation){
	            pitch1 = parseInt(postGET.substring(ScrewballLocation+"Screwball: ".length,ScrewballLocation+"Screwball: ".length+3));
	            $('#putPI1').html("Screwball: " + pitch1);
	            pitch1Name = "Screwball";
	        }
	        else if(LocationArray[0] == KnuckleCurveLocation){
	            pitch1 = parseInt(postGET.substring(KnuckleCurveLocation+"Knuckle Curve: ".length,KnuckleCurveLocation+"Knuckle Curve: ".length+3));
	            $('#putPI1').html("Knuckle Curve: " + pitch1);
	            pitch1Name = "Knuckle Curve";
	        }
	        else if(LocationArray[0] == KnuckleballLocation){
	            pitch1 = parseInt(postGET.substring(KnuckleballLocation+"Knuckleball: ".length,KnuckleballLocation+"Knuckleball: ".length+3));
	            $('#putPI1').html("Knuckleball: " + pitch1);
	            pitch1Name = "Knuckleball";
	        }
	    }
	    if(2 <= LocationArray.length){
	        if(LocationArray[1] == FastballLocation){
	            pitch2 = parseInt(postGET.substring(FastballLocation+"Fastball: ".length,FastballLocation+"Fastball: ".length+3));
	            $('#putPI2').html("Fastball: " + pitch2);
	            pitch2Name = "Fastball";
	        }
	        else if(LocationArray[1] == SinkerLocation){
	            pitch2 = parseInt(postGET.substring(SinkerLocation+"Sinker: ".length,SinkerLocation+"Sinker: ".length+3));
	            $('#putPI2').html("Sinker: " + pitch2);
	            pitch2Name = "Sinker";
	        }
	        else if(LocationArray[1] == CutterLocation){
	            pitch2 = parseInt(postGET.substring(CutterLocation+"Cutter: ".length,CutterLocation+"Cutter: ".length+3));
	            $('#putPI2').html("Cutter: " + pitch2);
	            pitch2Name = "Cutter";
	        }
	        else if(LocationArray[1] == CurveballLocation){
	            pitch2 = parseInt(postGET.substring(CurveballLocation+"Curveball: ".length,CurveballLocation+"Curveball: ".length+3));
	            $('#putPI2').html("Curveball: " + pitch2);
	            pitch2Name = "Curveball";
	        }
	        else if(LocationArray[1] == SliderLocation){
	            pitch2 = parseInt(postGET.substring(SliderLocation+"Slider: ".length,SliderLocation+"Slider: ".length+3));
	            $('#putPI2').html("Slider: " + pitch2);
	            pitch2Name = "Slider";
	        }
	        else if(LocationArray[1] == ChangeupLocation){
	            pitch2 = parseInt(postGET.substring(ChangeupLocation+"Changeup: ".length,ChangeupLocation+"Changeup: ".length+3));
	            $('#putPI2').html("Changeup: " + pitch2);
	            pitch2Name = "Changeup";
	        }
	        else if(LocationArray[1] == SplitterLocation){
	            pitch2 = parseInt(postGET.substring(SplitterLocation+"Splitter: ".length,SplitterLocation+"Splitter: ".length+3));
	            $('#putPI2').html("Splitter: " + pitch2);
	            pitch2Name = "Splitter";
	        }
	        else if(LocationArray[1] == ForkballLocation){
	            pitch2 = parseInt(postGET.substring(ForkballLocation+"Forkball: ".length,ForkballLocation+"Forkball: ".length+3));
	            $('#putPI2').html("Forkball: " + pitch2);
	            pitch2Name = "Forkball";
	        }
	        else if(LocationArray[1] == CircleChangeLocation){
	            pitch2 = parseInt(postGET.substring(CircleChangeLocation+"Circle Change: ".length,CircleChangeLocation+"Circle Change: ".length+3));
	            $('#putPI2').html("Circle Change: " + pitch2);
	            pitch2Name = "Circle Change";
	        }
	        else if(LocationArray[1] == ScrewballLocation){
	            pitch2 = parseInt(postGET.substring(ScrewballLocation+"Screwball: ".length,ScrewballLocation+"Screwball: ".length+3));
	            $('#putPI2').html("Screwball: " + pitch2);
	            pitch2Name = "Screwball";
	        }
	        else if(LocationArray[1] == KnuckleCurveLocation){
	            pitch2 = parseInt(postGET.substring(KnuckleCurveLocation+"Knuckle Curve: ".length,KnuckleCurveLocation+"Knuckle Curve: ".length+3));
	            $('#putPI2').html("Knuckle Curve: " + pitch2);
	            pitch2Name = "Knuckle Curve";
	        }
	        else if(LocationArray[1] == KnuckleballLocation){
	            pitch2 = parseInt(postGET.substring(KnuckleballLocation+"Knuckleball: ".length,KnuckleballLocation+"Knuckleball: ".length+3));
	            $('#putPI2').html("Knuckleball: " + pitch2);
	            pitch2Name = "Knuckleball";
	        }
	    }
	    if(3 <= LocationArray.length){
	        if(LocationArray[2] == FastballLocation){
	            pitch3 = parseInt(postGET.substring(FastballLocation+"Fastball: ".length,FastballLocation+"Fastball: ".length+3));
	            $('#putPI3').html("Fastball: " + pitch3);
	            pitch3Name = "Fastball";
	        }
	        else if(LocationArray[2] == SinkerLocation){
	            pitch3 = parseInt(postGET.substring(SinkerLocation+"Sinker: ".length,SinkerLocation+"Sinker: ".length+3));
	            $('#putPI3').html("Sinker: " + pitch3);
	            pitch3Name = "Sinker";
	        }
	        else if(LocationArray[2] == CutterLocation){
	            pitch3 = parseInt(postGET.substring(CutterLocation+"Cutter: ".length,CutterLocation+"Cutter: ".length+3));
	            $('#putPI3').html("Cutter: " + pitch3);
	            pitch3Name = "Cutter";
	        }
	        else if(LocationArray[2] == CurveballLocation){
	            pitch3 = parseInt(postGET.substring(CurveballLocation+"Curveball: ".length,CurveballLocation+"Curveball: ".length+3));
	            $('#putPI3').html("Curveball: " + pitch3);
	            pitch3Name = "Curveball";
	        }
	        else if(LocationArray[2] == SliderLocation){
	            pitch3 = parseInt(postGET.substring(SliderLocation+"Slider: ".length,SliderLocation+"Slider: ".length+3));
	            $('#putPI3').html("Slider: " + pitch3);
	            pitch3Name = "Slider";
	        }
	        else if(LocationArray[2] == ChangeupLocation){
	            pitch3 = parseInt(postGET.substring(ChangeupLocation+"Changeup: ".length,ChangeupLocation+"Changeup: ".length+3));
	            $('#putPI3').html("Changeup: " + pitch3);
	            pitch3Name = "Changeup";
	        }
	        else if(LocationArray[2] == SplitterLocation){
	            pitch3 = parseInt(postGET.substring(SplitterLocation+"Splitter: ".length,SplitterLocation+"Splitter: ".length+3));
	            $('#putPI3').html("Splitter: " + pitch3);
	            pitch3Name = "Splitter";
	        }
	        else if(LocationArray[2] == ForkballLocation){
	            pitch3 = parseInt(postGET.substring(ForkballLocation+"Forkball: ".length,ForkballLocation+"Forkball: ".length+3));
	            $('#putPI3').html("Forkball: " + pitch3);
	            pitch3Name = "Forkball";
	        }
	        else if(LocationArray[2] == CircleChangeLocation){
	            pitch3 = parseInt(postGET.substring(CircleChangeLocation+"Circle Change: ".length,CircleChangeLocation+"Circle Change: ".length+3));
	            $('#putPI3').html("Circle Change: " + pitch3);
	            pitch3Name = "Circle Change";
	        }
	        else if(LocationArray[2] == ScrewballLocation){
	            pitch3 = parseInt(postGET.substring(ScrewballLocation+"Screwball: ".length,ScrewballLocation+"Screwball: ".length+3));
	            $('#putPI3').html("Screwball: " + pitch3);
	            pitch3Name = "screwball";
	        }
	        else if(LocationArray[2] == KnuckleCurveLocation){
	            pitch3 = parseInt(postGET.substring(KnuckleCurveLocation+"Knuckle Curve: ".length,KnuckleCurveLocation+"Knuckle Curve: ".length+3));
	            $('#putPI3').html("Knuckle Curve: " + pitch3);
	            pitch3Name = "Knuckle Curve";
	        }
	        else if(LocationArray[2] == KnuckleballLocation){
	            pitch3 = parseInt(postGET.substring(KnuckleballLocation+"Knuckleball: ".length,KnuckleballLocation+"Knuckleball: ".length+3));
	            $('#putPI3').html("Knuckleball: " + pitch3);
	            pitch3Name = "Knuckleball";
	        }
	    }
	    if(4 <= LocationArray.length){
	        if(LocationArray[3] == FastballLocation){
	            pitch4 = parseInt(postGET.substring(FastballLocation+"Fastball: ".length,FastballLocation+"Fastball: ".length+3));
	            $('#putPI4').html("Fastball: " + pitch4);
	            pitch4Name = "Fastball";
	        }
	        else if(LocationArray[3] == SinkerLocation){
	            pitch4 = parseInt(postGET.substring(SinkerLocation+"Sinker: ".length,SinkerLocation+"Sinker: ".length+3));
	            $('#putPI4').html("Sinker: " + pitch4);
	            pitch4Name = "Sinker";
	        }
	        else if(LocationArray[3] == CutterLocation){
	            pitch4 = parseInt(postGET.substring(CutterLocation+"Cutter: ".length,CutterLocation+"Cutter: ".length+3));
	            $('#putPI4').html("Cutter: " + pitch4);
	            pitch4Name = "Cutter";
	        }
	        else if(LocationArray[3] == CurveballLocation){
	            pitch4 = parseInt(postGET.substring(CurveballLocation+"Curveball: ".length,CurveballLocation+"Curveball: ".length+3));
	            $('#putPI4').html("Curveball: " + pitch4);
	            pitch4Name = "Curveball";
	        }
	        else if(LocationArray[3] == SliderLocation){
	            pitch4 = parseInt(postGET.substring(SliderLocation+"Slider: ".length,SliderLocation+"Slider: ".length+3));
	            $('#putPI4').html("Slider: " + pitch4);
	            pitch4Name = "Slider";
	        }
	        else if(LocationArray[3] == ChangeupLocation){
	            pitch4 = parseInt(postGET.substring(ChangeupLocation+"Changeup: ".length,ChangeupLocation+"Changeup: ".length+3));
	            $('#putPI4').html("Changeup: " + pitch4);
	            pitch4Name = "Changeup";
	        }
	        else if(LocationArray[3] == SplitterLocation){
	            pitch4 = parseInt(postGET.substring(SplitterLocation+"Splitter: ".length,SplitterLocation+"Splitter: ".length+3));
	            $('#putPI4').html("Splitter: " + pitch4);
	            pitch4Name = "Splitter";
	        }
	        else if(LocationArray[3] == ForkballLocation){
	            pitch4 = parseInt(postGET.substring(ForkballLocation+"Forkball: ".length,ForkballLocation+"Forkball: ".length+3));
	            $('#putPI4').html("Forkball: " + pitch4);
	            pitch4Name = "Forkball";
	        }
	        else if(LocationArray[3] == CircleChangeLocation){
	            pitch4 = parseInt(postGET.substring(CircleChangeLocation+"Circle Change: ".length,CircleChangeLocation+"Circle Change: ".length+3));
	            $('#putPI4').html("Circle Change: " + pitch4);
	            pitch4Name = "Circle Change";
	        }
	        else if(LocationArray[3] == ScrewballLocation){
	            pitch4 = parseInt(postGET.substring(ScrewballLocation+"Screwball: ".length,ScrewballLocation+"Screwball: ".length+3));
	            $('#putPI4').html("Screwball: " + pitch4);
	            pitch4Name = "Screwball";
	        }
	        else if(LocationArray[3] == KnuckleCurveLocation){
	            pitch4 = parseInt(postGET.substring(KnuckleCurveLocation+"Knuckle Curve: ".length,KnuckleCurveLocation+"Knuckle Curve: ".length+3));
	            $('#putPI4').html("Knuckle Curve: " + pitch4);
	            pitch4Name = "Knuckle Curve";
	        }
	        else if(LocationArray[3] == KnuckleballLocation){
	            pitch4 = parseInt(postGET.substring(KnuckleballLocation+"Knuckleball: ".length,KnuckleballLocation+"Knuckleball: ".length+3));
	            $('#putPI4').html("Knuckleball: " + pitch4);
	            pitch4Name = "Knuckleball";
	        }
	    }
	    if(5 <= LocationArray.length){
	        if(LocationArray[4] == FastballLocation){
	            pitch5 = parseInt(postGET.substring(FastballLocation+"Fastball: ".length,FastballLocation+"Fastball: ".length+3));
	            $('#putPI5').html("Fastball: " + pitch5);
	            pitch5Name = "Fastball";
	        }
	        else if(LocationArray[4] == SinkerLocation){
	            pitch5 = parseInt(postGET.substring(SinkerLocation+"Sinker: ".length,SinkerLocation+"Sinker: ".length+3));
	            $('#putPI5').html("Sinker: " + pitch5);
	            pitch5Name = "Sinker";
	        }
	        else if(LocationArray[4] == CutterLocation){
	            pitch5 = parseInt(postGET.substring(CutterLocation+"Cutter: ".length,CutterLocation+"Cutter: ".length+3));
	            $('#putPI5').html("Cutter: " + pitch5);
	            pitch5Name = "Cutter";
	        }
	        else if(LocationArray[4] == CurveballLocation){
	            pitch5 = parseInt(postGET.substring(CurveballLocation+"Curveball: ".length,CurveballLocation+"Curveball: ".length+3));
	            $('#putPI5').html("Curveball: " + pitch5);
	            pitch5Name = "Curveball";
	        }
	        else if(LocationArray[4] == SliderLocation){
	            pitch5 = parseInt(postGET.substring(SliderLocation+"Slider: ".length,SliderLocation+"Slider: ".length+3));
	            $('#putPI5').html("Slider: " + pitch5);
	            pitch5Name = "Slider";
	        }
	        else if(LocationArray[4] == ChangeupLocation){
	            pitch5 = parseInt(postGET.substring(ChangeupLocation+"Changeup: ".length,ChangeupLocation+"Changeup: ".length+3));
	            $('#putPI5').html("Changeup: " + pitch5);
	            pitch5Name = "Changeup";
	        }
	        else if(LocationArray[4] == SplitterLocation){
	            pitch5 = parseInt(postGET.substring(SplitterLocation+"Splitter: ".length,SplitterLocation+"Splitter: ".length+3));
	            $('#putPI5').html("Splitter: " + pitch5);
	            pitch5Name = "Splitter";
	        }
	        else if(LocationArray[4] == ForkballLocation){
	            pitch5 = parseInt(postGET.substring(ForkballLocation+"Forkball: ".length,ForkballLocation+"Forkball: ".length+3));
	            $('#putPI5').html("Forkball: " + pitch5);
	            pitch5Name = "Forkball";
	        }
	        else if(LocationArray[4] == CircleChangeLocation){
	            pitch5 = parseInt(postGET.substring(CircleChangeLocation+"Circle Change: ".length,CircleChangeLocation+"Circle Change: ".length+3));
	            $('#putPI5').html("Circle Change: " + pitch5);
	            pitch5Name = "Circle Change";
	        }
	        else if(LocationArray[4] == ScrewballLocation){
	            pitch5 = parseInt(postGET.substring(ScrewballLocation+"Screwball: ".length,ScrewballLocation+"Screwball: ".length+3));
	            $('#putPI5').html("Screwball: " + pitch5);
	            pitch5Name = "Screwball";
	        }
	        else if(LocationArray[4] == KnuckleCurveLocation){
	            pitch5 = parseInt(postGET.substring(KnuckleCurveLocation+"Knuckle Curve: ".length,KnuckleCurveLocation+"Knuckle Curve: ".length+3));
	            $('#putPI5').html("Knuckle Curve: " + pitch5);
	            pitch5Name = "Knuckle Curve";
	        }
	        else if(LocationArray[4] == KnuckleballLocation){
	            pitch5 = parseInt(postGET.substring(KnuckleballLocation+"Knuckleball: ".length,KnuckleballLocation+"Knuckleball: ".length+3));
	            $('#putPI5').html("Knuckleball: " + pitch5);
	            pitch5Name = "Knuckleball";
	        }
	    }
	}
}

//Using the data pulled from getStatsPitcher() fills in the table for step4
//Also fills in minimums and maximums for each archetype
//Also used to determine if a user has purchased a pitch in the past (add 50 tpe)

function fillStats(){
	
    $('#bankedTPE').html("Banked TPE: " + banked);
    $('#tpeEarn').html("Earned TPE: " + tpeEarned);
    tpeToSpend = banked + tpeEarned;
    $('#tpeToUse').html("TPE to Spend: " + tpeToSpend);
    
    $('#stat1').html(moveVsLHB);
    $('#stat2').html(moveVsRHB);
    $('#stat3').html(babipVsLHB);
    $('#stat4').html(babipVsRHB);
    $('#stat5').html(conVsLHB);
    $('#stat6').html(conVsRHB);
    $('#stat7').html(stamina);
    $('#stat8').html(holdRun);
    $('#stat9').html(pitch1);
    $('#stat10').html(pitch2);
    $('#stat11').html(pitch3);
    $('#stat12').html(pitch4);
    $('#stat13').html(pitch5);
    $('#stat14').html(gbPer);
    $('#statName9').html(pitch1Name);
    $('#statName10').html(pitch2Name);
    $('#statName11').html(pitch3Name);
    $('#statName12').html(pitch4Name);
    $('#statName13').html(pitch5Name);
    $('#stat15').html(velo);
    
	for(var goThrough = 1; goThrough < mins.length ; goThrough++){
		$('#minStat' + goThrough).html(mins[goThrough]);
		$('#maxStat' + goThrough).html(max[goThrough]);
	}
	$('#minStat15').html(mins[0]);
	$('#maxStat15').html(max[0]);
	
    $('#newStat1').attr({min: mins[1],max: max[1],value: moveVsLHB});
    $('#newStat2').attr({min: mins[2],max: max[2],value: moveVsRHB});
    $('#newStat3').attr({min: mins[3],max: max[3],value: babipVsLHB});
    $('#newStat4').attr({min: mins[4],max: max[4],value: babipVsRHB});

	
    $('#newStat5').attr({min: mins[3],max: max[3],value: conVsLHB});
    $('#newStat6').attr({min: mins[4],max: max[4],value: conVsRHB});
    $('#newStat7').attr({min: mins[5],max: max[5],value: stamina});
    $('#newStat8').attr({min: mins[6],max: max[6],value: holdRun});
    $('#newStat9').attr({min: mins[7],max: max[7],value: pitch1});
    $('#newStat10').attr({min: mins[8],max: max[8],value: pitch2});
    $('#newStat11').attr({min: mins[9],max: max[9],value: pitch3});
    $('#newStat12').attr({min: mins[10],max: max[10],value: pitch4});
    $('#newStat13').attr({min: mins[11],max: max[11],value: pitch5});
    $('#newStat14').attr({min: mins[12],max: max[12], value: gbPer});
    var currentPitchLocation;
    for(var c = 0;c<=pitchingLevels.length;c++){
        if($('#stat15').html().trim().localeCompare(pitchingLevels[c]) == 0){
            currentPitchLocation = c;
        }
    }
    if(typeof currentPitchLocation === 'undefined'){
        for(var z = 0;z<pitchingLevels.length;z++){
            var str = pitchingLevels[z];
            str = str.replace(/\s/g, '');
            if($('#stat15').html().trim().localeCompare(str) == 0){
                currentPitchLocation = z;
            }
        }
    }
    var selectedVelo = '#velo' + currentPitchLocation;
    $(selectedVelo).attr("selected","selected");
	pitchesBought = 0;
	if(pitch4>0){
		pitchesBought += 50;
	}
	if(pitch5>0){
		pitchesBought += 50;
	}
    //calls tpespent.js
    updateTPESpent();
}

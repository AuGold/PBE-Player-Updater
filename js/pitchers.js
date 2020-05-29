//declare global variables

var banked;
var pitchArch;
var velo;
var moveVsLHB;
var moveVsRHB;
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
var pitchesBought = 0;
var mins=[];
var max=[];
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
    	        n = longString.search('TPE Available: ');
	            banked = parseInt(longString.substring(n+"TPE Available: ".length,n+"TPE Available: ".length+3));
    	        if(isNaN(banked)){
    	            banked = 0;
    	        }
    	    }
    	}
	}
	if(!isNaN(banked)){
	    $('#error').html("");
	    $('#putBNK').html("Banked: " + banked);
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

	var minVeloStr = str.substring(indices[0]+4,indices[0]+13);
	minVeloStr = minVeloStr.replace(')','');
	min.push(minVeloStr);

	for(var uses = 1 ; uses < indices.length ; uses++){
		var number = parseInt(str.substring(indices[uses]+4,indices[uses]+7));
		mins.push(number);
	}
	
	toSearch = "MAX:";
	indices = [];
    for(var pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
        indices.push(pos);
    }
	
	var maxVeloStr = str.substring(indices[0]+4,indices[0]+13);
	maxVeloStr = maxVeloStr.replace(')','');
	max.push(maxVeloStr);

	for(var uses = 1 ; uses < indices.length ; uses++){
		var number = parseInt(str.substring(indices[uses]+4,indices[uses]+7));
		max.push(number);
	}
	
}

//Function designed to pull pitching archetype from the string in getStats()
//Also gets pitches and in the order that user has selected them

function getStatsPitcher(postGET){
    var n = postGET.search("Archetype: ");
    var splitPitchArch = postGET.slice(n);
    var newN = splitPitchArch.indexOf("(eg");
    if(n==-1){
        n = postGET.search("Archetype:</b> ");
        splitPitchArch = postGET.slice(n);
        newN = splitPitchArch.indexOf("(eg");
    }
    if(newN==-1){
        newN = splitPitchArch.indexOf("<br");
    }
    pitchArch = splitPitchArch.substring("Archetype:".length,newN);
	$('#putPAR').html("Pitching Archetype: " + pitchArch);
    
    n = postGET.search('Velocity: ');
    var splitVelocity = postGET.slice(n);
    newN = splitVelocity.indexOf("<br");
	velo = splitVelocity.substring("Velocity:".length,newN);
	$('#putVEL').html("Velocity: " + velo);
		     
	n = postGET.search("Movement vs. LHB: ");
	moveVsLHB = parseInt(postGET.substring(n+"Movement vs. LHB: ".length,n+"Movement vs. LHB: ".length+3));
	if(n==-1){
	    n = postGET.search("Movement vs LHB: ");
	    moveVsLHB = parseInt(postGET.substring(n+"Movement vs LHB: ".length,n+"Movement vs LHB: ".length+3));
	}
	$('#putMVL').html("Movement vs LHB: " + moveVsLHB);
		     
	n = postGET.search("Movement vs. RHB: ");
	moveVsRHB = parseInt(postGET.substring(n+"Movement vs. RHB: ".length,n+"Movement vs RHB: ".length+3));
	if(n==-1){
	    n = postGET.search("Movement vs RHB: ");
	    moveVsRHB = parseInt(postGET.substring(n+"Movement vs RHB: ".length,n+"Movement vs RHB: ".length+3));
	}
	$('#putMVR').html("Movement vs RHB: " + moveVsRHB);
		     
	n = postGET.search("Control vs. LHB: ");
	conVsLHB = parseInt(postGET.substring(n+"Control vs. LHB: ".length,n+"Control vs. LHB: ".length+3));
	if(n==-1){
	    n = postGET.search("Control vs LHB: ");
	    conVsLHB = parseInt(postGET.substring(n+"Control vs LHB: ".length,n+"Control vs LHB: ".length+3));
	}
	$('#putCVL').html("Control vs LHB: " + conVsLHB);
		     
	n = postGET.search("Control vs. RHB: ");
	conVsRHB = parseInt(postGET.substring(n+"Control vs. RHB: ".length,n+"Control vs RHB: ".length+3));
	if(n==-1){
	    n = postGET.search("Control vs RHB: ");
	    moveVsRHB = parseInt(postGET.substring(n+"Control vs RHB: ".length,n+"Control vs RHB: ".length+3));
	}
	$('#putCVR').html("Control vs RHB: " + conVsRHB);
	
	n = postGET.search("Stamina: ");
	stamina = parseInt(postGET.substring(n+"Stamina: ".length,n+"Stamina: ".length+3));
	$('#putSTA').html("Stamina: " + stamina);
	
	n = postGET.search("Holding Runners: ");
	holdRun = parseInt(postGET.substring(n+"Holding Runners: ".length,n+"Holding Runners: ".length+3));
	$('#putHRN').html("Holding Runners: " + holdRun);
	
	n = postGET.search("Pitch 1: ");
	pitch1 = parseInt(postGET.substring(n+"Pitch 1: ".length,n+"Pitch 1: ".length+3));
	
	n = postGET.search("Pitch 2: ");
	pitch2 = parseInt(postGET.substring(n+"Pitch 2: ".length,n+"Pitch 2: ".length+3));
	
	n = postGET.search("Pitch 3: ");
	pitch3 = parseInt(postGET.substring(n+"Pitch 3: ".length,n+"Pitch 3: ".length+3));
	
	n = postGET.search("Pitch 4: ");
	pitch4 = parseInt(postGET.substring(n+"Pitch 4: ".length,n+"Pitch 4: ".length+3));
	
	n = postGET.search("Pitch 5: ");
	pitch5 = parseInt(postGET.substring(n+"Pitch 5: ".length,n+"Pitch 5: ".length+3));
	
	$('#putPI5').html("Pitch 5: " + pitch5);
	$('#putPI1').html("Pitch 1: " + pitch1);
	$('#putPI2').html("Pitch 2: " + pitch2);
	$('#putPI3').html("Pitch 3: " + pitch3);
	$('#putPI4').html("Pitch 4: " + pitch4);
	
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
//EDIT THIS SECTION IF ARCHETYPE MINS/MAXS ARE CHANGED
//Also used to determine if a user has purchased a pitch in the past (add 50 tpe)

function fillStats(){
    
    $('#bankedTPE').html("Banked TPE: " + banked);
    $('#tpeEarn').html("Earned TPE: " + tpeEarned);
    tpeToSpend = banked + tpeEarned;
    $('#tpeToUse').html("TPE to Spend: " + tpeToSpend);
    
    $('#stat1').html(moveVsLHB);
    $('#stat2').html(moveVsRHB);
    $('#stat3').html(conVsLHB);
    $('#stat4').html(conVsRHB);
    $('#stat5').html(stamina);
    $('#stat6').html(holdRun);
    $('#stat7').html(pitch1);
    $('#stat8').html(pitch2);
    $('#stat9').html(pitch3);
    $('#stat10').html(pitch4);
    $('#stat11').html(pitch5);
    $('#stat12').html(velo);
    $('#statName7').html(pitch1Name);
    $('#statName8').html(pitch2Name);
    $('#statName9').html(pitch3Name);
    $('#statName10').html(pitch4Name);
    $('#statName11').html(pitch5Name);
    
    /*if(pitchArch.includes("Relief Power Pitcher")){
        $('#minStat1').html("50");
        $('#minStat2').html("50");
        $('#minStat3').html("40");
        $('#minStat4').html("40");
        $('#minStat5').html("10");
        $('#minStat6').html("40");
        $('#minStat7').html("50");
        $('#minStat8').html("40");
        $('#minStat9').html("40");
        $('#minStat10').html("40");
        $('#minStat11').html("40");
        $('#minStat12').html("92 - 94");
        $('#maxStat1').html("95");
        $('#maxStat2').html("95");
        $('#maxStat3').html("65");
        $('#maxStat4').html("65");
        $('#maxStat5').html("30");
        $('#maxStat6').html("90");
        $('#maxStat7').html("100");
        $('#maxStat8').html("85");
        $('#maxStat9').html("80");
        $('#maxStat10').html("70");
        $('#maxStat11').html("60");
        $('#maxStat12').html("100");
        $('#newStat1').attr({min: 50,max: 95,value: moveVsLHB});
        $('#newStat2').attr({min: 50,max: 95,value: moveVsRHB});
        $('#newStat3').attr({min: 40,max: 65,value: conVsLHB});
        $('#newStat4').attr({min: 40,max: 65,value: conVsRHB});
        $('#newStat5').attr({min: 10,max: 30,value: stamina});
        $('#newStat6').attr({min: 40,max: 90,value: holdRun});
        $('#newStat7').attr({min: 50,max: 100,value: pitch1});
        $('#newStat8').attr({min: 40,max: 85,value: pitch2});
        $('#newStat9').attr({min: 40,max: 80,value: pitch3});
        $('#newStat10').attr({min: 40,max: 70,value: pitch4});
        $('#newStat11').attr({min: 50,max: 60,value: pitch5});
        var currentPitchLocation;
        for(var c = 0;c<=pitchingLevels.length;c++){
                if($('#stat12').html().trim().localeCompare(pitchingLevels[c]) == 0){
                    currentPitchLocation = c;
                }
            }
        if(typeof currentPitchLocation === 'undefined'){
            for(var z = 0;z<pitchingLevels.length;z++){
                var str = pitchingLevels[z];
                str = str.replace(/\s/g, '');
                if($('#stat12').html().trim().localeCompare(str) == 0){
                    currentPitchLocation = z;
                }
            }
        }
        var selectedVelo = '#velo' + currentPitchLocation;
        $(selectedVelo).attr("selected","selected");
        if(pitch4>0){
            pitchesBought += 50;
        }
        if(pitch5>0){
            pitchesBought += 50;
        }
    }
    else if(pitchArch.includes("Relief Balanced Pitcher")){
        $('#minStat1').html("50");
        $('#minStat2').html("50");
        $('#minStat3').html("50");
        $('#minStat4').html("50");
        $('#minStat5').html("10");
        $('#minStat6').html("40");
        $('#minStat7').html("50");
        $('#minStat8').html("45");
        $('#minStat9').html("40");
        $('#minStat10').html("40");
        $('#minStat11').html("40");
        $('#minStat12').html("91 - 93");
        $('#maxStat1').html("95");
        $('#maxStat2').html("95");
        $('#maxStat3').html("90");
        $('#maxStat4').html("90");
        $('#maxStat5').html("30");
        $('#maxStat6').html("90");
        $('#maxStat7').html("100");
        $('#maxStat8').html("85");
        $('#maxStat9').html("80");
        $('#maxStat10').html("70");
        $('#maxStat11').html("60");
        $('#maxStat12').html("96 - 98");
        $('#newStat1').attr({min: 50,max: 95,value: moveVsLHB});
        $('#newStat2').attr({min: 50,max: 95,value: moveVsRHB});
        $('#newStat3').attr({min: 50,max: 90,value: conVsLHB});
        $('#newStat4').attr({min: 50,max: 90,value: conVsRHB});
        $('#newStat5').attr({min: 10,max: 30,value: stamina});
        $('#newStat6').attr({min: 40,max: 90,value: holdRun});
        $('#newStat7').attr({min: 50,max: 100,value: pitch1});
        $('#newStat8').attr({min: 45,max: 85,value: pitch2});
        $('#newStat9').attr({min: 40,max: 80,value: pitch3});
        $('#newStat10').attr({min: 40,max: 70,value: pitch4});
        $('#newStat11').attr({min: 40,max: 60,value: pitch5});
        var currentPitchLocation;
        for(var c = 0;c<=pitchingLevels.length;c++){
                if($('#stat12').html().trim().localeCompare(pitchingLevels[c]) == 0){
                    currentPitchLocation = c;
                }
            }
        if(typeof currentPitchLocation === 'undefined'){
            for(var z = 0;z<pitchingLevels.length;z++){
                var str = pitchingLevels[z];
                str = str.replace(/\s/g, '');
                if($('#stat12').html().trim().localeCompare(str) == 0){
                    currentPitchLocation = z;
                }
            }
        }
        var selectedVelo = '#velo' + currentPitchLocation;
        $(selectedVelo).attr("selected","selected");
        if(pitch4>0){
            pitchesBought += 50;
        }
        if(pitch5>0){
            pitchesBought += 50;
        }
    }
    else if(pitchArch.includes("Relief Finesse Pitcher") || pitchArch.includes("Finesse CL")){
        $('#minStat1').html("50");
        $('#minStat2').html("50");
        $('#minStat3').html("45");
        $('#minStat4').html("45");
        $('#minStat5').html("10");
        $('#minStat6').html("45");
        $('#minStat7').html("60");
        $('#minStat8').html("50");
        $('#minStat9').html("50");
        $('#minStat10').html("40");
        $('#minStat11').html("40");
        $('#minStat12').html("90 - 92");
        $('#maxStat1').html("95");
        $('#maxStat2').html("95");
        $('#maxStat3').html("80");
        $('#maxStat4').html("80");
        $('#maxStat5').html("30");
        $('#maxStat6').html("90");
        $('#maxStat7').html("100");
        $('#maxStat8').html("95");
        $('#maxStat9').html("95");
        $('#maxStat10').html("80");
        $('#maxStat11').html("75");
        $('#maxStat12').html("93 - 95");
        $('#newStat1').attr({min: parseInt($('#minStat1').html()),max: parseInt($('#maxStat1').html()),value: moveVsLHB});
        $('#newStat2').attr({min: parseInt($('#minStat2').html()),max: parseInt($('#maxStat2').html()),value: moveVsRHB});
        $('#newStat3').attr({min: parseInt($('#minStat3').html()),max: parseInt($('#maxStat3').html()),value: conVsLHB});
        $('#newStat4').attr({min: parseInt($('#minStat4').html()),max: parseInt($('#maxStat4').html()),value: conVsRHB});
        $('#newStat5').attr({min: parseInt($('#minStat5').html()),max: parseInt($('#maxStat5').html()),value: stamina});
        $('#newStat6').attr({min: parseInt($('#minStat6').html()),max: parseInt($('#maxStat6').html()),value: holdRun});
        $('#newStat7').attr({min: parseInt($('#minStat7').html()),max: parseInt($('#maxStat7').html()),value: pitch1});
        $('#newStat8').attr({min: parseInt($('#minStat8').html()),max: parseInt($('#maxStat8').html()),value: pitch2});
        $('#newStat9').attr({min: parseInt($('#minStat9').html()),max: parseInt($('#maxStat9').html()),value: pitch3});
        $('#newStat10').attr({min: parseInt($('#minStat10').html()),max: parseInt($('#maxStat10').html()),value: pitch4});
        $('#newStat11').attr({min: parseInt($('#minStat11').html()),max: parseInt($('#maxStat11').html()),value: pitch5});
        var currentPitchLocation;
        for(var c = 0;c<=pitchingLevels.length;c++){
                if($('#stat12').html().trim().localeCompare(pitchingLevels[c]) == 0){
                    currentPitchLocation = c;
                }
            }
        if(typeof currentPitchLocation === 'undefined'){
            for(var z = 0;z<pitchingLevels.length;z++){
                var str = pitchingLevels[z];
                str = str.replace(/\s/g, '');
                if($('#stat12').html().trim().localeCompare(str) == 0){
                    currentPitchLocation = z;
                }
            }
        }
        var selectedVelo = '#velo' + currentPitchLocation;
        $(selectedVelo).attr("selected","selected");
        if(pitch4>0){
            pitchesBought += 50;
        }
        if(pitch5>0){
            pitchesBought += 50;
        }
    }
    else if(pitchArch.includes("Starting Power Pitcher") || pitchArch.includes("Power SP")){
        $('#minStat1').html("30");
        $('#minStat2').html("30");
        $('#minStat3').html("30");
        $('#minStat4').html("30");
        $('#minStat5').html("50");
        $('#minStat6').html("40");
        $('#minStat7').html("50");
        $('#minStat8').html("30");
        $('#minStat9').html("30");
        $('#minStat10').html("40");
        $('#minStat11').html("40");
        $('#minStat12').html("90 - 92");
        $('#maxStat1').html("90");
        $('#maxStat2').html("90");
        $('#maxStat3').html("80");
        $('#maxStat4').html("80");
        $('#maxStat5').html("75");
        $('#maxStat6').html("85");
        $('#maxStat7').html("90");
        $('#maxStat8').html("80");
        $('#maxStat9').html("75");
        $('#maxStat10').html("70");
        $('#maxStat11').html("60");
        $('#maxStat12').html("98 - 100");
        $('#newStat1').attr({min: parseInt($('#minStat1').html()),max: parseInt($('#maxStat1').html()),value: moveVsLHB});
        $('#newStat2').attr({min: parseInt($('#minStat2').html()),max: parseInt($('#maxStat2').html()),value: moveVsRHB});
        $('#newStat3').attr({min: parseInt($('#minStat3').html()),max: parseInt($('#maxStat3').html()),value: conVsLHB});
        $('#newStat4').attr({min: parseInt($('#minStat4').html()),max: parseInt($('#maxStat4').html()),value: conVsRHB});
        $('#newStat5').attr({min: parseInt($('#minStat5').html()),max: parseInt($('#maxStat5').html()),value: stamina});
        $('#newStat6').attr({min: parseInt($('#minStat6').html()),max: parseInt($('#maxStat6').html()),value: holdRun});
        $('#newStat7').attr({min: parseInt($('#minStat7').html()),max: parseInt($('#maxStat7').html()),value: pitch1});
        $('#newStat8').attr({min: parseInt($('#minStat8').html()),max: parseInt($('#maxStat8').html()),value: pitch2});
        $('#newStat9').attr({min: parseInt($('#minStat9').html()),max: parseInt($('#maxStat9').html()),value: pitch3});
        $('#newStat10').attr({min: parseInt($('#minStat10').html()),max: parseInt($('#maxStat10').html()),value: pitch4});
        $('#newStat11').attr({min: parseInt($('#minStat11').html()),max: parseInt($('#maxStat11').html()),value: pitch5});
        var currentPitchLocation;
        for(var c = 0;c<=pitchingLevels.length;c++){
                if($('#stat12').html().trim().localeCompare(pitchingLevels[c]) == 0){
                    currentPitchLocation = c;
                }
            }
        if(typeof currentPitchLocation === 'undefined'){
            for(var z = 0;z<pitchingLevels.length;z++){
                var str = pitchingLevels[z];
                str = str.replace(/\s/g, '');
                if($('#stat12').html().trim().localeCompare(str) == 0){
                    currentPitchLocation = z;
                }
            }
        }
        var selectedVelo = '#velo' + currentPitchLocation;
        $(selectedVelo).attr("selected","selected");
        if(pitch4>0){
            pitchesBought += 50;
        }
        if(pitch5>0){
            pitchesBought += 50;
        }
    }
    else if(pitchArch.includes("Starting Finesse Pitcher")){
        $('#minStat1').html("40");
        $('#minStat2').html("40");
        $('#minStat3').html("40");
        $('#minStat4').html("40");
        $('#minStat5').html("50");
        $('#minStat6').html("40");
        $('#minStat7').html("50");
        $('#minStat8').html("45");
        $('#minStat9').html("45");
        $('#minStat10').html("40");
        $('#minStat11').html("40");
        $('#minStat12').html("88 - 90");
        $('#maxStat1').html("90");
        $('#maxStat2').html("90");
        $('#maxStat3').html("85");
        $('#maxStat4').html("85");
        $('#maxStat5').html("75");
        $('#maxStat6').html("85");
        $('#maxStat7').html("95");
        $('#maxStat8').html("90");
        $('#maxStat9').html("90");
        $('#maxStat10').html("80");
        $('#maxStat11').html("70");
        $('#maxStat12').html("92 - 94");
        $('#newStat1').attr({min: parseInt($('#minStat1').html()),max: parseInt($('#maxStat1').html()),value: moveVsLHB});
        $('#newStat2').attr({min: parseInt($('#minStat2').html()),max: parseInt($('#maxStat2').html()),value: moveVsRHB});
        $('#newStat3').attr({min: parseInt($('#minStat3').html()),max: parseInt($('#maxStat3').html()),value: conVsLHB});
        $('#newStat4').attr({min: parseInt($('#minStat4').html()),max: parseInt($('#maxStat4').html()),value: conVsRHB});
        $('#newStat5').attr({min: parseInt($('#minStat5').html()),max: parseInt($('#maxStat5').html()),value: stamina});
        $('#newStat6').attr({min: parseInt($('#minStat6').html()),max: parseInt($('#maxStat6').html()),value: holdRun});
        $('#newStat7').attr({min: parseInt($('#minStat7').html()),max: parseInt($('#maxStat7').html()),value: pitch1});
        $('#newStat8').attr({min: parseInt($('#minStat8').html()),max: parseInt($('#maxStat8').html()),value: pitch2});
        $('#newStat9').attr({min: parseInt($('#minStat9').html()),max: parseInt($('#maxStat9').html()),value: pitch3});
        $('#newStat10').attr({min: parseInt($('#minStat10').html()),max: parseInt($('#maxStat10').html()),value: pitch4});
        $('#newStat11').attr({min: parseInt($('#minStat11').html()),max: parseInt($('#maxStat11').html()),value: pitch5});
        var currentPitchLocation;
        for(var c = 0;c<=pitchingLevels.length;c++){
                if($('#stat12').html().trim().localeCompare(pitchingLevels[c]) == 0){
                    currentPitchLocation = c;
                }
            }
        if(typeof currentPitchLocation === 'undefined'){
            for(var z = 0;z<pitchingLevels.length;z++){
                var str = pitchingLevels[z];
                str = str.replace(/\s/g, '');
                if($('#stat12').html().trim().localeCompare(str) == 0){
                    currentPitchLocation = z;
                }
            }
        }
        var selectedVelo = '#velo' + currentPitchLocation;
        $(selectedVelo).attr("selected","selected");
        if(pitch4>0){
            pitchesBought += 50;
        }
        if(pitch5>0){
            pitchesBought += 50;
        }
    }
    else if(pitchArch.includes("Starting Knuckleball Pitcher") || pitchArch.includes("Knuckleball")){
        $('#minStat1').html("30");
        $('#minStat2').html("30");
        $('#minStat3').html("35");
        $('#minStat4').html("35");
        $('#minStat5').html("20");
        $('#minStat6').html("30");
        $('#minStat7').html("50");
        $('#minStat8').html("30");
        $('#minStat9').html("30");
        $('#minStat10').html("40");
        $('#minStat11').html("40");
        $('#minStat12').html("80 - 83");
        $('#maxStat1').html("90");
        $('#maxStat2').html("90");
        $('#maxStat3').html("85");
        $('#maxStat4').html("85");
        $('#maxStat5').html("70");
        $('#maxStat6').html("85");
        $('#maxStat7').html("90");
        $('#maxStat8').html("75");
        $('#maxStat9').html("90");
        $('#maxStat10').html("70");
        $('#maxStat11').html("60");
        $('#maxStat12').html("91 - 93");
        $('#newStat1').attr({min: parseInt($('#minStat1').html()),max: parseInt($('#maxStat1').html()),value: moveVsLHB});
        $('#newStat2').attr({min: parseInt($('#minStat2').html()),max: parseInt($('#maxStat2').html()),value: moveVsRHB});
        $('#newStat3').attr({min: parseInt($('#minStat3').html()),max: parseInt($('#maxStat3').html()),value: conVsLHB});
        $('#newStat4').attr({min: parseInt($('#minStat4').html()),max: parseInt($('#maxStat4').html()),value: conVsRHB});
        $('#newStat5').attr({min: parseInt($('#minStat5').html()),max: parseInt($('#maxStat5').html()),value: stamina});
        $('#newStat6').attr({min: parseInt($('#minStat6').html()),max: parseInt($('#maxStat6').html()),value: holdRun});
        $('#newStat7').attr({min: parseInt($('#minStat7').html()),max: parseInt($('#maxStat7').html()),value: pitch1});
        $('#newStat8').attr({min: parseInt($('#minStat8').html()),max: parseInt($('#maxStat8').html()),value: pitch2});
        $('#newStat9').attr({min: parseInt($('#minStat9').html()),max: parseInt($('#maxStat9').html()),value: pitch3});
        $('#newStat10').attr({min: parseInt($('#minStat10').html()),max: parseInt($('#maxStat10').html()),value: pitch4});
        $('#newStat11').attr({min: parseInt($('#minStat11').html()),max: parseInt($('#maxStat11').html()),value: pitch5});
        var currentPitchLocation;
        for(var c = 0;c<=pitchingLevels.length;c++){
                if($('#stat12').html().trim().localeCompare(pitchingLevels[c]) == 0){
                    currentPitchLocation = c;
                }
            }
        if(typeof currentPitchLocation === 'undefined'){
            for(var z = 0;z<pitchingLevels.length;z++){
                var str = pitchingLevels[z];
                str = str.replace(/\s/g, '');
                if($('#stat12').html().trim().localeCompare(str) == 0){
                    currentPitchLocation = z;
                }
            }
        }
        var selectedVelo = '#velo' + currentPitchLocation;
        $(selectedVelo).attr("selected","selected");
        if(pitch5>0){
            pitchesBought += 50;
        }
    }
    else if(pitchArch.includes("Starting Balanced Pitcher") || pitchArch.includes("Balanced SP")){
        $('#minStat1').html("40");
        $('#minStat2').html("40");
        $('#minStat3').html("40");
        $('#minStat4').html("40");
        $('#minStat5').html("50");
        $('#minStat6').html("40");
        $('#minStat7').html("45");
        $('#minStat8').html("40");
        $('#minStat9').html("40");
        $('#minStat10').html("40");
        $('#minStat11').html("40");
        $('#minStat12').html("89 - 91");
        $('#maxStat1').html("90");
        $('#maxStat2').html("90");
        $('#maxStat3').html("95");
        $('#maxStat4').html("95");
        $('#maxStat5').html("75");
        $('#maxStat6').html("85");
        $('#maxStat7').html("90");
        $('#maxStat8').html("80");
        $('#maxStat9').html("75");
        $('#maxStat10').html("70");
        $('#maxStat11').html("60");
        $('#maxStat12').html("95 - 97");
        $('#newStat1').attr({min: parseInt($('#minStat1').html()),max: parseInt($('#maxStat1').html()),value: moveVsLHB});
        $('#newStat2').attr({min: parseInt($('#minStat2').html()),max: parseInt($('#maxStat2').html()),value: moveVsRHB});
        $('#newStat3').attr({min: parseInt($('#minStat3').html()),max: parseInt($('#maxStat3').html()),value: conVsLHB});
        $('#newStat4').attr({min: parseInt($('#minStat4').html()),max: parseInt($('#maxStat4').html()),value: conVsRHB});
        $('#newStat5').attr({min: parseInt($('#minStat5').html()),max: parseInt($('#maxStat5').html()),value: stamina});
        $('#newStat6').attr({min: parseInt($('#minStat6').html()),max: parseInt($('#maxStat6').html()),value: holdRun});
        $('#newStat7').attr({min: parseInt($('#minStat7').html()),max: parseInt($('#maxStat7').html()),value: pitch1});
        $('#newStat8').attr({min: parseInt($('#minStat8').html()),max: parseInt($('#maxStat8').html()),value: pitch2});
        $('#newStat9').attr({min: parseInt($('#minStat9').html()),max: parseInt($('#maxStat9').html()),value: pitch3});
        $('#newStat10').attr({min: parseInt($('#minStat10').html()),max: parseInt($('#maxStat10').html()),value: pitch4});
        $('#newStat11').attr({min: parseInt($('#minStat11').html()),max: parseInt($('#maxStat11').html()),value: pitch5});
        var currentPitchLocation;
        for(var c = 0;c<=pitchingLevels.length;c++){
                if($('#stat12').html().trim().localeCompare(pitchingLevels[c]) == 0){
                    currentPitchLocation = c;
                }
            }
        if(typeof currentPitchLocation === 'undefined'){
            for(var z = 0;z<pitchingLevels.length;z++){
                var str = pitchingLevels[z];
                str = str.replace(/\s/g, '');
                if($('#stat12').html().trim().localeCompare(str) == 0){
                    currentPitchLocation = z;
                }
            }
        }
        var selectedVelo = '#velo' + currentPitchLocation;
        $(selectedVelo).attr("selected","selected");
        if(pitch4>0){
            pitchesBought += 50;
        }
        if(pitch5>0){
            pitchesBought += 50;
        }
    }
    else{
        $('#error2').html("There appears to be something wrong with your archetype import. Contact AuGold on Discord for assistance.")
        
    }*/
	
	for(var goThrough = 0; goThrough < mins.length ; goThrough++){
		var goThroughOne = goThrough + 1;
		$('#minStat' + goThroughOne).html(mins[goThrough]);
		$('#maxStat' + goThroughOne).html(max[goThrough]);
	}
	$('#newStat1').attr({min: mins[0],max: max[0],value: moveVsLHB});
    $('#newStat2').attr({min: mins[1],max: max[1],value: moveVsRHB});
    $('#newStat3').attr({min: mins[2],max: max[2],value: conVsLHB});
    $('#newStat4').attr({min: mins[3],max: max[3],value: conVsRHB});
    $('#newStat5').attr({min: mins[4],max: max[4],value: stamina});
    $('#newStat6').attr({min: mins[5],max: max[5],value: holdRun});
    $('#newStat7').attr({min: mins[6],max: max[6],value: pitch1});
    $('#newStat8').attr({min: mins[7],max: max[7],value: pitch2});
    $('#newStat9').attr({min: mins[8],max: max[8],value: pitch3});
    $('#newStat10').attr({min: mins[9],max: max[9],value: pitch4});
    $('#newStat11').attr({min: mins[10],max: max[10],value: pitch5});
	var currentPitchLocation;
    for(var c = 0;c<=pitchingLevels.length;c++){
            if($('#stat12').html().trim().localeCompare(pitchingLevels[c]) == 0){
                currentPitchLocation = c;
            }
        }
    if(typeof currentPitchLocation === 'undefined'){
        for(var z = 0;z<pitchingLevels.length;z++){
            var str = pitchingLevels[z];
            str = str.replace(/\s/g, '');
            if($('#stat12').html().trim().localeCompare(str) == 0){
                currentPitchLocation = z;
            }
        }
    }
    var selectedVelo = '#velo' + currentPitchLocation;
    $(selectedVelo).attr("selected","selected");
    if(pitchArch.includes("Starting Knuckleball Pitcher") || pitchArch.includes("Knuckleball")){
		if(pitch5>0){
			pitchesBought += 50;
		}
	}
	else{
		if(pitch4>0){
			pitchesBought += 50;
		}
		if(pitch5>0){
			pitchesBought += 50;
		}
	}
    //calls tpespent.js
    updateTPESpent();
}
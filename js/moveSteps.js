//all functions slide the screen down to the steps the user will be moving onto

function stepTwo(){
    $('.step2').css("display","block");
    $('.step2').show().animate({opacity: 1},1000);
    $(document).scrollTo('.step2',1000);
	var d = new Date();
	d.setTime(d.getTime() + (14 * 24 * 60 * 60 * 1000));
	document.cookie = "rosterPage="+document.getElementById("link").value + ";expires=" + d.toUTCString();
}

function stepThree(){
    $('.step3').css("display","block");
    $('.step3').animate({opacity: 1},1000);
    $(document).scrollTo('.step3',1000);
	//fillStats();
}

function stepFive(){
    $('.step5').css("display","block");
    $('.step5').animate({opacity: 1},1000);
    $(document).scrollTo('.step5',1000);
	var tpeCheck = $("#tpeToUse").html().search("-");
	if(tpeCheck > 0){
		$("#outCode").html("");
		$("#outputGained").html("");
		$("#outputUpdate").html("");
		$("#outputSpent").html("");
		$("#outputBanked").html("");
		$("#outputUsed").html("");
		$("#outputTotal").html("");
		$("#outCode").html("You have tried updating with more TPE to use than you own! Please try again!");
	}
	else{
		//calls tpespent.js
		getUpdate();
	}
}

function stepFour(){
    tpeEarned = parseInt($('#tpeEarnedLinks').html());
	if(tpeEarned == 0){
		tpeEarned = parseInt($('#tpeEarned').val());
	}
    $('.step4').css("display","block");
    $('.step4').animate({opacity: 1},1000);
    $(document).scrollTo('.step4',1000);
    
    //calls batters.js or pitchers.js
    fillStats();
}

function showRow(idToShow,idToHide){
    $(idToShow).css("display","table-row");
    $(idToHide).css("display","none");
}

function makeVisible(classToShow, classToHide){
	$(classToShow).css("display","block");
	$(classToHide).css("display","none");
	$(document).scrollTo(classToShow,1000);
}

function getCookie(cname){
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
		  c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
		  return c.substring(name.length, c.length);
		}
	}
	return "";
}

function cookiePlace() {
  var linkPage=getCookie("rosterPage");
  if (linkPage != "") {
    document.getElementById("link").value = linkPage
  }
}

//all functions slide the screen down to the steps the user will be moving onto

function stepTwo(){
    $('.step2').css("display","block");
    $('.step2').show().animate({opacity: 1},1000);
    $(document).scrollTo('.step2',1000);
}

function stepThree(){
    $('.step3').css("display","block");
    $('.step3').animate({opacity: 1},1000);
    $(document).scrollTo('.step3',1000);
}

function stepFive(){
    $('.step5').css("display","block");
    $('.step5').animate({opacity: 1},1000);
    $(document).scrollTo('.step5',1000);
	var tpeCheck = $("#tpeToUse").html().match(/\d+/)[0];
	if(tpeCheck < 0){
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
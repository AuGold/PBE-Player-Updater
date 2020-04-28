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
    //calls tpespent.js
    getUpdate();
}

function stepFour(){
    tpeEarned = parseInt($('#tpeEarned').html());
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
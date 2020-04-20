function getUpdate(){
    var outputGained = $("#tpeEarn").html().match(/\d+/)[0];
    var outputTotal = $("#totalTPE").html().match(/\d+/)[0];
    var outputBanked = $("#tpeToUse").html().match(/\d+/)[0];
    var outputSpent = 0;
    var outputUsed = $("#tpeUsed").html().match(/\d+/)[0];
    var oldTotalTPE = outputTotal - tpeEarned;
    var oldTPEUsed = 0;
    
    var tpeSpendingValue = 0;
    var tpeSpentValue = 0;
    var newtpespent = 0;
    
    var updatedStatBlock = "";
    
    var tableRows = document.getElementById("countTable").rows.length;
    
    for(var p=1;p<tableRows;p++){
        var tpeSpentVal = '#tpeSpent' + p;
        newtpeSpent = parseInt($(tpeSpentVal).html());
        outputSpent += newtpeSpent;
    }
    oldTPEUsed = outputTotal - outputBanked - outputSpent;
    
    for(var i=1;i<tableRows;i++){
        var stat = "#stat" + i;
        var newStat = "#newStat" + i;
        var statName = "#statName" + i;
        var tpeSpentVal = '#tpeSpent' + i;
        if(parseInt($(newStat).val()) != parseInt($(stat).html())){
            updatedStatBlock += $(statName).html() + " " + $(stat).html() + " -> " + $(newStat).val() + " (spent " + $(tpeSpentVal).html() + " TPE)<br/>";
        }
    }
    
    var bankedEarned = outputBanked - banked;
    var bankedEarnedText = "";
    if(bankedEarned > 0){
        bankedEarnedText = "(+" + bankedEarned + ")";
    }
    else if(bankedEarned < 0){
        bankedEarnedText = "(" + bankedEarned + ")";
    }
    else{
        bankedEarnedText = "";
    }
        
    $("#outputUpdate").html(updatedStatBlock);
    if(outputUsed == oldTPEUsed){
        $("#outputUsed").html("TPE Used: " + oldTPEUsed);
    }
    else{
        $("#outputUsed").html("TPE Used: " + oldTPEUsed + " -> " + outputUsed);
    }
    $("#outputGained").html("Total gained: " + outputGained);
    if(banked == outputBanked){
        $("#outputBanked").html("Banked TPE: " + banked);
    }
    else{
        $("#outputBanked").html("Banked TPE: " + banked + " -> " + outputBanked + " " + bankedEarnedText);
    }
    $("#outputSpent").html("TPE Spent: " + outputSpent);
    if(outputTotal == oldTotalTPE){
        $("#outputTotal").html("Total TPE: " + oldTotalTPE);
    }
    else{
        $("#outputTotal").html("Total TPE: " + oldTotalTPE + " -> " + outputTotal);
    }
}
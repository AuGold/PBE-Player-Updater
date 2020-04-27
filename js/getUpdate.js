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
    
    var codeBlock = "";
    var weeklyTrainingCheckbox = document.getElementById('WTCheck').checked;
    var activityCheckCheckbox = document.getElementById('ACCheck').checked;
    var pointTaskCheckbox = document.getElementById('PTCheck').checked;
    var journalPointTaskCheckbox = document.getElementById('JPTCheck').checked;
    var pictureChainCheckbox = document.getElementById('PCCheck').checked;
    var primetimeCheckbox = document.getElementById('PrimetimeCheck').checked;
    var other1Checkbox = document.getElementById('other1Check').checked;
    var other2Checkbox = document.getElementById('other2Check').checked;
    var other3Checkbox = document.getElementById('other3Check').checked;
    var other4Checkbox = document.getElementById('other4Check').checked;
    
    if(weeklyTrainingCheckbox == true){
        codeBlock += "URL=" + $("#WTLink").val() + "]WT #" + $("#WTNumber").val() + "[/URL] (+" + $("#WTTPE").val() + " TPE)\n";
    }
    if(activityCheckCheckbox == true){
        codeBlock += "URL=" + $("#ACLink").val() + "]AC #" + $("#ACNumber").val() + "[/URL] (+" + $("#ACTPE").val() + " TPE)\n";
    }
    if(pointTaskCheckbox == true){
        codeBlock += "URL=" + $("#PTLink").val() + "]PT " + $("#PTNumber").val() + "-" + $("#PTWeek").val() + "[/URL] (+" + $("#PTTPE").val() + " TPE)\n";
    }
    if(journalPointTaskCheckbox == true){
        codeBlock += "URL=" + $("#JPTLink").val() + "]PT " + $("#JPTNumber").val() + "-" + $("#JPTWeek").val() + "[/URL] (+" + $("#JPTTPE").val() + " TPE)\n";
    }
    if(pictureChainCheckbox == true){
        codeBlock += "URL=" + $("#PCLink").val() + "]PT " + $("#PCNumber").val() + "-" + $("#PCWeek").val() + "[/URL] (+" + $("#PCTPE").val() + " TPE)\n";
    }
    if(primetimeCheckbox == true){
        codeBlock += "URL=" + $("#PrimetimeLink").val() + "]PT " + $("#PrimetimeNumber").val() + "-" + $("#PrimetimeWeek").val() + "[/URL] (+" + $("#PrimetimeTPE").val() + " TPE)\n";
    }
    if(other1Checkbox == true){
        codeBlock += "URL=" + $("#other1Link").val() + "]" + $("#Other1Name").val() + "[/URL] (+" + $("#Other1TPE").val() + " TPE)\n";
    }
    if(other2Checkbox == true){
        codeBlock += "URL=" + $("#other2Link").val() + "]" + $("#Other2Name").val() + "[/URL] (+" + $("#Other2TPE").val() + " TPE)\n";
    }
    if(other3Checkbox == true){
        codeBlock += "URL=" + $("#other3Link").val() + "]" + $("#Other3Name").val() + "[/URL] (+" + $("#Other3TPE").val() + " TPE)\n";
    }
    if(other4Checkbox == true){
        codeBlock += "URL=" + $("#other4Link").val() + "]" + $("#Other4Name").val() + "[/URL] (+" + $("#Other4TPE").val() + " TPE)\n";
    }
            
    $("#outCode").html(codeBlock);
}
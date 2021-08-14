function getUpdate(){
    var outputGained = $("#tpeEarn").html().match(/-?\d+/g)[0];
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
	var regressionCheckbox = document.getElementById('RegressionCheck').checked;
    var other1Checkbox = document.getElementById('other1Check').checked;
    var other2Checkbox = document.getElementById('other2Check').checked;
    var other3Checkbox = document.getElementById('other3Check').checked;
    var other4Checkbox = document.getElementById('other4Check').checked;
	var other5Checkbox = document.getElementById('other5Check').checked;
    var other6Checkbox = document.getElementById('other6Check').checked;
    var other7Checkbox = document.getElementById('other7Check').checked;
    var other8Checkbox = document.getElementById('other8Check').checked;
	var other9Checkbox = document.getElementById('other9Check').checked;
    
    if(regressionCheckbox == true){
        codeBlock += "[color=red][b]" + $("#RegressionTPE").val() + " TPE[/b][/color] | [URL=" + $("#RegressionLink").val() + "]Regression S" + $("#RegressionNumber").val() + "[/URL]<br/>";
    }
	if(weeklyTrainingCheckbox == true){
        codeBlock += "[color=green][b]+" + $("#WTTPE").val() + " TPE[/b][/color] | [URL=" + $("#WTLink").val() + "]WT #" + $("#WTNumber").val() + "[/URL]<br/>";
    }
    if(activityCheckCheckbox == true){
        codeBlock += "[color=green][b]+" + $("#ACTPE").val() + " TPE[/b][/color] | [URL=" + $("#ACLink").val() + "]AC #" + $("#ACNumber").val() + "[/URL]<br/>";
    }
    if(pointTaskCheckbox == true){
        codeBlock += "[color=green][b]+" + $("#PTTPE").val() + " TPE[/b][/color] | [URL=" + $("#PTLink").val() + "]PT " + $("#PTNumber").val() + "-" + $("#PTWeek").val() + "[/URL]<br/>";
    }
    if(journalPointTaskCheckbox == true){
        codeBlock += "[color=green][b]+" + $("#JPTTPE").val() + " TPE[/b][/color] | [URL=" + $("#JPTLink").val() + "]JPT " + $("#JPTNumber").val() + "-" + $("#JPTWeek").val() + "[/URL]<br/>";
    }
    if(pictureChainCheckbox == true){
        codeBlock += "[color=green][b]+" + $("#PCTPE").val() + " TPE[/b][/color] | [URL=" + $("#PCLink").val() + "]Forum Game " + $("#PCNumber").val() + "-" + $("#PCWeek").val() + "[/URL]<br/>";
    }
    if(primetimeCheckbox == true){
        codeBlock += "[color=green][b]+" + $("#PrimetimeTPE").val() + " TPE[/b][/color] | [URL=" + $("#PrimetimeLink").val() + "]Primetime " + $("#PrimetimeNumber").val() + "-" + $("#PrimetimeWeek").val() + "[/URL]<br/>";
    }
    if(other1Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other1TPE").val() + " TPE[/b][/color] | [URL=" + $("#other1Link").val() + "]" + $("#other1Name").val() + "[/URL]<br/>";
    }
    if(other2Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other2TPE").val() + " TPE[/b][/color] | [URL=" + $("#other2Link").val() + "]" + $("#other2Name").val() + "[/URL]<br/>";
    }
    if(other3Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other3TPE").val() + " TPE[/b][/color] | [URL=" + $("#other3Link").val() + "]" + $("#other3Name").val() + "[/URL]<br/>";
    }
    if(other4Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other4TPE").val() + " TPE[/b][/color] | [URL=" + $("#other4Link").val() + "]" + $("#other4Name").val() + "[/URL]<br/>";
    }
	if(other5Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other5TPE").val() + " TPE[/b][/color] | [URL=" + $("#other5Link").val() + "]" + $("#other5Name").val() + "[/URL]<br/>";
    }
	if(other6Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other6TPE").val() + " TPE[/b][/color] | [URL=" + $("#other6Link").val() + "]" + $("#other6Name").val() + "[/URL]<br/>";
    }
	if(other7Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other7TPE").val() + " TPE[/b][/color] | [URL=" + $("#other7Link").val() + "]" + $("#other7Name").val() + "[/URL]<br/>";
    }
	if(other8Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other8TPE").val() + " TPE[/b][/color] | [URL=" + $("#other8Link").val() + "]" + $("#other8Name").val() + "[/URL]<br/>";
    }
	if(other9Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other9TPE").val() + " TPE[/b][/color] | [URL=" + $("#other9Link").val() + "]" + $("#other9Name").val() + "[/URL]<br/>";
    }
            
    $("#outCode").html(codeBlock);
}
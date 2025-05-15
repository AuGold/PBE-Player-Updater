// Add a query to highlight the specified username
// Works for both `&view=findpost&p=XXXXXX` and `#entryXXXXXX` links
// freaking Rabid and Simo with their periods still break things
function addHighlight(username, url) {
    var h1 = ""
    hl = `#:~:text=${username.replaceAll(" ", "%20")}`;
    /*if(username!="nopity nope"){
        hl = `#:~:text=${username.replaceAll(" ", "%20")}`;
    }
    else{
	h1 = "";*/
    return url.replace(/(?:#entry\d+)?$/, (m) => `${hl}${m}`);
}

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

    const username = $('#putUSN').html().substring(10);
    
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
    
    var codeBlock = "USE CTRL-SHIFT-V AS PASTING UNTIL WE CAN EXPLORE THIS MORE<br/><br/><br/>";
    var weeklyTrainingCheckbox = document.getElementById('WTCheck').checked;
    var activityCheckCheckbox = document.getElementById('ACCheck').checked;
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
    
    /*if(regressionCheckbox == true){
        codeBlock += "[color=red][b]" + $("#RegressionTPE").val() + " TPE[/b][/color] | [url=" + addHighlight(username, $("#RegressionLink").val()) + "]Regression S" + $("#RegressionNumber").val() + "[/url]<br/>";
    }
	if(activityCheckCheckbox == true){
        codeBlock += "[color=green][b]+" + $("#ACTPE").val() + " TPE[/b][/color] | [url=" + addHighlight(username, $("#ACLink").val()) + "]AC #" + $("#ACNumber").val() + "[/url]<br/>";
    }
	if(weeklyTrainingCheckbox == true){
        codeBlock += "[color=green][b]+" + $("#WTTPE").val() + " TPE[/b][/color] | [url=" + addHighlight(username, $("#WTLink").val()) + "]WT #" + $("#WTNumber").val() + "[/url]<br/>";
    }
    if(pictureChainCheckbox == true){
        codeBlock += "[color=green][b]+" + $("#PCTPE").val() + " TPE[/b][/color] | [url=" + addHighlight(username, $("#PCLink").val()) + "]Forum Game " + $("#PCNumber").val() + "-" + $("#PCWeek").val() + "[/url]<br/>";
    }
    if(primetimeCheckbox == true){
        codeBlock += "[color=green][b]+" + $("#PrimetimeTPE").val() + " TPE[/b][/color] | [url=" + addHighlight(username, $("#PrimetimeLink").val()) + "]PT Claim " + $("#PrimetimeNumber").val() + "-" + $("#PrimetimeWeek").val() + "[/url]<br/>";
    }
    if(other1Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other1TPE").val() + " TPE[/b][/color] | [url=" + addHighlight(username, $("#other1Link").val()) + "]" + $("#other1Name").val() + "[/url]<br/>";
    }
    if(other2Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other2TPE").val() + " TPE[/b][/color] | [url=" + addHighlight(username, $("#other2Link").val()) + "]" + $("#other2Name").val() + "[/url]<br/>";
    }
    if(other3Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other3TPE").val() + " TPE[/b][/color] | [url=" + addHighlight(username, $("#other3Link").val()) + "]" + $("#other3Name").val() + "[/url]<br/>";
    }
    if(other4Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other4TPE").val() + " TPE[/b][/color] | [url=" + addHighlight(username, $("#other4Link").val()) + "]" + $("#other4Name").val() + "[/url]<br/>";
    }
	if(other5Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other5TPE").val() + " TPE[/b][/color] | [url=" + addHighlight(username, $("#other5Link").val()) + "]" + $("#other5Name").val() + "[/url]<br/>";
    }
	if(other6Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other6TPE").val() + " TPE[/b][/color] | [url=" + addHighlight(username, $("#other6Link").val()) + "]" + $("#other6Name").val() + "[/url]<br/>";
    }
	if(other7Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other7TPE").val() + " TPE[/b][/color] | [url=" + addHighlight(username, $("#other7Link").val()) + "]" + $("#other7Name").val() + "[/url]<br/>";
    }
	if(other8Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other8TPE").val() + " TPE[/b][/color] | [url=" + addHighlight(username, $("#other8Link").val()) + "]" + $("#other8Name").val() + "[/url]<br/>";
    }
	if(other9Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other9TPE").val() + " TPE[/b][/color] | [url=" + addHighlight(username, $("#other9Link").val()) + "]" + $("#other9Name").val() + "[/url]<br/>";
    }*/

    if(regressionCheckbox == true){
        codeBlock += "[color=red][b]" + $("#RegressionTPE").val() + " TPE[/b][/color] | [url=" + $("#RegressionLink").val() + "]Regression S" + $("#RegressionNumber").val() + "[/url]<br/>";
    }
    if(activityCheckCheckbox == true){
        codeBlock += "[color=green][b]+" + $("#ACTPE").val() + " TPE[/b][/color] | [url=" + $("#ACLink").val() + "]AC #" + $("#ACNumber").val() + "[/url]<br/>";
    }
    if(weeklyTrainingCheckbox == true){
        codeBlock += "[color=green][b]+" + $("#WTTPE").val() + " TPE[/b][/color] | [url=" + $("#WTLink").val() + "]WT #" + $("#WTNumber").val() + "[/url]<br/>";
    }
    if(pictureChainCheckbox == true){
        codeBlock += "[color=green][b]+" + $("#PCTPE").val() + " TPE[/b][/color] | [url=" + $("#PCLink").val() + "]Forum Game " + $("#PCNumber").val() + "-" + $("#PCWeek").val() + "[/url]<br/>";
    }
    if(primetimeCheckbox == true){
        codeBlock += "[color=green][b]+" + $("#PrimetimeTPE").val() + " TPE[/b][/color] | [url=" + addHighlight(username, $("#PrimetimeLink").val()) + "]PT Claim " + $("#PrimetimeNumber").val() + "-" + $("#PrimetimeWeek").val() + "[/url]<br/>";
    }
    if(other1Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other1TPE").val() + " TPE[/b][/color] | [url=" + $("#other1Link").val() + "]" + $("#other1Name").val() + "[/url]<br/>";
    }
    if(other2Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other2TPE").val() + " TPE[/b][/color] | [url=" + $("#other2Link").val() + "]" + $("#other2Name").val() + "[/url]<br/>";
    }
    if(other3Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other3TPE").val() + " TPE[/b][/color] | [url=" + $("#other3Link").val() + "]" + $("#other3Name").val() + "[/url]<br/>";
    }
    if(other4Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other4TPE").val() + " TPE[/b][/color] | [url=" + $("#other4Link").val() + "]" + $("#other4Name").val() + "[/url]<br/>";
    }
    if(other5Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other5TPE").val() + " TPE[/b][/color] | [url=" + $("#other5Link").val() + "]" + $("#other5Name").val() + "[/url]<br/>";
    }
    if(other6Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other6TPE").val() + " TPE[/b][/color] | [url=" + $("#other6Link").val() + "]" + $("#other6Name").val() + "[/url]<br/>";
    }
    if(other7Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other7TPE").val() + " TPE[/b][/color] | [url=" + $("#other7Link").val() + "]" + $("#other7Name").val() + "[/url]<br/>";
    }
    if(other8Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other8TPE").val() + " TPE[/b][/color] | [url=" + $("#other8Link").val() + "]" + $("#other8Name").val() + "[/url]<br/>";
    }
    if(other9Checkbox == true){
        codeBlock += "[color=green][b]+" + $("#other9TPE").val() + " TPE[/b][/color] | [url=" + $("#other9Link").val() + "]" + $("#other9Name").val() + "[/url]<br/>";
    }

    $("#outCode").html(codeBlock);
}

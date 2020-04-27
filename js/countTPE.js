function countTPE(){
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
    var tpeToUse = 0;
    
    if(weeklyTrainingCheckbox == true){
        tpeToUse += parseInt($(WTTPE).val());
    }
    if(activityCheckCheckbox == true){
        tpeToUse += parseInt($(ACTPE).val());
    }
    if(pointTaskCheckbox == true){
        tpeToUse += parseInt($(PTTPE).val());
    }
    if(journalPointTaskCheckbox == true){
        tpeToUse += parseInt($(JPTTPE).val());
    }
    if(pictureChainCheckbox == true){
        tpeToUse += parseInt($(PCTPE).val());
    }
    if(primetimeCheckbox == true){
        tpeToUse += parseInt($(PrimetimeTPE).val());
    }
    if(other1Checkbox == true){
        tpeToUse += parseInt($(other1TPE).val());
    }
    if(other2Checkbox == true){
        tpeToUse += parseInt($(other2TPE).val());
    }
    if(other3Checkbox == true){
        tpeToUse += parseInt($(other3TPE).val());
    }
    if(other4Checkbox == true){
        tpeToUse += parseInt($(other4TPE).val());
    }
    
    document.getElementById('tpeEarned').innerHTML = tpeToUse;
}
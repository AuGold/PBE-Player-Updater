//declare global constants
//these variables are the update scale
//IF UPDATE SCALE CHANGES, UPDATE THESE
var update1to40 = 1;
var update40to50 = 2;
var update50to60 = 3;
var update60to70 = 4;
var update70to80 = 6;
var update80to90 = 7;
var update90to115 = 8;

//these are arrays for pitching velocity and the update scale for velocity changes
var pitchingLevels = ["75 - 80","80 - 83","83 - 85","84 - 86","85 - 87", "86 - 88","87 - 89","88 - 90","89 - 91","90 - 92","91 - 93","92 - 94","93 - 95","94 - 96","95 - 97","96 - 98","97 - 99","98 - 100", "99 - 101"];
var pitchingCost = [30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30];

//every time a user changes values in Step Four of pitchers.html or batters.html this function is called
//this is the majority of the arithmetic - the weird part that people have to do MATH for
//This calculates how much TPE was spent BEFORE the update as well as after/during their updating process
//Note: For some reason going down in velocity levels doesn't work *sometimes*? I'll look into that eventually
function updateTPESpent(){
    
    var tpeSpentValue = 0;
    var tpeSpendingValue = 0;
    var newtpeSpent = 0;
    var newTPEtoSpend = 0;
    var tpeSpentTotal = 0;
    var totalTPE = 0 + banked + tpeEarned;
    var blahUsed = 0;
    
    
    var tableRows = document.getElementById("countTable").rows.length;
    
    for(var i=1;i<tableRows;i++){
		tpeSpentValue = 0;
        tpeSpendingValue = 0;
		newtpeSpent = 0;
        var minStat = "#minStat" + i;
        var stat = "#stat" + i;
        var maxStat = "#maxStat" + i;
        var newStat = "#newStat" + i;
        var tpeSpent = "#tpeSpent" + i;
		if(parseInt($(stat).html())!== 0 && $(stat).html().length<=3){
            if(parseInt($(minStat).html()) == 44 || parseInt($(minStat).html()) == 43 || parseInt($(minStat).html()) == 51 || parseInt($(minStat).html()) == 54 || parseInt($(minStat).html()) == 53 || parseInt($(maxStat).html()) == 64){
				tpeSpentValue = 25 * (parseInt($(stat).html()) - parseInt($(minStat).html()));
			}
			else{
				tpeSpentValue += checkingSpendage(parseInt($(stat).html()), parseInt($(minStat).html()));
			}
            if(parseInt($(minStat).html()) == 44 || parseInt($(minStat).html()) == 43 || parseInt($(minStat).html()) == 51 || parseInt($(minStat).html()) == 54 || parseInt($(minStat).html()) == 53 || parseInt($(maxStat).html()) == 64){
				tpeSpendingValue = 25 * (parseInt($(newStat).val()) - parseInt($(minStat).html()));
			}else if(parseInt($(minStat).html())<=40){
                if(parseInt($(newStat).val())<=40){
                    if(parseInt($(newStat).val())===0 && parseInt($(minStat).html())==40){
                        tpeSpendingValue += -10;
                    }
                    else if(parseInt($(newStat).val())===0 && parseInt($(minStat).html())==35){
                        tpeSpendingValue += -15;
                    }
                    tpeSpendingValue += tpeSpent1to40(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=50 && parseInt($(newStat).val())>40){
                    tpeSpendingValue += tpeSpent40to50(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=60 && parseInt($(newStat).val())>50){
					tpeSpendingValue += tpeSpent50to60(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=70 && parseInt($(newStat).val())>60){
                    tpeSpendingValue += tpeSpent60to70(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=80 && parseInt($(newStat).val())>70){
                    tpeSpendingValue += tpeSpent70to80(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=90 && parseInt($(newStat).val())>80){
                    tpeSpendingValue += tpeSpent80to90(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=115 && parseInt($(newStat).val())>90){
                    tpeSpendingValue += tpeSpent90to115(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
            }else if(parseInt($(minStat).html())<=50 && parseInt($(minStat).html())>40){
                if(parseInt($(newStat).val())===0){
                    tpeSpendingValue += -50;
                }
                if(parseInt($(newStat).val())<=50 && parseInt($(newStat).val())>40){
                    tpeSpendingValue += tpeSpent40to50(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=60 && parseInt($(newStat).val())>50){
                    tpeSpendingValue += tpeSpent50to60(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=70 && parseInt($(newStat).val())>60){
                    tpeSpendingValue += tpeSpent60to70(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=80 && parseInt($(newStat).val())>70){
                    tpeSpendingValue += tpeSpent70to80(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=90 && parseInt($(newStat).val())>80){
                    tpeSpendingValue += tpeSpent80to90(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=115 && parseInt($(newStat).val())>90){
                    tpeSpendingValue += tpeSpent90t0115(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
            }else if(parseInt($(minStat).html())<=60 && parseInt($(minStat).html())>50){
                if(parseInt($(newStat).val())===0){
                    tpeSpendingValue += -50;
                }
                if(parseInt($(newStat).val())<=60 && parseInt($(newStat).val())>50){
                    tpeSpendingValue += tpeSpent50to60(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=70 && parseInt($(newStat).val())>60){
                    tpeSpendingValue += tpeSpent60to70(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=80 && parseInt($(newStat).val())>70){
                    tpeSpendingValue += tpeSpent70to80(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=90 && parseInt($(newStat).val())>80){
                    tpeSpendingValue += tpeSpent80to90(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=115 && parseInt($(newStat).val())>90){
                    tpeSpendingValue += tpeSpent90to115(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
            }
            totalTPE += tpeSpentValue;
            blahUsed += tpeSpendingValue;
            newtpeSpent = tpeSpendingValue - tpeSpentValue;
            
        }else if($(stat).html().length>3){
            tpeSpendingValue = 0;
            var minPitchLocation = 0;
            var currentPitchLocation;
            var newPitchLocation = 0;
            for(var b = 0;b<=pitchingLevels.length;b++){
                if($(minStat).html().localeCompare(pitchingLevels[b]) == 0){
                    minPitchLocation = b;
                }
            }
            for(var c = 0;c<=pitchingLevels.length;c++){
                if($(stat).html().trim().localeCompare(pitchingLevels[c]) == 0){
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
            for(var a = minPitchLocation;a<currentPitchLocation;a++){
                tpeSpentValue += pitchingCost[a];
            }
            for(var f = 0;f<pitchingLevels.length;f++){
				var useThisOneHere = $(newStat).val().trim();
				if(useThisOneHere === "100"){
					useThisOneHere = "100+";
				}
                if(useThisOneHere.localeCompare(pitchingLevels[f]) == 0){
                    newPitchLocation = f;
                }
            }
            for(var g = minPitchLocation;g<newPitchLocation;g++){
                tpeSpendingValue += pitchingCost[g];
            }
            totalTPE += tpeSpentValue;
            blahUsed += tpeSpendingValue;
            newtpeSpent = tpeSpendingValue - tpeSpentValue;
		}else if($(stat).html() == 0){
			tpeSpentValue = 0;
            if(parseInt($(minStat).html())<=40){
				if(parseInt($(newStat).val()) >= parseInt($(minStat).html())){
					tpeSpendingValue = 50;
					tpeSpendingValue += tpeSpent1to40(parseInt($(newStat).val()), parseInt($(minStat).html()));
				}
                if(parseInt($(newStat).val())<=50 && parseInt($(newStat).val())>40){
					tpeSpendingValue = 50
					tpeSpendingValue += tpeSpent40to50(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=60 && parseInt($(newStat).val())>50){
                    tpeSpendingValue = 50
					tpeSpendingValue += tpeSpent50to60(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=70 && parseInt($(newStat).val())>60){
                    tpeSpendingValue = 50
					tpeSpendingValue += tpeSpent60to70(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=80 && parseInt($(newStat).val())>70){
                    tpeSpendingValue = 50
					tpeSpendingValue += tpeSpent70to80(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=90 && parseInt($(newStat).val())>80){
                    tpeSpendingValue = 50
					tpeSpendingValue += tpeSpent80to90(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=115 && parseInt($(newStat).val())>90){
                    tpeSpendingValue = 50
					tpeSpendingValue += tpeSpent90to115(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
            }
			if(parseInt($(minStat).html())==45){
				if(parseInt($(newStat).val())<=50 && parseInt($(newStat).val())>40){
					tpeSpendingValue = 45
					tpeSpendingValue += tpeSpent40to50(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=60 && parseInt($(newStat).val())>50){
                    tpeSpendingValue = 45
					tpeSpendingValue += tpeSpent50to60(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=70 && parseInt($(newStat).val())>60){
                    tpeSpendingValue = 45
					tpeSpendingValue += tpeSpent60to70(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=80 && parseInt($(newStat).val())>70){
                    tpeSpendingValue = 45
					tpeSpendingValue += tpeSpent70to80(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=90 && parseInt($(newStat).val())>80){
                    tpeSpendingValue = 45
					tpeSpendingValue += tpeSpent80to90(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=115 && parseInt($(newStat).val())>90){
                    tpeSpendingValue = 45
					tpeSpendingValue += tpeSpent90to115(parseInt($(newStat).val()), parseInt($(minStat).html()));
                }
			}
            totalTPE += tpeSpentValue;
            blahUsed += tpeSpendingValue;
            newtpeSpent = tpeSpendingValue - tpeSpentValue;
		}
        $(tpeSpent).html(newtpeSpent);
        tpeSpentTotal += newtpeSpent;
		tpeSpendingValue = 0;
		
    }
    var totalPlusPitches = totalTPE + window.pitchesBought;
    var usedPlusPitches = blahUsed + window.pitchesBought;
    $("#totalTPE").html("Total TPE: " + totalPlusPitches);
    $("#tpeUsed").html("TPE Used: " + usedPlusPitches);
    newTPEtoSpend = tpeToSpend - tpeSpentTotal;
    $("#tpeToUse").html("TPE to Spend: " + newTPEtoSpend);
}

function tpeSpent1to40(currentValue, minValue){
	returnSpent = update1to40 * (currentValue - minValue);
	return returnSpent;
}

function tpeSpent40to50(currentValue, minValue){
	if(minValue <= 40){
		returnSpent = tpeSpent1to40(40, minValue);
		returnSpent += update40to50 * (currentValue - 40);
	}
	else{
		returnSpent = update40to50 * (currentValue - minValue);
	}
	return returnSpent;
}

function tpeSpent50to60(currentValue, minValue){
	if(minValue <= 50){
		returnSpent = tpeSpent40to50(50, minValue);
		returnSpent += update50to60 * (currentValue - 50);
	}
	else{
		returnSpent = update50to60 * (currentValue - minValue);
	}
	return returnSpent;
}

function tpeSpent60to70(currentValue, minValue){
	if(minValue <= 60){
		returnSpent = tpeSpent50to60(60, minValue);
		returnSpent += update60to70 * (currentValue - 60);
	}
	else{
		returnSpent = update60to70 * (currentValue - minValue);
	}
	return returnSpent;
}

function tpeSpent70to80(currentValue, minValue){
	if(minValue <= 70){
		returnSpent = tpeSpent60to70(70, minValue);
		returnSpent += update70to80 * (currentValue - 70);
	}
	else{
		returnSpent = update70to80 * (currentValue - minValue);
	}
	return returnSpent;
}

function tpeSpent80to90(currentValue, minValue){
	if(minValue <= 80){
		returnSpent = tpeSpent70to80(80, minValue);
		returnSpent += update80to90 * (currentValue - 80);
	}
	else{
		returnSpent = update80to90 * (currentValue - minValue);
	}
	return returnSpent;
}

function tpeSpent90to115(currentValue, minValue){
	if(minValue <= 90){
		returnSpent = tpeSpent80to90(90, minValue);
		returnSpent += update90to115 * (currentValue - 90);
	}
	else{
		returnSpent = update90to115 * (currentValue - minValue);
	}
	return returnSpent;
}

function checkingSpendage(checkValue, minValue){
	returnSpendage = 0;
	
	if(minValue <= 40){
		if(checkValue <= 40){
			returnSpendage = tpeSpent1to40(checkValue, minValue);
		}
		else if(checkValue <= 50 && checkValue > 40){
			returnSpendage = tpeSpent40to50(checkValue, minValue);
		}
		else if(checkValue <= 60 && checkValue > 50){
			returnSpendage = tpeSpent50to60(checkValue, minValue);
		}
		else if(checkValue <= 70 && checkValue > 60){
			returnSpendage = tpeSpent60to70(checkValue, minValue);
		}
		else if(checkValue <= 80 && checkValue > 70){
			returnSpendage = tpeSpent70to80(checkValue, minValue);
		}
		else if(checkValue <= 90 && checkValue > 80){
			returnSpendage = tpeSpent80to90(checkValue, minValue);
		}
		else if(checkValue <= 115 && checkValue > 90){
			returnSpendage = tpeSpent90t0115(checkValue, minValue);
		}
	}
	else if(minValue <= 50 && minValue > 40){
		if(checkValue <= 50 && checkValue > 40){
			returnSpendage = tpeSpent40to50(checkValue, minValue);
		}
		else if(checkValue <= 60 && checkValue > 50){
			returnSpendage = tpeSpent50to60(checkValue, minValue);
		}
		else if(checkValue <= 70 && checkValue > 60){
			returnSpendage = tpeSpent60to70(checkValue, minValue);
		}
		else if(checkValue <= 80 && checkValue > 70){
			returnSpendage = tpeSpent70to80(checkValue, minValue);
		}
		else if(checkValue <= 90 && checkValue > 80){
			returnSpendage = tpeSpent80to90(checkValue, minValue);
		}
		else if(checkValue <= 115 && checkValue > 90){
			returnSpendage = tpeSpent90t0115(checkValue, minValue);
		}
	}
	else if(minValue <= 60 && minValue > 50){
		if(checkValue <= 60 && checkValue > 50){
			returnSpendage = tpeSpent50to60(checkValue, minValue);
		}
		else if(checkValue <= 70 && checkValue > 60){
			returnSpendage = tpeSpent60to70(checkValue, minValue);
		}
		else if(checkValue <= 80 && checkValue > 70){
			returnSpendage = tpeSpent70to80(checkValue, minValue);
		}
		else if(checkValue <= 90 && checkValue > 80){
			returnSpendage = tpeSpent80to90(checkValue, minValue);
		}
		else if(checkValue <= 115 && checkValue > 90){
			returnSpendage = tpeSpent90t0115(checkValue, minValue);
		}
	}
	
	return returnSpendage;
}
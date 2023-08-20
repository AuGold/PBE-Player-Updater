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
			}else if(parseInt($(minStat).html())<=40){
                if(parseInt($(stat).html())<=40){
                    tpeSpentValue = update1to40 * (parseInt($(stat).html()) - parseInt($(minStat).html()));
                }
                if(parseInt($(stat).html())<=50 && parseInt($(stat).html())>40){
                    tpeSpentValue = update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpentValue += update40to50 * (parseInt($(stat).html()) - 40);
                }
                if(parseInt($(stat).html())<=60 && parseInt($(stat).html())>50){
                    tpeSpentValue = update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpentValue += update40to50 * (50 - 40);
                    tpeSpentValue += update50to60 * (parseInt($(stat).html()) - 50);
                }
                if(parseInt($(stat).html())<=70 && parseInt($(stat).html())>60){
                    tpeSpentValue = update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpentValue += update40to50 * (50 - 40);
                    tpeSpentValue += update50to60 * (60 - 50);
                    tpeSpentValue += update60to70 * (parseInt($(stat).html()) - 60);
                }
                if(parseInt($(stat).html())<=80 && parseInt($(stat).html())>70){
                    tpeSpentValue = update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpentValue += update40to50 * (50 - 40);
                    tpeSpentValue += update50to60 * (60 - 50);
                    tpeSpentValue += update60to70 * (70 - 60);
                    tpeSpentValue += update70to80 * (parseInt($(stat).html()) - 70);
                }
                if(parseInt($(stat).html())<=90 && parseInt($(stat).html())>80){
                    tpeSpentValue = update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpentValue += update40to50 * (50 - 40);
                    tpeSpentValue += update50to60 * (60 - 50);
                    tpeSpentValue += update60to70 * (70 - 60);
                    tpeSpentValue += update70to80 * (80 - 70);
                    tpeSpentValue += update80to90 * (parseInt($(stat).html()) - 80);
                }
                if(parseInt($(stat).html())<=115 && parseInt($(stat).html())>90){
                    tpeSpentValue = update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpentValue += update40to50 * (50 - 40);
                    tpeSpentValue += update50to60 * (60 - 50);
                    tpeSpentValue += update60to70 * (70 - 60);
                    tpeSpentValue += update70to80 * (80 - 70);
                    tpeSpentValue += update80to90 * (90 - 80);
                    tpeSpentValue += update90to115 * (parseInt($(stat).html()) - 90);
                }
            }else if(parseInt($(minStat).html())<=50 && parseInt($(minStat).html())>40){
                if(parseInt($(stat).html())<=50 && parseInt($(stat).html())>40){
                    tpeSpentValue = update40to50 * (parseInt($(stat).html()) - parseInt($(minStat).html()));
                }
                if(parseInt($(stat).html())<=60 && parseInt($(stat).html())>50){
                    tpeSpentValue = update40to50 * (50 - parseInt($(minStat).html()));
                    tpeSpentValue += update50to60 * (parseInt($(stat).html()) - 50);
                }
                if(parseInt($(stat).html())<=70 && parseInt($(stat).html())>60){
                    tpeSpentValue = update40to50 * (50 - parseInt($(minStat).html()));
                    tpeSpentValue += update50to60 * (60 - 50);
                    tpeSpentValue += update60to70 * (parseInt($(stat).html()) - 60);
                }
                if(parseInt($(stat).html())<=80 && parseInt($(stat).html())>70){
                    tpeSpentValue = update40to50 * (50 - parseInt($(minStat).html()));
                    tpeSpentValue += update50to60 * (60 - 50);
                    tpeSpentValue += update60to70 * (70 - 60);
                    tpeSpentValue += update70to80 * (parseInt($(stat).html()) - 70);
                }
                if(parseInt($(stat).html())<=90 && parseInt($(stat).html())>80){
                    tpeSpentValue = update40to50 * (50 - parseInt($(minStat).html()));
                    tpeSpentValue += update50to60 * (60 - 50);
                    tpeSpentValue += update60to70 * (70 - 60);
                    tpeSpentValue += update70to80 * (80 - 70);
                    tpeSpentValue += update80to90 * (parseInt($(stat).html()) - 80);
                }
                if(parseInt($(stat).html())<=115 && parseInt($(stat).html())>90){
                    tpeSpentValue = update40to50 * (50 - parseInt($(minStat).html()));
                    tpeSpentValue += update50to60 * (60 - 50);
                    tpeSpentValue += update60to70 * (70 - 60);
                    tpeSpentValue += update70to80 * (80 - 70);
                    tpeSpentValue += update80to90 * (90 - 80);
                    tpeSpentValue += update90to115 * (parseInt($(stat).html()) - 90);
                }
            }else if(parseInt($(minStat).html())<=60 && parseInt($(minStat).html())>50){
                if(parseInt($(stat).html())<=60 && parseInt($(stat).html())>50){
                    tpeSpentValue += update50to60 * (parseInt($(stat).html()) - parseInt($(minStat).html()));
                }
                if(parseInt($(stat).html())<=70 && parseInt($(stat).html())>60){
                    tpeSpentValue += update50to60 * (60 - parseInt($(minStat).html()));
                    tpeSpentValue += update60to70 * (parseInt($(stat).html()) - 60);
                }
                if(parseInt($(stat).html())<=80 && parseInt($(stat).html())>70){
                    tpeSpentValue += update50to60 * (60 - parseInt($(minStat).html()));
                    tpeSpentValue += update60to70 * (70 - 60);
                    tpeSpentValue += update70to80 * (parseInt($(stat).html()) - 70);
                }
                if(parseInt($(stat).html())<=90 && parseInt($(stat).html())>80){
                    tpeSpentValue += update50to60 * (60 - parseInt($(minStat).html()));
                    tpeSpentValue += update60to70 * (70 - 60);
                    tpeSpentValue += update70to80 * (80 - 70);
                    tpeSpentValue += update80to90 * (parseInt($(stat).html()) - 80);
                }
                if(parseInt($(stat).html())<=115 && parseInt($(stat).html())>90){
                    tpeSpentValue += update50to60 * (60 - parseInt($(minStat).html()));
                    tpeSpentValue += update60to70 * (70 - 60);
                    tpeSpentValue += update70to80 * (80 - 70);
                    tpeSpentValue += update80to90 * (90 - 80);
                    tpeSpentValue += update90to115 * (parseInt($(stat).html()) - 90);
                }
            }
            if(parseInt($(minStat).html()) == 44 || parseInt($(minStat).html()) == 43 || parseInt($(minStat).html()) == 51 || parseInt($(minStat).html()) == 54 || parseInt($(minStat).html()) == 53 || parseInt($(maxStat).html()) == 64){
				tpeSpendingValue = 25 * (parseInt($(newStat).val()) - parseInt($(minStat).html()));
			}else if(parseInt($(minStat).html())<=40){
                if(parseInt($(newStat).val())<=40){
                    tpeSpendingValue = update1to40 * (parseInt($(newStat).val()) - parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=50 && parseInt($(newStat).val())>40){
                    tpeSpendingValue = update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpendingValue += update40to50 * (parseInt($(newStat).val()) - 40);
                }
                if(parseInt($(newStat).val())<=60 && parseInt($(newStat).val())>50){
					tpeSpendingValue = update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpendingValue += update40to50 * (50 - 40);
                    tpeSpendingValue += update50to60 * (parseInt($(newStat).val()) - 50);
                }
                if(parseInt($(newStat).val())<=70 && parseInt($(newStat).val())>60){
                    tpeSpendingValue = update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpendingValue += update40to50 * (50 - 40);
                    tpeSpendingValue += update50to60 * (60 - 50);
                    tpeSpendingValue += update60to70 * (parseInt($(newStat).val()) - 60);
                }
                if(parseInt($(newStat).val())<=80 && parseInt($(newStat).val())>70){
                    tpeSpendingValue = update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpendingValue += update40to50 * (50 - 40);
                    tpeSpendingValue += update50to60 * (60 - 50);
                    tpeSpendingValue += update60to70 * (70 - 60);
                    tpeSpendingValue += update70to80 * (parseInt($(newStat).val()) - 70);
                }
                if(parseInt($(newStat).val())<=90 && parseInt($(newStat).val())>80){
                    tpeSpendingValue = update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpendingValue += update40to50 * (50 - 40);
                    tpeSpendingValue += update50to60 * (60 - 50);
                    tpeSpendingValue += update60to70 * (70 - 60);
                    tpeSpendingValue += update70to80 * (80 - 70);
                    tpeSpendingValue += update80to90 * (parseInt($(newStat).val()) - 80);
                }
                if(parseInt($(newStat).val())<=115 && parseInt($(newStat).val())>90){
                    tpeSpendingValue = update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpendingValue += update40to50 * (50 - 40);
                    tpeSpendingValue += update50to60 * (60 - 50);
                    tpeSpendingValue += update60to70 * (70 - 60);
                    tpeSpendingValue += update70to80 * (80 - 70);
                    tpeSpendingValue += update80to90 * (90 - 80);
                    tpeSpendingValue += update90to115 * (parseInt($(newStat).val()) - 90);
                }
            }else if(parseInt($(minStat).html())<=50 && parseInt($(minStat).html())>40){
                if(parseInt($(newStat).val())<=50 && parseInt($(newStat).val())>40){
                    tpeSpendingValue = update40to50 * (parseInt($(newStat).val()) - parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=60 && parseInt($(newStat).val())>50){
                    tpeSpendingValue = update40to50 * (50 - parseInt($(minStat).html()));
                    tpeSpendingValue += update50to60 * (parseInt($(newStat).val()) - 50);
                }
                if(parseInt($(newStat).val())<=70 && parseInt($(newStat).val())>60){
                    tpeSpendingValue = update40to50 * (50 - parseInt($(minStat).html()));
                    tpeSpendingValue += update50to60 * (60 - 50);
                    tpeSpendingValue += update60to70 * (parseInt($(newStat).val()) - 60);
                }
                if(parseInt($(newStat).val())<=80 && parseInt($(newStat).val())>70){
                    tpeSpendingValue = update40to50 * (50 - parseInt($(minStat).html()));
                    tpeSpendingValue += update50to60 * (60 - 50);
                    tpeSpendingValue += update60to70 * (70 - 60);
                    tpeSpendingValue += update70to80 * (parseInt($(newStat).val()) - 70);
                }
                if(parseInt($(newStat).val())<=90 && parseInt($(newStat).val())>80){
                    tpeSpendingValue = update40to50 * (50 - parseInt($(minStat).html()));
                    tpeSpendingValue += update50to60 * (60 - 50);
                    tpeSpendingValue += update60to70 * (70 - 60);
                    tpeSpendingValue += update70to80 * (80 - 70);
                    tpeSpendingValue += update80to90 * (parseInt($(newStat).val()) - 80);
                }
                if(parseInt($(newStat).val())<=115 && parseInt($(newStat).val())>90){
                    tpeSpendingValue = update40to50 * (50 - parseInt($(minStat).html()));
                    tpeSpendingValue += update50to60 * (60 - 50);
                    tpeSpendingValue += update60to70 * (70 - 60);
                    tpeSpendingValue += update70to80 * (80 - 70);
                    tpeSpendingValue += update80to90 * (90 - 80);
                    tpeSpendingValue += update90to115 * (parseInt($(newStat).val()) - 90);
                }
            }else if(parseInt($(minStat).html())<=60 && parseInt($(minStat).html())>50){
                if(parseInt($(newStat).val())<=60 && parseInt($(newStat).val())>50){
                    tpeSpendingValue += update50to60 * (parseInt($(newStat).val()) - parseInt($(minStat).html()));
                }
                if(parseInt($(newStat).val())<=70 && parseInt($(newStat).val())>60){
                    tpeSpendingValue += update50to60 * (60 - parseInt($(minStat).html()));
                    tpeSpendingValue += update60to70 * (parseInt($(newStat).val()) - 60);
                }
                if(parseInt($(newStat).val())<=80 && parseInt($(newStat).val())>70){
                    tpeSpendingValue += update50to60 * (60 - parseInt($(minStat).html()));
                    tpeSpendingValue += update60to70 * (70 - 60);
                    tpeSpendingValue += update70to80 * (parseInt($(newStat).val()) - 70);
                }
                if(parseInt($(newStat).val())<=90 && parseInt($(newStat).val())>80){
                    tpeSpendingValue += update50to60 * (60 - parseInt($(minStat).html()));
                    tpeSpendingValue += update60to70 * (70 - 60);
                    tpeSpendingValue += update70to80 * (80 - 70);
                    tpeSpendingValue += update80to90 * (parseInt($(newStat).val()) - 80);
                }
                if(parseInt($(newStat).val())<=115 && parseInt($(newStat).val())>90){
                    tpeSpendingValue += update50to60 * (60 - parseInt($(minStat).html()));
                    tpeSpendingValue += update60to70 * (70 - 60);
                    tpeSpendingValue += update70to80 * (80 - 70);
                    tpeSpendingValue += update80to90 * (90 - 80);
                    tpeSpendingValue += update90to115 * (parseInt($(newStat).val()) - 90);
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
					tpeSpendingValue += update1to40 * (parseInt($(newStat).val()) - parseInt($(minStat).html()));
				}
                if(parseInt($(newStat).val())<=50 && parseInt($(newStat).val())>40){
					tpeSpendingValue = 50
					tpeSpendingValue += update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpendingValue += update40to50 * (parseInt($(newStat).val()) - 40);
                }
                if(parseInt($(newStat).val())<=60 && parseInt($(newStat).val())>50){
                    tpeSpendingValue = 50
					tpeSpendingValue += update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpendingValue += update40to50 * (50 - 40);
                    tpeSpendingValue += update50to60 * (parseInt($(newStat).val()) - 50);
                }
                if(parseInt($(newStat).val())<=70 && parseInt($(newStat).val())>60){
                    tpeSpendingValue = 50
					tpeSpendingValue += update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpendingValue += update40to50 * (50 - 40);
                    tpeSpendingValue += update50to60 * (60 - 50);
                    tpeSpendingValue += update60to70 * (parseInt($(newStat).val()) - 60);
                }
                if(parseInt($(newStat).val())<=80 && parseInt($(newStat).val())>70){
                    tpeSpendingValue = 50
					tpeSpendingValue += update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpendingValue += update40to50 * (50 - 40);
                    tpeSpendingValue += update50to60 * (60 - 50);
                    tpeSpendingValue += update60to70 * (70 - 60);
                    tpeSpendingValue += update70to80 * (parseInt($(newStat).val()) - 70);
                }
                if(parseInt($(newStat).val())<=90 && parseInt($(newStat).val())>80){
                    tpeSpendingValue = 50
					tpeSpendingValue += update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpendingValue += update40to50 * (50 - 40);
                    tpeSpendingValue += update50to60 * (60 - 50);
                    tpeSpendingValue += update60to70 * (70 - 60);
                    tpeSpendingValue += update70to80 * (80 - 70);
                    tpeSpendingValue += update80to90 * (parseInt($(newStat).val()) - 80);
                }
                if(parseInt($(newStat).val())<=115 && parseInt($(newStat).val())>90){
                    tpeSpendingValue = 50
					tpeSpendingValue += update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpendingValue += update40to50 * (50 - 40);
                    tpeSpendingValue += update50to60 * (60 - 50);
                    tpeSpendingValue += update60to70 * (70 - 60);
                    tpeSpendingValue += update70to80 * (80 - 70);
                    tpeSpendingValue += update80to90 * (90 - 80);
                    tpeSpendingValue += update90to115 * (parseInt($(newStat).val()) - 90);
                }
            }
			if(parseInt($(minStat).html())==45){
				if(parseInt($(newStat).val())<=50 && parseInt($(newStat).val())>40){
					tpeSpendingValue = 45
					tpeSpendingValue += update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpendingValue += update40to50 * (parseInt($(newStat).val()) - 40);
                }
                if(parseInt($(newStat).val())<=60 && parseInt($(newStat).val())>50){
                    tpeSpendingValue = 45
					tpeSpendingValue += update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpendingValue += update40to50 * (50 - 40);
                    tpeSpendingValue += update50to60 * (parseInt($(newStat).val()) - 50);
                }
                if(parseInt($(newStat).val())<=70 && parseInt($(newStat).val())>60){
                    tpeSpendingValue = 45
					tpeSpendingValue += update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpendingValue += update40to50 * (50 - 40);
                    tpeSpendingValue += update50to60 * (60 - 50);
                    tpeSpendingValue += update60to70 * (parseInt($(newStat).val()) - 60);
                }
                if(parseInt($(newStat).val())<=80 && parseInt($(newStat).val())>70){
                    tpeSpendingValue = 45
					tpeSpendingValue += update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpendingValue += update40to50 * (50 - 40);
                    tpeSpendingValue += update50to60 * (60 - 50);
                    tpeSpendingValue += update60to70 * (70 - 60);
                    tpeSpendingValue += update70to80 * (parseInt($(newStat).val()) - 70);
                }
                if(parseInt($(newStat).val())<=90 && parseInt($(newStat).val())>80){
                    tpeSpendingValue = 45
					tpeSpendingValue += update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpendingValue += update40to50 * (50 - 40);
                    tpeSpendingValue += update50to60 * (60 - 50);
                    tpeSpendingValue += update60to70 * (70 - 60);
                    tpeSpendingValue += update70to80 * (80 - 70);
                    tpeSpendingValue += update80to90 * (parseInt($(newStat).val()) - 80);
                }
                if(parseInt($(newStat).val())<=115 && parseInt($(newStat).val())>90){
                    tpeSpendingValue = 45
					tpeSpendingValue += update1to40 * (40 - parseInt($(minStat).html()));
                    tpeSpendingValue += update40to50 * (50 - 40);
                    tpeSpendingValue += update50to60 * (60 - 50);
                    tpeSpendingValue += update60to70 * (70 - 60);
                    tpeSpendingValue += update70to80 * (80 - 70);
                    tpeSpendingValue += update80to90 * (90 - 80);
                    tpeSpendingValue += update90to115 * (parseInt($(newStat).val()) - 90);
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
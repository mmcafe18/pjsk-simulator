import { state } from "./state.js";

export function sliderBg(sliderEle){
    const percent =
        (sliderEle.value - sliderEle.min) /
        (sliderEle.max - sliderEle.min) * 100;

    sliderEle.style.background =
        `linear-gradient(to right,
        #ff8fc7 0%,
        #ff8fc7 ${percent}%,
        #ddd ${percent}%,
        #ddd 100%)`;
}

export function powerCalc(){
    let power = 0;
    if(state.STATE){
        state.TEAMS.forEach(p => {
            const pf = p?.performance ? p.performance : 0;
            const te = p?.technique ? p.technique : 0;
            const st = p?.stamina ? p.stamina : 0;
            power += pf + te + st;
        });
    }

    document.getElementById("totalPower").textContent = power;
};

export function teamsImage(){
    if(state.TEAMS[state.SELECTED_SLOT]){
        document.getElementById(`master-image${state.SELECTED_SLOT+1}`).style.backgroundImage = `url("./image/icon/master_rank/${state.TEAMS[state.SELECTED_SLOT].master}.png")`; 
        document.getElementById(`canvas-image${state.SELECTED_SLOT+1}`).style.backgroundImage = `url("./image/icon/${state.TEAMS[state.SELECTED_SLOT].canvas === "true" ? "canvas" : "nocanvas" }.png")`; 
    }
}

export function levelCalc(minpower, maxpower, trainpower, nowlevel, maxlevel){
    const base = [0, 0, 0]; //pf, te, st
    const baseTra = [0, 0, 0]; //pf, te, st

    if(trainpower[0] <= 2 || trainpower[0] == 5){
        //Non Training
        base.forEach((p, index) => {
            base[index] = (maxpower[index] - minpower[index]) / (maxlevel - 1);
        });

        base.forEach((param, i) => {
            let p = 0;
            for(var t = 1; t < nowlevel; t++){
                p = param * t;
            }
            base[i] = p;
        });
    } else if(trainpower[0] == 3 || trainpower[0] == 4){
        const trainlevel = state.TRAINING[trainpower[0]][0];
        const trainbonus = (trainlevel+1) < nowlevel || ((trainlevel+1) == nowlevel && state.TEAMS[state.SELECTED_SLOT].training === "true") ? state.TRAINING[trainpower[0]][1] : 0;
        
        
        base.forEach((p, index) => {
            base[index] = (trainpower[(index+1)] - minpower[index]) / trainlevel;
        });

        if(nowlevel > trainlevel){
            baseTra.forEach((p, index) => {
                baseTra[index] = (maxpower[index] - trainpower[(index+1)]) / 10;
            });

            baseTra.forEach((param, index) => {
                let p = 0;
                for(var t = 1; t < nowlevel - trainlevel; t++){
                    p = param * t;
                }

                baseTra[index] = p;
            });
        }

        base.forEach((param, i) => {
            let p = 0;
            if(nowlevel <= (trainlevel + 1)){
                for(var t = 1; t < nowlevel; t++){
                    p = param * t;
                }
            } else {
                for(var t = 1; t < (trainlevel + 1); t++){
                    p = param * t;
                }
            }
            
            base[i] = p + baseTra[i] + trainbonus;
        });

    }


    return base;
}

export function masterCalc(nowmaster, rarity){
    let result = 0;
    for(var i = 0; i <= nowmaster; i++){
        result = state.MASTER[rarity] * i;
    }
    return result;
}

export function storyCalc(arr, rarity){
    let result = 0;
    arr.forEach((param, i) => {
        if(i == 0){
            param === "true" ? result += state.SIDE_STORY[rarity][i] : result += 0;
        } else if(i == 1){
            arr[0] === "true" && param  === "true" ? result += state.SIDE_STORY[rarity][i] : null;
        }
    });
    return result;
}

export function canvasCalc(canvas, rarity){
    let result = 0;
    canvas === "true" ? result = state.CANVAS[rarity] : null;
    return result;
}


export function detailCalc(minpower, trainpower, level, story, master, canvas){
    const slot = state.TEAMS[state.SELECTED_SLOT];
    
    minpower.forEach((param, index) => {
        minpower[index] = parseInt(param) + level[index] + story + master + canvas;
        isNaN(Math.floor(minpower[index])) ? document.getElementById(`param${(index + 1)}`).textContent = 0 : document.getElementById(`param${(index + 1)}`).textContent = Math.floor(minpower[index]);
        //parseInt(minpower[index]) += level[index];
    });

    if(slot){
        slot.performance = Math.floor(minpower[0]);
        slot.technique = Math.floor(minpower[1]);
        slot.stamina = Math.floor(minpower[2]);
    }
}
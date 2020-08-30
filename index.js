let fluxCount = 0

let idleCount = 0
let idleLevel = 0

let clickCount = 1
let clickLevel = 0
let clickSum = 0
let clickReward = 0

var diamondCount = 0
var idleDiamond = 1

var btnIdle = document.querySelector('#idle');
var btnClick = document.querySelector('#upgrade');
var btnGamble = document.querySelector('#gamble');
var btnDiamond = document.querySelector('#special');

btnGamble.disabled = true;
btnIdle.disabled = true;
btnClick.disabled = true;
btnDiamond.disabled = true;




/*---------------------------------------------CLICKING---------------------------------------------*/



function getFlux() {
    fluxCount += clickCount
    clickSum++

    /*----------Diamond Calculation----------*/

    let diamondChance = Math.floor(Math.random() * 100 + 1)
    if (diamondChance == 1) {
        diamondCount++
        document.getElementById("diamond-amount").innerHTML = diamondCount;
    }



    /*----------CLICK REWARD----------*/
    clickReward = clickSum / 2

    if (clickSum === 1000) {
        alert("you clicked 1000 times! you get bonus " + clickReward + " flux")
        fluxCount += clickReward
    }



    document.getElementById("flux-amount").innerHTML = fluxCount; // refresh flux amount

    /*----------IDLE BUTTON----------*/
    if (idleLevel == 0) {
        btnIdle.disabled = true;
        if (fluxCount >= 100) {
            btnIdle.disabled = false;
        }
    }
    if (idleLevel == 1) {
        btnIdle.disabled = true;
        if (fluxCount > 1000) {
            btnIdle.disabled = false;
        }
    }

    /*----------CLICK BUTTON----------*/
    if (clickLevel == 0) {
        btnClick.disabled = true;
        if (fluxCount >= 50) {
            btnClick.disabled = false;
        }
    }
    if (clickLevel == 1) {
        btnClick.disabled = true;
        if (fluxCount > 500) {
            btnClick.disabled = false;
        }
    }

    /*----------SPECIAL BUTTON----------*/
    if (diamondCount >= 1000) {
        btnDiamond.disabled = false;
    }





    /*----------Trove Of Wonders----------*/

    btnGamble.disabled = true;

    if (diamondCount >= 5) {
        btnGamble.disabled = false;
    }
}


/*----------UPGRADE CLICK----------*/
function Upgrade() {
    if (clickLevel == 0) {
        clickCount++
    }
    if (clickLevel == 1) {
        clickCount += 5
    }
}


/*----------UPGRADE COST----------*/
function takeFluxUpgrade() {
    if (clickLevel == 0) {
        fluxCount -= 50;
    }
    if (clickLevel == 1) {
        fluxCount -= 500;
    }
}

/*----------UPGRADE LEVEL----------*/
function clickUpgrade() {
    clickLevel++
    btnClick.disabled = true;
    document.getElementById("click-heading").innerHTML = "Mine Cinnabar";
    document.getElementById("click-reward").innerHTML = "+5 flux/click";
    document.getElementById("click-price").innerHTML = "cost: 500 flux";

}




/*---------------------------------------------IDLE---------------------------------------------*/


function idle() {
    document.getElementById("flux-amount").innerHTML = fluxCount;
    fluxCount += idleCount;

    /*----------IDLE BUTTON----------*/
    if (idleLevel == 0) {
        btnIdle.disabled = true;
        if (fluxCount >= 100) {
            btnIdle.disabled = false;
        }
    }
    if (idleLevel == 1) {
        btnIdle.disabled = true;
        if (fluxCount > 1000) {
            btnIdle.disabled = false;
        }
    }

    /*----------CLICK BUTTON----------*/
    if (clickLevel == 0) {
        btnClick.disabled = true;
        if (fluxCount >= 50) {
            btnClick.disabled = false;
        }
    }
    if (clickLevel == 1) {
        btnClick.disabled = true;
        if (fluxCount > 500) {
            btnClick.disabled = false;
        }
    }


    /*----------SPECIAL BUTTON----------*/
    if (diamondCount >= 1000) {
        btnGamble.disabled = false;
    }


    /*----------Trove Of Wonders----------*/

    btnGamble.disabled = true;

    if (diamondCount >= 5) {
        btnDiamond.disabled = false;
    }
}

document.getElementById("idle").addEventListener("click", function () {
    if (idleLevel == 1) {
        idleCount = 1
        window.setInterval(idle, 1000)
    }
    if (idleLevel == 2) {
        idleCount = 1
        window.setInterval(idle, 200)
    }
});




/*----------IDLE COST----------*/
function takeFluxIdle() {
    if (idleLevel == 0) {
        fluxCount -= 100;
    }
    if (idleLevel == 1) {
        fluxCount -= 1000;
    }
}

/*----------IDLE LEVEL----------*/
function idleUpgrade() {
    idleLevel++
    btnIdle.disabled = true;
    document.getElementById("idle-reward").innerHTML = "5 flux/sec";
    document.getElementById("idle-price").innerHTML = "cost: 1000 flux";

}



/*----------DIAMOND----------*/

btnDiamond.disabled = true;

if (diamondCount >= 1000) {
    btnDiamond.disabled = false;
}


function diamond() {
    document.getElementById("special2").style.visibility = "hidden";
    document.getElementById("special").style.visibility = "hidden";
    document.getElementById("diamond-amount").innerHTML = diamondCount;
    $(document).keydown(function () {
        if (event.key == " ") {
            getFlux()
        }
    })
}

function takeDiamond() {
    btnDiamond.disabled = true;
    diamondCount -= 100
    document.getElementById("diamond-amount").innerHTML = diamondCount;
}



/*---------------------------------------------GAMBLING / TROVE OF WONDERS---------------------------------------------*/
function gamble() {
    diamondCount -= 5;
    btnGamble.disabled = true;

    if (diamondCount >= 1) {
        btnGamble.disabled = false;
    }
    document.getElementById("diamond-amount").innerHTML = diamondCount;

    chance = Math.floor(Math.random() * 1000 + 1)

    if (chance === 1) {  // 0.1% CHANCE
        alert("FIRST PRIZE!!! YOU WON 500 DIAMONDS")
        diamondCount += 500
    }

    else if (chance >= 2 && chance <= 101) {
        alert("YOU WON 5,000 FLUX")
        fluxCount += 5000
    }

    else {
        alert("you got nothing")
    }
}



/*----------------------------------------SECRET CODE----------------------------------------*/


let List = []

$(document).keydown(function () {
    if (event.key != "Enter" && event.key != " ") {
        List.push(event.key)
    }

    if (event.key == "Enter") {
        if (List == "e,z,f,l,u,x") {
            alert("CHEAT ACTIVATED\nyou can now hold space to click")
            $(document).keydown(function () {
                if (event.key == " ") {
                    getFlux()
                }
            })
            List = []
        }
        else {
            List = []
        }
    }
})


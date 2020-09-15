let fluxCount = 0
let totalFlux = 0

let idleCount = 0
let idleLevel = 0

let clickCount = 1
let clickLevel = 0
let clickSum = 0
let clickReward = 0

var diamondCount = 0
var idleDiamond = 1
var diamondUpgrade = 0

/*----------PRICES----------*/
const gamblePrice = 10
const clickUpgrade1 = 20
const clickUpgrade2 = 250
const idleUpgrade1 = 50
const idleUpgrade2 = 500
const specialUpgrade = 20000

/*----------BUTTONS----------*/
const btnIdle = document.querySelector('#idle');
const btnClick = document.querySelector('#upgrade');
const btnGamble = document.querySelector('#gamble');
const btnDiamond = document.querySelector('#special');
const fluxImg = document.querySelector(".flux-img")

btnGamble.disabled = true;
btnIdle.disabled = true;
btnClick.disabled = true;
btnDiamond.disabled = true;



/*---------------------------------------------CLICKING---------------------------------------------*/



function getFlux() {
    fluxCount += clickCount
    totalFlux++
    clickSum++

    document.getElementById("diamond-amount").innerHTML = diamondCount;

    /*----------Diamond Calculation----------*/
    let diamondChance = Math.floor(Math.random() * 150 + 1)

    if (diamondUpgrade == 0) {
        if (diamondChance == 1) {
            diamondCount++
            document.getElementById("diamond-amount").innerHTML = diamondCount;
        }
    }


    /*----------CLICK REWARD----------*/
    clickReward = Math.floor(clickSum / 100 * clickSum / 75 + totalFlux / 10)

    if (clickSum % 1000 == 0) {
        alert("you clicked " + clickSum + " times! you get bonus " + clickReward + " flux")
        fluxCount += clickReward // reward the flux earned
        totalFlux += clickReward // keeps track of total flux earned
    }

    document.getElementById("flux-amount").innerHTML = fluxCount; // refresh flux amount

    /*----------IDLE BUTTON----------*/
    if (idleLevel == 0) {
        btnIdle.disabled = true;
        if (fluxCount >= idleUpgrade1) {
            btnIdle.disabled = false;
        }
    }
    if (idleLevel == 1) {
        btnIdle.disabled = true;
        if (fluxCount > idleUpgrade2) {
            btnIdle.disabled = false;
        }
    }

    /*----------CLICK BUTTON----------*/
    if (clickLevel == 0) {
        btnClick.disabled = true;
        if (fluxCount >= clickUpgrade1) {
            btnClick.disabled = false;
        }
    }
    if (clickLevel == 1) {
        btnClick.disabled = true;
        if (fluxCount > clickUpgrade2) {
            btnClick.disabled = false;
        }
    }

    /*----------SPECIAL BUTTON----------*/
    if (fluxCount >= specialUpgrade) {
        btnDiamond.disabled = false;
    }





    /*----------Trove Of Wonders----------*/

    btnGamble.disabled = true;

    if (diamondCount >= 10) {
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
        fluxCount -= clickUpgrade1;
    }
    if (clickLevel == 1) {
        fluxCount -= clickUpgrade2;
    }
}

/*----------UPGRADE LEVEL----------*/
function clickUpgrade() {
    clickLevel++
    btnClick.disabled = true;
    document.getElementById("flux-amount").innerHTML = fluxCount;
    document.getElementById("click-heading").innerHTML = "Mine Cinnabar";
    document.getElementById("click-reward").innerHTML = "+5 flux/click";
    document.getElementById("click-price").innerHTML = "cost: 250 flux";

}




/*---------------------------------------------IDLE---------------------------------------------*/


function idle() {
    document.getElementById("flux-amount").innerHTML = fluxCount;
    fluxCount += idleCount;
    totalFlux++
    document.getElementById("diamond-amount").innerHTML = diamondCount;

    /*----------IDLE BUTTON----------*/
    if (idleLevel == 0) {
        btnIdle.disabled = true;
        if (fluxCount >= idleUpgrade1) {
            btnIdle.disabled = false;
        }
    }
    if (idleLevel == 1) {
        btnIdle.disabled = true;
        if (fluxCount > idleUpgrade2) {
            btnIdle.disabled = false;
        }
    }

    /*----------CLICK BUTTON----------*/
    if (clickLevel == 0) {
        btnClick.disabled = true;
        if (fluxCount >= clickUpgrade1) {
            btnClick.disabled = false;
        }
    }
    if (clickLevel == 1) {
        btnClick.disabled = true;
        if (fluxCount > clickUpgrade2) {
            btnClick.disabled = false;
        }
    }


    /*----------SPECIAL BUTTON----------*/
    if (fluxCount >= specialUpgrade) {
        btnDiamond.disabled = false;
    }


    /*----------Trove Of Wonders----------*/

    btnGamble.disabled = true;

    if (diamondCount >= gamblePrice) {
        btnGamble.disabled = false;
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
        fluxCount -= idleUpgrade1;
    }
    if (idleLevel == 1) {
        fluxCount -= idleUpgrade2;
    }
}

/*----------IDLE LEVEL----------*/
function idleUpgrade() {
    idleLevel++
    btnIdle.disabled = true;
    document.getElementById("idle-reward").innerHTML = "5 flux/sec";
    document.getElementById("idle-price").innerHTML = "cost: 500 flux";

}



/*----------DIAMOND----------*/

btnDiamond.disabled = true;

if (fluxCount >= specialUpgrade) {
    btnDiamond.disabled = false;
}


function addDiamond() {
    diamondCount += idleDiamond
    document.getElementById("diamond-amount").innerHTML = diamondCount;
}

function diamond() {
    document.getElementById("special2").style.visibility = "hidden";
    document.getElementById("special").style.visibility = "hidden";
    diamondUpgrade++
}

function takeFluxDiamonds() {
    btnDiamond.disabled = true;
    fluxCount -= specialUpgrade
    document.getElementById("diamond-amount").innerHTML = diamondCount;
    document.getElementById("diamond-amount").innerHTML = fluxCount;
}


document.getElementById("special").addEventListener("click", function () {
    window.setInterval(addDiamond, 10000)
})




/*---------------------------------------------GAMBLING / TROVE OF WONDERS---------------------------------------------*/
function gamble() {
    diamondCount -= gamblePrice;
    btnGamble.disabled = true;

    if (diamondCount >= gamblePrice) {
        btnGamble.disabled = false;
    }
    document.getElementById("diamond-amount").innerHTML = diamondCount;

    chance = Math.floor(Math.random() * 1000 + 1)

    if (chance === 1) { // 0.1% CHANCE
        alert("FIRST PRIZE!!! YOU WON 500 DIAMONDS")
        diamondCount += 500
    } else if (chance >= 2 && chance <= 101) {
        alert("YOU WON 5,000 FLUX")
        fluxCount += 5000
        totalFlux += 5000
    } else {
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
        } else {
            List = []
        }
    }
})
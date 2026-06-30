const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const overlay = document.getElementById("overlay");
const rewardTitle = document.getElementById("rewardTitle");
const rewardSubtitle = document.getElementById("rewardSubtitle");
const claimBtn = document.getElementById("claimBtn");
const statusText = document.getElementById("statusText");

const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");

let spinning = false;
let currentRotation = 0;

const prizes = [
["500 грн","на Telegram-бот"],
["-15%","на перший бот"],
["-10%","на будь-яку послугу"],
["Instagram тригер","у подарунок"],
["Вітальне повідомлення","безкоштовно"],
["Супровід 1 місяць","після запуску"],
["Тригер на сторіс","у подарунок"]
];

spinBtn.addEventListener("click", spinWheel);

function spinWheel(){

if(spinning) return;

spinning = true;

statusText.innerText = "🎁 Перевіряємо ваш бонус...";

const prizeIndex = Math.floor(Math.random()*prizes.length);

const sectorAngle = 360 / prizes.length;

const extraSpins = 360 * 6;

const stopAngle = prizeIndex * sectorAngle;

currentRotation += extraSpins + stopAngle;

spinSound.currentTime = 0;
spinSound.play();

wheel.style.transform = `rotate(-${currentRotation}deg)`;

setTimeout(()=>{

spinSound.pause();

rewardTitle.innerText = prizes[prizeIndex][0];
rewardSubtitle.innerText = prizes[prizeIndex][1];

overlay.classList.remove("hidden");

winSound.currentTime = 0;
winSound.play();

confetti({
particleCount:180,
spread:100
});

spinning = false;

},6000);

}

claimBtn.addEventListener("click",()=>{

overlay.classList.add("hidden");

window.location.href =
"https://https://t.me/valia_botmaker_bot?start=bonus";

});
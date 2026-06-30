const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const overlay = document.getElementById("overlay");
const rewardTitle = document.getElementById("rewardTitle");
const rewardSubtitle = document.getElementById("rewardSubtitle");
const claimBtn = document.getElementById("claimBtn");
const statusText = document.getElementById("statusText");

const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxdLLidP2jZCHv_s5X22feqHnaQAW5u-fxcZpSoo2f64t0LlWke9-70APKlgeDbVt8Bqg/exec";

const BOT_LINK =
"https://t.me/valia_botmaker_bot";

let spinning = false;
let currentRotation = 0;
let currentPrize = null;

const prizes = [
{title:"500 грн",subtitle:"на Telegram-бот",code:"bonus_1"},
{title:"-15%",subtitle:"на перший бот",code:"bonus_2"},
{title:"-10%",subtitle:"на будь-яку послугу",code:"bonus_3"},
{title:"Instagram тригер",subtitle:"у подарунок",code:"bonus_4"},
{title:"Вітальне повідомлення",subtitle:"безкоштовно",code:"bonus_5"},
{title:"Супровід 1 місяць",subtitle:"після запуску",code:"bonus_6"},
{title:"Тригер на сторіс",subtitle:"у подарунок",code:"bonus_7"}
];

spinBtn.addEventListener("click", spinWheel);

function spinWheel(){

if(spinning) return;

spinning = true;

statusText.innerText =
"🎁 Перевіряємо ваш бонус...";

const prizeIndex =
Math.floor(Math.random()*prizes.length);

const prize = prizes[prizeIndex];

currentPrize = prize;

const sectorAngle =
360 / prizes.length;

const extraSpins =
360 * 6;

const stopAngle =
prizeIndex * sectorAngle;

currentRotation +=
extraSpins + stopAngle;

spinSound.currentTime = 0;
spinSound.play().catch(()=>{});

wheel.style.transform =
`rotate(-${currentRotation}deg)`;

setTimeout(async ()=>{

spinSound.pause();

rewardTitle.innerText =
"🎉 Ви виграли!";

rewardSubtitle.innerText =
`${prize.title} ${prize.subtitle}`;

await saveBonus(prize);

overlay.classList.remove("hidden");

winSound.currentTime = 0;
winSound.play().catch(()=>{});

confetti({
particleCount:180,
spread:100
});

statusText.innerText =
"🎉 Бонус готовий";

spinning = false;

},6000);

}

async function saveBonus(prize){

const tg = window.Telegram?.WebApp;
const user = tg?.initDataUnsafe?.user || {};

const data = {
telegram_id:user.id || "",
username:user.username || "",
first_name:user.first_name || "",
bonus_code:prize.code,
bonus_title:prize.title,
bonus_subtitle:prize.subtitle
};

await fetch(SCRIPT_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
});

}

claimBtn.addEventListener("click", ()=>{

overlay.classList.add("hidden");

if(window.Telegram?.WebApp){
window.Telegram.WebApp.close();
}else{
window.location.href = BOT_LINK;
}

});

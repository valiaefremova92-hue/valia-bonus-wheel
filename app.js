const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
}

const user = tg?.initDataUnsafe?.user || {};

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzsMpEUrLSh8NGNeSMX_XMh-WVfEVJ01PVq9Q93w2YUalkvo2pVT8EhyRcC0np_AeumeQ/exec";

const BOT_LINK =
"https://t.me/valia_botmaker_bot";

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
let currentPrize = null;

const prizes = [
{
title:"500 грн",
subtitle:"на Telegram-бот",
code:"bonus_1"
},
{
title:"-15%",
subtitle:"на перший бот",
code:"bonus_2"
},
{
title:"-10%",
subtitle:"на будь-яку послугу",
code:"bonus_3"
},
{
title:"Instagram тригер",
subtitle:"у подарунок",
code:"bonus_4"
},
{
title:"Вітальне повідомлення",
subtitle:"безкоштовно",
code:"bonus_5"
},
{
title:"Супровід 1 місяць",
subtitle:"після запуску",
code:"bonus_6"
},
{
title:"Тригер на сторіс",
subtitle:"у подарунок",
code:"bonus_7"
}
];

checkUser();

spinBtn.addEventListener("click", spinWheel);

async function checkUser(){

if(!user.id){
console.log("No Telegram user ID");
return;
}

try{

const response = await fetch(
`${SCRIPT_URL}?user_id=${user.id}`
);

const result = await response.json();

console.log("CHECK USER:", result);

if(result.status === "already_used"){

spinBtn.disabled = true;
spinBtn.style.opacity = ".5";

statusText.innerText =
"❌ Ви вже використали свою спробу";

}

}catch(error){

console.log("CHECK ERROR:", error);

}

}

function spinWheel(){

if(spinning || spinBtn.disabled) return;

spinning = true;

statusText.innerText =
"🎁 Крутимо барабан...";

const prizeIndex =
Math.floor(Math.random() * prizes.length);

const prize =
prizes[prizeIndex];

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

try{

await saveBonus(prize);

spinBtn.disabled = true;
spinBtn.style.opacity = ".5";

}catch(error){

console.log("SAVE ERROR:", error);

}

overlay.classList.remove("hidden");

winSound.currentTime = 0;

winSound.play().catch(()=>{});

confetti({
particleCount:180,
spread:100,
origin:{y:0.6}
});

statusText.innerText =
"🎉 Бонус готовий";

spinning = false;

},6000);

}

async function saveBonus(prize){

const data = {
telegram_id: user.id || "test_user",
username: user.username || "test_username",
first_name: user.first_name || "test_name",
bonus_code: prize.code,
bonus_title: prize.title,
bonus_subtitle: prize.subtitle,
date: new Date().toISOString()
};

console.log("SEND DATA:", data);

try{

const response = await fetch(
SCRIPT_URL,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(data)
}
);

const result = await response.text();

console.log("SCRIPT RESPONSE:", result);

}catch(error){

console.log("FETCH ERROR:", error);

throw error;

}

}

claimBtn.addEventListener("click", ()=>{

overlay.classList.add("hidden");

if(window.Telegram?.WebApp){

try{
Telegram.WebApp.close();
}catch(error){
window.location.href = BOT_LINK;
}

}else{

window.location.href = BOT_LINK;

}

});
window.location.href = BOT_LINK;

}

});

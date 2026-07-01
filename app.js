document.addEventListener("DOMContentLoaded", () => {

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwj4pvArkvOpCEgP8fyfGnsfxSvY5xyukDfyZKW30NSln1gM8OTY71Z4GF-VvnqYBDdZA/exec";

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

const prizes = [
{ title:"500 грн", subtitle:"на Telegram-бот", code:"bonus_1" },
{ title:"-15%", subtitle:"на перший бот", code:"bonus_2" },
{ title:"-10%", subtitle:"на будь-яку послугу", code:"bonus_3" },
{ title:"Instagram тригер", subtitle:"у подарунок", code:"bonus_4" },
{ title:"Вітальне повідомлення", subtitle:"безкоштовно", code:"bonus_5" },
{ title:"Супровід 1 місяць", subtitle:"після запуску", code:"bonus_6" },
{ title:"Тригер на сторіс", subtitle:"у подарунок", code:"bonus_7" }
];

spinBtn.onclick = function(){

if(spinning) return;

spinning = true;

statusText.innerText = "🎁 Крутимо барабан...";

const prizeIndex = Math.floor(Math.random() * prizes.length);
const prize = prizes[prizeIndex];

const sectorAngle = 360 / prizes.length;
const extraSpins = 360 * 6;
const stopAngle = prizeIndex * sectorAngle;

currentRotation += extraSpins + stopAngle;

spinSound.currentTime = 0;
spinSound.play().catch(()=>{});

wheel.style.transform = `rotate(-${currentRotation}deg)`;

setTimeout(() => {

spinSound.pause();

rewardTitle.innerText = "🎉 Ви виграли!";
rewardSubtitle.innerText = `${prize.title} ${prize.subtitle}`;

overlay.classList.remove("hidden");

winSound.currentTime = 0;
winSound.play().catch(()=>{});

confetti({
particleCount:180,
spread:100,
origin:{ y:0.6 }
});

statusText.innerText = "🎉 Бонус готовий";

saveBonus(prize);

spinning = false;

}, 6000);

};

function saveBonus(prize){

let chatId = "";
let username = "";
let firstName = "";

try{
const params = new URLSearchParams(window.location.search);

chatId = params.get("chat_id") || "";
username = params.get("username") || "";
firstName = params.get("name") || "";
}catch(e){
console.log("params error", e);
}

const data = {
telegram_id: chatId,
username: username,
first_name: firstName,
bonus_code: prize.code,
bonus_title: prize.title,
bonus_subtitle: prize.subtitle,
date: new Date().toISOString()
};

console.log("SEND DATA:", data);

fetch(SCRIPT_URL,{
method:"POST",
mode:"no-cors",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(data)
});

}

claimBtn.onclick = function(){

overlay.classList.add("hidden");

if(window.Telegram && window.Telegram.WebApp){
window.Telegram.WebApp.close();
}else{
window.location.href = BOT_LINK;
}

};

});
confetti({
particleCount:180,
spread:100,
origin:{ y:0.6 }
});

statusText.innerText = "🎉 Бонус готовий";

saveBonus(prize);

spinning = false;

}, 6000);

};

function saveBonus(prize){

let chatId = "";
let username = "";
let firstName = "";

try{
const params = new URLSearchParams(window.location.search);

chatId = params.get("chat_id") || "";
username = params.get("username") || "";
firstName = params.get("name") || "";
}catch(e){
console.log("params error", e);
}

const data = {
telegram_id: chatId,
username: username,
first_name: firstName,
bonus_code: prize.code,
bonus_title: prize.title,
bonus_subtitle: prize.subtitle,
date: new Date().toISOString()
};

console.log("SEND DATA:", data);

fetch(SCRIPT_URL,{
method:"POST",
mode:"no-cors",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(data)
});

}

claimBtn.onclick = function(){

overlay.classList.add("hidden");

if(window.Telegram && window.Telegram.WebApp){
window.Telegram.WebApp.close();
}else{
window.location.href = BOT_LINK;
}

};

});
statusText.innerText = "🎁 Крутимо барабан...";

const prizeIndex = Math.floor(Math.random() * prizes.length);
const prize = prizes[prizeIndex];

const sectorAngle = 360 / prizes.length;
const extraSpins = 360 * 6;
const stopAngle = prizeIndex * sectorAngle;

currentRotation += extraSpins + stopAngle;

spinSound.currentTime = 0;
spinSound.play().catch(()=>{});

wheel.style.transform = `rotate(-${currentRotation}deg)`;

setTimeout(() => {

spinSound.pause();

rewardTitle.innerText = "🎉 Ви виграли!";
rewardSubtitle.innerText = `${prize.title} ${prize.subtitle}`;

overlay.classList.remove("hidden");

winSound.currentTime = 0;
winSound.play().catch(()=>{});

confetti({
particleCount:180,
spread:100,
origin:{ y:0.6 }
});

statusText.innerText = "🎉 Бонус готовий";

saveBonus(prize);

spinning = false;

}, 6000);

};

function saveBonus(prize){

let chatId = "";
let username = "";
let firstName = "";

try{
const params = new URLSearchParams(window.location.search);

chatId = params.get("chat_id") || "";
username = params.get("username") || "";
firstName = params.get("name") || "";
}catch(e){
console.log("params error", e);
}

const data = {
telegram_id: chatId,
username: username,
first_name: firstName,
bonus_code: prize.code,
bonus_title: prize.title,
bonus_subtitle: prize.subtitle,
date: new Date().toISOString()
};

console.log(data);

fetch(SCRIPT_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(data)
}).catch(err => console.log(err));

}

claimBtn.onclick = function(){

overlay.classList.add("hidden");

if(window.Telegram && window.Telegram.WebApp){
window.Telegram.WebApp.close();
}else{
window.location.href = BOT_LINK;
}

};

});

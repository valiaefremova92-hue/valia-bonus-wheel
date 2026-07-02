const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxDSNvV8KHdXxiCJcZP5fNSTd5Z_9hKRotmboAq1xh6Mqpf9Fs9WqF-aNK2doEMFNqWAw/exec";

const BOT_LINK =
"https://t.me/valia_botmaker_bot";

const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}

const wheel = document.querySelector(".wheel-image");
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

spinBtn.onclick = spinWheel;

function spinWheel() {
  if (spinning) return;

  spinning = true;
  statusText.innerText = "🎁 Крутимо барабан...";

  const prizeIndex = Math.floor(Math.random() * prizes.length);
  const prize = prizes[prizeIndex];

  const sectorAngle = 360 / prizes.length;
  const extraSpins = 360 * 6;
  const stopAngle = prizeIndex * sectorAngle;

  currentRotation += extraSpins + stopAngle;

  spinSound.currentTime = 0;
  spinSound.play().catch(() => {});

  wheel.style.transition = "transform 6s ease-out";
  wheel.style.transform = `rotate(-${currentRotation}deg)`;

  setTimeout(() => {
    spinSound.pause();

    rewardTitle.innerText = "🎉 Ви виграли!";
    rewardSubtitle.innerText = `${prize.title} ${prize.subtitle}`;

    overlay.classList.remove("hidden");

    winSound.currentTime = 0;
    winSound.play().catch(() => {});

    confetti({
      particleCount: 180,
      spread: 100,
      origin: { y: 0.6 }
    });

    statusText.innerText = "🎉 Бонус готовий";

    saveBonus(prize);

    spinning = false;
  }, 6000);
}

function saveBonus(prize) {
  let user = {};

  try {
    user = tg?.initDataUnsafe?.user || {};
  } catch (error) {
    console.log("TG USER ERROR:", error);
  }

  const data = {
    telegram_id: user.id || "NO_ID",
    username: user.username || "NO_USERNAME",
    first_name: user.first_name || "NO_NAME",
    bonus_code: prize.code,
    bonus_title: prize.title,
    bonus_subtitle: prize.subtitle,
    date: new Date().toISOString()
  };

  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).catch(error => console.log(error));
}

claimBtn.onclick = function () {
  overlay.classList.add("hidden");

  if (tg) {
    tg.close();
  } else {
    window.location.href = BOT_LINK;
  }
};

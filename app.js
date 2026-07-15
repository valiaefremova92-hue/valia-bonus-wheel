const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyRwnKcBk4rPxabkNklpaXx_t26ORgsjwQJghsPa8rnfBCxiN6UBZLfPep_JS3lI0uSIA/exec";

const BOT_LINK =
"https://t.me/valia_botmaker_bot";

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
  { title: "500 грн", subtitle: "на Telegram-бот", code: "bonus_1" },
  { title: "-15%", subtitle: "на перший бот", code: "bonus_2" },
  { title: "-10%", subtitle: "на будь-яку послугу", code: "bonus_3" },
  { title: "Instagram тригер", subtitle: "у подарунок", code: "bonus_4" },
  { title: "Вітальне повідомлення", subtitle: "безкоштовно", code: "bonus_5" },
  { title: "Супровід 1 місяць", subtitle: "після запуску", code: "bonus_6" },
  { title: "Тригер на сторіс", subtitle: "у подарунок", code: "bonus_7" }
];

spinBtn.addEventListener("click", spinWheel);

function spinWheel() {

  if (spinning) return;

  spinning = true;

  // одразу блокуємо кнопку
  spinBtn.disabled = true;
  spinBtn.style.opacity = "0.6";
  spinBtn.style.cursor = "default";

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

    // міняємо текст кнопки після прокруту
    spinBtn.innerText = "✅ Спробу використано";

    spinning = false;

  }, 6000);

}

function saveBonus(prize) {

  const params = new URLSearchParams(window.location.search);

  const data = {
    telegram_id: params.get("chat_id") || "NO_ID",
    username: params.get("username") || "NO_USERNAME",
    first_name: params.get("name") || "NO_NAME",
    bonus_code: prize.code,
    bonus_title: prize.title,
    bonus_subtitle: prize.subtitle,
    date: new Date().toISOString()
  };

  console.log("SEND DATA:", data);

  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).catch(error => console.log("FETCH ERROR:", error));

}

claimBtn.addEventListener("click", () => {

  overlay.classList.add("hidden");

  window.location.href = BOT_LINK;

});

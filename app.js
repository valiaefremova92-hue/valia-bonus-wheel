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
let lastPrizeIndex = null;

const prizes = [
    {
        title: "500 грн",
        subtitle: "на Telegram-бот",
        code: "bonus_1"
    },
    {
        title: "-15%",
        subtitle: "на перший бот",
        code: "bonus_2"
    },
    {
        title: "-10%",
        subtitle: "на будь-яку послугу",
        code: "bonus_3"
    },
    {
        title: "Instagram тригер",
        subtitle: "у подарунок",
        code: "bonus_4"
    },
    {
        title: "Вітальне повідомлення",
        subtitle: "безкоштовно",
        code: "bonus_5"
    },
    {
        title: "Супровід 1 місяць",
        subtitle: "після запуску",
        code: "bonus_6"
    },
    {
        title: "Тригер на сторіс",
        subtitle: "у подарунок",
        code: "bonus_7"
    }
];

spinBtn.addEventListener("click", spinWheel);

function spinWheel() {
    if (spinning) return;

    spinning = true;

    statusText.innerText = "🎁 Перевіряємо ваш бонус...";

    const prizeIndex = Math.floor(
        Math.random() * prizes.length
    );

    lastPrizeIndex = prizeIndex;

    const sectorAngle = 360 / prizes.length;
    const extraSpins = 360 * 6;
    const stopAngle = prizeIndex * sectorAngle;

    currentRotation += extraSpins + stopAngle;

    spinSound.currentTime = 0;
    spinSound.play();

    wheel.style.transform = `rotate(-${currentRotation}deg)`;

    setTimeout(() => {

        spinSound.pause();

        const prize = prizes[prizeIndex];

        rewardTitle.innerText = "🎉 Ви виграли!";
        rewardSubtitle.innerText =
            `${prize.title} ${prize.subtitle}`;

        overlay.classList.remove("hidden");

        winSound.currentTime = 0;
        winSound.play();

        confetti({
            particleCount: 180,
            spread: 100,
            origin: { y: 0.6 }
        });

        statusText.innerText = "🎉 Бонус готовий";

        spinning = false;

    }, 6000);
}

claimBtn.addEventListener("click", () => {

    overlay.classList.add("hidden");

    if (lastPrizeIndex === null) return;

    const selectedPrize =
        prizes[lastPrizeIndex];

    const scriptUrl =
        "https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbxmngNQgTeRPOETH2TGLdeVvDr4encqGl_sWh94RhXz6RrhO8d925fUWuS8P3-_KX8duA/exec";

    window.location.href =
        `${scriptUrl}?bonus=${selectedPrize.code}`;
});

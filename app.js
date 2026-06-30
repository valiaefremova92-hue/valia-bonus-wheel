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

/* prizes */
const prizes = [
    ["500 грн", "на Telegram-бот"],
    ["-15%", "на перший бот"],
    ["-10%", "на будь-яку послугу"],
    ["Instagram тригер", "у подарунок"],
    ["Вітальне повідомлення", "безкоштовно"],
    ["Супровід 1 місяць", "після запуску"],
    ["Тригер на сторіс", "у подарунок"]
];

/* spin button */
spinBtn.addEventListener("click", spinWheel);

/* spin logic */
function spinWheel() {
    if (spinning) return;

    spinning = true;

    statusText.innerText = "🎁 Перевіряємо ваш бонус...";

    const prizeIndex = Math.floor(
        Math.random() * prizes.length
    );

    const sectorAngle = 360 / prizes.length;
    const extraSpins = 360 * 6;
    const stopAngle = prizeIndex * sectorAngle;

    currentRotation += extraSpins + stopAngle;

    /* start sound */
    spinSound.currentTime = 0;
    spinSound.play();

    /* rotate wheel */
    wheel.style.transform =
        `rotate(-${currentRotation}deg)`;

    /* finish spin */
    setTimeout(() => {

        /* stop spin sound */
        spinSound.pause();

        /* popup text */
        rewardTitle.innerText =
            "🎉 Ви виграли!";

        rewardSubtitle.innerText =
            `${prizes[prizeIndex][0]} ${prizes[prizeIndex][1]}`;

        /* show popup */
        overlay.classList.remove("hidden");

        /* win sound */
        winSound.currentTime = 0;
        winSound.play();

        /* confetti */
        confetti({
            particleCount: 180,
            spread: 100,
            origin: { y: 0.6 }
        });

        /* status */
        statusText.innerText =
            "🎉 Бонус готовий";

        spinning = false;

    }, 6000);
}

/* claim button */
claimBtn.addEventListener("click", () => {

    overlay.classList.add("hidden");

    /* redirect to bot */
    window.location.href =
        "https://t.me/valia_botmaker_bot?start=bonus";

});

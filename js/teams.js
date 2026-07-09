import { state } from "./state.js";
import { updatelevelSlider, updatemasterSlider, updateskillSlider } from "./slider.js";
import { reloadCard } from "./cardlist.js";

const HOLD_TIME = 500;

document.querySelectorAll(".teams-member-slot").forEach(card => {
    let pressTimer = null;

    card.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        deleteCard(card.dataset.slotid);
    });

    card.addEventListener("touchstart", (e) => {
        pressTimer = setTimeout(() => {
            deleteCard(card.dataset.slotid);
        }, 700);
    });

    card.addEventListener("touchend", () => clearTimeout(pressTimer));
    card.addEventListener("touchmove", () => clearTimeout(pressTimer));
});

function deleteCard(slotId) {
    let characterNames = [];
    const slot = state.TEAMS[slotId];

    document.getElementById(`setting-icon`).style.backgroundImage = null;
    document.querySelector(`[data-slotid="${slotId}"]`).style.backgroundImage = null;
    document.querySelector(`[data-slot-plus-id="${slotId}"]`).classList.remove("none");
    document.querySelector(`[data-card-id="${slot.cardId}"]`).classList.remove("disabled");
    document.querySelector("#level_slider").value = "1";
    document.querySelector("#master_slider").value = "0";

    document.querySelectorAll('input[type="button"]').forEach(p => {
        p.classList.remove("button-active");
    });

    state.TEAMS[slotId] = null;

    updatelevelSlider();
    updatemasterSlider();
    updateskillSlider();

    console.log(state.TEAMS)
    document.getElementById(`canvas-image${parseInt(slotId) + 1}`).style.backgroundImage = null;

    state.TEAMS.forEach(p => {
        p ? characterNames.push(p.character) : null;
    });

    document.querySelectorAll(".card").forEach(card => {
        if (!characterNames.includes(card.dataset.character)) card.classList.remove("disabled");
    });
}


document.querySelectorAll(".teams-member-slot").forEach(slot => {
    let holdTimer = null;
    let progressTimer = null;
    let startTime = 0;

    const startHold = () => {
        startTime = Date.now();
        slot.classList.add("is-holding");

        progressTimer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const rate = Math.min(elapsed / HOLD_TIME, 1);
            const deg = rate * 360;

            slot.querySelector(".hold-progress").style.background =
                `conic-gradient(#ff7aa2 ${deg}deg, transparent ${deg}deg)`;
        }, 1);

        holdTimer = setTimeout(() => {
            clearInterval(progressTimer);
            slot.classList.remove("is-holding");
        }, HOLD_TIME);
    };

    let delayTimer;

    slot.addEventListener("pointerdown", () => {
        delayTimer = setTimeout(() => {
            startHold();
        }, 200);
    });

    const cancelHold = () => {
        clearTimeout(delayTimer); // 200ms経つ前なら開始しない
        clearTimeout(holdTimer);
        clearInterval(progressTimer);

        slot.classList.remove("is-holding");
        slot.querySelector(".hold-progress").style.background =
            "conic-gradient(#ff7aa2 0deg, transparent 0deg)";
    };

    slot.addEventListener("pointerup", cancelHold);
    slot.addEventListener("pointerleave", cancelHold);
    slot.addEventListener("pointercancel", cancelHold);
});
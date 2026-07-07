import { updatelevelSlider, updatemasterSlider } from "./slider.js";
import { cardDetail, getConstructNumber, iconToggleTraining, state } from "./state.js";

const slots = document.querySelectorAll(".teams-member-slot");
const storyBtn = document.querySelectorAll(".story");
const canvasBtn = document.querySelectorAll(".canvas");
const trainingBtn = document.querySelectorAll(".training");

const detailBtn = document.querySelector(".detail-open");

slots.forEach(slot => {
    slot.addEventListener("click", () => {
        slots.forEach(s => s.classList.remove("selected"));
        slot.classList.add("selected");
        state.SELECTED_SLOT = parseInt(slot.dataset.slotid);

        if (!state.STATE) {
            document.querySelectorAll(".card").forEach(card => {
                card.classList.remove("disabled");
            });
            state.STATE = true;
        } else {
            const slotId = state.TEAMS[state.SELECTED_SLOT];

            document.querySelectorAll(".card").forEach(p => {
                state.TEAMS.forEach((t, i) => {
                    if(i != state.SELECTED_SLOT){
                        t ? t.character == p.dataset.character ? p.classList.add("disabled") : null : null;
                    } else {
                        if(p.dataset.cardId != t?.cardId) {
                            t ? t.character == p.dataset.character ? p.classList.remove("disabled") : null : null;
                        }
                    }
                });
            });

            

            cardDetail(slotId);

        }
    });
});

storyBtn.forEach(story => {
    story.addEventListener("click", () => {
        const slotId = state.TEAMS[state.SELECTED_SLOT];
        story.classList.toggle("button-active");
        story.dataset.story = story.dataset.story === "true" ? "false" : "true";
        slotId ? slotId[`story_part${getConstructNumber(story.id)}`] = story.dataset.story : false;

        updatelevelSlider();
        updatemasterSlider();
    });
});

canvasBtn.forEach(canvas => {
    canvas.addEventListener("click", () => {
        const slotId = state.TEAMS[state.SELECTED_SLOT];
        canvas.classList.toggle("button-active");
        canvas.dataset.canvas = canvas.dataset.canvas === "true" ? "false" : "true";
        slotId ? slotId.canvas = canvas.dataset.canvas : false;

        updatelevelSlider();
        updatemasterSlider();
    });
});

trainingBtn.forEach(training => {
    training.addEventListener("click", () => {
        const slotId = state.TEAMS[state.SELECTED_SLOT];
        training.classList.toggle("button-active");
        training.dataset.training = training.dataset.training === "true" ? "false" : "true";
        slotId ? slotId.training = training.dataset.training : false;

        iconToggleTraining(slotId.rarity, slotId.cardId);
        
        updatelevelSlider();
        updatemasterSlider();
    });
});

detailBtn.addEventListener("click", () => {
    document.querySelector(".teams").classList.toggle("open");
    document.querySelector(".cards-list").classList.toggle("open");
    document.querySelector(".teams-namebox-power-dev").classList.toggle("open");
    document.querySelector(".settings-responsive").classList.toggle("open");
});

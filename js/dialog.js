import { getConstructNumber, state, toggleFilter } from "./state.js";
import { reloadCard } from "./cardlist.js";
import { updatelevelSlider, updatemasterSlider } from "./slider.js";

const resetDialog = document.querySelector(".resetDialog");
const dialog = document.querySelector(".filterDialog");

const icons = document.querySelectorAll(".filter-dialog-unit-icon");

const unit = document.querySelector(".filter-dialog-unit-div");
const member = document.querySelector(".filter-dialog-member-div");
const rarity = document.querySelector(".filter-dialog-rarity-div");
const type = document.querySelector(".filter-dialog-type-div");

document.getElementById("reset-button").addEventListener("click", () => {
    if (state.TEAMS[state.SELECTED_SLOT]) resetDialog.showModal();
});

document.getElementById("filter-button").addEventListener("click", () => {
    if (!state.DIALOG) {
        state.UNIT.forEach((param) => {
            const unitElement = document.createElement("div");
            unitElement.classList.add("filter-dialog-unit-icon");
            unitElement.id = param.key;
            unitElement.style.backgroundImage = `url("./image/icon/unit/${param.key}.png")`;

            unit.appendChild(unitElement);

            param.member.forEach(p => {
                const memberElement = document.createElement("div");
                memberElement.classList.add("filter-dialog-member-icon");
                memberElement.id = p;
                memberElement.dataset.unit = unitElement.id;
                memberElement.style.backgroundImage = `url("./image/icon/member/${p}.png")`;

                member.appendChild(memberElement);

                memberElement.addEventListener("click", () => {
                    memberElement.classList.toggle("non-selected");
                    toggleFilter("member", memberElement.id)
                    document.querySelector(".cards").replaceChildren();
                    reloadCard();
                    
                });
            });

            unitElement.addEventListener("click", () => {
                const memEle = document.querySelectorAll(".filter-dialog-member-icon");

                memEle.forEach(p => {
                    if (unitElement.id == p.dataset.unit) {
                        p.classList.toggle("non-selected");
                        toggleFilter("member", p.id)
                    }
                });

                unitElement.classList.toggle("non-selected");
                document.querySelector(".cards").replaceChildren();
                reloadCard();
            });

        });

        state.TYPE.forEach(p => {
            const typeElement = document.createElement("div");
            typeElement.classList.add("filter-dialog-type-icon");
            typeElement.id = p;
            typeElement.style.backgroundImage = `url("./image/icon/type/${p}.png")`;

            type.appendChild(typeElement);

            typeElement.addEventListener("click", () => {
                typeElement.classList.toggle("non-selected");
                toggleFilter("type", typeElement.id)
                document.querySelector(".cards").replaceChildren();
                reloadCard();
            });
        });

        for (var i = 1; i <= 5; i++) {
            let rarityBg;
            const rarityElement = document.createElement("div");
            rarityElement.classList.add("filter-dialog-rarity-icon");
            rarityElement.id = `rarityImg${i}`;

            (i <= 2 || i == 5) ? rarityBg = `url("./image/icon/star.png")` : rarityBg = `url("./image/icon/starTraining.png")`
            
            rarityElement.style.backgroundImage = rarityBg;

            rarity.appendChild(rarityElement);

            document.getElementById(`rarityImg${i}`).style.width = `${6 + (4 * (i - 1))}cqh`;
            document.getElementById(`rarityImg${i}`).style.height = "6cqh";
            document.getElementById(`rarityImg${i}`).style.backgroundSize = `${100 / i}% auto`;


            if (i == 5) {
                rarityElement.style.backgroundImage = `url("./image/icon/ribbon.png")`;
                document.getElementById(`rarityImg${i}`).style.width = `6cqh`;
                document.getElementById(`rarityImg${i}`).style.backgroundSize = `100% 100%`;
            }

            rarityElement.addEventListener("click", () => {
                rarityElement.classList.toggle("non-selected");
                toggleFilter("rarity", getConstructNumber(rarityElement.id))
                document.querySelector(".cards").replaceChildren();
                reloadCard();
            });

        }

        state.DIALOG = true;
    }


    dialog.showModal();
});

document.getElementById("reset-dialog-cancel").addEventListener("click", () => {
    resetDialog.close();
});

document.getElementById("reset-dialog-ok").addEventListener("click", () => {
    const slot = state.TEAMS[state.SELECTED_SLOT];
    document.querySelector("#canvas").dataset.canvas = "false";
    document.querySelector("#story-part1").dataset.story = "false";
    document.querySelector("#story-part2").dataset.story = "false";
    document.querySelector("#level_slider").value = "1";
    document.querySelector("#master_slider").value = "0";

    slot.canvas = "false";
    slot.story_part1 = "false";
    slot.story_part2 = "false";

    document.querySelectorAll('input[type="button"]').forEach(p => {
        p.classList.remove("button-active");
    });

    updatelevelSlider();
    updatemasterSlider();

    resetDialog.close();
});

// document.getElementById("dialog-cancel").addEventListener("click", () => {
//     dialog.close();
// });

// document.getElementById("dialog-ok").addEventListener("click", () => {
//     dialog.close();
// });

dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();

    const isOutside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

    if (isOutside) {
        //console.log(document.querySelectorAll(".non-selected"))
        dialog.close();




    }
});
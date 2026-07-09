import { state, observer, cardDetail } from "./state.js";

const cardsArea = document.querySelector(".cards");
const membersArea = document.querySelector(".teams-member-div");

const API_URL = location.hostname === "localhost" ? "http://localhost:3000" : "https://pjsk-simulator-api.onrender.com";

export async function reloadCard() {
    let length = 0;

    const response = await fetch(`${API_URL}/api/cards`);
    const cards = await response.json();

    cards.forEach(card => {
        if (!state.FILTER.unit.includes(card.Unit) && !state.FILTER.rarity.includes(card.Rarity) && !state.FILTER.type.includes(card.Attr) && !state.FILTER.member.includes(card.CharacterName)) {
            const cardElement = document.createElement("div");
            length += 1;
            cardElement.classList.add("card");
            cardElement.classList.add("disabled");

            cardElement.dataset.cardId = card.CardID;
            cardElement.dataset.character = card.CharacterName;
            cardElement.dataset.rarity = card.Rarity;
            cardElement.dataset.type = card.Attr;
            cardElement.dataset.unit = card.Unit;
            cardElement.dataset.subunit = card.SubUnit;
            cardElement.dataset.minperformance = card.MinPerformance;
            cardElement.dataset.performance = card.MinPerformance;
            cardElement.dataset.trainperformance = card.TrainingPerformance;
            cardElement.dataset.maxperformance = card.MaxPerformance;
            cardElement.dataset.mintechnique = card.MinTechnique;
            cardElement.dataset.technique = card.MinTechnique;
            cardElement.dataset.traintechnique = card.TrainingTechnique;
            cardElement.dataset.maxtechnique = card.MaxTechnique;
            cardElement.dataset.minstamina = card.MinStamina;
            cardElement.dataset.stamina = card.MinStamina;
            cardElement.dataset.trainstamina = card.TrainingStamina;
            cardElement.dataset.maxstamina = card.MaxStamina;
            cardElement.dataset.level = 1;
            cardElement.dataset.master = 0;
            cardElement.dataset.story_part1 = false;
            cardElement.dataset.story_part2 = false;
            cardElement.dataset.canvas = false;
            cardElement.dataset.training = false;

            observer.observe(cardElement);

            cardsArea.appendChild(cardElement)




            cardElement.addEventListener("click", () => {
                const cardObj = {
                    cardId: cardElement.dataset.cardId,
                    character: cardElement.dataset.character,
                    rarity: cardElement.dataset.rarity,
                    type: cardElement.dataset.type,
                    unit: cardElement.dataset.unit,
                    subunit: cardElement.dataset.subunit,
                    minperformance: cardElement.dataset.minperformance,
                    performance: cardElement.dataset.performance,
                    trainperformance: cardElement.dataset.trainperformance,
                    maxperformance: cardElement.dataset.maxperformance,
                    mintechnique: cardElement.dataset.mintechnique,
                    technique: cardElement.dataset.technique,
                    traintechnique: cardElement.dataset.traintechnique,
                    maxtechnique: cardElement.dataset.maxtechnique,
                    minstamina: cardElement.dataset.minstamina,
                    stamina: cardElement.dataset.stamina,
                    trainstamina: cardElement.dataset.trainstamina,
                    maxstamina: cardElement.dataset.maxstamina,
                    level: cardElement.dataset.level,
                    master: cardElement.dataset.master,
                    story_part1: cardElement.dataset.story_part1,
                    story_part2: cardElement.dataset.story_part2,
                    canvas: cardElement.dataset.canvas,
                    training: cardElement.dataset.training,
                };

                if (state.TEAMS[state.SELECTED_SLOT]?.cardId) {
                    const selectedCard = cardsArea.querySelector(`[data-card-id="${state.TEAMS[state.SELECTED_SLOT].cardId}"]`);

                    if (selectedCard) {
                        selectedCard.dataset.isSelected = false;
                        selectedCard.classList.remove("disabled");
                    }

                } else {
                    cardElement.dataset.isSelected = true;
                }

                if (cardElement.dataset.isSelected) {
                    cardElement.classList.add("disabled");
                }

                cardElement.classList.add("disabled");

                const memberSlot = membersArea.querySelector(`[data-slotid="${state.SELECTED_SLOT}"]`);

                state.TEAMS[state.SELECTED_SLOT] = cardObj;

                memberSlot.style.backgroundImage = `url('./image/cards/non_training/${cardObj.cardId}.png')`;
                memberSlot.querySelector("span")?.classList.add("none");


                cardDetail(cardObj);
            });

            document.getElementById("card_loading").classList.add("hidden");
        }
    });


    if (state.STATE) {

        let c = [];
        state.TEAMS.forEach(p => {
            p ? c.push(p.cardId) : null;
        });

        document.querySelectorAll(".card").forEach(card => {
            if (c.includes(card.dataset.cardId)) return;
            card.classList.remove("disabled");
        });
    }

    document.querySelector(".cards-length-text").textContent = `全 ${length} 枚`;
}

await reloadCard();
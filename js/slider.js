import { state } from "./state.js";
import { canvasCalc, detailCalc, levelCalc, masterCalc, sliderBg, storyCalc } from "./calculate.js";

const level_slider = document.querySelector(".level");
const master_slider = document.querySelector(".master");
const skill_slider = document.querySelector(".skill");

export function updatelevelSlider() {
    const obj = state.TEAMS[state.SELECTED_SLOT];
    const rarity = obj?.rarity;
    const min_param = [obj?.minperformance, obj?.mintechnique, obj?.minstamina];
    const max_param = [obj?.maxperformance, obj?.maxtechnique, obj?.maxstamina];
    const train_param = [rarity, obj?.trainperformance, obj?.traintechnique, obj?.trainstamina];
    const storyArr = [obj?.story_part1, obj?.story_part2];
    const levelSliderEle = document.getElementById("level_slider");
    const masterSliderEle = document.getElementById("master_slider");
    const canvasEle = document.getElementById(`canvas`);

    sliderBg(level_slider);

    document.getElementById("lv-text").textContent = level_slider.value;

    if(state.STATE){
        state.TEAMS[state.SELECTED_SLOT] ? state.TEAMS[state.SELECTED_SLOT].level = level_slider.value : null;
    }

    detailCalc(min_param, train_param, levelCalc(min_param, max_param, train_param, levelSliderEle.value, levelSliderEle.max), storyCalc(storyArr, rarity), masterCalc(masterSliderEle.value, rarity), canvasCalc(canvasEle.dataset.canvas, rarity));
}

export function updatemasterSlider() {
    const obj = state.TEAMS[state.SELECTED_SLOT];
    const rarity = obj?.rarity;
    const min_param = [obj?.minperformance, obj?.mintechnique, obj?.minstamina];
    const max_param = [obj?.maxperformance, obj?.maxtechnique, obj?.maxstamina];
    const train_param = [rarity, obj?.trainperformance, obj?.traintechnique, obj?.trainstamina];
    const storyArr = [obj?.story_part1, obj?.story_part2];
    const levelSliderEle = document.getElementById("level_slider");
    const masterSliderEle = document.getElementById("master_slider");
    const canvasEle = document.getElementById(`canvas`);

    sliderBg(master_slider);

    document.getElementById("master-text").textContent = master_slider.value;

    if(state.STATE){
        state.TEAMS[state.SELECTED_SLOT] ? state.TEAMS[state.SELECTED_SLOT].master = master_slider.value : null;
    }

    detailCalc(min_param, train_param, levelCalc(min_param, max_param, train_param, levelSliderEle.value, levelSliderEle.max), storyCalc(storyArr, rarity), masterCalc(masterSliderEle.value, rarity), canvasCalc(canvasEle.dataset.canvas, rarity));

}

export function updateskillSlider() {
    const percent =
        (skill_slider.value - skill_slider.min) /
        (skill_slider.max - skill_slider.min) * 100;

    skill_slider.style.background =
        `linear-gradient(to right,
        #ff8fc7 0%,
        #ff8fc7 ${percent}%,
        #ddd ${percent}%,
        #ddd 100%)`;
    
    document.getElementById("skill-text").textContent = skill_slider.value;
}

updatelevelSlider();
updatemasterSlider();
updateskillSlider();

level_slider.addEventListener("input", updatelevelSlider);
master_slider.addEventListener("input", updatemasterSlider);
skill_slider.addEventListener("input", updateskillSlider);
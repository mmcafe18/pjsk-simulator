import { updatelevelSlider, updatemasterSlider } from "./slider.js";
import { canvasCalc, detailCalc, levelCalc, masterCalc, powerCalc, sliderBg, storyCalc, teamsImage } from "./calclate.js";

export const state = {
    STATE: false,
    DIALOG: false,
    SELECTED_SLOT: 0,
    TEAMS: [null, null, null, null, null],
    TYPE: ["cool", "cute", "pure", "happy", "mysterious"],
    FILTER: {
        "unit": [],
        "member": [],
        "rarity": [],
        "type": []
    },
    UNIT: [
        { key: "vs", member: ["miku", "rin", "len", "luka", "meiko", "kaito"] },
        { key: "leo", member: ["ichika", "saki", "honami", "shiho"] },
        { key: "mmj", member: ["minori", "haruka", "airi", "shizuku"] },
        { key: "vbs", member: ["kohane", "an", "akito", "toya"] },
        { key: "ws", member: ["tsukasa", "emu", "nene", "rui"] },
        { key: "25", member: ["kanade", "mafuyu", "ena", "mizuki"] }
    ],
    LEVEL: {
        1: 20,
        2: 30,
        3: 50,
        4: 60,
        5: 60
    },
    MASTER: {
        1: 50,
        2: 100,
        3: 150,
        4: 200,
        5: 180
    },
    SIDE_STORY: {
        1: [100, 200],
        2: [150, 300],
        3: [200, 500],
        4: [250, 600],
        5: [250, 600]
    },
    CANVAS: {
        1: 100,
        2: 200,
        3: 300,
        4: 500,
        5: 400
    },
    TRAINING: {
        1: [0, 0],
        2: [0, 0],
        3: [39, 300],
        4: [49, 400],
        5: [0, 0]
    }
}

export function getConstructNumber(str) {
    return Number(str.replace(/\D/g, ""));
}

export const page = new MutationObserver((mutations) => {
    powerCalc();
    teamsImage();
});

page.observe(document.querySelector(".settings"), {
    childList: true,    // 子要素の追加・削除
    subtree: true,      // body以下すべて監視
    attributes: true,   // 属性(class, styleなど)の変更
    characterData: true // テキストの変更
});

export const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        element.style.backgroundImage = `url("/image/cards/non_training/${element.dataset.cardId}.png")`;
        observer.unobserve(element);
    });
});

export function imageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);

        img.src = url;
    });
}



export function cardDetail(obj){
    const cardId = obj?.cardId;
    const rarity = obj?.rarity;
    const level = obj?.level;
    const master = obj?.master;
    const storyArr = [obj?.story_part1, obj?.story_part2];
    const canvas = obj?.canvas;
    const min_param = [obj?.minperformance, obj?.mintechnique, obj?.minstamina];
    const max_param = [obj?.maxperformance, obj?.maxtechnique, obj?.maxstamina];
    const train_param = [rarity, obj?.trainperformance, obj?.traintechnique, obj?.trainstamina];

    const canvasEle = document.getElementById(`canvas`);
    const levelSliderEle = document.getElementById("level_slider");
    const masterSliderEle = document.getElementById("master_slider");

    document.getElementById("setting-icon").style.backgroundImage = `url("/image/cards/non_training/${cardId}.png")`;
    
    rarity ? document.getElementById("level_slider_max").textContent = state.LEVEL[rarity] : document.getElementById("level_slider_max").textContent = 20;
    rarity ? levelSliderEle.max = state.LEVEL[rarity] : document.querySelector(".level").max = 20;

    level ? document.getElementById("lv-text").textContent = level : document.getElementById("lv-text").textContent = 1;
    level ? levelSliderEle.value = level : levelSliderEle.value = 1;
    
    master ? document.getElementById("master-text").textContent = master : document.getElementById("master-text").textContent = 0;
    master ? masterSliderEle.value = master : masterSliderEle.value = 0;
    
    canvasEle.dataset.canvas = canvas;
    canvasEle.dataset.canvas === "true" ? canvasEle.classList.add("button-active") : canvasEle.classList.remove("button-active");

    storyArr.forEach((part, index) => {
        const ele = document.getElementById(`story-part${index + 1}`);
        ele.dataset.story = part;
        ele.dataset.story === "true" ? ele.classList.add("button-active") : ele.classList.remove("button-active");
    });

    min_param.forEach((param, index) => {
        param ? document.getElementById(`param${(index + 1)}`).textContent = param : document.getElementById(`param${(index + 1)}`).textContent = 0;
    });


    //console.log(storyArr)

    updatelevelSlider();
    updatemasterSlider();

    
    detailCalc(min_param, train_param, levelCalc(min_param, max_param, train_param, levelSliderEle.value, levelSliderEle.max), storyCalc(storyArr, rarity), masterCalc(masterSliderEle.value, rarity), canvasCalc(canvasEle.dataset.canvas, rarity));
    //console.log();

    sliderBg(document.querySelector(".level"));
    sliderBg(document.querySelector(".master"));
};

export function toggleFilter(category, value) {
    const list = state.FILTER[category];

    if (list.includes(value)) {
        state.FILTER[category] = list.filter(item => item !== value);
    } else {
        list.push(value);
    }
};

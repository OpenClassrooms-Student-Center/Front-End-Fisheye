import { LayoutsFactory } from "../factories/LayoutsFactory.js";
import { ComponentsFactory } from "../factories/ComponentsFactory.js";

let photographers;

async function getPhtotgrapher(photographerId) {
    let photographer;

    /* 
        If the local storage as a entry with key "photographers", get its value 
        Else, get datas from the json file and store it in the local storage
    */
    if (localStorage.getItem("photographers")) {
        photographers = JSON.parse(localStorage.getItem("photographers"));
        photographer = photographers.filter((user) => user.id == photographerId)[0];
    } else {
        const res = await (await fetch("../../data/photographers.json")).json();

        photographers = res.photographers;

        photographers.forEach((photographer) => {
            photographer.medias = res.media.filter((media) => media.photographerId === photographer.id);
            photographer.medias.map((media) => {
                media.isLiked = false;
            });
        });

        localStorage.setItem("photographers", JSON.stringify(photographers));

        photographer = photographers.filter((user) => user.id == photographerId)[0];
    }

    return photographer;
}

function displayData(data) {
    const layoutsFactory = new LayoutsFactory();
    const componentsFactory = new ComponentsFactory();

    const header = layoutsFactory.getPhotographerHeaderDOM(componentsFactory.getLogoDOM());
    const main = layoutsFactory.getPhotographerMainDOM(data, componentsFactory);

    document.querySelector("body").prepend(main);
    document.querySelector("body").prepend(header);
}

const unlikeMedia = (media) => {
    media.isLiked = false;
    media.likes -= 1;
};

const likeMedia = (media) => {
    media.isLiked = true;
    media.likes += 1;
};

async function init() {
    const photographer = await getPhtotgrapher(window.location.search.split("&")[0].split("=")[1]);
    displayData(photographer);

    const likeButtons = document.querySelectorAll(".like-btn");
    likeButtons.forEach((likeBtn) =>
        likeBtn.addEventListener("click", () => {
            const media = photographer.medias.filter((media) => media.id == likeBtn.id)[0];
            if (media.isLiked) {
                unlikeMedia(media);
            } else {
                likeMedia(media);
            }

            likeBtn.querySelector(".like-btn__counter").textContent = media.likes;

            let newTotalCount = 0;
            photographer.medias.map((storedMedia) => (newTotalCount += storedMedia.likes));
            document.querySelector(".photographer-likes__counter").textContent = newTotalCount;

            photographers
                .filter((storedPhotographer) => storedPhotographer.id == photographer.id)[0]
                .medias.filter((storedMedia) => storedMedia.id == media.id)[0] = media;

            localStorage.setItem("photographers", JSON.stringify(photographers));
        })
    );
}

init();

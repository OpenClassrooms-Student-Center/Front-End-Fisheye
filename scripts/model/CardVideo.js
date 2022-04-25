import sliderFactory from "../factories/slider.js";

export default function videoBuild(media, sortMedia, name) {
    const pathName = name.split(/-| /).join("")
    const photoPath = `../assets/Sample_Photos/${pathName}/${media.video}`;
    console.log(media)
    const article = `
                <video src=${photoPath} class="photo"></video>
                <span class="photo__title" >${media.title}</span>
                <span class="photo__likes" >${media.likes}</span>
                <i class="fas fa-heart"></i>`
       
    let card = document.createElement("article")
    const container = document.querySelector(".photo-field")
    
    card.innerHTML += article
    container.appendChild(card);

    const video = card.querySelector(".photo");
    video.addEventListener("click", () => sliderFactory(media, sortMedia, name))
}
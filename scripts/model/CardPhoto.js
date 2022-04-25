import sliderFactory from "../factories/slider.js";

export default function photoBuild(media, sortMedia, name) {
    const pathName = name.split(/-| /).join("")
    const photoPath = `../assets/Sample_Photos/${pathName}/${media.image}`;
  
    const article = `
                <img src=${photoPath} class="photo"></img>
                <span class="photo__title" >${media.title}</span>
                <span class="photo__likes" >${media.likes}</span>
                <i class="fas fa-heart"></i>`
       
    let card = document.createElement("article")
    const container = document.querySelector(".photo-field")
    
    card.innerHTML += article
    container.appendChild(card);

    const img = card.querySelector(".photo");
    img.addEventListener("click", () => sliderFactory(media, sortMedia, name))
}

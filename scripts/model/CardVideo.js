import sliderFactory from "../factories/slider.js";

// export default function videoBuild(media, sortMedia, name) {
//     const pathName = name.split(/-| /).join("")
//     const photoPath = `../assets/Sample_Photos/${pathName}/${media.video}`;
//     console.log(media)
//     const article = `
//                 <video src=${photoPath} class="photo"></video>
//                 <span class="photo__title" >${media.title}</span>
//                 <span class="photo__likes" >${media.likes}</span>
//                 <i class="fas fa-heart"></i>`
       
//     let card = document.createElement("article")
//     const container = document.querySelector(".photo-field")
    
//     card.innerHTML += article
//     container.appendChild(card);

//     const video = card.querySelector(".photo");
//     video.addEventListener("click", () => sliderFactory(media, sortMedia, name))

//     return card
// }

export default class Video {
    constructor(media, name) {
        this._name = name[0].name
        this._pathMedia = media.video
        this._tag = "iFrame"
        this._title = media.title
        this._likes = media.likes
        this._pathName = this.name.split(/-| /).join("")
        this._path = `../assets/Sample_Photos/${this._pathName}/${this._pathMedia}`
    }
    
    get path(){
        return this._path
    }
    get pathName(){
        return this._pathName
    }
    get name() {
        return this._name
    }
    get tag(){
        return this._tag
    }
    get title(){
        return this._title
    }
    get likes(){
        return this._likes
    }
}

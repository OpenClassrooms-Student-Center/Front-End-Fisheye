// import sliderFactory from "../factories/slider.js";
// import photoCard from "../templates/Card.js";

// export default function photoBuild(media, name) {
//     const pathName = name.split(/-| /).join("")
//     const photoPath = `../assets/Sample_Photos/${pathName}/${media.image}`;
//     console.log(media)
//     const tag = "img"
    
       
//     let card = document.createElement("article")
//     const container = document.querySelector(".photo-field")
    
//     card.innerHTML += article
//     // container.appendChild(card);
//     photoCard(media, tag, name)

//     const img = card.querySelector(".photo");
//     img.addEventListener("click", () => sliderFactory(media, sortMedia, name))

//     return card
// }

export default class Photo {
    constructor(media, name) {
        this._name = name[0].name
        this._pathMedia = media.image
        this._tag = "img"
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

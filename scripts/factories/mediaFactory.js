import { mediaArrayById, photographer } from "../models/photographer.js";
export function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;
    
    // Template media
    // console.log(title)
    const wrapper = document.createElement('article');
    wrapper.classList.add("photographies")

    const picture = `assets/images/${data.photographerId}/${image}`;
    const mediaVideo = `assets/images/${data.photographerId}/${video}`;

    // const media = data
    // console.log(media.title)
    let compteur = likes

    function getUserMediaDOM() {
        let media;
        if(data.image) {
            media = `
                <a href="${picture}" aria-label="lien vers l'image">
                    <article class="picture_block">
                        <div class="picture">
                            <img id="${id}" src="${picture}" alt="${title}">
                        </div>
                    </article>
                </a>
                <div class="picture_title">
                    <h6>${title}</h6>
                    <div class="media_compteur_like">
                        <label id="like-${id}" for="like-${id}-input" class="compteur_like">${compteur}</label>
                        <input id="like-${id}-input" type="checkbox" aria-label="${compteur} likes" class="likes" onclick="">
                    </div>
                </div>
            `
        } else {
            media = `
                <a href="${mediaVideo}" aria-label="lien vers l'image">
                    <article class="picture_block">
                        <div class="picture">
                            <video id="${id}" src="${mediaVideo}" alt="${title}"></video>
                        </div>
                    </article>
                </a>
                <div class="picture_title">
                    <h6>${title}</h6>
                    <div class="media_compteur_like">
                        <label id="like-${id}" for="like-${id}-input" class="compteur_like">${compteur}</label>
                        <input id="like-${id}-input" type="checkbox" aria-label="${compteur} likes" class="likes" onclick="">
                    </div>
                </div>
            `
        }
        wrapper.innerHTML=media
        compteurLike()
        return wrapper;
    }

    // Compteur like
    function compteurLike() {
        wrapper.querySelector('input[type="checkbox"]').addEventListener('click', (event) => {
            if(event.target.checked) {
                compteur += 1
            } else {
                compteur -= 1
            }
            wrapper.querySelector('label.compteur_like').innerHTML=compteur;
            wrapper.querySelector('input.likes').setAttribute('aria-label', `${compteur} likes`)
        })
    }

    // Template encard prix photographe
    const wrapperLikesPrice = document.createElement('div');
    wrapperLikesPrice.classList.add('likes_price');
    
    function getLikesPrice() {
        const LikesPrice = `
            <div id="total-likes">${sumLikes()}<span class="material-symbols-outlined">favorite</span></div>
            <span>${photographer.price}€ / jour</span>
        `
    
        wrapperLikesPrice.innerHTML=LikesPrice;
        sumLikes()
        return wrapperLikesPrice
    }
    
    function sumLikes () {
        let sum = 0 
        mediaArrayById.forEach(media => {
        sum += media.likes
        })
        return sum
    }

    // Lightbox 
    return { id, photographerId, title, picture, video, compteur, date, price, getUserMediaDOM, getLikesPrice}
}
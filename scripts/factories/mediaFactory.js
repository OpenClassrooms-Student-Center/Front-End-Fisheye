import {mediaArrayById, photographer} from '../pages/photographerController.js'

export function mediaFactory(media) {
    const { id, photographerId, title, image, video, likes, date, price } = media;
    // console.log("test export array :", mediaArrayById)
    // Template filtres

    const wrapperMediaFilter = document.createElement('section');
    wrapperMediaFilter.classList.add('photographe_filter');

    function getUserMediaFilterDOM() {
        const filter = `
            <h5 id="filter__title" tabindex="0">Trier par</h5>
            <div class="selector" data-filter-value="popularity">
                <button id="filter__toggle" aria-labelledby="filter__title filter__option1" class="selector__toggle" aria-expanded="false" aria-haspopup="listbox"><span class="material-symbols-outlined">expand_more</span>
                <ul id="filter__list-items" role="listbox" class="selector__list" tabindex="-1" aria-activedescendant="filter__option1" aria-labelledby="filter__title">
                    <li class="selector__element selector__element1" role="option" tabindex="-1" data-filter-option="popularity" aria-labelledby="filter__title filter__option1" aria-selected="true">Popularité</li>
                    <li class="selector__element selector__element2" role="option" tabindex="-1" data-filter-option="date" aria-labelledby="filter__title filter__option2">Date</li>
                    <li class="selector__element selector__element3" role="option" tabindex="-1" data-filter-option="title" aria-labelledby="filter__title filter__option3">Titre</li>
                </ul>
            </div>
        `
        wrapperMediaFilter.innerHTML=filter;
        return wrapperMediaFilter
    }

    // Template media

    const wrapper = document.createElement('article');
    wrapper.classList.add("photographies")

    const picture = `assets/images/${media.photographerId}/${image}`;
    const mediaVideo = `assets/images/${media.photographerId}/${video}`;

    // const media = data
    // console.log(media.title)
    let compteur = likes
    function getUserMediaDOM() {
        let mediaDOM;
        if(media.image) {
            mediaDOM = `
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
            mediaDOM = `
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
        wrapper.innerHTML=mediaDOM
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
    return { id, photographerId, title, picture, video, compteur, date, price, getUserMediaFilterDOM, getUserMediaDOM, getLikesPrice}
}
// import {mediaArrayById, photographer} from '../pages/photographerController.js'

function mediaFactory(media) {
    const { id, photographerId, title, image, video, likes, date, price } = media;

    const wrapper = document.createElement('article');
    wrapper.classList.add("photographies")

    const picture = `assets/images/${media.photographerId}/${image}`;
    const mediaVideo = `assets/images/${media.photographerId}/${video}`;

    // Generate Card article
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
                        <input id="like-${id}-input" type="checkbox" aria-label="${compteur} likes" class="likes"/>
                    </div>
                </div>
            `
        }
        wrapper.innerHTML=mediaDOM
        wrapper.querySelector('.likes').addEventListener('click', (event) => {
            if(event.target.checked) {
                compteur += 1
            } else {
                compteur -= 1
            }
            wrapper.querySelector('label.compteur_like').innerHTML=compteur;
            wrapper.querySelector('input.likes').setAttribute('aria-label', `${compteur} likes`)
        })
        return wrapper;
    }

    // Template filtres

    const wrapperMediaSort = document.createElement('section');
    wrapperMediaSort.classList.add('photographe_filter');
    
    function getUserMediaSortDOM() {
        const sort = `
        <h5 id="filter__title" tabindex="0">Trier par</h5>
        <div class="dropdown">
            <div class="select" data-filter-value="popularity">
                <span class="selected" aria-labelledby="filter__title filter__option1" aria-expanded="false" aria-haspopup="listbox">Popularité</span>
                <span id = "material" class="material-symbols-outlined">expand_more</span>
            </div>
            <ul role="listbox" class="menu" aria-activedescendant="filter__option1" aria-labelledby="filter__title">
                <li class="selector__element selector__element1 active" role="option" tabindex="-1" data-filter-option="popularity" aria-labelledby="filter__title filter__option1" aria-selected="true">Popularité</li>
                <li class="selector__element selector__element2" role="option" tabindex="-1" data-filter-option="date" aria-labelledby="filter__title filter__option2">Date</li>
                <li class="selector__element selector__element3" role="option" tabindex="-1" data-filter-option="title" aria-labelledby="filter__title filter__option3">Titre</li>
            </ul>
        </div>
    `
    wrapperMediaSort.innerHTML=sort;
    return wrapperMediaSort
    }

    // Template media

    let compteur = likes

    // Compteur like

    // Lightbox 
return { id, photographerId, title, picture, video, compteur, date, price, getUserMediaSortDOM, getUserMediaDOM}
}
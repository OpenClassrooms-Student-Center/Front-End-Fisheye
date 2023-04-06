function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;
    // Template media

    const wrapper = document.createElement('div');
    wrapper.classList.add("photographies")

    const picture = `assets/images/${data.photographerId}/${image}`;
    const mediaVideo = `assets/images/${data.photographerId}/${video}`;
    let compteur = likes

    function getUserMediaDOM() {
        let media;
        if(data.image) {
            media = `
                <a href="${picture}" aria-label="lien vers l'image">
                    <article class="picture_block">
                        <div class="picture">
                            <img src="${picture}" alt="${title}">
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
                            <video src="${mediaVideo}" alt="${title}"></video>
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

    //compteur like
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

    return { id, photographerId, title, picture, video, compteur, date, price, getUserMediaDOM}
}
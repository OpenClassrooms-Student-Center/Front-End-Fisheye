const photographerMedia = {

    createImageHTML: function (photographerName, { image, title, likes }) {
        const articleElements = `

            <article>

                <a href="#" class="media__link" aria-label="${title}, gros plan">
                    <img 
                        src="assets/Sample_Photos/${photographerName}/${image}" 
                        class="media__picture"
                        alt="Photo représentant la photo ${title}"
                    />
                </a>

                <div class="media__infos">
                    <span class="media__name" aria-hidden="true">${title}</span>

                    <div class="media__likes" tabindex="0" aria-label="Nombre de likes, ${likes}">
                        <span class="media__likes-number" aria-hidden="true">${likes}</span>
                        <i 
                            class="fa-solid fa-heart like-icon like-btn"
                            role="button"
                            tabindex="0"
                            aria-label="Aimer la création"
                        >
                        </i>
                    </div>

                </div>

            </article>
        `

        return articleElements
    },

    createVideoHTML: function (photographerName, { video, title, likes }) {
        const articleElements = `

            <article>

                <a href="#" class="media__link" aria-label="${title}, gros plan">
                    <video 
                        src="assets/Sample_Photos/${photographerName}/${video}" 
                        class="media__picture"
                    >
                    </video>
                </a>

                <div class="media__infos">

                    <span class="media__name" aria-hidden="true">${title}</span>

                    <div class="media__likes" tabindex="0" aria-label="Nombre de likes, ${likes}">
                        <span class="media__likes-number" aria-hidden="true">${likes}</span>
                        <i 
                            class="fa-solid fa-heart like-icon like-btn"
                            role="button"
                            tabindex="0"
                            aria-label="Aimer la création"
                        ></i>
                    </div>

                </div>

            </article>
        `

        return articleElements
    }

}

export default photographerMedia
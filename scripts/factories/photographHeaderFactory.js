function photographHeaderFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserHeaderDOM() {
        const article = 
        `<article 
            class="photograph-header-details" 
            tabindex="0" 
            aria-label="Résumé du photographe ${name}; Ville: ${city}, ${country}; Slogan: ${tagline}; Tarif : ${price} euros par jour"
        >
            <div>
                <h1 class="photographe-article-name photograph-header-details-name">
                    ${name}
                </h1>

                <p class="photographe-article-infos photographe-article-city photograph-header-details-city">
                    ${city}, ${country}
                </p>

                <p class="photographe-article-infos photographe-article-tagline">
                    ${tagline}
                </p>
            </div>
            
            <button class="contact-button" onclick="displayModal()">Contactez-moi</button>
        
            <img 
                src="${picture}" 
                alt="${name}"  
                class="photographe-article-img"
            >
        </article>`

        const section = document.createElement('article');
        section.innerHTML = article;
        return section.firstElementChild;
    }

    return { name, picture, getUserHeaderDOM }
}
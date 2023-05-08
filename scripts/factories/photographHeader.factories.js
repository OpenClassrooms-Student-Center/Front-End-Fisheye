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
                <h2 
                    class="photographe_article_name photograph-header-details-name" 
                    aria-label="Nom du photographe : ${name}"
                >
                    ${name}
                </h2>

                <p 
                    class="photographe_article_infos photographe_article_city photograph-header-details-city" 
                    aria-label="Ville de ${name} : ${city}, ${country}"
                >
                    ${city}, ${country}
                </p>

                <p 
                    class="photographe_article_infos photographe_article_tagline" 
                    aria-label="Slogan de ${name} : ${tagline}" 
                >
                    ${tagline}
                </p>
            </div>
            
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        
            <img 
                src="${picture}" 
                alt="${name}" 
                aria-label="Photo de profil de ${name}" 
                class="photographe_article_img"
            />
        </article>`

        const section = document.createElement('article');
        section.innerHTML = article;
        return section.firstElementChild;
    }

    return { name, picture, getUserHeaderDOM }
}
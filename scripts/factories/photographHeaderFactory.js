function photographHeaderFactory(photographerData) {
    const { name, portrait, city, country, tagline } = photographerData;

    const picture = `assets/photographers/${portrait}`;

    function getPhotographHeaderDOM() {
        const article = 
        `<article 
            class="photograph-header-details" 
            tabindex="0" 
            aria-label="Résumé du photographe ${name}; Ville: ${city}, ${country}; Slogan: ${tagline}."
        >
            <div>
                <h1 id="name-photographer" class="photographe-article-name photograph-header-details-name">
                    ${name}
                </h1>

                <p class="photographe-article-infos photographe-article-city photograph-header-details-city">
                    ${city}, ${country}
                </p>

                <p class="photographe-article-infos photographe-article-tagline">
                    ${tagline}
                </p>
            </div>
            
            <button 
                id="header-contact-button" 
                class="contact-button"
                aria-label="Cliquez ou appuyez sur 'Enter' pour ouvrir le formulaire de contact."
            >
                Contactez-moi
            </button>
        
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

    return { getPhotographHeaderDOM }
}
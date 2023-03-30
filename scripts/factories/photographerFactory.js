function photographerFactory(data) {
    const { id, name, city, country, tagline, price, portrait } = data;

    // Template card photographe page d'accueil

    const wrapper = document.createElement('div');
    wrapper.classList.add("photographes")

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const card = `
            <a href="./photographer.html?id=${id}" aria-label="${name}">
                <article aria-label = "Profil du photographe">
                    <div class="profil_picture">
                        <img src="${picture}" alt="${portrait}">
                    </div>
                    <div class="profil_description">
                        <h2>${name}</h2>
                        <h3>${city}, ${country}</h3>
                        <h4>${tagline}</h4>
                        <h5>${price}€/jour</h5>
                    </div>
                </article>
            </a>
        `
        wrapper.innerHTML=card
        console.log(id)
        return wrapper;
    }

    // Template banner page photographe

    const wrapperBanner = document.createElement('div');
    wrapperBanner.classList.add('photographe_banner');
    wrapperBanner.setAttribute('data-hidden-on-modal', '');

    function getUserBannerDOM() {
        const banner = `
            <article aria-label = "Profil du photographe">
                <div class="profil_description">
                    <h2>${name}</h2>
                    <h3>${city}, ${country}</h3>
                    <h4>${tagline}</h4>
                </div>
                <div class="profil_description_button">
                    <button class="contact_button" aria-label="Contacter ${name}" onclick="${displayModal()}">Contactez-moi</button>
                </div>
                <div class="profil_picture">
                    <img src="${picture}" alt="${portrait}">
                </div>
            </article>
        `
        wrapperBanner.innerHTML=banner
        return wrapperBanner
    }

    // Template filtres

    const wrapperMediaFilter = document.createElement('div');
    wrapperMediaFilter.classList.add('photographe_filter');
    let observer

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
        observer = wrapperMediaFilter.querySelector('.selector')
        return wrapperMediaFilter
    }


    return { id, name, city, country, tagline, price, picture, getUserCardDOM, getUserBannerDOM, getUserMediaFilterDOM }
}



function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;
    const user =  id;

    function getUserCardDOM() {
        
        //Création des cartes
        const article = document.createElement('article');
        article.classList.add('photographersCard');

        //Création du Portrait du Photographe
        
        //Création du lien vers la page du photographe
        const pageLink = document.createElement('a');
        pageLink.classList.add('pageLink');
        pageLink.addEventListener('click', handleClick);
        const figureContainer = document.createElement('figure');
        figureContainer.classList.add('figureContainer');
        const imgContainer = document.createElement('div')
        imgContainer.classList.add('imgContainer')
        const img = document.createElement('img');
        img.classList.add('PortraitImg');
        img.setAttribute("src", picture);

        //Création de la Div du Texte de Présentation
        const infosContainer = document.createElement('figcaption');
        infosContainer.classList.add('MoreInfos');

        //Création du nom de l'artiste
        const artisteName = document.createElement('h2');
        artisteName.classList.add('artisteName');
        artisteName.textContent = name;

        //Création de la ville de l'artiste
        const cityLocation = document.createElement('address');
        cityLocation.classList.add('artisteLocation');
        cityLocation.textContent = `${city}, ${country}`;

        //Création de la citation de l'artiste
        const citation = document.createElement('blockquote');
        citation.classList.add('artistePunchline');
        citation.textContent = tagline;

        //Création du prix de l'artiste
        const pricing = document.createElement('p');
        pricing.classList.add('artistePricing');
        pricing.textContent = `${price}€/jour`;

        //Construction du module Final de la carte
        article.appendChild(pageLink); //création du container personnalisé
        pageLink.appendChild(figureContainer);
        figureContainer.appendChild(imgContainer); //Création de la div contenant le portrait
        imgContainer.appendChild(img); //Affichage du portrait dans la div
        figureContainer.appendChild(infosContainer); //Ajout du boc d'informations supplémentaires
        infosContainer.appendChild(artisteName);//Affichage du nom de l'artiste
        infosContainer.appendChild(cityLocation);//Affichage de la localisation
        infosContainer.appendChild(citation);//Affichage de la citation de l'artiste
        infosContainer.appendChild(pricing);//Affichage du tarifs de l'artiste
        return article
    }
    function handleClick(e) {
        e.preventDefault();
        localStorage.setItem('id', id);
        window.location.href = `photographer.html?id=${id}`;
    }
    console.log(user ,name, picture);
    
    return { user,name, picture, getUserCardDOM };
}

function photographerFactory(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;
    const location = `${city}, ${country}`;
    const dailyRate =  `${price}€/jour`; 
   

    function getUserCardDOM() {
        const article = document.createElement( 'article' ); // création du container

        const photographerLink = document.createElement('a'); // création du lien vers le profile du photographe
        photographerLink.setAttribute('href', `http://localhost:5500/photographer.html?id=${id}`); // définition de l'url
        article.appendChild(photographerLink); // définition du lien comme enfant du container

        const profilePicture = document.createElement( 'img' ); // création de la photo de profil
        profilePicture.setAttribute("src", picture); // définition de l'image
        profilePicture.setAttribute("alt", `${name}`); // définition du nom de l'image
        photographerLink.appendChild(profilePicture); // est l'enfant du lien du profil

        const profileName = document.createElement( 'h2' ); // création du nom du profil
        profileName.textContent = name; // on affiche le nom sous forme de texte
        photographerLink.appendChild(profileName); // est l'enfant du lien du profil

        const profileLocation = document.createElement( 'h3' ); // création de la localisation du photographe
        profileLocation.textContent = location; // on l'affiche sous forme de texte
        photographerLink.appendChild(profileLocation); // est l'enfant du lien

        const profileQuote = document.createElement( 'p' ); // création de la citation
        profileQuote.setAttribute('class', 'quote');
        profileQuote.textContent = tagline; // qu'on affiche sous forme de texte
        photographerLink.appendChild(profileQuote); // est l'enfant du lien

        const profileRate = document.createElement( 'p' ); // création du tarif
        profileRate.setAttribute('class', 'rate');
        profileRate.textContent = dailyRate; // affichage sous forme de texte
        photographerLink.appendChild(profileRate); // enfant du lien

        return (article); // on retourne la carte du photographe
    }
    return { name, picture, tagline, location,  getUserCardDOM }
}
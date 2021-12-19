function photographerFactory(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;
    const location = `${city}, ${country}`;
    const dailyRate =  `${price}€/jour`; 
   

    function getUserCardDOM() {
        const article = document.createElement( 'article' ); // création du container

        const photographerLink = document.createElement('a'); // création du lien vers le profile du photographe
        photographerLink.setAttribute('href', `../photographer.html?id=${id}`); // définition de l'url
        article.appendChild(photographerLink); // définition du lien comme enfant du container

        const img = document.createElement( 'img' ); // création de la photo de profil
        img.setAttribute("src", picture); // définition de l'image
        img.setAttribute("alt", `${name}`); // définition du nom de l'image
        photographerLink.appendChild(img); // est l'enfant du lien du profil

        const h2 = document.createElement( 'h2' ); // création du nom du profil
        h2.textContent = name; // on affiche le nom sous forme de texte
        photographerLink.appendChild(h2); // est l'enfant du lien du profil

        const h3 = document.createElement( 'h3' ); // création de la localisation du photographe
        h3.textContent = location; // on l'affiche sous forme de texte
        photographerLink.appendChild(h3); // est l'enfant du lien

        const p = document.createElement( 'p' ); // création de la citation
        p.textContent = tagline; // qu'on affiche sous forme de texte
        photographerLink.appendChild(p); // est l'enfant du lien

        const rate = document.createElement( 'p' ); // création du tarif
        rate.textContent = dailyRate; // affichage sous forme de texte
        photographerLink.appendChild(rate); // enfant du lien

        return (article); // on retourne la carte du photographe
    }
    return { name, picture, tagline, location,  getUserCardDOM }
}
function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price} = data;
    const picture = `./assets/photographers/${portrait}`;
	/*
	Sur la page index, affiche les infos sur tous les photographes
	*/
    function getUserCardDOM() { 

        //création du a dans balise section avec href de base
        const linkToPhotographerPage=document.createElement('a');
        linkToPhotographerPage.setAttribute('href',"./photographer.html?photographerId=" + id)

        // création de l'article avec lien vers la page photographer.html
        const article = document.createElement( 'article' );
        linkToPhotographerPage.appendChild(article);

        //création des balises à mettre dans balise section
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt",`photo de ${name}`);
		img.setAttribute("aria-label", name );

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const location = document.createElement('p');
        location.textContent = city.concat(", ", country); // ou [city, country] 
        //mais je sais pas faire l'espace avant country;
        //alt = location.textContent = city + ", " + country;

        const h3 = document.createElement( 'h3' );
        h3.textContent = tagline;

        const h4 = document.createElement( 'h4' );
        h4.textContent = price + '\u20AC/jour';

        // ajout des balises dans la balise article
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location)
        article.appendChild(h3)
        article.appendChild(h4)

        return (linkToPhotographerPage);
    }

    return { name, picture, city, country, tagline, price, getUserCardDOM }
}
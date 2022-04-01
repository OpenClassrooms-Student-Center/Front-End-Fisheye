function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price} = data;
    const picture = `./assets/photographers/${portrait}`;

	/*
	Sur la page index, affiche les infos sur tous les photographes
	*/
    
function getUserCardDOM() {
    //création du a dans balise section avec href de base
    const linkPhotographerSection = document.querySelector(".photographer_section");
    const linkA = document.createElement("a");
    linkA.href = "photographer.html";
    linkPhotographerSection.appendChild(linkA);
            
            // création de l'article avec lien et id dans la balise A
            const linkArticle = document.createElement( "article" );
            linkArticle.id = `article-${id}`;
            linkA.appendChild(linkArticle);
            
            //création des balises à mettre dans balise section
            const img = document.createElement( "img" );
            img.setAttribute("src", picture);
            img.setAttribute("alt", name);
            img.setAttribute("aria-label", name);
    
            const h2 = document.createElement( "h2" );
            h2.textContent = name;
    
            const pLocation = document.createElement('p');
            pLocation.textContent = city.concat(", ", country); // ou [city, country] 
            //mais je sais pas faire l'espace avant country;
            //alt = location.textContent = city + ", " + country;

            const h3 = document.createElement( 'h3' );
            h3.textContent = tagline;
    
            const ratePriceDay = document.createElement( 'h4');
            ratePriceDay.innerHTML = price + '€/jour';
            
            // ajout des balises dans la balise article
            linkArticle.appendChild(img);
            linkArticle.appendChild(h2);
            linkArticle.appendChild(pLocation);
            linkArticle.appendChild(h3);
            linkArticle.appendChild(ratePriceDay);
    
            // au click sur l'article appel de la fonction qui affiche un photographe -> insertion de l'id dans l'url
            linkArticle.addEventListener("click", getOnePhotographer());
    
            return (linkA);
    
            function getOnePhotographer() {
                linkA.href += "?id=" + id;
            }
            
}
        return { name, picture, city, country, price, tagline, getUserCardDOM };
    }
// AFFICHE LE PROFIL DES PHOTOGRAPHES (index)
function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price , id } = data;

    const picture = `assets/photographers/${portrait}`;
    
    function getUserCardDOM() {
        const article                           = document.createElement('article');
        const link                              = document.createElement('a');
        const img                               = document.createElement('img');
        const photographerName                  = document.createElement('h2');
        const photographerCity                  = document.createElement('p');
        const photographerTagline               = document.createElement('p');
        const photographerPrice                 = document.createElement('p');

        link.setAttribute("href", `photographer.html?id=${id}`);

        img.setAttribute("src", picture); 

        photographerName.textContent            = name;
        photographerName.style.fontSize         = "36px";

        photographerCity.textContent            = city + ', ' + country; 
        photographerCity.style.fontSize         = "13px";
        photographerCity.style.color            = "#901C1C";
        photographerCity.style.marginBottom     = "3px";

        photographerTagline.textContent         = tagline;
        photographerTagline.style.fontSize      = "10px";
        photographerTagline.style.marginBottom  = "3px";
            
        photographerPrice.textContent           = price + '€/jour';
        photographerPrice.style.fontSize        = "9px"; 
    
        article.appendChild(link);
        article.appendChild(photographerName);
        article.appendChild(photographerCity);
        article.appendChild(photographerTagline);
        article.appendChild(photographerPrice);
        link.appendChild(img);
        
        return (article);
    }
    return { name, picture, city, country, tagline, price, id, getUserCardDOM}
}


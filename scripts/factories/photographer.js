function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price , id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const link = document.createElement('a');
        //    link.setAttribute("href", id + ".html");
        link.setAttribute("href", "photographer.html?id=" + id);
        const img = document.createElement('img');
            img.setAttribute("src", picture); 
        const photographerName = document.createElement('h2');
            photographerName.textContent = name;
        const photographerCity = document.createElement('p');
            photographerCity.textContent = city + ', ' + country; 
            photographerCity.style.fontSize = "13px";
            photographerCity.style.color = "#901C1C";
            photographerCity.style.marginBottom = "3px";
        const photographerTagline = document.createElement('p');
            photographerTagline.textContent = tagline;
            photographerTagline.style.fontSize = "10px";
            photographerTagline.style.marginBottom = "3px";
        const photographerPrice = document.createElement('p');
            photographerPrice.textContent = price + '€/jour';
            photographerPrice.style.fontSize = "9px";

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


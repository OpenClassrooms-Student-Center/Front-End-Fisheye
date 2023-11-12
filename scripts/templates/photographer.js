function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/portrait/${portrait}`;
    const PhotographerLink = `photographer.html?id=${id}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );
        const location = document.createElement('p');
        const tagLine = document.createElement( 'p' );
        const PhotographerPrice = document.createElement( 'p' );

        link.setAttribute("href", PhotographerLink);      
        img.setAttribute("src", picture);

        h2.textContent = name;
        location.textContent = city + ", " + country;
        tagLine.textContent = tagline;        
        PhotographerPrice.textContent =  price + "€/jour";;      

        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        link.appendChild(location);
        link.appendChild(tagLine);
        link.appendChild(PhotographerPrice);

        return (article);
    }

    return { getUserCardDOM }

}
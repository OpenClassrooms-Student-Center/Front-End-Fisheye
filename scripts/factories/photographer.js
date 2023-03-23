function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute("aria-label", "Profil du photographe")
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", portrait)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement( 'h3' );
        h3.innerHTML = `${city}, ${country}`;
        const h4 = document.createElement( 'h4' );
        h4.textContent = tagline;
        const h5 = document.createElement( 'h5' );
        h5.innerHTML = `${price}/jour`;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);
        return (article);
    }
    return { name, city, country, tagline, price, picture, getUserCardDOM }
}

// class PhotographerFactory {
//     constructor(name, id, city, country, tagline, price, portrait){
//         this._name = name;
//         this._id = id;
//         this._city = city;
//         this._country = country;
//         this._tagline = tagline;
//         this._price = price;
//         this._portrait = portrait;
//     }
// }
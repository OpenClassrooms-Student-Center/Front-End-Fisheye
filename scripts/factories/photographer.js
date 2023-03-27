function photographerFactory(data) {
    const { id, name, city, country, tagline, price, portrait } = data;

    const wrapper = document.createElement('div');
    wrapper.setAttribute("class", "photographes")

    const picture = `assets/photographers/${portrait}`;

    // function getUserCardDOM() {
    //     const link = document.createElement( 'a' );
    //     link.setAttribute("href", "./photographer.html?=${id}")
    //     link.setAttribute("aria-label", "lien photographe")

    //     const article = document.createElement( 'article' );
    //     article.setAttribute("aria-label", "Profil du photographe")

    //     const img = document.createElement( 'img' );
    //     img.setAttribute("src", picture)
    //     img.setAttribute("alt", portrait)
        
    //     const h2 = document.createElement( 'h2' );
    //     h2.textContent = name;
        
    //     const h3 = document.createElement( 'h3' );
    //     h3.innerHTML = `${city}, ${country}`;
        
    //     const h4 = document.createElement( 'h4' );
    //     h4.textContent = tagline;
        
    //     const h5 = document.createElement( 'h5' );
    //     h5.innerHTML = `${price}€/jour`;
        
    //     link.appendChild(article);
    //     article.appendChild(img);
    //     article.appendChild(h2);
    //     article.appendChild(h3);
    //     article.appendChild(h4);
    //     article.appendChild(h5);
    //     console.log(id)
    //     return (link);
    // }

    function getUserCardDOM() {
        const card = `
            <a href="./photographer.html?id=${id}" aria-label="lien photographe">
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


    return { id, name, city, country, tagline, price, picture, getUserCardDOM }
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


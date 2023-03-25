class PhotographerData {
    constructor(data) {
        this._name = data.name
        this._city = data.city
        this._country = data.country
        this._tagline = data.tagline
        this._price = data.price
        this._portrait = data.portrait
        this._id = data.id
    }

    get name() {
        return this._name
    }

    get city() {
        return this._city
    }

    get country() {
        return this._country
    }

    get tagline() {
        return this._tagline
    }

    get price() {
        return this._price
    }

    get portrait() {
        return `/assets/photographers/portraitsPhotographers${this._portrait}`
    }

    get id() {
        return this._id
    }
}

class PhotographerMedia {
    constructor(data) {
        this._photographerId = data.photographerId
        this._title = data.title
        this._image = data.image
        this._likes = data.likes
        this._date = data.date
        this._price = data.price
        this._id = data.id
    }
    get photographerId() {
        return this._photographerId
    }

    get title() {
        return this._title
    }

    get likes() {
        return this._likes
    }

    get date() {
        return this._date
    }

    get price() {
        return this._price
    }

    get image() {
        return `/assets/photographers/${PhotographerData.name}/${this._image}`
    }

    get id() {
        return this._id
    }
}







// function photographerFactory(data) {
//     const { name, portrait, city, country, tagline, price, id } = data;

//     const picture = `assets/photographers/portraitsPhotographers/${portrait}`;

//     function getUserCardDOM() {
//         const altImg = `${name}, ${city}, ${tagline}, ${price}€ par jour`;
//         const article = document.createElement( 'article' );
//         const link = document.createElement('a');
//         link.setAttribute("href", `photographer.html?${id}`);
//         link.setAttribute("aria-label", `Aller sur la page de ${altImg}`)
//         const img = document.createElement( 'img' );
//         img.setAttribute("src", picture);
//         img.setAttribute("role", "bouton");
//         img.setAttribute("alt", altImg);
//         const h2 = document.createElement('h2');
//         h2.textContent = name;
//         const h3 = document.createElement('h3');
//         h3.textContent = city + ', ' + country;
//         const p = document.createElement('p');
//         p.textContent = tagline;
//         const p2 = document.createElement('p');
//         p2.textContent = price + '€/Jour';
//         p2.setAttribute("class", "price");
//         article.appendChild(link);
//         link.appendChild(img);
//         link.appendChild(h2);
//         link.appendChild(h3);
//         link.appendChild(p);
//         link.appendChild(p2);
//         return (article);
//     }
//     return { name, picture, id, getUserCardDOM }
// }
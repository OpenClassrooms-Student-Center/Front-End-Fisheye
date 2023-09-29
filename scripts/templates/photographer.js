
function photographerTemplate(data) {
    //Récupération des datas JSON
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement('article');

        const linkPagePhotographer = document.createElement('a');
        linkPagePhotographer.setAttribute("href", `/photographer.html?id=` + `${id}`);
        linkPagePhotographer.setAttribute("title", "Voir le profil de " + `${name}`);

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");
        img.className = "photograph-photo";

        const h2 = document.createElement('h2');
        h2.textContent = data.name;
        h2.className = "photograph-name";

        const location = document.createElement('p');
        location.textContent = data.city + ", " + data.country;
        location.className = "photograph-location";

        const taglineElement = document.createElement('p');
        taglineElement.textContent = data.tagline;
        taglineElement.className = "photograph-tagline";

        const priceElement = document.createElement('p');
        priceElement.textContent = data.price + "€/jour";
        priceElement.className = "photograph-price";

        article.appendChild(linkPagePhotographer);
        linkPagePhotographer.appendChild(img);
        linkPagePhotographer.appendChild(h2);
        article.appendChild(location);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);

        return article;
    }
    return { name, id, city, country, tagline, price, picture, getUserCardDOM }
}

//----Récupération des datas pour les pages photographes----//

function photographInfoTemplate(data) {
    const { name, city, country, tagline } = data;

    function getUserInfoDOM() {
        const article = document.createElement('article');
        const h1 = document.createElement('h1');
        const location = document.createElement('p');
        const taglineElement = document.createElement('p');

        h1.innerText = name;
        h1.className = "photograph-name";

        location.textContent = data.city + ", " + data.country;
        location.className = "photograph-location";

        taglineElement.innerText = tagline;
        taglineElement.className = "photograph-tagline";

        article.appendChild(h1);
        article.appendChild(location);
        article.appendChild(taglineElement);
        return (article);
    }
    return { name, city, country, tagline, getUserInfoDOM }
}

function photographPicture(data) {
    const { portrait } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserPicture() {
        const container = document.createElement('div');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");

        container.appendChild(img);

        return (container);
    }
    return { picture, getUserPicture };
};


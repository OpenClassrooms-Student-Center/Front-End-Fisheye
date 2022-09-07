function photographerFactory(data) {
    const { name, city, country, id, price, tagline ,portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        const h2 = document.createElement('h2');
        const h3 = document.createElement('h3');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        h2.textContent = name;
        h3.textContent = city + ", " + country;
        p1.textContent = tagline;
        p2.textContent = price + "€/jour";
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(p1);
        article.appendChild(p2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
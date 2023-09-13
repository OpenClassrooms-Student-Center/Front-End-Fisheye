/** pattern factory */
function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait, id } = data;

    const picture = `assets/photographers/${portrait}`;

    // card constructor
    function getUserCardDOM() {

        const article = document.createElement('article');
        const link = document.createElement('a');
        link.setAttribute('href', "photographer.html?id=" + id);
        link.setAttribute('role', "navigation");
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute('alt', "photographe " + name);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const p1 = document.createElement('p');
        p1.textContent = city + ", " + country;
        p1.className = "red";
        const p2 = document.createElement('p');
        p2.textContent = tagline;
        const p3 = document.createElement('p');
        p3.textContent = price + "€/jour";
        p3.className = "gray";
        article.appendChild(link);
        link.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(p3);
        return (article);
    }

    // header constructor
    function getPhotographerDataDOM() {

        const header = document.createElement('div');

        const container = document.createElement('div');
        const h1 = document.createElement('h1');
        h1.textContent = name;
        const h2 = document.createElement('h2');
        h2.textContent = city + ", " + country;
        h2.className = "red";
        const p2 = document.createElement('p');
        p2.textContent = tagline;

        const btn = document.createElement('button');
        btn.setAttribute("class", "contact_button");
        btn.setAttribute("type", "button");
        btn.setAttribute("onclick", "displayModal()");
        btn.textContent = "Contactez-moi";

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute('alt', name);

        container.appendChild(h1);
        container.appendChild(h2);
        container.appendChild(p2);
        header.appendChild(container);
        header.appendChild(btn);
        header.appendChild(img);

        return (header);
    }

    return { name, picture, getUserCardDOM, getPhotographerDataDOM }
}
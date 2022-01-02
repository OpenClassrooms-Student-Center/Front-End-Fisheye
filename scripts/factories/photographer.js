function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.addEventListener("click", function () {
            window.location.href = "photographer.html?id=" + id;

        }, true);
        img.setAttribute("src", picture)
        const h2 = document.createElement('h2');
        h2.addEventListener("click", function () {
            alert("You clicked the h2 element!");
        }, true);
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        const h3 = document.createElement('h3');
        h3.textContent = city + ', ' + country;
        article.appendChild(h3);
        const p = document.createElement('p');
        p.textContent = tagline;
        article.appendChild(p);
        const h5 = document.createElement('h5');
        h5.textContent = price + '€/jour';
        article.appendChild(h5);
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}

/*
let cardDom = document.querySelector('.monTemplate').cloneNode(true);
cardDom.setAttribute('aria-label', name)
cardDom.querySelector('.h2').innerText = 'MonTitre';
cardDom.querySelector('.h2').innerText = 'mon pararag';
*/
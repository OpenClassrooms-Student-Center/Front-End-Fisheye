function photographerTemplate(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.setAttribute('onclick', 'linkURL('+id+')');

        const div = document.createElement('div');
        div.classList.add('card-text');

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        const h2 = document.createElement( 'h2' );
        h2.classList.add('title-name');
        h2.textContent = name;

        const pZone = document.createElement('p');
        pZone.classList.add('text-zone');
        pZone.textContent = city +', '+ country;

        const pTagline = document.createElement('p');
        pTagline.classList.add('text-tag');
        pTagline.textContent = tagline;

        const pPrice = document.createElement('p');
        pPrice.classList.add('text-price');
        pPrice.textContent = price + '€/jour';

        article.appendChild(img);
        div.appendChild(h2);
        div.appendChild(pZone);
        div.appendChild(pTagline);
        div.appendChild(pPrice);
        article.appendChild(div)
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
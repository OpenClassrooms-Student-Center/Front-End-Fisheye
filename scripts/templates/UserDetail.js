function detailUserTemplate(data) {
    const { id, name, portrait, city, country, tagline } = data;

    const picture = `assets/photographers/${portrait}`;

    function getDetailDOM() {
        const article = document.createElement('article');
        article.setAttribute('onclick', 'linkURL('+id+')');
        article.setAttribute('aria-label', 'Lien vers la page de '+name);

        const div = document.createElement('div');
        div.classList.add('cardUser-text');

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

        article.appendChild(img);
        div.appendChild(h2);
        div.appendChild(pZone);
        div.appendChild(pTagline);
        article.appendChild(div)
        return (article);
    }
    return { name, picture, getDetailDOM }
}

function detailMediaTemplate(data) {
    const { id, image, title, date, like } = data;

    const picture = `assets/media/${image}`;

    function getMediaDOM() {
        const div = document.createElement('div');
        div.classList.add('cardMedia');

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        const h2 = document.createElement( 'h2' );
        h2.classList.add('title-img');
        h2.textContent = title;

        const p = document.createElement('p');
        p.classList.add('text-like');
        p.textContent = like;

        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(p);
        return (div);
    }
    return { name, image, getMediaDOM}
}
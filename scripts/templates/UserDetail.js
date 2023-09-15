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
    const { id, image, video, title, date, likes } = data;

    const picture = `assets/media/${image}`;
    const urlLike = 'assets/icons/like.svg';

    function getMediaDOM() {

        const div = document.createElement('div');
        div.classList.add('cardMedia');

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        const divText = document.createElement('div');
        divText.classList.add('textMedia');

        const h2 = document.createElement( 'h2' );
        h2.textContent = title;

        const divLike = document.createElement('div');
        divLike.classList.add('like-container');

        const p = document.createElement('p');
        p.classList.add('text-like');
        p.textContent = likes;

        const icon = document.createElement('img');
        icon.setAttribute("src", urlLike);
        icon.setAttribute("alt", "icon like");
        icon.classList.add('like-icon');

        div.appendChild(img);
        divLike.appendChild(p);
        divLike.appendChild(icon);
        divText.appendChild(h2);
        divText.appendChild(divLike);
        div.appendChild(divText);
        return (div);
    }
    return { name, image, getMediaDOM}
}

function detailTemplate(totalLikes, tarif) {
    const photographersDetail = document.querySelector(".photograph-detail");
    const divLikes = document.createElement('div');
    const pLikes = document.createElement('p');
    const pTarif = document.createElement('p');
    const urlLike = 'assets/icons/like.svg';

    pLikes.textContent = totalLikes;
    pTarif.textContent = tarif + '€ / jour';

    const icon = document.createElement('img');
    icon.setAttribute("src", urlLike);
    icon.setAttribute("alt", "icon like");
    icon.classList.add('like-icon');

    divLikes.appendChild(pLikes);
    divLikes.appendChild(icon);
    photographersDetail.appendChild(divLikes);
    photographersDetail.appendChild(pTarif);
}
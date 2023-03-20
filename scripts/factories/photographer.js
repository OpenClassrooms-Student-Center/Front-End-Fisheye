function photographerFactory(data) {
    const { name, portrait, city, country, price, tagline, id } = data;

    const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute("aria-label", "lien vers le portrait de " + name);

        const lienArstist = document.createElement('a');
        lienArstist.setAttribute("href", "#");
        lienArstist.setAttribute("aria-label", "lien vers le portrait de " + name);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", "photo de profil de l'artiste " + name);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.classList.add("artist-title");

        const artistContent = document.createElement('p');
        artistContent.classList.add("artist-content");

        const location = document.createElement('p');
        location.textContent = city + ", " + country;
        location.style.color = "#901C1C"

        const artistTagLine = document.createElement('p');
        artistTagLine.textContent = tagline;

        const artistPrice = document.createElement('p');
        artistPrice.textContent = price + " €/jour";
        artistPrice.style.color = "#757575"


        article.appendChild(lienArstist);
        lienArstist.appendChild(img);
        lienArstist.appendChild(h2);
        article.appendChild(artistContent);
        artistContent.appendChild(location);
        artistContent.appendChild(artistTagLine);
        artistContent.appendChild(artistPrice);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
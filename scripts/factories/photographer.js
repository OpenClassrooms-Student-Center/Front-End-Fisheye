function photographerFactory(data) {
    const { name, portrait, city, country, price, tagline, id } = data;


    const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const photoProfil = document.createElement( 'img' );
        photoProfil.setAttribute("src", picture)
        photoProfil.setAttribute("alt", "photo de profil de l'artiste " + name);
        photoProfil.classList.add("artist-img");

        const artistName = document.createElement( 'h2' );
        artistName.textContent = name;
        artistName.classList.add("artist-title");

        const location = document.createElement('p');
        location.textContent = city + ", " + country;
        location.style.color = "#901C1C"

        const artistTagLine = document.createElement('p');
        artistTagLine.textContent = tagline;

        const artistPrice = document.createElement('p');
        artistPrice.textContent = price + " €/jour";
        artistPrice.style.color = "#757575"

        const photographerLink = document.createElement('a');
        const baseUrl = new URL("http://127.0.0.1:5501/photographer.html");
        const photographerId = data.id;
        baseUrl.searchParams.set('id', photographerId); 
        photographerLink.setAttribute("href", baseUrl);
        console.log(photographerLink);

        photographerLink.appendChild(photoProfil);
        photographerLink.appendChild(artistName);
        article.appendChild(photographerLink);
        article.appendChild(location);
        article.appendChild(artistTagLine);
        article.appendChild(artistPrice);
        
        return article;
    }

    function userContent(){
        const artistContent = document.createElement( 'div' );
        artistContent.classList.add('content');

        const artistName = document.createElement( 'h2' );
        artistName.textContent = name;
        artistName.classList.add("artist-title");

        const location = document.createElement('p');
        location.textContent = city + ", " + country;
        location.style.color = "#901C1C"

        const artistTagLine = document.createElement('p');
        artistTagLine.textContent = tagline;

        artistContent.appendChild(artistName);
        artistContent.appendChild(location);
        artistContent.appendChild(artistTagLine);
        
        
        return artistContent;
    }
    function userImageProfil(){
        const artistHeader = document.createElement('div');
        artistHeader.classList.add('img-artist');

        const photoProfil = document.createElement( 'img' );
        photoProfil.setAttribute("src", picture)
        photoProfil.setAttribute("alt", "photo de profil de l'artiste " + name);
        photoProfil.classList.add("artist-img");

        artistHeader.appendChild(photoProfil);

        return artistHeader
    }
    return { name, picture, id, getUserCardDOM, userImageProfil, userContent}
}
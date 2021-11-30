
/*--------- FUNCTIONS ---------*/

function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;
    const localisationEx = `${city}, ${country}`;
    const prixEx = `${price}€/jour`;

    function getUserCardDOM() {
        //Setup element
        const article = document.createElement( 'article' );

        //In article
        //Heading Photographer div
        const headPhotographer = document.createElement('a');
        headPhotographer.classList.add("photographer-head");
        headPhotographer.setAttribute('id', id);

        const headPhotographerImg = document.createElement('div');
        headPhotographerImg.classList.add("photographer-head-img");

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const nom = document.createElement( 'h2' );
        nom.textContent = name;

        //Append photographer name to div
        const nameDiv = document.createElement('div');
        nameDiv.classList.add("photographer-name");
        nameDiv.appendChild(nom);

        //Append pour pouvoir faire une photo ronde
        headPhotographerImg.appendChild(img);
        headPhotographer.appendChild(headPhotographerImg);

        headPhotographer.appendChild(nameDiv);

        //Desc Photographer div
        const descPhotographer = document.createElement('div');
        descPhotographer.classList.add("photographer-desc");
        const loca = document.createElement( 'h3' );
        loca.textContent = localisationEx;
        const tag = document.createElement( 'p' );
        tag.textContent = tagline;
        const prix = document.createElement( 'h4' );
        prix.textContent = prixEx;
        descPhotographer.appendChild(loca);
        descPhotographer.appendChild(tag);
        descPhotographer.appendChild(prix);

        //Append
        article.appendChild(headPhotographer);
        article.appendChild(descPhotographer);

        //Event pour aller a la page photographe
        article.addEventListener("click", () => {
            window.location = `photographer.html?${id}`;
        });
        return (article);
    }
    return { name, picture, getUserCardDOM }
    
}

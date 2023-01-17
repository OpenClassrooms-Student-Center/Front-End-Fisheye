//Mettre le code JavaScript lié à la page photographer.html

function photographerFactory(data) {
    const { id, country, city, tagline, price, name, portrait } = data;

    const picture = `./assets/photos/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {

        // manipulate the DOM
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );
        const h3 = document.createElement ('h3');
        const p = document.createElement ('p');
        const h4 = document.createElement ('h4');
        const a = document.createElement("a");

        // modify elements

        img.setAttribute("src", picture)
        a.setAttribute("href",`photographer.html?id=${id}`);
        a.setAttribute(
            "aria-label",
            `Lien vers le portfolio de ${name}`
          );
          img.classList.add('photo-img')
        a.classList.add('photographer-link')
        h2.textContent = name;
        h2.classList.add('item-name')
        h3.textContent = `${city} , ${country}`;
        p.textContent = tagline;
        h4.innerText = `${price} € / jour`
       

        // apend child
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(h4);
        a.appendChild(article);
        
        
        return (a);
    }
    return {id, name, picture, city, price, country, getUserCardDOM }
}

    
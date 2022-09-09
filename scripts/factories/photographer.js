function photographerFactory(data) {
    console.log('putain !!!!!')
    const { name, portrait, id } = data; /* J'ajoute dans ma constante "id" pour chercher les "données" correspondantes*/
    console.log(name);
    const picture = `assets/photographers/${portrait}`;
    console.log(picture);

    function getUserCardDOM() {
        const link = document.createElement("a"); /* Constant link pour créer mon élément "a" (href) qui apparaîtra dans mon DOM*/
        link.setAttribute ("href", `photographer.html?id=${id}`); /* Je set un "href" + le "lien" de la page html avec l'"id" correspondant au click */
        console.log(link);

        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        link.appendChild(article); /* J'englobe mes "article"s de mon "link" */
        return (link);
    }
    return { name, picture, getUserCardDOM }
}

//add photographers 

function mediaFactory(data) {
    console.log(mediaFactory);
    console.log('deuxiemes putain !!!!!');

    const { name, portrait, id, title, image, likes, date, price  } = data; /* J'ajoute dans ma constante "id" pour chercher les "données" correspondantes*/
    const picture = `assets/sample-photos/${portrait, image}`;


    function getMediaCardDOM() {
        console.log(getMediaCardDOM);

    
        const h1 = document.createElement ('h1 pouet pouet');
        h1.textContent = name;
        /*
        const link = document.createElement("a"); 
        link.setAttribute ("href", `photographer.html?id=${id}`);
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        link.appendChild(article);
        return (link);
        */
    }
    return { name, picture, image, getMediaCardDOM }
}
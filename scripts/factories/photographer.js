function photographerFactory(data) {
    const { name, id, city, country, tagline, portrait, price } = data;

    console.log(data);
    const picture = `assets/images/${portrait}`;


    // Function for build DOM 
    function buildImg(article) {
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        article.appendChild(img);
    }

    function buildTitle(article)
    {
        const h2 = document.createElement('h2');
        h2.textContent = name;
        article.appendChild(h2);
    }

    function buildPrice(article) { }

    function buildTagline(article) { }

    function buildCity(article) { }
    // End Function for build DOM 

    function getUserCardDOM() {

        // On créer le Dom que seulement si on à une photo,un ID et un nom
        if (name && id && portrait) {
            const article = document.createElement('article');

            buildImg(article);
            buildTitle(article);
         
            return (article);
        }

    }

    function getUserMovieDOM() {
        //
    }


    return { name, picture, getUserCardDOM }
}
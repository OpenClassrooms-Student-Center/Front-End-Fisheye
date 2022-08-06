function photographerFactory(data) {
    const { name, id, city, country, tagline, portrait, price } = data;

    console.log(data);
    const picture = `assets/images/${portrait}`;


    // Function for build DOM 
    function buildElement(parent, balise, value) {
        const element = document.createElement(balise);
        if (balise = "img") { element.setAttribute("src", value); }
        else {
            element.textContent = value;
        }
        parent.appendChild(element);
    }
    // End Function for build DOM 


    function getUserCardDOM() {
        // On créer le Dom que seulement si on à une photo,un ID et un nom
        if (name && id && portrait) {
            const article = document.createElement('article');

            buildElement(article, "img", picture);
            buildElement(article, "h2", name);

            if (city && country) {
                buildElement(article, "h3", city + ", " + country)
            }
            if (tagline) {
                buildElement(article, "h4", tagline);
            }
            if (price) {
                buildElement(article, "h5", price);
            }

            return (article);
        }
    }


    return { name, picture, getUserCardDOM }
}

function movieFactory(data) {

}
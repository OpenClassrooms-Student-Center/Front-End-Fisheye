function photographerFactory(data) {
    const { name, id, city, country, tagline, portrait, price } = data;

    console.log(data);
    const picture = `assets/images/${portrait}`;


    // Function for build DOM 
    function appendChildText(parent, element, text) {
        element.textContent = text;
        parent.appendChild(element);
    }

    function buildImg(parent) {
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        parent.appendChild(img);
    }

    function buildTitle(parent) {
        const nameElement = document.createElement('h2');
        appendChildText(parent, nameElement, name);
    }

    function buildCityCountry(parent) {
        const cityCountryElement = document.createElement("h3");
        appendChildText(parent, cityCountryElement, city + ", " + country);
    }

    function buildTagline(parent) {
        const taglineElement = document.createElement("h4");
        appendChildText(parent, taglineElement,tagline);
    }

    function buildPrice(parent) {
        const priceElement = document.createElement("h5");
        appendChildText(parent, priceElement, price);
    }
    // End Function for build DOM 


    function getUserCardDOM() {
        // On créer le Dom que seulement si on à une photo,un ID et un nom
        if (name && id && portrait) {
            const article = document.createElement('article');

            buildImg(article);
            buildTitle(article);

            if (city && country) {
                buildCityCountry(article);
            }
            if (tagline) {
                buildTagline(article);
            }
            if (price) {
                buildPrice(article);
            }

            return (article);
        }
    }


    return { name, picture, getUserCardDOM }
}

function movieFactory(data) {

}
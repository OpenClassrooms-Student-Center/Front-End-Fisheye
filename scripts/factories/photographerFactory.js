
function photographerFactory(data) {
    const { name, id, city, country, tagline, portrait, price } = data;

    // console.log(data);
    const picture = `assets/images/${portrait}`;


    // Function for build DOM 
    function insertPictureInsideElement(element, picture) {
        element.insertAdjacentHTML('beforeend', '<img src="' + picture + '">');
    }

    function buildElement(balise, value) {
        // Create balise 
        const element = document.createElement(balise);

        // Set Attribute or TextContened depend of balise
        switch (balise) {
            case "a":
                element.setAttribute("href", value);
                break;
            case "img":
                element.setAttribute("src", value);
                break;
            default:
                element.textContent = value;
        }
        return element;


    }
    // End Function for build DOM 


    function getUserCardDOM() {
        // Create DOM only if we got a picture a id and a name
        if (name && id && portrait) {
            const article = document.createElement('article');
            article.setAttribute("class", "photographer-card");


            // Create Dynamique LINK with Picture
            const linkElement = article.appendChild(buildElement("a", "photographer.html?id=" + id));
            insertPictureInsideElement(linkElement, picture);
            // END Create Dynamique LINK with Picture

            article.appendChild(buildElement("h2", name));

            if (city && country) {
                article.appendChild(buildElement("h3", city + ", " + country));
            }
            if (tagline) {
                article.appendChild(buildElement("h4", tagline));
            }
            if (price) {
                article.appendChild(buildElement("h5", price + "€/jour"));
            }

            return (article);
        }
    }



    return { name, picture, getUserCardDOM }
}


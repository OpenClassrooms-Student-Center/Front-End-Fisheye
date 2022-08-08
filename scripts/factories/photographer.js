function photographerFactory(data) {
    const { name, id, city, country, tagline, portrait, price } = data;

    console.log(data);
    const picture = `assets/images/${portrait}`;


    // Function for build DOM 
    function buildElement(balise, value) {
        // Create balise 
        const element = document.createElement(balise);
        // Set content or attribute for the new element 
        if (balise === "img") { element.setAttribute("src", value); }
        else {
            element.textContent = value;
        }
        return element;
    }
    // End Function for build DOM 


    function getUserCardDOM() {
        // Create DOM only if we got a picture a id and a name
        if (name && id && portrait) {
            const article = document.createElement('article');
            article.setAttribute("class","photographer-card");

            article.appendChild(buildElement("img", picture));
            article.appendChild(buildElement("h2", name));

            if (city && country) {
                article.appendChild(buildElement("h3", city + ", " + country));
            }
            if (tagline) {
                article.appendChild(buildElement("h4", tagline));
            }
            if (price) {
                article.appendChild(buildElement("h5", price));
            }

            return (article);
        }
    }


    return { name, picture, getUserCardDOM }
}

function movieFactory(data) {

}
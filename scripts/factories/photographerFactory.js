function photographerFactory(data) {
    const { name, id, city, country, tagline, portrait, price } = data;

    // console.log(data);
    const picture = `assets/images/${portrait}`;



    function getUserCardDOM() {
        // Create DOM only if we got a picture a id and a name
        if (name && id && portrait) {
            const article = document.createElement("article");
            article.setAttribute("class", "photographer_card");

            // Create Dynamique LINK with Picture
            const linkElement = article.appendChild(
                buildElement("a", "photographer.html?id=" + id)
            );
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

            return article;
        }
    }

    function setPhotographerHeader() {
        setInnerHtml(".photograph_header h1", name);
        if (city && country) {
            setInnerHtml(".photograph_header h2", city + ", " + country);
        }
        else {
            setInnerHtml(".photograph_header h2", "");
        }
        setInnerHtml(".photograph_header h3", tagline);
        const imgProfile = document.querySelector(".photograph_header img");
        imgProfile.setAttribute("src", picture);
    }

    function setStickyBarPrice() {
        if (price) {
            setInnerHtml(".price_rate_daily", price + " € / jour");
        }
        else {
            setInnerHtml(".price_rate_daily", price + "");
        }
    }

    return { name, picture, getUserCardDOM, setPhotographerHeader, setStickyBarPrice };
}

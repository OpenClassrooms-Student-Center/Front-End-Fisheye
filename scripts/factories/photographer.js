"use_strict";

function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");

        const a = document.createElement("a");
        a.setAttribute("href","photographer.html");
        a.style.textDecoration = "none";
        article.appendChild(a);

        const figure = document.createElement("figure");
        figure.style.textAlign = "center"
        a.appendChild(figure);

        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.style.borderRadius = "50%";
        img.setAttribute("alt", name);
        figure.appendChild(img);

        const h2 = document.createElement("h2");
        h2.style.margin = "15px 0 0 0";
        h2.textContent = name;
        figure.appendChild(h2);

        const figCaption = document.createElement("figCaption");
        figure.appendChild(figCaption);

        const h3 = document.createElement("h3");
        h3.style.margin = "0 0";
        h3.textContent = `${city}, ${country}`;
        h3.style.color = "#D3573C";
        figCaption.appendChild(h3);
        
        const pTagline = document.createElement("p");
        pTagline.style.margin = "0 0";
        pTagline.textContent = tagline;
        pTagline.style.color = "#000";
        figCaption.appendChild(pTagline);

        const pPrice = document.createElement("p");
        pPrice.style.margin = "0 0";
        pPrice.textContent = `${price}/jour`;
        pPrice.style.color = "#000";
        figCaption.appendChild(pPrice);

        return (article);
    }

    return { name, picture, city, country, price, getUserCardDOM }
}
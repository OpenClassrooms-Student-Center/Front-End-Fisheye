function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");

        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.style.borderRadius = "50%";
        article.appendChild(img);

        const h2 = document.createElement("h2");
        h2.style.margin = "15px 0 0 0";
        h2.textContent = name;
        article.appendChild(h2);
        
        const section = document.createElement("section");
        section.style.textAlign = "center"
        article.appendChild(section);

        const h3 = document.createElement("h3");
        h3.style.margin = "0 0";
        h3.textContent = `${city}, ${country}`;
        h3.style.color = "#D3573C";
        section.appendChild(h3);
        
        const pTagline = document.createElement("p");
        pTagline.style.margin = "0 0";
        pTagline.textContent = tagline;
        section.appendChild(pTagline);

        const pPrice = document.createElement("p");
        pPrice.style.margin = "0 0";
        pPrice.textContent = `${price}/jour`;
        section.appendChild(pPrice);

        return (article);
    }
    return { name, picture, city, country, price, getUserCardDOM }
}
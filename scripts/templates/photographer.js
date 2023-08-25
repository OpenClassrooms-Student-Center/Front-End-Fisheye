function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const div = document.createElement("div");
    div.classList.add("photographer__container");
    const link = document.createElement("a");
    link.classList.add("photographer__link");
    link.href = `photographer.html?id=${id}`;
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.classList.add("photographer_card_profilepicture");
    const h2 = document.createElement("h2");
    const h4 = document.createElement("h4");
    const h5 = document.createElement("h5");
    const h6 = document.createElement("h6");
    h2.textContent = name;
    h4.textContent = city + ", " + country;
    h5.textContent = tagline;
    h5.classList.add("photographer_tagline");
    h6.textContent = price + " € / jour";
    article.appendChild(img);
    // article.appendChild(h2);
    article.appendChild(h4);
    article.appendChild(h5);
    article.appendChild(h6);
    link.appendChild(img);
    link.appendChild(h2);
    div.appendChild(link);
    div.appendChild(article);
    return div;
    }
    return { name, picture, getUserCardDOM }
}


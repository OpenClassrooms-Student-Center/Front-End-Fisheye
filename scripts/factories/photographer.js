export function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");
        article.classList.add("user-card");
        const img = document.createElement("img");
        img.classList.add("user-card__img");
        img.setAttribute("src", picture);
        const h2 = document.createElement("h2");
        h2.classList.add("user-card__title");
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);

        return article;
    }

    return { name, picture, getUserCardDOM };
}

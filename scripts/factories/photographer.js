function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        const h2 = document.createElement('h2');

        img.setAttribute("src", picture)
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);

        return article;
    }
    return { name, picture, getUserCardDOM }
}
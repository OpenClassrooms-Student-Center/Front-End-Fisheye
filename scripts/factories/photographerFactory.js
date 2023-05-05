function photographerFactory(data) {
    const { name, portrait, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        const h5 = document.createElement( 'h5' );
        h2.textContent = name;
        h5.textContent = `${price} €/jour`;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h5);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
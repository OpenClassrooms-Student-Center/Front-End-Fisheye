function photographerFactory(data) {
    const {name, portrait} = data

    const picture = `assets/photographers/${portrait}`

    function getUserCardDOM() {
        const cardContainer = document.createElement( 'div' );
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name
        article.appendChild(img)
        article.appendChild(h2)
        cardContainer.appendChild(article)
        return cardContainer
    }
    return {name, picture, getUserCardDOM}
}
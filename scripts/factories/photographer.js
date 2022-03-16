function photographerFactory(data) {
    console.log(data)
    const { name, portrait } = data;
    console.log(data)
    const picture = portrait;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.src = picture;
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}

export default photographerFactory
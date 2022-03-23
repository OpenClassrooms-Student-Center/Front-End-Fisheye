function photographerFactory(data) {
    const { name, portrait } = data;
    const picture = `../assets/Sample_Photos/PhotographersID/${name.split(/-| /).join("")}.jpg`;
    console.log(data)
    function getUserCardDOM() {
        const article = document.createElement( 'a' );
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
//../assets/Sample_Photos/PhotographersID
export default photographerFactory
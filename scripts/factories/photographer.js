function photographerFactory(data) {
    const { name, portrait } = data;
    const picture = `../assets/Sample_Photos/PhotographersID/${name.split(/-| /).join("")}.jpg`;
    console.log(data)
    function getUserCardDOM() {
        const templateElm = document.getElementById("templateArticle");
        const article = document.importNode(templateElm.content, true);
        const img = article.querySelector(".img");
        img.src = picture;
        const h2 = article.getElementsByClassName( '.h2' );
        h2.textContent = name;
        document.getElementsByClassName("photographer_section").appenChild(article);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
//../assets/Sample_Photos/PhotographersID
export default photographerFactory
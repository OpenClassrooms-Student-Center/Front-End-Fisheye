function photographerFactory(data) {
    const { name, portrait, id } = data;
    const picture = `../assets/Sample_Photos/PhotographersID/${portrait}`;
    console.log(data)
    function getUserCardDOM() {
        const templateElm = document.getElementById("templateArticle");
        const article = document.importNode(templateElm.content, true);
        const img = article.querySelector(".avatar");
        img.src = picture;
        const h2 = article.querySelector( '.photographer__h2' );
        h2.textContent = name;
        const a = article.querySelector("a");
        a.href += `?id=${id}`;
        document.querySelector(".photographer_section").appendChild(article);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
//../assets/Sample_Photos/PhotographersID
export default photographerFactory
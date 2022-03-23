//Mettre le code JavaScript lié à la page photographer.html
async function initPhotographe() {
    const articleId =  getArticleId();
    const article = getArticle(articleId);
}

function getArticleId() {
    return new URL(location.href).searchParams.get("id")
}

async function getArticle() {
    return fetch("../data/photographers.json")
        .then(res=> res.json())
        .then(data => console.table(data.photographers))
        
}

initPhotographe ()
export default initPhotographe
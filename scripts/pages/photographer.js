//Mettre le code JavaScript lié à la page photographer.html
async function initPhotographe() {
    const articleId =  getArticleId();
    const article = await getArticle(articleId);
    
}

function getArticleId() {
    return new URL(location.href).searchParams.get("id")
}

async function getArticle(articleId) {
    fetch("../data/photographers.json")
        .then(res => res.json())
        .then(data => {
            return data.photographers.filter((photographe)=> photographe.id === parseInt(articleId, 10))
        })
}

initPhotographe ()

import hydrateArticleFactory from "../factories/photographerPage.js";

async function initPhotographe() {
    const articleId = getArticleId();
    await getArticle(articleId);
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
        .then(filtingphotographe => {
            const photographe = filtingphotographe;
            hydrateArticleFactory(photographe[0])
        })
}

initPhotographe ()

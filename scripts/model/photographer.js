export default function createPhotographer(data) {
    const {name, portrait, id} = data
    const path =  `../assets/Sample_Photos/PhotographersID/${portrait}`
    const nameSplit = name.split(/ |-/).join("")

    const article = document.createElement("article")
    const articleInner =
        `<a href=../photographer.html?id=${id} id="link${nameSplit}" role="aller à la page du photographe ${name}">
            <img class="portrait" src=${path} alt="portrait du photographe ${name}">
            <h2 class="photographer__h2">${name}</h2>
        </a>
        <aside role="informations du photographe ${name}" aria-describedby="link${nameSplit}">
            <span class="location">${data.city}, ${data.country}</span>
            <span class="quote">${data.tagline}</span>
            <span class="price">${data.price} /jour</span>
        </aside>`

    article.innerHTML = articleInner
    return  document.querySelector(".photographer_section").appendChild(article)
}
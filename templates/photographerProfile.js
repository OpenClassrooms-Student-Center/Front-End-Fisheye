
// --------------- TEMPLATE HTML POUR LA CARTE D'INFORMATIONS D'UN PHOTOGRAPHE SUR LA PAGE DE PROFIL  --------------- 

/* Crée les éléments html associé au bloc d'informations d'un photographe affiché sur sa page de profil
    Paramètres :
        - Un objet représentant un photographe
    Renvoie :
        - Deux élément HTML div et img
*/
function createHTML(data) {

    const { name, city, country, tagline, picture } = data

    const presentationElement = `

        <div class="presentation">
            <h1 class="presentation__name" tabindex="0">${name}</h1>
            <p 
                class="presentation__infos presentation__location"
                tabindex="0" 
                aria-label="Location et tagline du photographe"
            >
                <span>${city}, ${country}</span>
                <span class="presentation__tagline"> ${tagline} </span>
            </p>
        </div>
    `

    const pictureElement = `          
        <img 
            src="${picture}" 
            class="photograph-header__picture"
            alt="${name}"
            tabindex="0"
        >
    `

    // Deux éléments sont renvoyés car ensuite ils devront être ajoutés séparément dans le DOM
    return [presentationElement, pictureElement]
}    


export { createHTML }
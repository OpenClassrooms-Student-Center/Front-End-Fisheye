console.log("Window location:", window.location)

let params = (new URL(window.location)).searchParams;

console.log("parametres:", params)

let id = params.get("id");

console.log("id:", id)

// FETCH DES DONNÉES PHOTOGRAPHES

let page = await fetch(`data/photographers.json`)
.then(r => r.json())

//SELECTION DES PHOTOGRAPHES ET DE LEURS DONNEES EN FONCTION DE L'ID DU PHOTOGRAPHE
const pagePhotographe = page.photographers;
// console.log(page)
console.log("liste des photographes", pagePhotographe);
    // Selection du photographe par son ID
const photographeSelectedById = pagePhotographe.find((element) => element.id == id);
// console.log(photographeSelectedById);


//SELECTION DES MEDIAS ET DE LEURS DONNEES EN FONCTION DE L'ID DU PHOTOGRAPHE
const mediasPhotographes = page.media;
const mediaSelectedById = [];
mediasPhotographes.forEach(element => {
    if(element.photographerId == id) {
        mediaSelectedById.push(element)
    }
})

// const mediaSelectedById = mediasPhotographes.find((element) => element.photographerId == id)
console.log('liste des medias', mediaSelectedById);



// FONCTION BANNER PHOTOGRAPHE

async function bannerData() {
    const photographersBanner = document.querySelector("main");
    const photographerModel = photographerFactory(photographeSelectedById);
    const userBannerDOM = photographerModel.getUserBannerDOM();
    photographersBanner.appendChild(userBannerDOM);
};

async function filterData() {
    const photographersFilter = document.querySelector("main");
    const filter = photographerFactory(photographeSelectedById);
    const photographerFilterDOM= filter.getUserMediaFilterDOM();
    photographersFilter.appendChild(photographerFilterDOM);
}

// FONCTION MEDIAS PHOTOGRAPHE

async function mediaData(mediaSelectedById) {
    const photographersMedia = document.querySelector("main");
    const photographiesSection = document.createElement('section')
    photographiesSection.classList.add('photographies_section')
    mediaSelectedById.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const photographerMediaDOM= mediaModel.getUserMediaDOM();
        photographersMedia.appendChild(photographiesSection);
        photographiesSection.appendChild(photographerMediaDOM);
    });    
}

// FONCTION ENCARD PRIX PHOTOGRAPHE

async function likePriceData(photographeSelectedById) {
    const photographersLikePrice = document.querySelector("main");
    const photographerPrice = photographerFactory(photographeSelectedById);
    const userPriceDOM = photographerPrice.getLikesPrice();
    photographersLikePrice.appendChild(userPriceDOM);
};


// FONCTION MODAL FORM
function formData() {
    const formSelect = document.querySelector("main");
    const formGen = contactForm(photographeSelectedById);
    const formDOM = formGen.getContactFormDOM();
    formSelect.appendChild(formDOM);
};



async function init() {
    // Récupère les datas des photographes et créé la bannière
    bannerData(photographeSelectedById);
    filterData();
    mediaData(mediaSelectedById);
    likePriceData(photographeSelectedById);
    formData(photographeSelectedById);
};
    
init();

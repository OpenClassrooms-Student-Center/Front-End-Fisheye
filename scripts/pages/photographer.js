/**
 * 
 * @param {*} id : id du photograph
 * @returns 
 */
async function getPhotographerAndMedias(id) {
    const photographersApi = new PhotographersApi(BaseURL.base+"data/photographers.json")
    const [photographersData,mediasData] = await photographersApi.getPhotographersAndMedias()
    // le bon résultat est dans photographs[0] car id unique
    const photographers = photographersData
                                .filter(photograf => photograf.id === id)
                                .map(photograf => photographerFactory(photograf))
    // Le factory de la div totallikes and price
    const totalLikes = TotalLikesFactory(photographers[0].price)
    const medias = mediasData
                        .filter(media => media.photographerId === id)
                        .map(media => mediaFactory(media,totalLikes,photographers[0].name))


    return [photographers[0],medias, totalLikes]
}

async function displayHeader(photograph) {
    const photographSection = document.querySelector(".opacity-if-modale");
    //const photographSection = document.querySelector(".photograph-header");
    const userCardDOM = photograph.getUserCardDOM(true);
    // photographSection.insertBefore(userCardDOM,document.querySelector(".filter"));
    photographSection.prepend(userCardDOM);

};

async function displayMedias(photograph,medias){
    const mediasSection = document.querySelector(".medias_section")
    mediasList = new MediasList(medias)
    mediasList.mediasList.forEach((media,index) => {
        const userCardDOM = media.getUserCardDOM()
        mediasSection.appendChild(userCardDOM)
        media.SetListeners()
    }); 
    mediasList.CarousselRender()    
}
async function displayTotalLikes(totalLikes){
    totalLikes.UserDivDOM()
}

function LogoAddLinkToHome(){
    const headerElement = document.querySelector(".link-to-home")
    headerElement.setAttribute('href',BaseURL.base)    
}

async function init(){
    // BaseURL singleton allows to have a "relatif" or "absolute" site URL
    new BaseURL

    LogoAddLinkToHome()
    // Get the photograph from URL
    let params = (new URL(document.location)).searchParams;
    let photographerID = parseInt(params.get('id'))
    if( isNaN(photographerID) ){
        return
    }

    // Init and Load datas
    const [photograph, medias, totalLikes] = await getPhotographerAndMedias(photographerID);

    // Fill page
    displayHeader(photograph)
    displayMedias(photograph,medias)
    displayTotalLikes(totalLikes)
    // Initialisation de la select box des filtres
    SortBoxManagement(medias)
    // initialisation du listener du submit du formulaire de contact
    contactEventControl()
}

init()
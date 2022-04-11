//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerAndMedias(id) {
    const photographersApi = new PhotographersApi(BaseURL.base+"data/photographers.json")
    const [photographersData,mediasData] = await photographersApi.getPhotographersAndMedias()
    const photographers = photographersData
                            .map(photograf => photographerFactory(photograf))
                            .filter(photograf => photograf.id === id)
    const totalLikes = TotalLikesFactory(photographers[0].price)
    const medias = mediasData
                        .map(media => mediaFactory(media,totalLikes))
                        .filter(media => media.photographerId === id)


    return [photographers[0],medias, totalLikes]
}
async function displayHeader(photograph) {
    const photographSection = document.querySelector("#main");
    const userCardDOM = photograph.getUserCardDOM(true);
    photographSection.appendChild(userCardDOM);

};

async function displayMedias(photograph,medias){
    const mediasSection = document.querySelector(".medias_section")

    medias.forEach((media) => {
        const userCardDOM = media.getUserCardDOM(photograph.name)
        mediasSection.appendChild(userCardDOM)
        media.SetListenerOnHearts()
    });
}
async function displayTotalLikes(totalLikes){
    totalLikes.UserDivDOM()
}

function LogoAddLinkToHome(){
    const headerElement = document.querySelector(".link-to-home")
    headerElement.setAttribute('href',BaseURL.base)    
}

async function init(){
    new BaseURL
    LogoAddLinkToHome()
    let params = (new URL(document.location)).searchParams;
    let photographerID = parseInt(params.get('id'))
    if( isNaN(photographerID) ){
        return
    }
    const [photograph, medias, totalLikes] = await getPhotographerAndMedias(photographerID);
    displayHeader(photograph)
    displayMedias(photograph,medias)
    displayTotalLikes(totalLikes)
    
    contactEventControl()
}

init()
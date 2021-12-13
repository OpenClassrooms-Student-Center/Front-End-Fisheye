// catch id in URL
let params = new URL(document.location).searchParams
const photographerId = params.get('id')
// connect to json file 
async function getPhotographerInfos() {
  try {
    const response = await fetch('../data/photographers.json')
    
    return await response.json()
  } catch {
    console.log('erreur de la requête')
  }
}
// display items in page or console log an error 
async function displayPortfolioItems(photographers) {
  //catch photographer array 

  if (photographerId) {

    //display items in header 
    photographerInfos = photographers.find((photographer) => photographer.id == photographerId)
    const photographerModel = photographerFactory(photographerInfos);
    const userInfosElements = photographerModel.getPortoflioItems();
    return photographerInfos.name
  } else {
    console.log(
      "Les information sur votre photographe n'ont pas pu être chargé",
    )
  }
}
async function displayDataUser(medias) {
  
    const portfolioMain = document.getElementById("main");
    const section = document.createElement( 'section' );
    section.id = 'mediaContainer';
    portfolioMain.appendChild(section)
    medias.forEach((media) => {
        if (media.photographerId == photographerId){
          const section = document.getElementById('mediaContainer');
          let mediaModel = mediaFactory(media);
          const userDataDOM = mediaModel.getMediaItems();
        }
    });
}
async function displayLikes(medias) {

    let userLikesCounter = 0; 
    const stickyUserInfos = document.getElementById('sticky-user-infos')
    const userLikes = document.createElement('span');
    medias.forEach((media) => {
      if (media.photographerId == photographerId){
        userLikesCounter += media.likes; 
        return userLikesCounter;
      }
    userLikes.textContent = userLikesCounter;
    const heartIcon = document.createElement('i');
    heartIcon.classList.add('fas')
    heartIcon.classList.add('fa-heart') 
    userLikes.appendChild(heartIcon)
    stickyUserInfos.appendChild(userLikes);
  })
    }
// call functions to display doata in page 
async function init() {
  // Récupère les datas des photographes
  const { photographers, medias } = await getPhotographerInfos()
  displayPortfolioItems(photographers)
  displayDataUser(medias)
  displayLikes(medias)
}

init()

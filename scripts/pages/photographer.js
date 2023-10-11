//Mettre le code JavaScript lié à la page photographer.html

//let photographerId = new URL(document.location).searchParams.get('id');

async function getPhotographerById(id) {
        const response = await fetch('../../data/photographers.json');
        const photographersData = await response.json();

        const photographers = photographersData.photographers;
        const photographermedia = photographersData.media;
        const photographer = photographers.find((photographer) => photographer.id === id);
        let media = photographermedia.filter((item) => item.photographerId === id);
        
        return { photographer, media};
    } 

async function displayPhotographer(photographer) {
    const headerSection = document.querySelector(".photograph-header");
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    headerSection.appendChild(userCardDOM);
}

async function displayNameForm(photographer) {
    const formTitle = document.querySelector(".form_title");
    const formTitleModel = photographerTemplate(photographer);
    const formTitleCardDOM = formTitleModel.getnameFormDom();
    formTitle.appendChild(formTitleCardDOM);
}

async function displayMedia(media) {
    const mediaSection = document.querySelector(".photographer_media");
    media.forEach((media) =>{
        const mediaModel = phototographerMedia(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
    });
}

async function displayTotalLikes(media){
    likes = media.map(media => media.likes);
    let inilikes = 0;
    const totalLikes = likes.reduce((accumulator, currentValue) => accumulator + currentValue, inilikes);
        
    const totalLikesSection = document.querySelector(".photographer_likes_price");
    const likesHeart = document.createElement("div");
    likesHeart.classList.add( 'likeheart' );
    const h5 = document.createElement( 'h5' );
    h5.textContent = totalLikes;
    const heart = document.createElement( 'i' );
        heart.classList.add( 'fa-solid' );
        heart.classList.add( 'fa-heart' );
        heart.classList.add( 'heart__icon--full' );
    
    likesHeart.appendChild(h5);
    likesHeart.appendChild(heart);
    totalLikesSection.appendChild( likesHeart );
    console.log(totalLikes)
}

async function display(photographer, media) {
    displayPhotographer(photographer)
    displayNameForm(photographer)
    displayMedia(media)
    displayTotalLikes(media)
}

async function init() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("id");

    const { photographer, media } = await getPhotographerById(parseInt(id));
        display(photographer, media)
}

init();


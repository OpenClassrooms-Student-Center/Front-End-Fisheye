async function getPhotographerDataAndMedia(photographId) {        
    const pJsonData = await loadJsonData();
    const photographers = pJsonData.photographers;
    const photographerData = photographers.find(photographer => photographer.id == photographId);
    const photographerMedia = pJsonData.media.filter(medium => medium.photographerId == photographId);

    console.log(pJsonData);
    console.log(photographers);
    console.log(photographerData);
    console.log(photographerMedia);

    return [photographerData, photographerMedia];
}

async function displayHeaderData(photographerData) { //affiche le cadre des infos du photographe
    const headerSection = document.querySelector(".photograph-header");
    const h2=document.createElement('h2');
    h2.setAttribute("aria-label","Nom du photographe" + photographerData.name);
    h2.innerHTML=photographerData.name;
    const plocation=document.createElement('p');
    plocation.setAttribute("aria-label", "Lieu d'activité du photographe" + photographerData.city + ", " + photographerData.country);
    plocation.innerHTML = photographerData.city + ", " + photographerData.country;
    const h3 = document.createElement('h3');
    h3.innerHTML=photographerData.tagline;
    h3.setAttribute("aria-label","devise du photographe"+photographerData.tagline);
    const img = document.createElement( 'img' );
    img.setAttribute("alt","portrait du photographe");
    img.setAttribute("src", "./assets/photographers/" + photographerData.portrait);

    const left=document.createElement("div");
    headerSection.appendChild(left);
    left.appendChild(h2);
    left.appendChild(plocation);
    left.appendChild(h3);
    headerSection.appendChild(left.previousElementSibling);
    headerSection.appendChild(img);
}; 

async function displayMedia(photographerMedia,mediaDirectory){ //affiche tous les media du photographe
    const mediaContainer=document.querySelector(".media_container");
    mediaContainer.innerHTML = " ";
    var totalLikes = 0;
    var mediaCardHtml = " ";
    photographerMedia.forEach(element => {
        const mediaModel = mediaFactory(element, mediaDirectory, photographerMedia, mediaCardHtml);
        element.title = mediaModel.title;
        mediaCardHtml = mediaModel.getMediaCardDOM();
        totalLikes += element.likes;
    });
    mediaContainer.innerHTML = mediaCardHtml;
    
//ouverture du carousel oté et copié dans cheatsheet-WIP2_05042022.txt

    //gestion des likes
//   displayTotalLikes(totalLikes);
//   manageLikes(totalLikes,photographerMedia,mediaDirectory);
}

async function displayLikesAndPrice(price){
    document.querySelector(".price").innerHTML=price+"€/jour ";
}

async function initPhotographer() {
    //récupère l'ID du photographe
    const id=window.location.href.split("=")[1].split("#")[0];//parfois un # se rajoute à la fin de l'adresse en tappant entrer
    // Récupère les datas des photographes
    const allPhotographerData = await getPhotographerDataAndMedia(id);
    const photographerData = allPhotographerData[0];
    const photographerMedia = allPhotographerData[1];
    document.getElementById("photographerName").innerHTML=photographerData.name;
    var mediaDirectory=photographerData.name.split(' ');
    mediaDirectory.pop();
    //Affiche les données du photographe
    displayHeaderData(photographerData);
    //Affiche les media du photographe
    displayMedia(photographerMedia,mediaDirectory);
    //Affiche le cadre du bas
    displayLikesAndPrice(photographerData.price);
    //Menu de selection
    openCloseMenu();
    adaMenu();
    selectedOption(photographerMedia,mediaDirectory);
};

initPhotographer() 
async function getPhotographerDataAndMedia(photographId) {        
    const myJsonData=await loadJsonData();
    const photographers=myJsonData.photographers;
    const photographerData=photographers.find(photographer=>photographer.id==photographId);
    const photographerMedia=myJsonData.media.filter(medium=>medium.photographerId==photographId);
    return [photographerData,photographerMedia];
}

async function displayHeaderData(photographerData) { //affiche le cadre des infos du photographe
    const headerSection = document.querySelector(".photograph-header");
    const h2=document.createElement('h2');
    h2.setAttribute("aria-label","Nom du photographe"+photographerData.name);
    h2.innerHTML=photographerData.name;
    const h3=document.createElement('h3');
    h3.setAttribute("aria-label","Lieu d'activité du photographe"+photographerData.city+", "+photographerData.country);
    h3.innerHTML=photographerData.city+", "+photographerData.country;
    const h4=document.createElement('h4');
    h4.innerHTML=photographerData.tagline;
    h4.setAttribute("aria-label","devise du photographe"+photographerData.tagline);
    const img = document.createElement( 'img' );
    img.setAttribute("alt","portrait du photographe");
    img.setAttribute("src", "./assets/photographers/Photographers ID Photos/"+photographerData.portrait);

    const left=document.createElement("div");
    headerSection.appendChild(left);
    left.appendChild(h2);
    left.appendChild(h3);
    left.appendChild(h4);
    headerSection.appendChild(left.previousElementSibling);
    headerSection.appendChild(img);
}; 

async function displayMedia(photographerMedia,mediaDirectory){ //affiche tous les media du photographe
    const mediaContainer=document.querySelector(".media_container");
    mediaContainer.innerHTML="";
    var totalLikes=0;
    var mediaCardHtml="";
    photographerMedia.forEach(element => {
        const mediaModel = mediaFactory(element,mediaDirectory,photographerMedia,mediaCardHtml);
        element.title=mediaModel.title;
        mediaCardHtml = mediaModel.getMediaCardDOM();
        totalLikes+=element.likes;
    });
    mediaContainer.innerHTML=mediaCardHtml;
    //ouverture du carousel
    const allMedia=(Array.from(document.getElementsByClassName("media")));
    allMedia.forEach(media=>{
        const title=Array.from(media.children)[0].getAttribute('alt');
        if (media.classList.value=="media image"){
            const imageAdress=Array.from(media.children)[0].getAttribute('src');
            media.children[0].addEventListener("click",(e)=>displayCarousel(e,"image",imageAdress,photographerMedia,mediaDirectory,title));
            media.children[0].addEventListener("keyup", (e)=>{
                if (e.keyCode === 13) {
                 e.preventDefault();
                 media.children[0].click();
                }
              });
        }else if(media.classList.value=="media vid"){
            const videoAdress=Array.from(media.children)[0].getAttribute('src');
            media.children[0].addEventListener("click",(e)=>displayCarousel(e,"video",videoAdress,photographerMedia,mediaDirectory,title));
            media.children[0].addEventListener("keyup", (e)=>{
                if (e.keyCode === 13) {
                 e.preventDefault();
                 media.children[0].click();
                }
              });
        }else{
            null;
        }
    });
    //gestion des likes
    displayTotalLikes(totalLikes);
    manageLikes(totalLikes,photographerMedia,mediaDirectory);
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

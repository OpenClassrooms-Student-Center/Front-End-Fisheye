let photographers;
let medias;
let paramsId;

    async function getPhotographerId() {

        await fetch('data/photographers.json')
            .then(function(res) {
                if (res.ok) {
                return res.json();
                }
            })
            .then(function(data) {
                // On ajoute les données de l'API dans les variables photographersData et mediaData :
                // console.log(data);
                photographers = data.photographers;
                medias = data.media;

            })
            .catch(function(err) {
                // Se déclenche si une erreur est survenue dans l'appel de l'Api
                console.log("error in the function getPhotographerId()"); 
            });

        // On récupère l'ID du photographe dans l'URL
        paramsId = new URLSearchParams(window.location.search).get("id");
 
        // On filtre le photographe qui correspond avec l'ID dans  
        // le fichier data et l'ID de l'URL
        photographers = photographers.filter(photographer=> photographer["id"] == paramsId);
        medias = medias.filter(media => media["photographerId"] == paramsId);
    };

    async function displayPhotographerInGalleryPage(photographers){

        const photographersHeader = document.querySelector(".photograph-header");
        console.log(photographers);
        photographers.forEach((photographer) => {
            // On itère pour que le photographe soit construit via la factory et declenche
            // sa vue dans le HTML via les consignes de construction dans pages/photographer.js
            const photographerGalleryModel = PhotographerGalleryPageFactory(photographer);
            const userIdCardDOM = photographerGalleryModel.getPhotographerIdHeader();
            photographersHeader.appendChild(userIdCardDOM);
        });
    };

    async function displayMediasInGalleryPage(medias) {

        const mediasMain = document.querySelector(".medias-main");
        console.log(medias);
        
        medias.forEach((media) => {   
            const mediasGalleryModel = MediasGalleryPageFactory(media);
            const mediaCardDOM = mediasGalleryModel.getMediasOfPhotographer();
            mediasMain.appendChild(mediaCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        await getPhotographerId();
        displayPhotographerInGalleryPage(photographers);
        displayMediasInGalleryPage(medias);
    };
    
    init();
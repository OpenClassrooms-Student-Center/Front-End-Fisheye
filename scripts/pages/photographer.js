// Récupérer des données des photographes avec (fetch)
// Récupérer id de l'url et tri du tableau pour obtenir les photographers (URLSearchParams)
// Récupérer l'objet photographer par extraction du tableau photographers.json (.find)

fetch("./photographers.json").then((response)=>{
    return response.json();
}).then((result)=>{

    let searchParams = new URLSearchParams(window.location.search);

    const photographerId = searchParams.get('id');

    const photographers = result.photographers;

    const medias = result.media;

    const photographerInfo = photographers.find((photographer) => {

        if(photographer.id === Number(photographerId)) {

            return photographer;
        }
    });

    const photographerMedias = medias.filter((media)=>{

         if(media.photographerId === Number(photographerId)){

             return media;

         }

    });

    photographerToDisplay(photographerInfo);
})


// Afficher header photographer

function photographerToDisplay(photographerInfo){
    const {name, id, city, country, tagline, price, portrait} = photographerInfo;

    const picture = `../../assets/Photographers/${portrait}`;


    const photographerName = document.getElementById("header_photographer_name");
    photographerName.insertAdjacentHTML ("afterbegin" ,name);

    const photographerPicture = document.getElementById("photographer_picture");
    photographerPicture.setAttribute("src", picture);
    photographerPicture.setAttribute("alt", name);

    const photographerCity = document.getElementById("photographer_city");
    photographerCity.insertAdjacentHTML("afterbegin", city);

    const photographerCountry = document.getElementById("photographer_city");
    photographerCountry.insertAdjacentHTML ("beforeend", country);

    const photographerTagline = document.getElementById("photographer_tagline");
    photographerTagline.insertAdjacentHTML ("afterbegin" ,tagline);

    const photograherPrice = document.getElementById("photographer_price");
    photograherPrice.insertAdjacentHTML("beforebegin", price);

    return true;
}


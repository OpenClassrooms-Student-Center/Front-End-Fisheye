//Mettre le code JavaScript lié à la page photographer.html
// Récupérer ID dans URL search param
// filtrer le tableau pour récupérer les infos des photographes
// afficher avec appendchild

// Récupérer des données des photographes
// Extraction ID de l'URL
fetch("./photographers.json").then((response)=>{
    return response.json();
}).then((result)=>{
    let searchParams = new URLSearchParams(window.location.search);
    const photographerId = searchParams.get('id');
    const photographers = result.photographers;
    const photographerInfo = photographers.find((photographer) => {
        if(photographer.id === Number(photographerId)) {
            return photographer;
        }
    });
    photographerToDisplay(photographerInfo)
})


// Afficher la page des photographes

function photographerToDisplay(photographerInfo){
    const {name, id, city, country, tagline, price, portrait} = photographerInfo;
    const picture = `../../assets/Photographers/${portrait}`;
    console.log(picture)

const headerProfil = document.createElement('div');
headerProfil.setAttribute("id", "header_profil");

const photographerName = document.createElement('h1');
photographerName.innerhtml = name;
photographerName.setAttribute("id", "header_photographer_name");
headerProfil.appendChild(photographerName);

const contactButton = document.createElement("button");
contactButton.setAttribute("class", "contact_button");
contactButton.setAttribute("id", "contact_button");
contactButton.innerHTML = "Contactez-moi";
headerProfil.appendChild(contactButton);

const photographerPicture = document.createElement("img");
photographerPicture.setAttribute("src", portrait);
photographerPicture.setAttribute("alt", photographerName);
photographerPicture.setAttribute("class", "picture_portrait");
photographerPicture.setAttribute("id", "photographer_picture");
headerProfil.appendChild(photographerPicture);

const textProfil = document.createElement("div");
textProfil.setAttribute("class", "text");
headerProfil.appendChild(textProfil);

const PhotographerCity = document.createElement("p");
PhotographerCity.innerHTML = city, country;
PhotographerCity.setAttribute("class", "header_title_text");
PhotographerCity.setAttribute("id", "photographer_city");
textProfil.appendChild(PhotographerCity);

const PhotographerTagline = document.createElement("p");
PhotographerTagline.innerHTML = tagline;
PhotographerTagline.setAttribute("class", "header_text");
PhotographerTagline.setAttribute("id", "photographer_tagline");
textProfil.appendChild(PhotographerTagline);

return photographerToDisplay;
}

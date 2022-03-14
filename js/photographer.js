/////////////////// Fetch du fichier Json
////////////////// 1ère partie : data.photographers (section nommée photographers du fichier)


async function getPhotographers() {
    let photographers = await fetch("../data/photographers.json")
      .then((response) => response.json())
      .then((data) => {
        return data.photographers;
      });
    return photographers;
    
  }
  
  /////////////////  2ème partie : data.media (section nommée data du fichier)
  
  async function getMedias() {
    let medias = await fetch("../data/photographers.json")
      .then((response) => response.json())
      .then((data) => {
        return data.media;
      });
    return medias;
  }
  
  
  async function init() {
    let photographers = await getPhotographers();
    const content = document.getElementById("photographer_section");
    photographers.forEach((photographer) =>
      content.appendChild(photographerCardFactory(photographer, photographers))
    );
  }
  


async function init() {
 
   let photographers = await getPhotographers();
   console.log ("affichage de photographers obtenu par fetch",photographers);
   //////////////////////////////////// lecture de paramètre du lien URL     /////////////                                    NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW////                            
   const queryParams = window.location.search;
   console.log ("query params de window.location.search      ",queryParams);
   const urlParams = new URLSearchParams (queryParams);
   console.log ("new URLSearchParams     ",urlParams);
   const photographerArtistId = urlParams.get ('id')
   console.log ("id lue sur l'URL avec get      ",photographerArtistId);
   
   
   const choosenphotographer = photographers.find(function(item) {return item.id == photographerArtistId});
   console.log ("choosenphotographer",choosenphotographer);
   const index = photographers.indexOf(choosenphotographer);
   console.log("index", index);
 
   const content = document.getElementById("photograph-header");
   content.appendChild(photographerHeader(photographers[index]));


 ///   ajout des medias ///
 

}
  

 init();











/////////////////// create photographer ///////////////////

function photographerHeader(photographer) {
  const photographerProfile = document.createElement("article");
  const contactButton = document.getElementById("contact");
  const profilePicture = document.createElement("img");
  const photographerName = document.createElement("h2");
  const localisation = document.createElement("p");
  const tagline = document.createElement("p");
    
  profilePicture.src = "../assets/Photographers ID Photos/" + photographer.portrait;
  profilePicture.alt = photographer.name;
  photographerName.textContent = photographer.name;
  localisation.textContent = photographer.city + ", " + photographer.country;
  localisation.id = "localisation";
  tagline.id = "tagline";
  tagline.textContent = photographer.tagline;
  contactButton.textContent = "Contactez-moi";

  photographerProfile.appendChild(contactButton);
  photographerProfile.appendChild(profilePicture);
  photographerProfile.appendChild(photographerName);
  photographerProfile.appendChild(localisation);
  photographerProfile.appendChild(tagline);
  
  return photographerProfile;
}






/////////////////// create photographer gallery ///////////////////








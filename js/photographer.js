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
   //console.log ("affichage de photographers obtenu par fetch",photographers);
   //////////////////////////////////// lecture de paramètre du lien URL     /////////////                                    NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW////                            
   const queryParams = window.location.search;
   //console.log ("query params de window.location.search      ",queryParams);
   const urlParams = new URLSearchParams (queryParams);
   //console.log ("new URLSearchParams     ",urlParams);
   const photographerArtistId = urlParams.get ('id')
   //console.log ("id lue sur l'URL avec get      ",photographerArtistId);
   
   
   const choosenphotographer = photographers.find(function(item) {return item.id == photographerArtistId});
   //console.log ("choosenphotographer",choosenphotographer);
   const index = photographers.indexOf(choosenphotographer);
   //console.log("index", index);
 
   const content = document.getElementById("photograph-header");
   content.appendChild(photographerHeader(photographers[index]));


 ///   ajout des medias ///
 let medias = await getMedias();
 console.log ("voici les médias obtenus par fetch" ,medias);
 const choosenGallery = medias.filter(function(item){return item.photographerId == photographerArtistId});
 console.log ("résultat du filter avec l'ID du photographe",choosenGallery);
 const gallery = document.getElementById("gallery");
 choosenGallery.forEach((item) =>
    gallery.appendChild(photographerGallery(photographers[index],item))
  );
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

function photographerGallery(photographer,photo) {
  const photoCard = document.createElement("article");
  const photoCardImg = document.createElement("img");
  const photoCardTitle = document.createElement("h2");
  photoCardImg.src = "../assets/photographers/" + photographer.name + "/" + photo.image;
  photoCardTitle.textContent = photo.title;
 //console.log(photoCardImg.src);


  photoCard.appendChild(photoCardImg);
  photoCard.appendChild(photoCardTitle);

return photoCard;
}






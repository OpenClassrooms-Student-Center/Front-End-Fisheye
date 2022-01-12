// fonction pour afficher l'identité du photographe séléctionné
function photographerCardFactory(photographer) {
    const { name, portrait, city, country, tagline } = photographer;
   
    function getPhotographerCard() {
        const photographIntroduction = document.getElementById('photograph-introduction');

        const profileName = document.createElement( 'h2' ); // création du nom du profil
        profileName.textContent = name; // on affiche le nom sous forme de texte
        photographIntroduction.appendChild(profileName); // est l'enfant du lien du profil
              
        const profileLocation = document.createElement( 'h3' ); // création de la localisation du photographe
        profileLocation.textContent = `${city}, ${country}`; // on l'affiche sous forme de texte
        photographIntroduction.appendChild(profileLocation); // est l'enfant du lien
              
        const profileQuote = document.createElement( 'p' ); // création de la citation
        profileQuote.setAttribute('class', 'quote');
        profileQuote.textContent = tagline; // qu'on affiche sous forme de texte
        photographIntroduction.appendChild(profileQuote); // est l'enfant du lien
      
        const profilePicture = document.createElement( 'img' ); // création de la photo de profil
        profilePicture.setAttribute("src", `assets/photographers/${portrait}`); // définition de l'image
        profilePicture.setAttribute("alt", `${name}`); // définition du nom de l'image
        photographIntroduction.appendChild(profilePicture); // est l'enfant du lien du profil
        
        return (photographIntroduction);
    }

    return {name, portrait, city, country, city, tagline, getPhotographerCard }
      
}
  
// fonction pour afficher le travail du photographe sélectionné
function mediaFactory(media) {
    const { id, title, image, video, like } = media;
  
    function getMediaCard() {
        const mediaCard = document.createElement('aside');

        if(image) {
            const photographPicture = document.createElement('img');
            photographPicture.setAttribute("src", `assets/photographers/${photographerSelectedId}/${image}`);
            photographPicture.setAttribute("alt", `${title}`);
            mediaCard.appendChild(photographPicture);
        } else if(video) {
            const photographVideo = document.createElement('video');
            photographVideo.setAttribute("src", `assets/photographers/${photographerSelectedId}/${video}`);
            photographVideo.setAttribute("alt", `${title}`);
            mediaCard.appendChild(photographVideo);
        }

        return mediaCard;
    }

    return { id, title, image, video, like, getMediaCard }
}
   
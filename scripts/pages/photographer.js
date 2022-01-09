const urlParams = new URLSearchParams(window.location.search); // on recherche dans l'url de la page
const photographerSelectedId = urlParams.get("id"); // on récupère l'Id du photographe dans l'url 

// éléments du dom
const container = document.getElementById('main');
const photographerHeader = document.getElementById('photograph-header');

function displayPhotographerData(value) {
  const photographersData = value.photographers;

  const photographIntroduction = document.getElementById('photograph-introduction');

  if(photographersData) {
    photographersData.find((photographer) => {
        if(photographer.id == photographerSelectedId) {
  
          const profileName = document.createElement( 'h2' ); // création du nom du profil
          profileName.textContent = photographer.name; // on affiche le nom sous forme de texte
          photographIntroduction.appendChild(profileName); // est l'enfant du lien du profil
          
          const profileLocation = document.createElement( 'h3' ); // création de la localisation du photographe
          profileLocation.textContent = photographer.city; // on l'affiche sous forme de texte
          photographIntroduction.appendChild(profileLocation); // est l'enfant du lien
          
          const profileQuote = document.createElement( 'p' ); // création de la citation
          profileQuote.setAttribute('class', 'quote');
          profileQuote.textContent = photographer.tagline; // qu'on affiche sous forme de texte
          photographIntroduction.appendChild(profileQuote); // est l'enfant du lien
  
          const profilePicture = document.createElement( 'img' ); // création de la photo de profil
          profilePicture.setAttribute("src", `assets/photographers/${photographer.portrait}`); // définition de l'image
          profilePicture.setAttribute("alt", `${photographer.name}`); // définition du nom de l'image
          photographerHeader.appendChild(profilePicture); // est l'enfant du lien du profil
        }
      });
}
}

function getSelectedPhotographerData() {
    fetch(`../data/photographers.json`) // on récupère les données
      .then(function (res) {
        if (res.ok) {
          return res.json(); // si ok on les retourne au format JSON
        }
      })
      .then(function (value) {
        const photographersMedia =  value.media;
        console.log(photographersMedia);

        displayPhotographerData(value);
        
      })
      .catch(function (err) {
        document.getElementById("main")
                .innerHTML += `<aside class="error">
                                      <h2>
                                          Une erreur s'est produite, Veuillez nous en excuser et réiterer votre demande ulterieurement
                                      </h2>
                                  </aside>`;
      });
  }
  
  getSelectedPhotographerData();

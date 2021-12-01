//Mettre le code JavaScript lié à la page photographer.html

/*--------- DOM ELEMENTS ---------*/

//Recuperer l'id du photographe
const photographe = window.location.search.split("?").join("");

let likeCount = 0;

/*--------- EVENTS ---------*/
const fetchPhotographer = async () => {
    await fetch('./data/photographers.json')
        .then( function  (resp) {
            return resp.json();
        })
        .then( function (data) {
            thePhotographers = data.photographers;
            theMedia = data.media;

            for (let i = 0; i < thePhotographers.length; i++) {
                if(thePhotographers[i].id == photographe){
                    thePhotographer = thePhotographers[i];
                }
            }
        });
};


const photographerDisplay = async () => {
    await fetchPhotographer();

    //Zone pour afficher les données:
    const photographerBanner = document.querySelector(".photograph-header");
    //Afficher les données
    photographerBanner.innerHTML = 
    `<div class="photograph-header-name">
          <h1>${thePhotographer.name}</h1>
          <div class="photograph-header-desc">
            <h3>${thePhotographer.city}, ${thePhotographer.country}</h3>
            <p>${thePhotographer.tagline}</p>
          </div>
        </div>
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        <div class="photograph-header-photo">
          <img src="assets/photographers/${thePhotographer.portrait}" alt="Photo de Mimi Keel">
        </div>`;

    const photoSection = document.querySelector(".photos");

    for (let i = 0; i < theMedia.length; i++) {
        if(theMedia[i].photographerId == photographe){

            //Setup element
            const photo = document.createElement('div');
            photo.classList.add("photo");

            //Afficher la photo
            laPhotoName = thePhotographer.name.split(" ")[0]
            const laPhoto = `assets/photographers/${laPhotoName}/${theMedia[i].image}`;
            const img = document.createElement( 'img' );
            img.setAttribute("src", laPhoto)

            //Desciption photo
            const photoDesc = document.createElement('div');
            photoDesc.classList.add("photo-desc");

            const photoTitre = document.createElement('div');
            photoTitre.classList.add("titre");
            const titre = document.createElement('p');
            titre.textContent = theMedia[i].title;
            photoTitre.appendChild(titre);
            photoDesc.appendChild(photoTitre);
            const photoLikes = document.createElement('div');
            photoLikes.classList.add("likes");
            const likes = document.createElement('p');
            likes.innerHTML = theMedia[i].likes + '<i class="fas fa-heart"></i>';
            //Like counter

            photoLikes.appendChild(likes);
            photoDesc.appendChild(photoLikes);
            likeCount = likeCount + theMedia[i].likes;

            photo.appendChild(img);
            photo.appendChild(photoDesc);
            //Append to div
            photoSection.appendChild(photo);
        }
    }

    //Zone pour afficher les données:
    const photographerRecap = document.querySelector(".photograph-recap");
    //Afficher les données
    photographerRecap.innerHTML = 
    `<div class="photograph-recap-totalLikes">
        <p>${likeCount}</p><i class="fas fa-heart"></i>
    </div>
    <div class="photograph-recap-price">
        <h3>${thePhotographer.price}€/jour</h3>
    </div>`;
    
}

photographerDisplay();


/*--------- FUNCTIONS ---------*/



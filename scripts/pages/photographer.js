//Mettre le code JavaScript lié à la page photographer.html

/*--------- DOM ELEMENTS ---------*/

//Recuperer l'id du photographe
const photographe = window.location.search.split("?").join("");

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
                    console.log(thePhotographer);
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

    //Zone pour afficher les données:
    const photographerRecap = document.querySelector(".photograph-recap");
    //Afficher les données
    photographerRecap.innerHTML = 
    `<div class="photograph-recap-totalLikes">
        <p>None</p><i class="fas fa-heart"></i>
    </div>
    <div class="photograph-recap-price">
        <h3>${thePhotographer.price}€/jour</h3>
    </div>`;

    const photoSection = document.querySelector(".photos");

    for (let i = 0; i < theMedia.length; i++) {
        if(theMedia[i].photographerId == photographe){
            theMedias = theMedia[i];
            console.log(theMedias);

            theMedias.forEach((media) => {
                photoSection.innerHTML = 
                `<div class="photo">
                    <img src="assets/photographers/${thePhotographer.name}/${theMedias.image}" alt="Photo: ${theMedias.title}">
                    <div class="photo-desc">
                        <div class="titre">
                            <p>${theMedias.title}</p>
                        </div>
                        <div class="likes">
                            <p>${theMedias.likes}</p><i class="fas fa-heart"></i>
                        </div>
                    </div>
                </div>
                `
            });
        }
    }
    
}

photographerDisplay();


/*--------- FUNCTIONS ---------*/



//Mettre le code JavaScript lié à la page photographer.html

/*--------- DOM ELEMENTS ---------*/

//Recuperer l'id du photographe
const photographe = window.location.search.split("?").join("");

/*--------- EVENTS ---------*/
const fetchPhotographers = async () => {
    await fetch('./data/photographers.json')
        .then( function  (resp) {
            return resp.json();
        })
        .then( function (data) {
            console.log(data);
            thePhotographers = data.photographers;
            // theMedia = data.media;

            for (let i = 0; i < thePhotographers.length; i++) {

                if(thePhotographers[i].id == photographe){
                    console.log(thePhotographers[i]);
                }
            }
        });
};


const photographersDisplay = async () => {
    await fetchPhotographers();
}

photographersDisplay();



/*--------- FUNCTIONS ---------*/



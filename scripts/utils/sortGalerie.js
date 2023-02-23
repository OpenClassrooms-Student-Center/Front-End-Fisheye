/*structure media.json{
			"id": nb,
			"photographerId": nb,
			"title": string,
			"image": string url,
          **or "video":  string url,
			"likes": nb,
			"date": string format yyyy-mm-dd,
			"price": nb
		},*/
let artistFirstName="Mimi";
let subGalerie={};

/*
function photographerFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price_unit} = data;
    if (image.length!=0){
        const contentPath = `./assets/photographers/${artistFirstName}/${image}`;
    }
    else {const contentPath = `./assets/photographers/${artistFirstName}/${video}`;}
                
              
            function getUserCardDOM() {
                const article = document.createElement( 'article' );   
                article.setAttribute("class", "content_card");
                article.setAttribute("aria-label", `galerie de ${photographer}`);
        
                const leftCol = document.createElement( 'div' );
                leftCol.setAttribute( 'class', 'leftCol');
                article.appendChild(leftCol);
                const middleCol = document.createElement( 'div' );
                middleCol.setAttribute( 'class', 'middleCol');
                article.appendChild(middleCol);
                const rightCol = document.createElement( 'div' );
                rightCol.setAttribute( 'class', 'rightCol');
                article.appendChild(rightCol);
        
                const h2 = document.createElement( 'h2' );
                h2.textContent = name;
                
                const location = document.createElement( 'div' );
                location.setAttribute( 'class', 'location');
                location.textContent = city+', '+country;
                
                const motto = document.createElement( 'div' );
                motto.setAttribute( 'class', 'tagline');
                motto.textContent = tagline;
                
                const displayModal = document.createElement( 'button');
                displayModal.setAttribute("class","contact_button");
                displayModal.setAttribute("onclick","displayModal()");
                displayModal.setAttribute("aria-label","ouverture du formulaire");
                displayModal.textContent="Contactez-moi";
        
                const img = document.createElement( 'img' );
                img.setAttribute("src", picture);
                img.setAttribute("label", name);
        
                const tarif = document.createElement( 'div' );
                tarif.setAttribute( 'class', 'price anchored');
                tarif.textContent = price.toString()+'€/jour';
                
                leftCol.appendChild(h2);
                leftCol.appendChild(location);
                leftCol.appendChild(motto);
                middleCol.appendChild(displayModal);
                rightCol.appendChild(img);
                
        
                return (article);
            }
            return { name, picture, getUserCardDOM }
        }
                
        async function displayData(photographer) {
            const photographersSection = document.querySelector(".photograph-header");
                const photographerModel = photographerFactory(photographer);
                const userCardDOM = photographerModel.getUserCardDOM();
                photographersSection.appendChild(userCardDOM);
                          
};
*/
                
        // Récupère les datas du photographe choisi et initialise l'affichage
const artist=parseInt(window.location.search.slice(-4,));
console.log(artist);


fetch('./data/photographers.json')
    .then(
        function(response) {
        if (response.status !== 200) {
            console.log('Problem. Status Code: ' +response.status);
            return;
        }
                
        response.json().then(function(data) {
            artistFirstName=data.photographers[artist].name.split(' ')[0];
            console.log(data.photographers[artist].name.split(' ')[0]);
            const artistNb=data.photographers[artist].id;
            console.log(artistNb);            
            for (let i=0; i<=data.media.length; i++){
                if(data.media[i].photographerId==artistNb){
                    subGalerie = Object.assign(subGalerie, data.media[i]);
                    }    
            }
            console.log(subGalerie);
                  
      //    displayData(subGalerie); 
        });
    })
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
/*structure photographers.json{
			"name": string,
			"id": nb,
			"city": string,
			"country": string,
			"tagline": string,
			"price": nb,
			"portrait": string
		},*/

function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
        
    const picture = `./assets/photographers/zzportrait/${portrait}`;
        
        
    function getUserCardDOM() {
        const article = document.createElement( 'article' );   
        article.setAttribute("class", "galerie-header");
        article.setAttribute("aria-label", `galerie de ${name}`);

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
        
/*async*/ function displayData(photographer) {
    const photographersSection = document.querySelector(".photograph-header");
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
        
    
};
        
// Récupère les datas des photographes et initialise l'affichage
const artistId=parseInt(window.location.search.slice(-4,));
console.log(artistId)

fetch('./data/photographers.json')
    .then(
        function(response) {
        if (response.status !== 200) {
            console.log('Problem. Status Code: ' +response.status);
            return;
        }
        
        response.json().then(function(data) {
            console.log(data.photographers[artistId]);
            displayData(data.photographers[artistId]); 
            const contactMe = document.querySelector(".contactMe");
            contactMe.textContent = contactMe.textContent.concat("\n",data.photographers[artistId].name);
            
        });
    })
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
            
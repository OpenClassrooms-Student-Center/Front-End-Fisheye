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

    const picture = `assets/photographers/zzportrait/${portrait}`;
    const photographerpath = `photographer.html?id=${id}`;


    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const baliseA = document.createElement('a');

        baliseA.setAttribute("href", photographerpath);
        baliseA.setAttribute("aria-label", `lien vers la page de ${name}`);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("label", name)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const location = document.createElement( 'div' );
        location.setAttribute( 'class', 'location');
        location.textContent = city+', '+country;

        const motto = document.createElement( 'div' );
        motto.setAttribute( 'class', 'tagline');
        motto.textContent = tagline;

        const tarif = document.createElement( 'div' );
        tarif.setAttribute( 'class', 'price');
        tarif.textContent = price.toString()+'€/jour';

        article.appendChild(baliseA);
        baliseA.appendChild(img);
        baliseA.appendChild(h2);
        baliseA.appendChild(location);
        baliseA.appendChild(motto);
        baliseA.appendChild(tarif);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
     });
};

// Récupère les datas des photographes et initialise l'affichage
fetch('./data/photographers.json')
    .then(
        function(response) {
        if (response.status !== 200) {
            console.log('Problem. Status Code: ' +response.status);
            return;
        }

        response.json().then(function(data) {
            displayData(data.photographers); 
        });
    })
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
    

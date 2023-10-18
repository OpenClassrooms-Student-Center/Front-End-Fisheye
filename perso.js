function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    console.log(modal)
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    console.log(modal+'2')
}

// afficher et fermer la modale du formulaire 

    // récuperer les pieces depuis le fichier JSON
    async function getData() { // déclare une fonction asynchrone

        const response = await fetch ("/data/photographers.json") // crée une variable pour recevoir la réponse de la requete HTTP
        const photographers = await response.json() // crée une variable pour transformer la réponse en format JSON
        return photographers
    }
      
    // création des balises 
    

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer); 
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getData(); // déstructuration avec les accolades, pour récup uniquement photographers
        displayData(photographers);
 
    }
    
     init();
    
// function photographerTemplate(data) {
//     const {name, id, city, country, tagline, price, portrait} = data;
//     console.log(data)
//     const picture = `assets/photographers/${portrait}`;
//     // const description = `assets/photographers/${description-de-l-image}`


//     function getUserCardDOM() {
//         const article = document.createElement('article');
//         const section = document.createElement('section')
//         section.classList.add('section_under_name')

//         const portraitWrapper = document.createElement('div')
//         portraitWrapper.classList.add('portrait_wrapper')
        
//         const img = document.createElement('img');
//         img.setAttribute("src", picture)
//         img.setAttribute('alt', 'photo de profil du Photographe '+name)

//         const h2 = document.createElement('h2');
//         h2.textContent = name;

//         const span = document.createElement('span')
//         span.classList.add('city_country')
//         span.textContent = city +', '+country

//         const p = document.createElement('p')
//         p.classList.add('tagline')
//         p.textContent = tagline

//         const p2 = document.createElement('p')
//         p2.classList.add('price')
//         p2.textContent = price+'€/jour'

//         article.appendChild(portraitWrapper)
//         portraitWrapper.appendChild(img);
//         article.appendChild(h2);
//         article.appendChild(section)
//         section.appendChild(span)
//         section.appendChild(p)
//         section.appendChild(p2)
//         return (article);
//     }
//     return { name, picture, getUserCardDOM }
// }

class UserCard {
    constructor(name, id, city, country, tagline, price, portrait) {

        this.name = name
        this.id = id
        this.city = city
        this.country = country
        this.tagline = tagline
        this.price = price
        this.portrait = portrait
    }

    createImageElement() {
        const portraitWrapper = document.createElement('div')
        portraitWrapper.classList.add('portrait_wrapper')
        
        const img = document.createElement('img');
        const picture = `assets/photographers/${this.portrait}`
        img.setAttribute("src", picture)
        img.setAttribute('alt', 'photo de profil du Photographe '+this.name)

        portraitWrapper.appendChild(img);
        return portraitWrapper;
    }

    createTitleElement() {
        const h2 = document.createElement('h2');
        h2.textContent = this.name;
        return h2
    }

    createCityCountryElement() {
        const span = document.createElement('span')
        span.classList.add('city_country')
        span.textContent = this.city +', '+ this.country
        return span
    }

    createTagLineElement() {
        const p = document.createElement('p')
        p.classList.add('tagline')
        p.textContent = this.tagline
        return p
    }

    createPriceElement() {
        const p2 = document.createElement('p')
        p2.classList.add('price')
        p2.textContent = this.price+'€/jour'
        return p2
    }

    appendChildElement() {
        const article = document.createElement('article');
        const section = document.createElement('section');
        section.classList.add('section_under_name');

        const portraitWrapper = this.createImageElement();
        const h2 = this.createTitleElement();
        const span = this.createCityCountryElement();
        const p = this.createTagLineElement();
        const p2 = this.createPriceElement();

        article.appendChild(portraitWrapper);
        article.appendChild(h2);
        article.appendChild(section);
        section.appendChild(span);
        section.appendChild(p);
        section.appendChild(p2);

        return article;
    }

    init() {
        this.createImageElement()
        this.createTitleElement()
        this.createCityCountryElement()
        this.createTagLineElement()
        this.createPriceElement()
        this.appendChildElement()
    }


}

const newUserCard = new UserCard
newUserCard.init()


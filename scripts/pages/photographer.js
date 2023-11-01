//Mettre le code JavaScript lié à la page photographer.html

function getIdFromUrl() {
    const idOfPhotographer = new URLSearchParams(window.location.search).get('id')
    return idOfPhotographer
}

async function loadPhotographerContent () {

    async function getData() { 

        const response = await fetch ("/data/photographers.json") 
        return await response.json()
    }
    
        const { photographers } = await getData()
        const filteredPhotographer = photographers.find((photographer) => photographer.id == getIdFromUrl()) // utiliser find à la place de filter 
       
        const { name, city, country, tagline, price, portrait } = filteredPhotographer


        const photographHeader = document.querySelector(".photograph_header")
        const textContainer = document.querySelector(".text_container")
        textContainer.style.order = "-1"
        
        const nameOf = document.querySelector(".photographer_main_title")
        nameOf.textContent = name

        const cityOfCountryOf = document.querySelector(".city_of_country_of")
        const tagLineOf = document.querySelector(".photographer_tagline")

        const priceOf = document.createElement("p")
        priceOf.textContent = price

        const portraitOf = document.querySelector(".portrait_of_photographer")
        // refaire propremeent 
        portraitOf.setAttribute("src", `/assets/photographers/${name.replace(' ', '').replace('-', '')}.jpg`)
        portraitOf.setAttribute("alt", "portrait du photographe "+ `${name}` )

        cityOfCountryOf.textContent = city +', ' + country
        tagLineOf.textContent = tagline

        photographHeader.appendChild(textContainer)
        photographHeader.appendChild(imgWrapper)
        textContainer.appendChild(nameOf)
        textContainer.appendChild(cityOfCountryOf)
        textContainer.appendChild(tagLineOf)
        imgWrapper.appendChild(portraitOf)
            
}

loadPhotographerContent()

// renvoyer une erreur 


 /* on ajoute l'id à l'URL avec setAttribute href 
 on récupère l'id avec new URLSearchParams(window.location.search).get('id')
 on fetch sur le json et on filtre les photograpes avec l'id  */


// gestion de la modale avec POO , méthodes pour ouvrir, fermer, récupérer les inputs et les logger
class Modal {
    constructor(modal, form, contactBtn, submitBtn, closeBtn) {
        this.modal = document.querySelector(modal);
        this.form = document.querySelector(form);
        this.contactBtn = document.querySelector(contactBtn);
        this.submitBtn = document.querySelector(submitBtn);
        this.closeBtn = document.querySelector(closeBtn);
    }

    openModal() {
        this.contactBtn.addEventListener("click", () => {
            this.modal.style.display = "block";

            const elementsToHide = document.querySelectorAll("body > *:not(#contact_modal)");
            elementsToHide.forEach((element) => {
                element.setAttribute("aria-hidden", "true");
            });
        });
    }

    closeModal() {
        this.closeBtn.addEventListener("click", () => {
            this.modal.style.display = "none";

            const elementsToHide = document.querySelectorAll("body > *:not(#contact_modal)");
            elementsToHide.forEach((element) => {
                element.setAttribute("aria-hidden", "false");
            });
        });
    }

    getFormValues() {
        const formValues = {};
        for (let i = 0; i < this.form.elements.length; i++) {
            const element = this.form.elements[i];
            formValues[element.name] = element.value;
        }
        return formValues;
    }

    getLogForm() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault()
            console.log(this.getFormValues());
            this.modal.style.display = "none"
            
        });
    }

    init() {
        this.openModal()
        this.closeModal()
        this.getFormValues()
        this.getLogForm()
    }
}

const newModal = new Modal("#contact_modal", "form", ".contact_button", ".submit_button", "#close_button");
newModal.init()

// création de la classe pour la Lightbox en se basant sur la modale précédente
class Lightbox {
    constructor( ) {

    }
}
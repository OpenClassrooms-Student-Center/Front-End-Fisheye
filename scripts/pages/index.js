    async function getData() { 

        const response = await fetch ("/data/photographers.json") 
        const photographers = await response.json()
        return photographers
    }
      
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const {name, id, city, country, tagline, price, portrait} = photographer
            const userCard = new UserCard(name, id, city, country, tagline, price, portrait)
            const userCardDOM = userCard.getUserCardDOM()
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getData(); // déstructuration avec les accolades, pour récup uniquement photographers
        displayData(photographers);
 
    }
    
     init();
    


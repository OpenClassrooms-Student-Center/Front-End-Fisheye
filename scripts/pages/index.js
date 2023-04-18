   document.onload = function() {
     localStorage.removeItem('id');
   }
   
   async function getPhotographers() {
        let response = await fetch("../data/photographers.json")
        //retourner le tableau photographers seulement une fois récupéré
        let photographers = await response.json();
        return photographers;
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    function SetId(e) {
        if (e.target.classList.contains('pageLink')) {
            const id = e.target.getAttribute('id');
            localStorage.setItem('id', id);
            console.log(id);
        }
    }
    
    

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    document.addEventListener('click', SetId);
    
    init();
    

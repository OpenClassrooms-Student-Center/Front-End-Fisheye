    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        let photographers= [];
        await fetch("../data/photographers.json")
            .then((res)=> res.json())
            .then((data) => (photographers = data))
            .catch(err => console.log("oh no", err));
        // et bien retourner le tableau photographers seulement une fois récupéré
        return photographers;
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        const PhotographersData = photographers;

        PhotographersData
            .map(photographer =>  new Photographer(photographer))
            .forEach((photographer) => {           
                const Template = new UserCard(photographer);
                photographersSection.appendChild(Template.getUserCardDOM());
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    

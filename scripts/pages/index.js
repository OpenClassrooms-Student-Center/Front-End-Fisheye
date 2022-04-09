    async function getPhotographers() {
        new BaseURL
        const photographersApi = new PhotographersApi(BaseURL.base+"data/photographers.json")
        const photographersData = await photographersApi.getPhotographers()
        
        const photographers = photographersData
                                .map(
                                    photographer => photographerFactory(photographer)
                                    )
        return ({photographers: photographers})
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const userCardDOM = photographer.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    
class Pages {
    constructor() {
        this.photographPage = document.querySelector('.photograph-header');
        this.mediasPhotograph = document.querySelector('.mediaDisplay');
        this.modalContact = document.getElementById('contact_modal');
        this.carouselMedias = document.querySelector('.carouselModal');
        //j'instancie ma classe GetPhotographers 
        this.getPhotographers = new GetPhotographers('/data/photographers.json');
    }
    
    async main() {
        // je recupère l'id dans l'url
        const queryUrl_id = window.location.search;
        const urlSeachParam = new URLSearchParams(queryUrl_id);
        const photographerUrlId = urlSeachParam.get("id");
        
        // je stocke mes medias et photographers dans une variable
        const mediaPhotographer = await this.getPhotographers.getMedias();
        const PhotographersFile = await this.getPhotographers.getPhotograph();
         
        //je filtre le contenu en fonction de l'id passé dans l'url 
        const filteredMediaByPhotographer = mediaPhotographer.filter((media) => media.photographerId == photographerUrlId);
        const filteredPhotographer = PhotographersFile.filter((photographer) => photographer.id == photographerUrlId)[0];
        
        const allMedias = filteredMediaByPhotographer.map(media => new TypedataFactory(media));
        
        const pagesPhotograph = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createPhotographerPage();
        this.photographPage.appendChild(pagesPhotograph);
        
        // Je boucle sur les medias pour générer la vue    
        // console.log(allMedias);

        allMedias
        .forEach(filteredMediaByPhotographer => { 
            const TemplateMedia = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createPhotographerMedia()
            this.mediasPhotograph.appendChild(TemplateMedia)
        });

        const contactModalDisplay = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createModalDisplay();
        this.modalContact.appendChild(contactModalDisplay);

        
        allMedias
        .forEach(filteredMediaByPhotographer => {
            const carouselMediasDisplay = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createCarousel();
            this.carouselMedias.appendChild(carouselMediasDisplay);
        })
    }
}
const pages = new Pages();
pages.main();
class Pages {
    constructor() {
        this.photographPage = document.querySelector('.photograph-header');
        this.mediasPhotograph = document.querySelector('.mediaDisplay');
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
        
        console.log(filteredMediaByPhotographer );
        // je génère la vue de mes données en instanciant ma classe PhotographerPage
        const pagesPhotograph = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createPhotographerPage();
        this.photographPage.appendChild(pagesPhotograph);
        
        // Je boucle sur les medias pour générer la vue  
        filteredMediaByPhotographer
        .forEach(filteredMediaByPhotographer => { 
            const TemplateMedia = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createPhotographerMedia()
            this.mediasPhotograph.appendChild(TemplateMedia)
        });
         
    }
    
}
const pages = new Pages();
pages.main();
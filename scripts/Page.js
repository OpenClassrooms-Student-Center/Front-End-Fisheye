class Pages {
    constructor() {
        this.photographPage = document.querySelector('.photograph-header');
        //j'instancie ma classe GetPhotographers 
        this.getPhotographers = new GetPhotographers('/data/photographers.json');
    }

    async main() {
        
        const queryUrl_id = window.location.search;
        const urlSeachParam = new URLSearchParams(queryUrl_id);
        const photographerUrlId = urlSeachParam.get("id");
        const mediaPhotographer = await this.getPhotographers.getMedias();
        const PhotographersFile = await this.getPhotographers.getPhotograph();

        const filteredMediaByPhotographer = mediaPhotographer.filter((media) => media.photographerId == photographerUrlId);
        const filteredPhotographer = PhotographersFile.filter((photographer) => photographer.id == photographerUrlId)[0];
        
        console.log(filteredMediaByPhotographer);
        const pagesPhotograph = new PhotographerPage(filteredPhotographer, filteredMediaByPhotographer).createPhotographerPage();
        this.photographPage.appendChild(pagesPhotograph);
        
        filteredMediaByPhotographer.map(media => createMedia(media))
        function createMedia(media) {
            return media;
        }

        
        // for (let i = 0; i < mediaPhotographer.length; i++) {
        //     const dataPhotographerId = mediaPhotographer[i]; 
        //     if(photographerUrlId == dataPhotographerId['photographerId']){

        // const dataPhotographer = dataPhotographerId['photographerId'];
        // for(let j = 0; j < dataPhotographer.length; j++) {
        //     dataPhotographer.forEach(media => {
        //         const TemplateMedia = new PhotographerPage(photographers, media);
        //         this.photographPage.appendChild(TemplateMedia.createPhotographerPage())
        //     });
        // }
        //     }            
        // }  
    }
}
const pages = new Pages();
pages.main();
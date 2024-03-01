export default class PhotographerFilter {
    constructor(medias, lightbox) {
        this.medias = medias;
        this.lightbox = lightbox;
    }

    applySort(sortBy) {
        switch (sortBy) {
            case 'likes':
                this.medias.sort((a, b) => b.likes - a.likes);
                break;
            case 'date':
                this.medias.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'title':
                this.medias.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }
        
        const photographerMedias = document.querySelector('.photograph-medias');
        photographerMedias.innerHTML = '';

        this.medias.forEach((media) => media.render());
        
        // Mise à jour des médias dans la lightbox  
        this.lightbox.updateMedias(this.medias); 
    }

    initSortListener() {
        document.getElementById('sortMedia').addEventListener('change', (event) => {
            this.applySort(event.target.value);
        });
    }
}
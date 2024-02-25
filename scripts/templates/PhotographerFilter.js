export default class PhotographerFilter {
    constructor(medias) {
        this.medias = medias;
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

        this.medias.map((media) => media.render());
    
    }
    initSortListener() {
        document.getElementById('sortMedia').addEventListener('click', (event) => {
            this.applySort(event.target.value);
        });
    }
}
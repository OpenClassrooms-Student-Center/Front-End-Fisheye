// Je crée une classe qui sera mon point d'éntrée de l'application 
class App {
    constructor() {
        this.photographArticle = document.querySelector('.photographer_section');
        //j'instancie ma classe GetPhotographers 
        this.getPhotographers = new GetPhotographers('/data/photographers.json');
    }
    
    async init() {
        const photographersData = await this.getPhotographers.getPhotograph();

        photographersData.forEach(photographer => {
            //j'instancie mon objet PhotographersCard
            const Template = new PhotographersCard(photographer);
            this.photographArticle.appendChild(Template.createPhotographerCard())
        });
    }
}
const app = new App();
app.init();

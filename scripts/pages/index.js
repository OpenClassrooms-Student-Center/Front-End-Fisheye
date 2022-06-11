import labelOne from "../factories/labelOne.js";
import photographerSecond from "../factories/photographerSecond.js";

export default class frontPage {
  constructor(datas) {
    this.datas = datas;
  }
  renderfrontPage() {
      // Création menuNav tags
      const tags = labelOne.getTags(this.datas);
      this.navTagsElement = document.getElementById("tags");

      this.navTagsElement.innerHTML = labelOne.createListTemplate(tags);

      // Liste des profils
      const photographersListElement = document.getElementById("photographers-list");
      photographersListElement.innerHTML = photographerSecond.createListTemplate(this.datas.photographers);

      // Evenement selection Tag
      this.navTagsElement.querySelectorAll("li").forEach(tag => {
        tag.addEventListener("click", () => {
   
        tag.classList.toggle('active');
        // Filtre les photographes qui contiennent le tag selectionné
        this.selPhotographe();  

        });
      });
  }
  selPhotographe() {
    let photographSel = this.datas.photographers;
    const photographersListElement = document.getElementById("photographers-list");
    this.navTagsElement.querySelectorAll("li.active").forEach(tag => {
      photographSel =  [... this.datas.photographers.filter(photographer => photographer.tags.indexOf(tag.dataset.value) !== -1)];
    });
    photographersListElement.innerHTML = photographerSecond.createListTemplate(photographSel);
  }

}  

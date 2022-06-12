import frontPage from "./assets/scripts/pages/index.js";
import Photographer from "./assets/scripts/pages/photographer.js";

class photographersDataApp {
  constructor() {
     this.fetchJSON();
  }

  // Routage selon la page demandée
  initApp() {
    console.log("pathname:", window.location.pathname.split("/").pop());
    switch(window.location.pathname.split("/").pop()) {
      case "index.html":
      case "" :
        const _homePage = new frontPage(this.datas);
        _homePage.renderfrontPage();
      break;
      case "main.html":
        const photographer = new Photographer(this.datas);
        photographer.renderPhotographerPage(this.datas);
      break;
    }
  }

  fetchJSON(){
    fetch("assets/scripts/data/photographersData.json").then(response => response.json())
    .then(datas => {
        this.datas = datas;
        this.initApp();
    })
    .catch((error) => console.error("Erreur : " + error));
  }

}
// Initialise l'application
 new photographersDataApp();
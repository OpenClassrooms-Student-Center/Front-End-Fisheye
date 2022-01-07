class Model {
  //récupère toutes les données des photographes
  static async getPhotographers() {
    return fetch("http://127.0.0.1:5500/data/photographers.json").then(
      function (response) {
        return response.json().then(function (json) {
          //console.log(json);
          return json.photographers;
        });
      }
    );
  }
  static async getMedias() {
    //récupère les médias des photographes
    return fetch("http://127.0.0.1:5500/data/photographers.json").then(
      function (response) {
        return response.json().then(function (json) {
          //console.log(json);
          return json.media;
        });
      }
    );
  }

  //créer une fonction qui rassemble le photographe par id + ses médias

  static async getPhotographer(id) {
    //récupère et traite la liste des photographes par leur id
    let listPhotographers = await Model.getPhotographers();
    //console.log(listPhotographers);
    for (let index = 0; index < listPhotographers.length; index++) {
      const photographer = listPhotographers[index];
      //console.log(photographer.id);
      if (photographer.id == id) {
        return photographer;
      }
    }
  }
  static async getMediasByPhotographerId(photographerId) {
    // fction qui récupère et traite la liste des médias des photographes par leur id
    //console.log("getMediasByPhotographerId");
    let listMedias = await Model.getMedias(); // récupère la liste de tous les médias
    //console.log(listMedias);

    let filteredListMedia = []; // crée un tableau pour filtrer les medias de ce photographe par id
    for (let index = 0; index < listMedias.length; index++) {
      const media = listMedias[index];

      if (media.photographerId == photographerId) {
        //console.log(media);
        filteredListMedia.push(media);
      }
    }
    return filteredListMedia; //retourne le tableau médias des photographes par id
  }
}

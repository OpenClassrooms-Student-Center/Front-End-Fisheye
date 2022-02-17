class Model {
  //get all photographer's datas
  static async getPhotographers() {
    return fetch("data/photographers.json").then(function (response) {
      return response.json().then(function (json) {
        //console.log(json);
        return json.photographers;
      });
    });
  }
  static async getMedias() {
    //get all photographer's medias
    return fetch("data/photographers.json").then(function (response) {
      return response.json().then(function (json) {
        //console.log(json);
        return json.media;
      });
    });
  }

  //function to get photographer by id + medias
  //photographers' list by their id
  static async getPhotographer(id) {
    let listPhotographers = await Model.getPhotographers();

    for (let index = 0; index < listPhotographers.length; index++) {
      const photographer = listPhotographers[index];
      if (photographer.id == id) {
        return photographer;
      }
    }
  }
  static async getMediasByPhotographerId(photographerId) {
    // fction qui récupère et traite la liste des médias des photographes par leur id
    let listMedias = await Model.getMedias(); // récupère la liste de tous les médias
    //console.log(listMedias);

    let filteredListMedia = []; // crée un tableau pour filtrer les medias de ce photographe par id
    for (let index = 0; index < listMedias.length; index++) {
      const media = listMedias[index];
      if (media.photographerId == photographerId) {
        filteredListMedia.push(media); //push les elements ds array
      }
    }
    return filteredListMedia; //retourne le tableau médias des photographes par id
  }
}

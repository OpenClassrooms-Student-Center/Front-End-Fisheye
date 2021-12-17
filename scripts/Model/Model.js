class Model {
  static async getPhotographers() {
    return fetch("http://127.0.0.1:5500/data/photographers.json").then(
      function (response) {
        return response.json().then(function (json) {
          console.log(json);
          return json.photographers;
        });
      }
    );
  }
  static async getMedias() {
    return fetch("http://127.0.0.1:5500/data/photographers.json").then(
      function (response) {
        return response.json().then(function (json) {
          console.log(json);
          return json.media;
        });
      }
    );
  }

  static async getPhotographer(id) {
    let listPhotographers = await Model.getPhotographers();
    console.log(listPhotographers);
    for (let index = 0; index < listPhotographers.length; index++) {
      const photographer = listPhotographers[index];
      console.log(photographer.id);
      if (photographer.id == id) {
        return photographer;
      }
    }
  }
  static async getMediasByPhotographerId(photographerId) {
    console.log("getMediasByPhotographerId");
    let listMedias = await Model.getMedias();
    console.log(listMedias);
    let filteredListMedia = []; // tableau pour filtrer les medias de ce photographe
    for (let index = 0; index < listMedias.length; index++) {
      const media = listMedias[index];

      if (media.photographerId == photographerId) {
        console.log(media);
        filteredListMedia.push(media);
      }
    }
    return filteredListMedia;
  }
}

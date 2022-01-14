class DataManager {
  static data = null;
  static async loadJson(file) {
    if (this.data == null) {
      try {
        this.data = await (await fetch(file)).json();
      } catch (err) {
        const errMessage = new ErrorManager(err);
        document.getElementById("main").innerHTML +=
          errMessage.getErrorMessageDOM();
      }
    }
  }
  static getPhotographers() {
    return this.data.photographers;
  }

  static getMedia() {
    return this.data.media;
  }

  static getPhotographer(id) {
    return this.data.photographers.find(
      (photographer) => photographer.id == id
    );
  }

  static getPhotographerMedia(id) {
    return this.data.media.filter((media) => media.photographerId == id);
  }
}

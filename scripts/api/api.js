export class Api {
  constructor(url) {
    this.url = url;
  }

  async getPhotographers() {
    let data = undefined;
    try {
      let response = await fetch(this.url);
      if (!response.ok) {
        throw `An error has occured while attempting to retrieve data: ${JSON.stringify(
          response
        )}`;
      }
      data = await response.json();
    } catch (apiError) {
      throw new Error ('Failed to retrieve ressources');
    }
    console.log(data)
    return data.photographers;
  }

  async getPhotographerById() {
    let data = undefined;
    const currentUrl = new URL(document.location.href);
    const id = currentUrl.searchParams.get("id");
    let currentPhotographer = undefined;
    let currentMedia = undefined;
    try {
      let response = await fetch(this.url);
      if (!response.ok) {
        throw `An error has occured while attempting to retrieve data: ${JSON.stringify(
          response
        )}`;
      }
      data = await response.json();
    } catch (apiError) {
      throw new Error ('Failed to retrieve ressources');
    }
    data.photographers.forEach((photographer) => {
      if (photographer.id == id) {
        currentPhotographer = photographer;
      }
    });
    data.media.forEach(medias => {
      if (medias.photographerId == id) {
        currentMedia = medias;
      }
    });
    return currentPhotographer;
  }
}

export class PhotographersApi extends Api {
  constructor(url) {
    super(url);
  }

  getPhotographerData() {
    return this.getPhotographers();
  }

  getPhotographerPages() {
    return this.getPhotographerById();
  }
}

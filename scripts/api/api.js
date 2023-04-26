export class Api {
  constructor(url) {
    this.url = url
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
      throw new Error ('Failed to retrieve ressources')
    }
    return data.photographers;
  }

  async getPhotographerId() {
    let data = undefined;
    const currentUrl = new URL(document.location.href);
    const id = currentUrl.searchParams.get("id");
    let currentPhotographer = undefined;
    try {
      let response = await fetch(this.url);
      if (!response.ok) {
        throw `An error has occured while attempting to retrieve data: ${JSON.stringify(
          response
        )}`;
      }
      data = await response.json();
    } catch (apiError) {
      throw new Error ('Failed to retrieve ressources')
    }
    data.photographers.forEach((photographer) => {
      if (photographer.id == id) {
        console.log("photographer :", photographer.id, photographer.name, photographer)
        currentPhotographer = photographer
      }
    });
    return currentPhotographer
  }
}

export class PhotographersApi extends Api {
  constructor(url) {
    super(url);
  }

  getPhotographerData() {
    return this.getPhotographers();
  }

  getPhotographerBanner() {
    return this.getPhotographerId();
  }
}

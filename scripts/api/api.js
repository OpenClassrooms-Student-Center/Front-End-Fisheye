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

  // async getPhotographerId() {
  //   console.log('aaa')
  // }
}

export class PhotographersApi extends Api {
  constructor(url) {
    super(url);
  }

  getPhotographerInfo() {
    return this.getPhotographers();
  }
}

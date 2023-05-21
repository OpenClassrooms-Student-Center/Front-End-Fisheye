export class Api {
  static _url = "data/photographers.json"; // API baseURL

  static async response() {
    try {
      let response = await fetch(this._url);

      if (!response.ok) throw new Error(response.status);

      return response.json();
    } catch(apiError) {
      throw new Error ('Failed to retrieve ressources', apiError);
    }
  }

  static get() {
    // GET Method
    return this.response();
  }
}

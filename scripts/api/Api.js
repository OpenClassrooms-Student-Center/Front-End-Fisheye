class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this._url = url;
  }

  async get() {
    return fetch(this._url)
      .then((res) => res.json())
      .then((res) => res.photographers)
      .catch((err) => console.log("an error", err));
  }
}

class PhotographerApi extends Api {
  constructor(url) {
    super(url);
  }

  async getPhotographers() {
    return this.get();
  }
}

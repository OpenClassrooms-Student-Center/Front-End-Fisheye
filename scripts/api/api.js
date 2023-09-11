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
      .then((res) => res.data)
      .catch((err) => console.log("an error occurs", err));
  }
}

// Define MediasApi class with Api
class MediasApi extends Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }
  // Get Medias data
  async getMedias() {
    return await this.get("res.media");
  }
}

export { MediasApi };

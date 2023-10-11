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
      .then((res) => {
        console.log("Response data:", res);
        return res;
      })
      .catch((err) => console.log("an error occurs", err));
  }
}
// console.log("datar", data);

// Define PhotographersApi class with Api
class PhotographersApi extends Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }
  // Get Medias data
  async getPhotographers() {
    const response = await this.get();
    const photographersData = response.photographers;
    console.log("Photographers Data:", photographersData);
    return photographersData;
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
    const response = await this.get();
    const mediasData = response.res.media;
    if (response) {
      console.log("Medias Data:", mediasData); // Add this line to log the medias data
      return mediasData;
    } else {
      throw new Error("API response is undefined.");
    }
  }
}

export { PhotographersApi, MediasApi };

/* eslint-disable no-useless-constructor */
class Api {
  /**
   *
   * @param {string} url
   */
  constructor (url) {
    this._url = url
  }

  async get () {
    return fetch(this._url)
      .then((res) => res.json())
      .then((res) => {
        return res
      })
      .catch((err) => console.log('an error occurs', err))
  }
}

// Define PhotographersApi class with Api
class PhotographersApi extends Api {
  /**
   *
   * @param {string} url
   */
  constructor (url) {
    super(url)
  }

  // Get Medias data
  async getPhotographers () {
    const response = await this.get()
    const photographersData = response.photographers
    return photographersData
  }
}

// Define MediasApi class with Api
class MediasApi extends Api {
  /**
   *
   * @param {string} url
   */
  constructor (url) {
    super(url)
  }

  // Get Medias data
  async getMedias () {
    const response = await this.get()
    const mediasData = response.medias
    return mediasData
  }
}

export { PhotographersApi, MediasApi }

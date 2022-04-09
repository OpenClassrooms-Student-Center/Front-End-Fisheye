// eslint-disable-next-line no-unused-vars
class PhotographerApi {
  constructor(url) {
    this._url = url
  }

  async get() {
    return fetch(this._url)
      .then(res => res.json())
      .catch(err => console.log('an error occurs', err))
  }
}

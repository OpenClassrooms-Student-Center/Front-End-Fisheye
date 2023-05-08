export class PhotographersModel {

  constructor (url) {
    this.url = url
  }

  async getPhotographers() {
    return fetch(this.url)
      .then(response => response.json())
      .then(response => {
        return response.photographers
      })
      .catch(() => {
        throw new Error('Impossible de contacter le serveur pour getPhotographers')
      })
  }

  async getPhotographerById(userId) {
    return fetch(this.url)
      .then(response => response.json())
      .then(response => {
        return response.photographers.find((element) => element.id.toString() === userId)
      })
      .catch(() => {
        throw new Error('Impossible de contacter le serveur pour getPhotographersById')
      })
  }

  async getMediaForOnePhotographer(userId) {
    return fetch(this.url)
      .then(response => response.json())
      .then(response => {
        return response.media.filter(media => media.photographerId.toString() === userId)
      })
      .catch(() => {
        throw new Error('Impossible de contacter le serveur pour getPhotographersById')
      })
  }

}

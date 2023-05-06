export class PhotographersModel {

  url = 'data/photographers.json';

  async getPhotographers() {
    return fetch(this.url)
      .then(response => response.json())
      .then(response => {
        return response.photographers
      })
      .catch(err => {
        throw new Error('Impossible de contacter le serveur pour getPhotographers')
      })
  }

  async getPhotographerById(userId) {
    return fetch(this.url)
      .then(response => response.json())
      .then(response => {
        return response.photographers.find((element) => element.id.toString() === userId)
      })
      .catch(err => {
        throw new Error('Impossible de contacter le serveur pour getPhotographersById')
      })
  }

  async getMediaForOnePhotographer(userId) {
    return fetch(this.url)
      .then(response => response.json())
      .then(response => {
        return response.media.filter(media => media.photographerId.toString() === userId)
      })
      .catch(err => {
        throw new Error('Impossible de contacter le serveur pour getPhotographersById')
      })
  }

}

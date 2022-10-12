export class PhotographerWork {
  constructor(data) {
    this.date = data.media.date
    this.id = data.media.id
    this.image = data.media.image
    this.likes = data.media.likes
    this.photographerId = data.media.photographerId
    this.price = data.media.price
    this.title = data.media.title
  }
}
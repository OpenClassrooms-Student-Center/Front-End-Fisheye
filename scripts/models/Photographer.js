export class Photographer {
  constructor(data) {
    this.location = `${data.city}, ${data.country}`
    this.id = data.id
    this.name = data.name
    this.portrait = data.portrait
    this.price = data.price
    this.tagline = data.tagline
  }
}
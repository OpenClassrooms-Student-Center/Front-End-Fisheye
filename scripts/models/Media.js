export class Media {
  constructor(media) {
    this.date = media.date
    this.id = media.id
    this.likes = media.likes
    this.photographerId = media.photographerId
    this.price = media.price
    this.title = media.title
  }

  // Add the relevant class to the media element, depending on the context (media list or lightbox)
  static addMediaClass(context) {
    if (context == "profileMedia") {
      return "class='media-thumbnail'"
    } else {
      return "class='lightbox_media'"
    }
  }

  static addMediaLegendClass(context) {
    if (context == "profileMedia") {
      return "class='media-legend'"
    } else {
      return ""
    }
  }
}
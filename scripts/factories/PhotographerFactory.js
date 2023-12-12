/* eslint-disable no-undef */
// Factory function to create media with Image or Video Class
class PhotographerFactory {
  static creatPhotographer (data) {
    if (data.image) {
      return new Photographer(data)
    } else {
      throw new Error('Unknown data')
    }
  }
}

export { PhotographerFactory }

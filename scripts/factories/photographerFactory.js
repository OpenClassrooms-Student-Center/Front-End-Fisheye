import { Photographer } from "../models/Photographer.js"
import { PhotographerMedia } from "../models/Media.js"

export class PhotographerFactory {
  constructor(data, type) {
    if (type === "photographerData") {
      return new Photographer(data)
    } else if (type === "PhotographerMedia") {
      return new PhotographerMedia(data)
    } else {
      throw "Error"
    }
  }
}

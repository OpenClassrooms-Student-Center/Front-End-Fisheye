import { Photographer } from "../models/Photographer.js"
import { PhotographerWork } from "../models/PhotographerMedias.js"

export class PhotographerFactory {
  constructor(data, type) {
    if (type === "photographerData") {
      return new Photographer(data)
    } else if (type === "photographerWork") {
      return new PhotographerWork(data)
    } else {
      throw "Error"
    }
  }
}
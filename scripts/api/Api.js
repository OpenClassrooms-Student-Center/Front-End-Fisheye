import { Photographer } from "../models/Photographer.js"

export class API {
  static url = "../data/photographers.json"

  static async getAllData() {
    let photographersData
    await fetch(this.url)
      .then((res) => res.json())
      .then((data) => {
        photographersData = data.photographers.map(
          (photographer) => new Photographer(photographer)
        )
      })
      .catch((err) => {
        console.error(err)
      })
    return photographersData
  }

  // Fetches API data, finds the photographer with the corresponding ID and return its data
  static async getPhotographersByID() {
    let matchingPhotographer
    await this.getAllData()
      .then((photographerList) => {
        matchingPhotographer = photographerList.find(
          (photographer) =>
            photographer.id ==
            new URL(document.location).searchParams.get("id")
        )
      })
      .catch((err) => {
        console.error(err)
      })
    return matchingPhotographer
  }
}

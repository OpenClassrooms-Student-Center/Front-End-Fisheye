import { Photographer } from "../models/Photographer.js"

export class API {
  static url = "../data/photographers.json"

  static async getAllData(page) {
    let response = {}
    await fetch(this.url)
      .then((res) => res.json())
      .then((data) => {
        let photographers = data.photographers.map(
          (photographer) => new Photographer(photographer)
        )
        if (page == "homePage") {
          response = photographers
        } else if (page == "profilePage") {
          response = {
            Photographer: photographers,
            Medias: data.media,
          }
          // console.log(response)
        }
      })
      .catch((err) => {
        console.error(err)
      })
    return response
  }

  // Request data from API, finds the photographer with the corresponding ID and return its info and medias
  static async getPhotographersByID() {
    const photographerId = new URL(
      document.location
    ).searchParams.get("id")
    let photographerInfoAndMedia = {}
    await this.getAllData("profilePage")
      .then((response) => {
        photographerInfoAndMedia = {
          photographer: response.Photographer.find(
            (photographer) => photographer.id == photographerId
          ),
          media: response.Medias.filter(
            (medias) => medias.photographerId == photographerId
          ),
        }
      })
      .catch((err) => {
        console.error(err)
      })
    return photographerInfoAndMedia
  }
}

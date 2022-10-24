import { Photographer } from "../models/Photographer.js"

export class API {
  static url = "../data/photographers.json"

  static async getAllData(page) {
    let response = {}
    await fetch(this.url)
      .then((res) => res.json())
      .then((data) => {
        const photographers = data.photographers.map(
          (photographer) => new Photographer(photographer)
        )
        if (page == "homePage") {
          response = photographers
        } else if (page == "profilePage") {
          response = {
            Photographer: data.photographers,
            Medias: data.media,
          }
        }
      })
      .catch((err) => {
        console.error(err)
      })
    return response
  }

  // Request data from API, finds the photographer with the corresponding ID and return its info and medias
  static async getPhotographersByID() {
    const photographerId = new URL(document.location).searchParams.get("id")
    let photographerInfoAndMedia = {}
    await this.getAllData("profilePage")
      .then((response) => {
        const matchingPhotographer = response.Photographer.filter(
          (photographer) => photographer.id == photographerId
        )
        const matchingMedias = response.Medias.filter(
          (medias) => medias.photographerId == photographerId
        )
        // Calculate the total likes of selected photographer
        const photographerTotalLikes = matchingMedias
          .map((value) => value.likes)
          .reduce((previousValue, currentValue) => {
            return previousValue + currentValue
          })
          matchingPhotographer.find((photographer) => photographer).totalLikes =
          photographerTotalLikes

        photographerInfoAndMedia = {
          photographer: matchingPhotographer,
          media: matchingMedias,
        }

      })
      .catch((err) => {
        console.error(err)
      })
    return photographerInfoAndMedia
  }
}

import { displayedPhotographerData } from "../store/store.js"

export class API {
  static url = "data/photographers.json"

  static async getAllData(page) {
    let response = {}
    await fetch(this.url)
      .then((res) => res.json())
      .then((data) => {
        if (page == "homePage") {
          response = data.photographers
        } else if (page == "profilePage") {
          response = data
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
    let data = {}
    await this.getAllData("profilePage")
      .then((response) => {
        data.photographer = response.photographers.filter(
          (photographer) => photographer.id == photographerId
        )[0]
        data.media = response.media.filter(
          (medias) => medias.photographerId == photographerId
        )
        // Calculate the total likes of selected photographer
        const photographerTotalLikes = data.media
          .map((value) => value.likes)
          .reduce((previousValue, currentValue) => {
            return previousValue + currentValue
          })
        data.photographer.totalLikes = photographerTotalLikes
        // Exports data of currently displayed photographer profile to the store
        displayedPhotographerData.photographer = data.photographer
        displayedPhotographerData.media = data.media
      })
      .catch((err) => {
        console.error(err)
      })
    return data.photographer
  }
}

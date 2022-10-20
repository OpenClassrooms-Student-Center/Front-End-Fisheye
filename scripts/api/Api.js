import { Photographer } from "../models/Photographer.js"

export class API {

  static url = "../data/photographers.json"

  static async getAllData(){
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


 static getPhotographersByID(){
    // ...
  }

 
}

//let monAPI = new API();

/*

 async function getAllData() {
  let photographersData
  await fetch("../data/photographers.json")
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

*/
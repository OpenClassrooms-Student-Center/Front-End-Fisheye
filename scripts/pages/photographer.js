import { Mediaphotographer } from "../factories/mediaPhotographer.js"

document.addEventListener("DOMContentLoaded", async () =>{
    const onePhotographer = new Mediaphotographer()
    await onePhotographer.getOnePhotographer()
})

import { Onephotographer } from "../factories/onePhotographer.js"

document.addEventListener("DOMContentLoaded", async () =>{
    const onePhotographer = new Onephotographer()
    await onePhotographer.getOnePhotographer()
})

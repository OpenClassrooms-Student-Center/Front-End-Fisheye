import { Mediaphotographer } from "../factories/mediaPhotographer.js"
import { LightboxFactory } from "../factories/lightboxModal.js";

document.addEventListener("DOMContentLoaded", async () =>{
    const onePhotographer = new Mediaphotographer()
    await onePhotographer.getOnePhotographer()
    LightboxFactory.init();
});

import sliderFactory from "../factories/slider.js";
import photoBuild from "../model/CardPhoto.js";

function hydratePhotoFactory(media, sortMedia, name) {
    // const pathName = name.split(/-| /).join("")
    // const photoPath = `../assets/Sample_Photos/${pathName}/${dataPhoto.image}`;
    photoBuild(media, sortMedia, name)
    


    
    // const templateElm = document.querySelector(".photo__template");
    // const photo= document.importNode(templateElm.content, true);
    // const img = photo.querySelector(".photo");
    // img.src = photoPath;
    // const title = photo.querySelector(".photo__title");
    // title.textContent = dataPhoto.title;
    // const likes = photo.querySelector(".photo__likes");
    // likes.textContent = dataPhoto.likes;
    // document.querySelector(".photo-field").appendChild(photo);
    // img.addEventListener("click", () => sliderFactory(dataPhoto, sortMedia, name))

        
    
}
export default hydratePhotoFactory
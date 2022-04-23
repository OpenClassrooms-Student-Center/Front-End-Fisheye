import sliderFactory from "../factories/slider.js";

function hydratePhotoFactory(dataPhoto, sortMedia, name) {
    const pathName = name.split(/-| /).join("")
    const photoPath = `../assets/Sample_Photos/${pathName}/${dataPhoto.image}`;
    return getHydratingPhoto();
    

    function getHydratingPhoto() {
    
        const templateElm = document.querySelector(".photo__template");
        const photo= document.importNode(templateElm.content, true);
        const img = photo.querySelector(".photo");
        img.src = photoPath;
        const title = photo.querySelector(".photo__title");
        title.textContent = dataPhoto.title;
        const likes = photo.querySelector(".photo__likes");
        likes.textContent = dataPhoto.likes;
        document.querySelector(".photo-field").appendChild(photo);
        img.addEventListener("click", () => sliderFactory(dataPhoto, sortMedia, name))

        // const article2 = `
        //         <img src=${photoPath} class="photo"></img>
        //         <span class="photo__title" >${dataPhoto.title}</span>
        //         <span class="photo__likes" >${dataPhoto.likes}</span>
        //         <i class="fas fa-heart"></i>`
        // return article2;
    }
}
export default hydratePhotoFactory
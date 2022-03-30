function hydratePhotoFactory(dataPhoto, name) {
    
    const pathName = name.split(/-| /).join("")
    const photoPath = `../assets/Sample_Photos/${pathName}/${dataPhoto[0].image}`;
    getHydratingPhoto();
   
    function getHydratingPhoto() {
        const templateElm = document.querySelector(".photo__template");
        const photo= document.importNode(templateElm.content, true);
        const img = photo.querySelector(".photo");
        img.src = photoPath;
        const title = photo.querySelector(".photo__title")
        title.textContent = dataPhoto[0].title
        document.querySelector(".photo-field").appendChild(photo);
    }
}
export default hydratePhotoFactory
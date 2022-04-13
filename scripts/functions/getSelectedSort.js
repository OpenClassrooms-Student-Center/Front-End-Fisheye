import builderCard from "../functions/builderCard.js";

export default function getSelectedSort(data, name) {
    const selectedSort = document.querySelector("#select")
    let sortMedia = [...data]

    selectedSort.addEventListener("change", () => {
        const photoCard = document.getElementsByClassName("photo__card");
        const templateElm = document.querySelector(".photo__template");
        const totalPhoto = photoCard.length
        for ( let i = 0 ; i < totalPhoto; i++) {
            templateElm.parentNode.removeChild(photoCard[0])
        }

        let sortOption = document.querySelector("#select").value
        if (sortOption === "likes") {
            sortMedia.sort((a,b) => {
                return b.likes - a.likes
            })
        } else if (sortOption === "date") {
            sortMedia.sort((a,b) => {
                return new Date(a.date).valueOf() - new Date(b.date).valueOf()
            })
        } else if (sortOption === "title") {
            sortMedia.sort((a,b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1
                } else  if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1
                }
            })
        }
        // sortMedia.forEach((photo) => {
        //     hydratePhotoFactory(photo, name)
        // })
        builderCard(sortMedia, name)
    })

    return sortMedia
 }
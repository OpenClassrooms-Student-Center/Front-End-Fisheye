import createPhotoCard from "../templates/Card.js";
import sliderFactory from "../factories/slider.js";

export default function getSelectedSort(data) {
    const selectedSort = document.querySelector("#select")
    let sortMedia = [...data]
    const cardContainer = document.querySelector(".photo-field");

    selectedSort.addEventListener("change", (e) => {
        const mediaCard = document.getElementsByClassName("cardMedia");
        
        const totalPhoto = mediaCard.length
        console.log(totalPhoto)
        cardContainer.innerHTML = ""

        let sortOption = e.target.value
        if (sortOption === "likes") {
            sortMedia.sort((a,b) => {
                return b.likes - a.likes
            })
        } else if (sortOption === "date") {
            console.log("date")
            sortMedia.sort((a,b) => {
                return new Date(a._date).valueOf() - new Date(b._date).valueOf()
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
        sortMedia.forEach((media) => {
                
            const card = document.createElement("article")
            card.classList.add("cardMedia")
            card.innerHTML = createPhotoCard(media, name)
            const elt = cardContainer.appendChild(card)
            
            elt.addEventListener("click", () => sliderFactory(media, sortMedia, name))
        })
    })
    console.table(sortMedia)
    return sortMedia
 }
import createPhotoCard from "../templates/Card.js";
import sliderFactory from "../factories/slider.js";

export default function getSelectedSort(data) {
    let sortMedia = [...data]

    
    const optionsContainer = document.querySelector(".filter__options")
    const btndrop = document.querySelector(".button__top")
    const btnValue = document.querySelector(".button__top span")
    const liItems = document.querySelectorAll(".dropdown li")
    const first = document.querySelector(".first__option")
    btnValue.innerHTML = first.innerHTML

    let toggleIndex 
    btndrop.addEventListener('click', dropDown)
    function dropDown() {
       
        if(!toggleIndex) {
            optionsContainer.style.height = `${optionsContainer.scrollHeight}px`
            toggleIndex = true
            btndrop.style.display = "none"
            return 
        } 
        optionsContainer.style.height = 0
        btndrop.style.display = "flex"
        toggleIndex = false
        
    }
    console.log(liItems)
    liItems.forEach((item) => {
        const a = item.querySelector("a")
        console.log(a.innerHTML)
        item.addEventListener(('click'),() => {
               
            if (a.innerHTML === "Popularité") {
                dropDown()
                btnValue.innerHTML = a.innerHTML
                sortMedia.sort((a,b) => {
                    return b.likes - a.likes
                })

            } else if (a.innerHTML === "Date") {
                dropDown()
                btnValue.innerHTML = a.innerHTML
                sortMedia.sort((a,b) => {
                    return new Date(a._date) - new Date(b._date)
                })

            } else if (a.innerHTML === "Titre") {
                dropDown()
                btnValue.innerHTML = a.innerHTML
                sortMedia.sort((a,b) => {
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                        return -1
                    } else  if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return 1
                    }
                })
            }
            const cardContainer = document.querySelector(".photo-field");
            cardContainer.innerHTML = ""
            console.table(sortMedia)
            
            sortMedia.forEach((media) => {
                
                const card = document.createElement("article")
                card.classList.add("cardMedia")
                card.innerHTML = createPhotoCard(media)
                const elt = cardContainer.appendChild(card)
                
                elt.addEventListener("click", () => sliderFactory(media, sortMedia, name))
            })
        })

    })
    
    return sortMedia
 }
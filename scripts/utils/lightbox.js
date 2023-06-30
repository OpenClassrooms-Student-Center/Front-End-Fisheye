// Select element
const lighthox = document.querySelector("#modal-lightbox")
const close = document.querySelector(".close")
const card = document.querySelector(".card")
const scrollImg = document.querySelector(".scroll-img")
const next = document.querySelector(".next")
const previous = document.querySelector(".previous")

// Create element
const img = document.createElement("img")
const videoElement = document.createElement("video")
const source = document.createElement("source")
const title = document.createElement("div")

// Add class
img.classList.add("current")
source.classList.add("current")

function lightbox(data, firstName) {
    setTimeout(() => {
        const media = document.querySelectorAll(".media-source")
        media.forEach((element, index) => {            
            // Affichage de l'image en question au clic
            element.addEventListener("click", () => {   
                if (element.classList.contains("image")) {
                    if (card.contains(videoElement)) {
                        card.removeChild(videoElement)
                    }
                    const fileName = data.mediaDetails[index].image
                    img.setAttribute("src", `assets/medias/${firstName}/${fileName}`)
                    img.setAttribute("data-id", index)
                    title.innerHTML = data.mediaDetails[index].title
                    card.appendChild(img)
                    card.appendChild(title)
                }

                if (element.classList.contains("video")) {
                    if (card.contains(img)) {
                        card.removeChild(img)
                    }
                    videoElement.appendChild(source);
                    videoElement.setAttribute("controls", "controls")
                    videoElement.setAttribute("data-video", "style")
                    source.setAttribute("data-id", index)
                    const fileName = data.mediaDetails[index].video
                    source.setAttribute("src", `assets/medias/${firstName}/${fileName}`)
                    title.innerHTML = data.mediaDetails[index].title
                    card.appendChild(videoElement)
                    card.appendChild(title)
                }

                lighthox.style.display = "block"
            })
        })
    }, 2000)
}

// Bouton NEXT
next.addEventListener("click", () => {
    idxImg = img.getAttribute("data-id")
    idxVideo = source.getAttribute("data-id")
    
    if (card.contains(img)) {
        console.log(idxImg)
    }

    if (card.contains(videoElement)) {
        console.log(idxVideo)
    }
})

close.addEventListener("click", () => {
    lighthox.style.display = "none"
})
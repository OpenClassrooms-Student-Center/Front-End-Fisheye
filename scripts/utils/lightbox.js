// Element
const lighthox = document.querySelector("#modal-lightbox")
const close = document.querySelector(".close")
const card = document.querySelector(".card")

// Create element
const img = document.createElement("img")
const videoElement = document.createElement("video")
const source = document.createElement("source")
const title = document.createElement("div")

function lightbox(data, firstName) {
    const media = document.querySelectorAll(".media-source")
    media.forEach((element, id) => {
        element.addEventListener("click", () => {
            // Display Lightbox
            lighthox.style.display = "block"

            // Display Image
            if(element.hasAttribute("src")) {
                img.setAttribute("src", `assets/medias/${firstName}/${data[id].source}`)
                title.innerHTML = data[id].title
                card.appendChild(img)
                card.appendChild(title)
            }

            // Display Video
            if (element.hasAttribute("data-video")) {
                videoElement.setAttribute("controls", "controls")
                videoElement.setAttribute("data-video", "style")
                card.appendChild(videoElement)
                source.setAttribute("src", `assets/medias/${firstName}/${data[id].source}`)
                title.innerHTML = data[id].title
                videoElement.appendChild(source);
                card.appendChild(title);
            }

            // Close Lightbox
            close.addEventListener("click", () => {
                lighthox.style.display = "none"
                card.removeChild(card.children[3])
                card.removeChild(title)
            })
        })
    })
}
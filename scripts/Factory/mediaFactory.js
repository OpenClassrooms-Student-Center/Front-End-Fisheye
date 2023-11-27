// Classe Media pour représenter une image ou une vidéo
class Media {
    constructor(title, type, src) {
        this.title = title
        this.type = type
        this.src = src
    }
}
// class Media dans le dossier models
// design pattern Repository avec fichier photographer Repository 
// fonction pour récupérer les données depuis le fichier JSON
async function getData() {
    const response = await fetch("/data/photographers.json")
    return await response.json()
}
// fonction pour extraire l'ID du photographe depuis l'URL
function getIdFromUrl() {
    const idOfPhotographer = new URLSearchParams(window.location.search).get('id')
    return idOfPhotographer
}
// fonction pour récupérer le nom du photographe pour le chemin vers les médias
async function getName() {
    const { photographers } = await getData()
    const filteredPhotographer = photographers.find((photographer) => photographer.id == getIdFromUrl())

    const { name } = filteredPhotographer
    return name
}

// fonction de tri des médias 
  const likesBtn = document.querySelector('.like_btn')
  const dateBtn = document.querySelector('.date_btn')
  const titleBtn = document.querySelector('.title_btn')

likesBtn.addEventListener("click", () => {
    getFilteredMedia('likes')
})
dateBtn.addEventListener("click", () => {
    getFilteredMedia('date')
})
titleBtn.addEventListener("click", () => {
    getFilteredMedia('title')
})

async function getFilteredMedia(selectedButton) {
    const photographerId = getIdFromUrl()
    const data = await getData()
    const { media, photographers } = data
    const filteredMedia = media.filter((item) => item.photographerId == getIdFromUrl())

    switch (selectedButton) {
        case 'likes' :
            filteredMedia.sort((a, b) => b.likes - a.likes)
            break
        case 'date' : 
            filteredMedia.sort((a, b) => new Date(b.date) - new Date(a.date))
            break
        case 'title' : 
            filteredMedia.sort((a, b) => a.title.localeCompare(b.title))
            break
        default :
            break
    }

    const portfolioContainer = document.querySelector(".portfolio_container")
    portfolioContainer.innerHTML = '';


    const photographer = photographers.find((p) => p.id == photographerId)
    const photographerPrice = photographer.price

    const priceADay = document.querySelector(".price_a_day")
    priceADay.textContent = `${photographerPrice}€ / jour`


    // Création de la MediaFactory avec la logique image / vidéo
    class MediaFactory {
        createFromJson(data) {
            const { title, image, video } = data
            const type = image === undefined ? 'video' : 'image'
            const src = image === undefined ? video : image
            return new Media(title, type, src)
        }

        createDomElementFromMedia(media, isPreview = false, index = 0) {

            let elementType = media.type === 'image' ? 'img' : 'video'
            if (isPreview) {
                elementType = 'img'
            }

            let src = media.src
            if (media.type === 'video' && isPreview) {
                src = 'video_preview.svg'

            }

            const element = document.createElement(elementType)
            element.setAttribute('src', `/assets/images/${photographerName}/` + src)
            element.setAttribute('alt', media.title)
            element.setAttribute("class", "media_itself")
            element.setAttribute("data-index", index)
            element.setAttribute("data-type", media.type)
            element.setAttribute("data-original-src", `/assets/images/${photographerName}/` + media.src)
            element.setAttribute("data-title", media.title)
            return element
        }
    }

    const mediaFactory = new MediaFactory()
    const photographerName = await getName()

    filteredMedia.forEach((mediaItem, index) => {
        const mediaObject = mediaFactory.createFromJson(mediaItem)
        const mediaDomElement = mediaFactory.createDomElementFromMedia(mediaObject, true, index, media.title) // on passe l'index à l'élement

        // Création de la structure pour media_description et likes
        const mediaContainer = document.createElement("article")
        mediaContainer.setAttribute("class", "media_container")

        const mediaWrapper = document.createElement("div")
        mediaWrapper.setAttribute("class", "media_wrapper")

        const mediaDescription = document.createElement("section")
        mediaDescription.setAttribute("class", "media_description")

        const mediaTitle = document.createElement("h3")
        mediaTitle.setAttribute("class", "media_title")
        mediaTitle.textContent = mediaItem.title

        const likeContainer = document.createElement("div")
        likeContainer.setAttribute("class", "like_container")

        const numberOfLikes = document.createElement("p")
        numberOfLikes.setAttribute("class", "number_of_likes")
        numberOfLikes.textContent = mediaItem.likes

        const likeIcon = document.createElement("img")
        likeIcon.setAttribute("class", "like_icon")
        likeIcon.setAttribute("alt", "coeur")
        likeIcon.setAttribute("src", "/assets/heart.svg")

        // On rajoute tous les nouveaux élements au DOM
        portfolioContainer.appendChild(mediaContainer)
        mediaContainer.appendChild(mediaWrapper)
        mediaWrapper.appendChild(mediaDomElement)
        mediaContainer.appendChild(mediaDescription)
        mediaDescription.appendChild(mediaTitle)
        mediaDescription.appendChild(likeContainer)
        likeContainer.appendChild(numberOfLikes)
        likeContainer.appendChild(likeIcon)
    })

    function incrementLike() {
        const likeIcons = document.querySelectorAll('.like_icon')

        likeIcons.forEach(likeIcon => {
            likeIcon.addEventListener("click", () => {

                const likeContainer = likeIcon.closest('.like_container')
                const numberOfLikesElement = likeContainer.querySelector('.number_of_likes')
                // on vient rajouter la condition de la présence d'une classe liked pour éviter de liker plusieurs fois
                if (!likeIcon.classList.contains('liked')) {

                    let likes = parseInt(numberOfLikesElement.textContent)
                    numberOfLikesElement.textContent = likes + 1

                    likeIcon.classList.add('liked')
                    // on incrémente le total 
                    incrementTotalOfLikes()
                }
            })
        })
    }
    incrementLike()

    function incrementTotalOfLikes() {
        const totalLikesNumber = document.querySelector(".total_likes_number")
        const likesElements = document.querySelectorAll('.number_of_likes')

        let totalLikes = 0
        likesElements.forEach(likesElement => {
            totalLikes += parseInt(likesElement.textContent)
        })

        totalLikesNumber.textContent = totalLikes
    }
    incrementTotalOfLikes()
}

getFilteredMedia()


// reprendre la structure complète du code (architecture du JS en fonction des classes, modèles etc)



// fonction pour modifier le dropdown menu au clic 
document.addEventListener('DOMContentLoaded', function() {
    const dropdownContent = document.querySelector('.dropdown_content')
    const selectedItem = document.getElementById('selected_item')
    const selectedItemText = selectedItem.childNodes[0]
  
    dropdownContent.addEventListener('click', function(e) {
      if (e.target.classList.contains('dropdown_menu')) {
        // l'item cliqué remonte en haut de la liste des enfants
        dropdownContent.insertBefore(e.target, dropdownContent.firstChild)
  
        // mise à jour du texte seulement (pour conserver l'icone)
        selectedItemText.nodeValue = e.target.textContent
      }
    })
  })


  // main. js tout la logique DOM
  // factory dans un fichier JS séparé
  
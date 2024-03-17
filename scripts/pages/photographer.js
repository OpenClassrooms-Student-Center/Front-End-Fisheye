import MediasFactory from "../factories/MediasFactory.js"
import Photographer from "../models/Photographer.js"
import PhotographerLikes from "../templates/PhotographerLikes.js"
import PhotographerFilter from "../templates/PhotographerFilter.js"
import PhotographerLightbox from "../templates/PhotographerLightbox.js"

// Récupérer les données des photographes
fetch("./data/photographers.json")
	.then((response) => response.json()) // Convertir la réponse en JSON
	.then((data) => {
		const photographers = data.photographers
		const medias = data.media

		// Récupérer l'ID du photographe depuis l'URL
		const urlParams = new URLSearchParams(window.location.search)
		const photographerId = parseInt(urlParams.get("id"))

		// Trouver le photographe correspondant
		const photographer = photographers.find((element) => element.id === photographerId)
   
		// Afficher le portrait du photographe
		const photographerHeader = new Photographer(photographer)
		photographerHeader.render()

		// Récupérer les médias correspondant au photographe
		const photographerMedias = medias.filter((media) => media.photographerId === photographerId) 
		const mediaCards = photographerMedias.map((media) => new MediasFactory(media))

		// Afficher les medias du photographe
		mediaCards.map((mediaCard) => mediaCard.render())

		const photographerLikes = new PhotographerLikes(mediaCards, photographer)
		photographerLikes.render()

		const lightbox = new PhotographerLightbox(mediaCards)
		lightbox.initLightbox()

		const photographerFilter = new PhotographerFilter(mediaCards, lightbox)
		photographerFilter.initSort()

	})


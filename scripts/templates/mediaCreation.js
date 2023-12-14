import { getMediaByPhotographer, getPhotographer } from '../Repository/Repository.js'
import MediaFactory from '../Factory/MediaFactory.js'
import getIdFromUrl from '../utils/urlHelpers.js'

// fonction de tri des médias 
const likesBtn = document.querySelector('.like_btn')
const dateBtn = document.querySelector('.date_btn')
const titleBtn = document.querySelector('.title_btn')

likesBtn.addEventListener('click', () => {
	getFilteredMedia('likes')
})
dateBtn.addEventListener('click', () => {
	getFilteredMedia('date')
})
titleBtn.addEventListener('click', () => {
	getFilteredMedia('title')
})

// sortir les fonctions dans les fonctions 

async function getFilteredMedia(selectedButton) {
	const photographerId = getIdFromUrl()
	const filteredMedia = await getMediaByPhotographer(photographerId)

	switch (selectedButton) {
	case 'likes':
		filteredMedia.sort((a, b) => b.likes - a.likes)
		break
	case 'date':
		filteredMedia.sort((a, b) => new Date(b.date) - new Date(a.date))
		break
	case 'title':
		filteredMedia.sort((a, b) => a.title.localeCompare(b.title))
		break
	default:
		break
	}

	const portfolioContainer = document.querySelector('.portfolio_container')
	portfolioContainer.innerHTML = ''


	const photographer = await getPhotographer(photographerId)
	const photographerName = photographer.name
	const photographerPrice = photographer.price

	const priceADay = document.querySelector('.price_a_day')
	priceADay.textContent = `${photographerPrice}€ / jour`


	filteredMedia.forEach((mediaItem, index) => {
		const mediaObject = MediaFactory.createFromJson(mediaItem)
		const mediaDomElement = MediaFactory.createDomElementFromMedia(mediaObject, photographerName, true, index, mediaItem.title) // on passe l'index à l'élement

		// Création de la structure pour media_description et likes
		const mediaContainer = document.createElement('article')
		mediaContainer.setAttribute('class', 'media_container')

		const mediaWrapper = document.createElement('div')
		mediaWrapper.setAttribute('class', 'media_wrapper')

		const mediaDescription = document.createElement('section')
		mediaDescription.setAttribute('class', 'media_description')

		const mediaTitle = document.createElement('h3')
		mediaTitle.setAttribute('class', 'media_title')
		mediaTitle.textContent = mediaItem.title


		const likeContainer = document.createElement('div')
		likeContainer.setAttribute('class', 'like_container')

		const numberOfLikes = document.createElement('p')
		numberOfLikes.setAttribute('class', 'number_of_likes')
		numberOfLikes.setAttribute('tabindex', '0')
		numberOfLikes.textContent = mediaItem.likes

		const likeIcon = document.createElement('img')
		likeIcon.setAttribute('class', 'like_icon')
		likeIcon.setAttribute('alt', 'coeur')
		likeIcon.setAttribute('tabindex', '0')
		likeIcon.setAttribute('src', 'assets/heart.svg')

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
			likeIcon.addEventListener('click', () => incrementLikesOnClick(likeIcon))
	
			likeIcon.addEventListener('keydown', (event) => {
				if (event.key === 'Enter') {
					incrementLikesOnEnter(event, likeIcon)
				}
			})
		})
	}
	
	function incrementLikesOnClick(likeIcon) {
		const likeContainer = likeIcon.closest('.like_container')
		const numberOfLikesElement = likeContainer.querySelector('.number_of_likes')
	
		if (!likeIcon.classList.contains('liked')) {
			let likes = parseInt(numberOfLikesElement.textContent)
			numberOfLikesElement.textContent = likes + 1
			likeIcon.classList.add('liked')
			incrementTotalOfLikes()
		}
	}
	
	function incrementLikesOnEnter(event, likeIcon) {
		event.preventDefault()
		incrementLikesOnClick(likeIcon)
	}
	
	incrementLike()

	function incrementTotalOfLikes() {
		const totalLikesNumber = document.querySelector('.total_likes_number')
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


// fonction pour modifier le dropdown menu au clic 

document.addEventListener('DOMContentLoaded', function () {
	const dropdownContent = document.querySelector('.dropdown_content')
	const selectedItem = document.getElementById('selected_item')
	const selectedItemText = selectedItem.childNodes[0]
	const dropdownBtn = document.querySelector('.dropdown_btn')

	function toggleDropdown() {
		console.log('function')
		// toggle ajoute une classe si elle n'existe pas et la supprime si elle existe
		dropdownContent.classList.toggle('show')
	}

	dropdownContent.addEventListener('click', function (e) {
		if (e.target.classList.contains('dropdown_menu')) {
			// l'item cliqué remonte en haut de la liste des enfants
			dropdownContent.insertBefore(e.target, dropdownContent.firstChild)

			// mise à jour du texte seulement (pour conserver l'icone)
			selectedItemText.nodeValue = e.target.textContent
		}
	})

	dropdownBtn.addEventListener('keydown', function(e) {
		if (e.key === 'Enter' || e.keyCode === 13) {
			toggleDropdown()
		}
	})
})

import { MediaFactory} from "./mediaFactory.js";
import { addKeydownEvent, addClickEvent, like } from "../pages/photographer.js";

// Fonction pour afficher les informations du photographe
export function displayPhotographerInfos(photographer) {
	
	const photographerHeader = document.querySelector(`.photograph-header`);
	const photographerInfosPart = document.createElement(`div`);
	photographerInfosPart.classList.add(`photographerInfos`);

	const photographerPhotoContact = document.createElement(`div`);
	photographerPhotoContact.classList.add(`photograph-photoContact`);

	const photographContactBtn = document.querySelector(`#contactHeaderBtn`);

	const photographerPicture = `assets/photographers/${photographer.portrait}`;

	const photographerName = document.createElement(`h1`);
	photographerName.classList.add(`photographerName`);
	photographerName.innerText = photographer.name;

	const photographerCity = document.createElement(`p`);
	photographerCity.classList.add(`photographerCity`);
	photographerCity.innerText = `${photographer.city}, ${photographer.country}`;

	const photographerTagLine = document.createElement(`p`);
	photographerTagLine.classList.add(`photographerTagLine`);
	photographerTagLine.innerText = photographer.tagline;

	const photographerPhoto = document.createElement(`img`);
	photographerPhoto.classList.add(`photographerPhoto`);
	photographerPhoto.setAttribute(`src`, photographerPicture);
	photographerPhoto.setAttribute(`tabindex`, 0);
	photographerPhoto.setAttribute(`alt`,`photo de profil de ${photographer.name}.`);
	photographerHeader.appendChild(photographerInfosPart);
	photographerHeader.appendChild(photographerPhotoContact);
	photographerInfosPart.appendChild(photographerName);
	photographerInfosPart.appendChild(photographerCity);
	photographerInfosPart.appendChild(photographerTagLine);
	photographerPhotoContact.appendChild(photographContactBtn);
	photographerPhotoContact.appendChild(photographerPhoto);
}

//------------------Affichage de la gallery photo------------------------------

export function displayPhotographerWorks(photographer, mediasPhoto) {
	const photosGallery = document.querySelector(`.photographerWorks`);
	photosGallery.innerHTML = "";

	const photographerLikesKey = `totalLikes_${photographer.name}`

	let totalLikes = 0;
	let storedTotalLikes = localStorage.getItem(photographerLikesKey)

	if (storedTotalLikes !== null) {
		totalLikes = parseInt(storedTotalLikes)
	} else { 
		mediasPhoto.forEach((media) => {
			totalLikes += parseInt(media.likes)
		})

		localStorage.setItem(photographerLikesKey, totalLikes)
	}

	if (mediasPhoto.length > 0) {
		const iconLikeOffPath = `./assets/icons/heart.png`;
		const iconLikeTotalPath = `./assets/icons/black-heart-solid.svg`;
		const iconLikeOnPath = `./assets/icons/heart-like.svg `;

		const nberTotalOfLikesDiv = document.createElement(`div`);
		nberTotalOfLikesDiv.classList.add(`nberTotalOfLikesDiv`);

		const totalLikesDiv = document.createElement(`div`);
		const nberTotalOfLikeCounter = document.createElement(`p`);
		nberTotalOfLikeCounter.classList.add(`counterOfTotalLikes`);
		nberTotalOfLikeCounter.setAttribute(`tabindex`, `0`);

		const nberLikeTotalIcon = document.createElement(`img`);
		nberLikeTotalIcon.setAttribute(`src`, iconLikeTotalPath);
		nberLikeTotalIcon.setAttribute(`alt`, `like total`);

		const pricePerDay = document.createElement(`p`);
		pricePerDay.innerText = `${photographer.price}€/jour`;

		mediasPhoto.forEach((media) => {
			
			const photosDiv = document.createElement(`div`);
			photosDiv.classList.add(`media-container`);

			const mediaElement = MediaFactory.createMediaElement(media, photographer.name);


			const photoDetailsDiv = document.createElement(`div`);
			photoDetailsDiv.classList.add(`photoDetailsDiv`);

			const photoName = document.createElement(`p`);
			photoName.innerText = `${media.title}`;
			photoName.classList.add(`photoName`);

			const nberOfPhotoLike = document.createElement(`p`);
			nberOfPhotoLike.innerText = `${media.likes}`;
			nberOfPhotoLike.classList.add(`nberOfLike`);
			nberOfPhotoLike.setAttribute(`tabindex`, `0`);

			const mediaId = media.id;
	
			const iconLikeOff = document.createElement(`img`);
			iconLikeOff.setAttribute(`src`, iconLikeOffPath);
			iconLikeOff.classList.add(`likeOff`);
			iconLikeOff.setAttribute('data-media-id', mediaId);
			iconLikeOff.setAttribute(`tabindex`, `0`);
			iconLikeOff.setAttribute(`aria-label`, `icone pour like`);

			const iconLikeOn = document.createElement(`img`);
			iconLikeOn.setAttribute(`src`, iconLikeOnPath);
			iconLikeOn.classList.add(`likeOn`);
			iconLikeOn.setAttribute('data-media-id', mediaId);
			iconLikeOn.setAttribute(`alt`, `photo ajouté au like`);

			const likeDiv = document.createElement(`div`);
			likeDiv.classList.add(`likeDiv`);


			photosGallery.appendChild(photosDiv);
			photosDiv.appendChild(mediaElement);
			photosDiv.appendChild(photoDetailsDiv);
			photoDetailsDiv.appendChild(likeDiv);
			photoDetailsDiv.appendChild(photoName);
			likeDiv.appendChild(nberOfPhotoLike);
			likeDiv.appendChild(iconLikeOff);
			likeDiv.appendChild(iconLikeOn);
			nberTotalOfLikesDiv.appendChild(totalLikesDiv);
			totalLikesDiv.appendChild(nberTotalOfLikeCounter);
			totalLikesDiv.appendChild(nberLikeTotalIcon);
			nberTotalOfLikesDiv.appendChild(pricePerDay);
			photosGallery.appendChild(nberTotalOfLikesDiv);

			addClickEvent(mediaElement, media, photographer);
			addKeydownEvent(mediaElement, media, photographer);
		});

		nberTotalOfLikeCounter.innerText = totalLikes;
		localStorage.setItem(photographerLikesKey, totalLikes)
		like(photographerLikesKey)
		
	}
	
}
//--------------------------------------------------------------------------------//
export function photographerNameModal(photographer) {
	const contactHeaderModal = document.querySelector(`.modalHeader`);
	const divContact = document.createElement(`div`);
	divContact.classList.add(`.modalContactDiv`);
	const headerTitleContactModal = document.querySelector(`.modalHeader h2`);
	const contactNameTag = document.createElement(`p`);
	contactNameTag.classList.add(`modalContactPhotographerName`);
	contactNameTag.innerText = `${photographer.name}`;

	contactHeaderModal.appendChild(divContact);
	divContact.appendChild(contactNameTag);
	divContact.appendChild(headerTitleContactModal);
}

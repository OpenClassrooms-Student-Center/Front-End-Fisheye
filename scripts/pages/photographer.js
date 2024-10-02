import { displayPhotographerInfos, displayPhotographerWorks, photographerNameModal } from "../templates/photographerGallery.js";
import { lightboxBtnControls, displayMediaInLightBox } from "./lightbox.js";

let mediasPhoto = [];
let photographer = "";
let currentMediasPhoto = []

async function loadPhotographerData() {
	try {
		const photographerId = getPhotographerIdFromURL();
		const data = await fetchPhotographerById(photographerId);

		photographer = data.photographer;
		mediasPhoto = data.mediasPhoto;

		displayPhotographerInfos(photographer);
		displayPhotographerWorks(photographer, mediasPhoto);
		currentMediasPhoto = mediasPhoto
		lightboxBtnControls(imagesToDisplay, photographer);
		photographerNameModal(photographer);
		gallerySort();
		like();
	} catch (error) {
		console.error(
			`Erreur lors du chargement des données du photographe:`,
			error
		);
	}
}

loadPhotographerData();

//------------------------------------------------------------------------------

async function fetchPhotographerById(photographerId) {
	try {
		const response = await fetch(`./data/photographers.json`);
		const data = await response.json();
		
		const photographer = data.photographers.find((photograph) => photograph.id == photographerId);
		const mediasPhoto = data.media.filter((works) => works.photographerId == photographerId);
		return { photographer, mediasPhoto };
	} catch (error) {
		console.error(
			`Erreur lors de la récupération des données du photographe:`,
			error
		);
	}
}
//------------------------------------------------------------------


function gallerySort() {
	document.querySelector(`#sortWorks`).addEventListener(`change`, function () {
		const sortValue = this.value;

		let sortedMedias;
		switch (sortValue) {
			case `popularity`:
				sortedMedias = sortByPopularity(mediasPhoto);
				break;

			case `date`:
				sortedMedias = sortByDate(mediasPhoto);
				break;

			case `title`:
				sortedMedias = sortByTitle(mediasPhoto);
				break;
			default:
				sortedMedias = mediasPhoto;
		}

		imagesToDisplay = sortedMedias
		currentMediasPhoto = sortedMedias
	
		displayPhotographerWorks(photographer, imagesToDisplay);
		like();

	
		lightboxBtnControls(imagesToDisplay, photographer)
		
	});
}
gallerySort();



//---------------------------------------------------------

function getPhotographerIdFromURL() {
	return new URL(location.href).searchParams.get(`id`);
}

//----------------------------------------------------------------

function sortByPopularity(mediasPhoto) {
	imagesToDisplay = mediasPhoto.slice().sort((a, b) => b.likes - a.likes);
	mediasPhoto = imagesToDisplay;
	return imagesToDisplay;
}

function sortByDate(mediasPhoto) {
	imagesToDisplay = mediasPhoto.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
	mediasPhoto = imagesToDisplay;
	return imagesToDisplay;
	
}

function sortByTitle(mediasPhoto) {
	imagesToDisplay = mediasPhoto.slice().sort((a, b) => a.title.localeCompare(b.title));
	mediasPhoto = imagesToDisplay;
	return imagesToDisplay;
}

let imagesToDisplay = [];


//--------------------------------------------------------------------------//
export function like(photographerLikesKey) {
	const heartLikeOff = document.querySelectorAll(`.likeOff`);
	const heartLikeOn = document.querySelectorAll(`.likeOn`);
	const nberTotalOfLikeCounter = document.querySelector(`.counterOfTotalLikes`);


	let totalLikes = parseInt(nberTotalOfLikeCounter.innerText);

	heartLikeOff.forEach((heartIconOff, index) => {
		
		const heartIconOn = heartLikeOn[index];
		let likesElement = heartIconOff.previousElementSibling;
		let currentLikes = parseInt(likesElement.innerText);

		const mediaId = heartIconOff.getAttribute('data-media-id');
		const mediaLikeStatusKey = `likeStatus_${mediaId}`;
		const mediaLikesKey = `mediaLikes_${mediaId}`;
		
		
		const isLiked = localStorage.getItem(mediaLikeStatusKey) === 'true';
		const storedLikes = localStorage.getItem(mediaLikesKey);

		if (storedLikes !== null) {
			currentLikes = parseInt(storedLikes);
			likesElement.innerText = currentLikes;
		}

		if (isLiked) {
			heartIconOff.style.display = 'none';
			heartIconOn.style.display = 'block';
		} else {
			heartIconOff.style.display = 'block';
			heartIconOn.style.display = 'none';
		}
		
		heartIconOff.addEventListener(`click`, () => {
			if (heartIconOff.style.display !== 'none') {
				heartIconOff.style.display = 'none';
				heartIconOn.style.display = 'block';
				currentLikes += 1;
				totalLikes += 1;
				
				likesElement.innerText = currentLikes;
				nberTotalOfLikeCounter.innerText = totalLikes;

				
				localStorage.setItem(photographerLikesKey, totalLikes);
				localStorage.setItem(mediaLikeStatusKey, 'true');
				localStorage.setItem(mediaLikesKey, currentLikes);

				const mediaIndex = mediasPhoto.findIndex(media => media.id == mediaId);
                if (mediaIndex !== -1) {
                    mediasPhoto[mediaIndex].likes = currentLikes; // Met à jour le nombre de likes
                } 
				

				if (document.querySelector('#sortWorks').value === 'popularity') {
					const sortedMedias = sortByPopularity(mediasPhoto)
					console.log(sortedMedias)
					imagesToDisplay = sortedMedias
				
					displayPhotographerWorks(photographer, imagesToDisplay)
					like()
					lightboxBtnControls(imagesToDisplay, photographer)
				}
			}
		});

	
		heartIconOn.addEventListener(`click`, () => {
			if (heartIconOn.style.display !== 'none') {
				heartIconOn.style.display = 'none';
				heartIconOff.style.display = 'block';
				currentLikes -= 1;
				totalLikes -= 1;
				
				likesElement.innerText = currentLikes;
				nberTotalOfLikeCounter.innerText = totalLikes;

		
				localStorage.setItem(photographerLikesKey, totalLikes);
				localStorage.setItem(mediaLikeStatusKey, 'false');
				localStorage.setItem(mediaLikesKey, currentLikes);

				const mediaIndex = mediasPhoto.findIndex(media => media.id == mediaId);
                if (mediaIndex !== -1) {
                    mediasPhoto[mediaIndex].likes = currentLikes; // Met à jour le nombre de likes 
                } 

				if (document.querySelector('#sortWorks').value === 'popularity') {
					const sortedMedias = sortByPopularity(currentMediasPhoto)
					imagesToDisplay = sortedMedias
					displayPhotographerWorks(photographer, imagesToDisplay)
					like()
					lightboxBtnControls(imagesToDisplay, photographer)
				}
			}
		});
	});


	heartLikeOff.forEach((heartIconOff, index) => {
		const heartIconOn = heartLikeOn[index];
		let likesElement = heartIconOff.previousElementSibling;
		let currentLikes = parseInt(likesElement.innerText);

		const mediaId = heartIconOff.getAttribute('data-media-id');
		const mediaLikeStatusKey = `likeStatus_${mediaId}`;
		const mediaLikesKey = `mediaLikes_${mediaId}`;
		heartIconOff.addEventListener(`keydown`, (event) => {
			if (event.key === `Enter`) {
				event.preventDefault()
				if (heartIconOff.style.display !== 'none') {
					heartIconOff.style.display = 'none';
					heartIconOn.style.display = 'block';
					currentLikes += 1;
					totalLikes += 1;
					
					likesElement.innerText = currentLikes;
					nberTotalOfLikeCounter.innerText = totalLikes;

					
					localStorage.setItem(photographerLikesKey, totalLikes);
					localStorage.setItem(mediaLikeStatusKey, 'true');
					localStorage.setItem(mediaLikesKey, currentLikes);

					heartIconOn.focus()

					const mediaIndex = mediasPhoto.findIndex(media => media.id == mediaId);
                if (mediaIndex !== -1) {
                    mediasPhoto[mediaIndex].likes = currentLikes; // Met à jour le nombre de likes 
                } 

					if (document.querySelector('#sortWorks').value === 'popularity') {
						const sortedMedias = sortByPopularity(currentMediasPhoto)
						imagesToDisplay = sortedMedias
						displayPhotographerWorks(photographer, imagesToDisplay)
						like()
						lightboxBtnControls(imagesToDisplay, photographer)
					}
				}
			}
		});

		heartIconOn.addEventListener(`keydown`, (event) => {
			if (event.key === `Enter`) {
				event.preventDefault()
				if (heartIconOn.style.display !== 'none') {
					heartIconOn.style.display = 'none';
					heartIconOff.style.display = 'block';
					currentLikes -= 1;
					totalLikes -= 1;
					
					likesElement.innerText = currentLikes;
					nberTotalOfLikeCounter.innerText = totalLikes;

					// Save to localStorage
					localStorage.setItem(photographerLikesKey, totalLikes);
					localStorage.setItem(mediaLikeStatusKey, 'false');
					localStorage.setItem(mediaLikesKey, currentLikes);

					heartIconOff.focus()

					const mediaIndex = mediasPhoto.findIndex(media => media.id == mediaId);
					if (mediaIndex !== -1) {
						mediasPhoto[mediaIndex].likes = currentLikes; // Met à jour le nombre de likes 
					} 

					if (document.querySelector('#sortWorks').value === 'popularity') {
						const sortedMedias = sortByPopularity(currentMediasPhoto)
						imagesToDisplay = sortedMedias
						displayPhotographerWorks(photographer, imagesToDisplay)
						like()
						lightboxBtnControls(imagesToDisplay, photographer)
					}
				}
			}
		});
	});
}

//-----------------------------------------------------------------------//

export function addKeydownEvent(mediaElement, media, photographer) {
	mediaElement.addEventListener(`keydown`, (event) => {
		const key = event.key;
		if (key === `Enter`) {
			event.preventDefault()
			displayMediaInLightBox(media, photographer, currentMediasPhoto);
			like()

		}
	}); 
}

//---------------------------------------------------------------------//

export function addClickEvent(mediaElement, media, photographer) {
	mediaElement.addEventListener(`click`, () => {
		displayMediaInLightBox(media, photographer, currentMediasPhoto);
		like();
	});
}

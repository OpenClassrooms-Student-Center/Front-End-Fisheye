// le code JavaScript lié à la page photographer.html
async function getPhotographers() {
	// Récupèrer les données du fichier JSON
	const reponse = await fetch("data/photographers.json");
	const photographers = await reponse.json();

	return photographers;
}

const url = document.location.href;
const urlId = new URL(url);
const params = new URLSearchParams(urlId.search);
const paramsId = params.get("id");

async function getPhotographer() {
	const { photographers } = await getPhotographers();
	const photographer = photographers.find( ph => ph.id === Number(paramsId));

	return photographer;
}

async function displayPhotographerHeader(photographer) {
	const photographHeader = document.querySelector(".photograph-header");
	const headerFactory = await photographHeaderFactory(photographer);
	const { div, img } = headerFactory;

	photographHeader.appendChild(div);
	photographHeader.appendChild(img);
}

async function displayPhotographerMedia(photographers, photographer) {
	const photographerName = photographer.name.replace(/\s+/g, "_");
	const mediaContainer = document.querySelector(".media-container");
	let totalLikes = 0;

	for (let i = 0; i < photographers.media.length ; i++) {
		const media = photographers.media[i];
		
		if (photographer.id === media.photographerId) {
			const photographMedia = await mediaFactory(photographerName, media);
			const mediaCardDOM = photographMedia.getMediaCardDOM();
			
			totalLikes+= parseInt(media.likes);
			mediaContainer.appendChild(mediaCardDOM);
		}
	}
	
	photographerFooterFactory(totalLikes, photographer);
}

async function init() {

	const photographers = await getPhotographers();
	const photographer = await getPhotographer();
	displayPhotographerHeader(photographer);
	displayPhotographerMedia(photographers, photographer);

}   

window.onload = function()
{
	init();
};

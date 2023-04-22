//Mettre le code JavaScript lié à la page photographer.html
import { getPhotographers } from "./index.js";

const url = document.location.href;
const urlId = new URL(url);
const params = new URLSearchParams(urlId.search);
const paramsId = params.get("id");

export async function getPhotographer() {
	const { photographers } = await getPhotographers();
	const photographer = photographers.find( ph => ph.id === Number(paramsId));

	return photographer;
}

async function displayPhotographerHeader() {
	const photographer = await getPhotographer();
	const photographHeader = document.querySelector(".photograph-header");
	const { name, portrait, city, country, tagline } = photographer;

	const picture = `assets/photographers/${portrait}`;

	const img = document.createElement( "img" );
	img.setAttribute("src", picture);
	img.setAttribute ("title", `${name}`);

	const h2 = document.createElement( "h2" );
	h2.textContent = name;

	const h3 = document.createElement( "h3" );
	h3.textContent = city + ", " + country;

	const h4 = document.createElement( "h4" );
	h4.textContent = tagline;
	
	const div = document.createElement( "div" );
    
	photographHeader.appendChild(img);
	div.appendChild(h2);
	div.appendChild(h3);
	div.appendChild(h4);
	photographHeader.appendChild(div);
}

async function displayPhotographerMedia() {
	const photographers = await getPhotographers();
	const photographer = await getPhotographer();
	const photographerName = photographer.name.replace(/\s+/g, "_");
	const mediaContainer = document.querySelector(".media-container");
  
	for (let i = 0; i < photographers.media.length; i++) {
		
		const media = photographers.media[i];

		if (photographer.id === media.photographerId) {
			const { title, likes } = media;
			const mediaElement = document.createElement("div");
			mediaElement.classList.add("media");

			if (media.image) {
				const { image } = media;
				const imagePath = `assets/images/${photographerName}/${image}`;
				const imageElement = document.createElement("img");
				imageElement.setAttribute("src", imagePath);
				imageElement.setAttribute("alt", title);
				const mediaImage = document.createElement("div");
				mediaImage.classList.add("media_image");
				mediaImage.appendChild(imageElement);
				mediaElement.appendChild(mediaImage);
			}

			if (media.video) {
				const { video } = media;
				const videoPath = `assets/images/${photographerName}/${video}`;
				const videoElement = document.createElement("video");
				videoElement.setAttribute("src", videoPath);
				videoElement.setAttribute("alt", title);
				videoElement.setAttribute("controls", "");
				const mediaImage = document.createElement("div");
				mediaImage.classList.add("media_video");
				mediaImage.appendChild(videoElement);
				mediaElement.appendChild(mediaImage);
			}

			const mediaInfo = document.createElement("div");
			mediaInfo.classList.add("media_info");
			const mediaTitle = document.createElement("h2");
			mediaTitle.classList.add("media_title");
			mediaTitle.textContent = title;
			const mediaLikes = document.createElement("div");
			mediaLikes.classList.add("media_likes");
			mediaLikes.innerHTML = `${likes} <i class="fas fa-heart"></i>`;
			mediaInfo.appendChild(mediaTitle);
			mediaInfo.appendChild(mediaLikes);
			mediaElement.appendChild(mediaInfo);
			mediaContainer.appendChild(mediaElement);
		}
	}
}
  
async function init() {
	await displayPhotographerHeader();
	await displayPhotographerMedia();
}   

await init();
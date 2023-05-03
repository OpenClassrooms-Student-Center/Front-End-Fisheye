let medias = [];
let currentMedia;

// Media factory function

async function mediaFactory(photographerName, media) {

	const { title, likes } = media;

	function getMediaCardDOM () {
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
			const a = document.createElement("a");
			a.addEventListener("click" , () => { lightboxFactory(mediaImage , media); });
			a.appendChild(mediaImage);
			mediaElement.appendChild(a);
		}

		if (media.video) {
			const { video } = media;
			const videoPath = `assets/images/${photographerName}/${video}`;
			const videoElement = document.createElement("video");
			videoElement.setAttribute("src", videoPath);
			videoElement.setAttribute("title", title);
			const mediaVideo = document.createElement("div");
			mediaVideo.classList.add("media_video");
			mediaVideo.appendChild(videoElement);
			const a = document.createElement("a");
			a.addEventListener("click" , () => { lightboxFactory(mediaVideo , media); });
			a.appendChild(mediaVideo);
			mediaElement.appendChild(a);
		}
		
		mediaInfoFactory(title, likes, media, mediaElement);
		medias.push(mediaElement);

		return mediaElement;
	}
	
	return {title, likes, getMediaCardDOM};
}

// Media infos factory (informations , likes)

function mediaInfoFactory(title, likes, media, mediaElement ) {

	const mediaInfo = document.createElement("div");
	mediaInfo.classList.add("media_info");

	const mediaTitle = document.createElement("h2");
	mediaTitle.classList.add("media_title");
	mediaTitle.textContent = title;

	const mediaLikes = document.createElement("div");
	mediaLikes.classList.add("media_likes");

	const likesNumber = document.createElement("p");
	likesNumber.textContent = likes;

	const likesIcon = document.createElement("i");
	likesIcon.setAttribute("class", "fas fa-heart icon");
	likesIcon.setAttribute("area-label", "likes");
	likesIcon.addEventListener("click" , () => { addLikes(media, likesNumber);});
	mediaLikes.appendChild(likesNumber);
	mediaLikes.appendChild(likesIcon);
	mediaInfo.appendChild(mediaTitle);
	mediaInfo.appendChild(mediaLikes);
	mediaElement.appendChild(mediaInfo);
}

// Likes click

function addLikes(media, likesNumber) {
	const totalLikes = document.querySelector(".total-likes");

	if (!likesNumber.classList.contains("liked")) {
		const imageLikes = media.likes;
		const newLikes = imageLikes + 1;
		media.likes = newLikes;
		
		likesNumber.textContent = newLikes;
		totalLikes.textContent = parseInt(totalLikes.textContent) + 1;
		likesNumber.classList.add("liked");
	}
}

// lightbox factory function

function lightboxFactory(mediaContainer) {

	const lightbox = document.getElementById("lightbox");
	lightbox.classList.add("active");

	const lightboxClose = document.querySelector(".lightbox-close");
	lightboxClose.addEventListener("click" , closeLightBox);

	const lightboxMedia = document.querySelector(".lightbox-image");
	lightboxMedia.innerHTML = "";
	
	if (mediaContainer.querySelector("img")) {
		currentMedia = mediaContainer.querySelector("img");
		const newImage = document.createElement("img");
		newImage.src = currentMedia.src;
		newImage.alt = currentMedia.alt;
		lightboxMedia.appendChild(newImage);
	} else {
		currentMedia = mediaContainer.querySelector("video");
		const newVideo = document.createElement("video");
		newVideo.src = currentMedia.src;
		newVideo.title = currentMedia.title;
		newVideo.controls = true;
		lightboxMedia.appendChild(newVideo);
	}

	const mediaTitle = currentMedia.alt || currentMedia.title;
	const titleElement = document.createElement("h2");
	titleElement.classList.add("new_media_title");
	titleElement.textContent = mediaTitle;
	lightboxMedia.appendChild(titleElement);
}

// Close lightbox function

function closeLightBox() {
	const lightbox = document.getElementById("lightbox");
	const lightboxImage = document.querySelector(".lightbox-image");
	lightboxImage.innerHTML = "";
	lightbox.classList.remove("active");
}

// Get current media index

//const currentIndex = medias.findIndex(media => [media.querySelector("img"), media.querySelector("video")].includes(currentMedia));
//if (currentIndex == 0) {
//	iconPrev.style.color = "white";
//}

// Next lightbox

const iconNext = document.querySelector(".next");
iconNext.addEventListener("click", () => nextLightbox(currentMedia));

function nextLightbox() {
	const currentIndex = medias.findIndex(media => [media.querySelector("img"), media.querySelector("video")].includes(currentMedia));
	const nextIndex = currentIndex + 1 ;

	if (nextIndex === medias.length) {
		return;
	}

	const nextMedia = medias[nextIndex];
	lightboxFactory(nextMedia);
}

// Previous lightbox

const iconPrev = document.querySelector(".prev");
iconPrev.addEventListener("click", () => prevLightbox(currentMedia));

async function prevLightbox() {
	const currentIndex = medias.findIndex(media => [media.querySelector("img"), media.querySelector("video")].includes(currentMedia));
	const prevIndex = currentIndex - 1 ;
	if (prevIndex === -1) {

		//iconPrev.style.color = "white";

		return; 
	}
	const nextMedia = medias[prevIndex];
	lightboxFactory(nextMedia);
}

// select 

const selectContainer = document.querySelector(".select-container");

const selectElement = selectContainer.querySelector("select");
const selectedElement = document.createElement("div");
const optionsList = document.createElement("div");

selectedElement.classList.add("select-selected");
selectedElement.textContent = selectElement.options[selectElement.selectedIndex].textContent;
selectContainer.appendChild(selectedElement);

optionsList.classList.add("select-items", "select-hide");
for (let option of selectElement.options) {
	const optionItem = document.createElement("div");
	optionItem.textContent = option.textContent;
	optionItem.addEventListener("click", () => {
		selectElement.value = option.value;
		selectedElement.textContent = option.textContent;
		optionItem.classList.add("same-as-selected");
		optionsList.classList.add("select-hide");
	});
	optionsList.appendChild(optionItem);
}
selectContainer.appendChild(optionsList);

selectedElement.addEventListener("click", (e) => {
	e.stopPropagation();
	optionsList.classList.toggle("select-hide");
	selectedElement.classList.toggle("select-arrow-active");
});
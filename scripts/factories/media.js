export async function mediaFactory(photographerName, media) {

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
			a.addEventListener("click" , () => { lightBoxFactory(mediaImage); });
			a.appendChild(mediaImage);
			//a.setAttribute("href", "#");
			mediaElement.appendChild(a);
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
			const a = document.createElement("a");
			a.appendChild(mediaImage);
			//a.setAttribute("href", "#");
			mediaElement.appendChild(a);
		}

		mediaInfoFactory(title, likes, media, mediaElement);

		return (mediaElement);
	}

	return {title, likes, getMediaCardDOM};
}

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

function addLikes(media, likesNumber) {
	const totalLikes = document.querySelector(".total-likes");
	const imageLikes = media.likes;
	const newLikes = imageLikes + 1;
	media.likes = newLikes;

	likesNumber.textContent = newLikes;
	totalLikes.textContent = parseInt(totalLikes.textContent) + 1;
}

function lightBoxFactory(imageContainer) {

	const lightbox = document.createElement("div");
	lightbox.id = "lightbox";
	document.body.appendChild(lightbox);

	lightbox.classList.add("active");
	lightbox.innerHTML = "";

	const closeImage = document.createElement("img");
	closeImage.setAttribute("src", "assets/icons/close.svg");
	closeImage.setAttribute("fill", "#901C1C");
	closeImage.addEventListener("click" , closeLightBox());
	closeImage.classList.add("closeLightBox");

	const image = imageContainer.querySelector("img");
	const newImage = imageContainer;
	newImage.classList.add("new_media");

	const imageTitle = image.alt;
	const titleElement = document.createElement("h2");
	titleElement.classList.add("new_media_title");
	titleElement.textContent = imageTitle;

	const div = document.createElement("div");
	
	imageContainer.appendChild(titleElement);
	div.appendChild(closeImage);
	div.appendChild(imageContainer);
	lightbox.appendChild(div);
}

function closeLightBox() {
	const lightbox = document.getElementById("lightbox");
	lightbox.style.display = "none";

}
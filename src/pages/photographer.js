//Mettre le code JavaScript lié à la page photographer.html

let slideIndex = 1;

function showSlides(id) {
	const slides = document.querySelectorAll(".media_section > article");
	slideIndex = id;
	slides.forEach((el, idx) => {
		el.style.display = "none";
		if (slideIndex == idx + 1) {
			el.style.display = null;
		}
	});
}

function openLightBox() {
	const mediaSection = document.querySelector(".media_section");
	mediaSection.classList.add("lightbox--open");
	showSlides(5);

	document.querySelector(".lightbox_controle").style.display = null;
}

function closeLightBox() {
	const slides = document.querySelectorAll(".media_section > article");

	const mediaSection = document.querySelector(".media_section");
	mediaSection.classList.remove("lightbox--open");

	slides.forEach((el) => {
		el.style.display = null;
	});

	document.querySelector(".lightbox_controle").style.display = "none";
}

function displayMediaData(media) {
	const mediaSection = document.querySelector(".media_section");

	media.forEach((media) => {
		const mediaModel = mediaFactory(media);

		const userCardDOM = mediaModel.createMediaCardDOM();
		mediaSection.appendChild(userCardDOM);
	});
}

async function init() {
	const formTitle = document.querySelector("#modalTitle");

	const params = new URL(document.location).searchParams;
	const id = params.get("id");
	const api = await fetchApi();

	// Récupère les datas du photographe
	const { photographer } = api.getOnePhotographer(id);
	const { media } = api.getMedia(id);

	formTitle.innerHTML = `${formTitle.innerText}<br>${photographer.name}`;

	const photographerModel = photographerTemplate(photographer);
	photographerModel.addUserHeaderDOM(
		document.querySelector(".photograph-header")
	);
	photographerModel.addPhotographInfoDOM(
		document.querySelector(".photographer-info")
	);

	displayMediaData(media);

	// openLightBox();

	// const mediaElements = document.querySelectorAll(".media_section article");

	// console.log(document.querySelector("[data-js='close-lightbox']"));

	// document
	// 	.querySelector("[data-js='close-lightbox']")
	// 	.addEventListener("click", closeLightBox);

	// // console.log(mediaElements);

	// // setTimeout(() => {
	// // 	showSlides(10);
	// // }, 2000);
}

// init();

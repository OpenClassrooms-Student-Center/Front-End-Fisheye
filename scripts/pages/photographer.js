//Mettre le code JavaScript lié à la page photographer.html
async function displayMediaData(media) {
	const mediaSection = document.querySelector(
		".media_section"
	);

	media.forEach((media) => {
		const mediaModel = mediaFactory(media);

		const userCardDOM = mediaModel.createMediaCardDOM();
		mediaSection.appendChild(userCardDOM);
	});
}

async function init() {
	const params = new URL(document.location).searchParams;
	const id = params.get("id");
	const api = await fetchApi();

	// Récupère les datas du photographe
	const { photographer } = api.getOnePhotographer(id);
	const { media } = api.getMedia(id);

	const photographerModel = photographerTemplate(photographer);
	photographerModel.addUserHeaderDOM(
		document.querySelector(".photograph-header")
	);
	photographerModel.addPhotographInfoDOM(
		document.querySelector(".photographer-info")
	);

	displayMediaData(media);
}

init();

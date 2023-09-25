async function displayPhotographerData(photographers) {
	const photographersSection = document.querySelector(
		".photographer_section"
	);

	photographers.forEach((photographer) => {
		const photographerModel = photographerTemplate(photographer);

		const userCardDOM = photographerModel.createUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}

async function init() {
	const api = await fetchApi();

	// Récupère les datas des photographes
	const { photographers } = api.getPhotographers();

	displayPhotographerData(photographers);
}

init();

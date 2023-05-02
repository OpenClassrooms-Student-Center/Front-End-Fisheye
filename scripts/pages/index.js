async function getPhotographers() {
	// Récupèrer les données du fichier JSON
	const reponse = await fetch("data/photographers.json");
	const photographers = await reponse.json();

	return photographers;
}

async function displayData(photographers) {
	const photographersSection = document.querySelector(".photographer_section");

	photographers.forEach((photographer) => {
		const photographerModel = photographerFactory(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}

async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getPhotographers();
	displayData(photographers);
}

window.onload = function()
{
	init();
}

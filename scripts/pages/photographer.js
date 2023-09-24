//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographer(id) {
	const response = await fetch("./data/photographers.json");

	const { photographers } = await response.json();

	return { photographer: photographers.find((p) => p.id == id) };
}

async function init() {
	const params = new URL(document.location).searchParams;

	const id = params.get("id");

	// Récupère les datas des photographe
	const { photographer } = await getPhotographer(id);

	console.log(photographer);
}

init();

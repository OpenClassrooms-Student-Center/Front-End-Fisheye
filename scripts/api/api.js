async function fetchApi() {
	const apiURL = "./data/photographers.json";

	const { photographers, media } = await getPhotographerJSON();

	async function getPhotographerJSON() {
		const response = await fetch(apiURL);

		const { photographers, media } = await response.json();

		return { photographers, media };
	}

	function getPhotographers() {
		return { photographers };
	}

	function getOnePhotographer(id) {
		const { photographers } = getPhotographers();

		return { photographer: photographers.find((p) => p.id == id) };
	}

	function getMedia(photographerId) {
		return {
			media: media.filter((m) => m.photographerId == photographerId),
		};
	}

	return { getPhotographers, getOnePhotographer, getMedia };
}

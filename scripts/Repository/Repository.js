

export async function getPhotographers() {
	const response = await fetch('/data/photographers.json')
	const data = await response.json()
	return data.photographers
}

export async function getMedias() {
	const response = await fetch('/data/photographers.json')
	const data = await response.json()
	return data.media
}


export async function getPhotographer(id) {
	const photographers = await getPhotographers()
	return photographers.find(p => p.id == id)
}

export async function getMediaByPhotographer(photographerId) {
	const medias = await getMedias()
	return medias.filter(m => m.photographerId == photographerId)
}


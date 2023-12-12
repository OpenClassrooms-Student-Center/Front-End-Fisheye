
// récuperer l'id du photographe depuis l'URL

export default function getIdFromUrl() {
	const idOfPhotographer = new URLSearchParams(window.location.search).get('id')
	return idOfPhotographer
}


import { getPhotographer } from "./photographer";

export async function getPhotographerName(id) {

	const { photographer } = await getPhotographer();
	const photographerName = photographer.find( p => p.id === id ).name;
	return photographerName;
}

// Function Media
export async function mediaFactory() {
    
	const photographer = await getPhotographer();
	const {id, photographerId, title, image, likes, date, price} = photographer;
    
	const picture = `assets/images/${photographerName}/${image}`;
    
}
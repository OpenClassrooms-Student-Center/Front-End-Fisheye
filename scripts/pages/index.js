import UserCardFactory from '../Factory/UserCardFactory.js'
import { getPhotographers } from '../Repository/Repository.js'

async function displayData(photographers) {
	const photographersSection = document.querySelector('.photographer_section')

	photographers.forEach((photographer) => {

		const userCardDOM =  UserCardFactory.createFromPhotographer(photographer)
		photographersSection.appendChild(userCardDOM)
	})
}

const photographers = await getPhotographers()      
displayData(photographers)
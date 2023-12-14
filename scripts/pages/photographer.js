import { getPhotographer } from '../Repository/Repository.js'
import getIdFromUrl from '../utils/urlHelpers.js'

async function loadPhotographerContent() {

	const filteredPhotographer = await getPhotographer(getIdFromUrl())

	const { name, city, country, tagline, price } = filteredPhotographer

	const photographHeader = document.querySelector('.photograph_header')
	const textContainer = document.querySelector('.text_container')
	textContainer.style.order = '-1'

	const nameOf = document.querySelector('.photographer_main_title')
	nameOf.textContent = name
	const cityOfCountryOf = document.querySelector('.city_of_country_of')
	const tagLineOf = document.querySelector('.photographer_tagline')

	const priceOf = document.createElement('p')
	priceOf.textContent = price

	const portraitOf = document.querySelector('.portrait_of_photographer')
	portraitOf.setAttribute('src', `assets/photographers/${name.replace(' ', '').replace('-', '')}.jpg`)
	portraitOf.setAttribute('alt', 'portrait du photographe ' + `${name}`)

	cityOfCountryOf.textContent = city + ', ' + country
	tagLineOf.textContent = tagline

	const imgWrapper = document.querySelector('.img_wrapper')

	photographHeader.appendChild(textContainer)
	photographHeader.appendChild(imgWrapper)
	textContainer.appendChild(nameOf)
	textContainer.appendChild(cityOfCountryOf)
	textContainer.appendChild(tagLineOf)
	imgWrapper.appendChild(portraitOf)
}

loadPhotographerContent()


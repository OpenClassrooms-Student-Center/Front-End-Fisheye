class UserCard {
	constructor(name, id, city, country, tagline, price, portrait) {

		this.name = name
		this._id = id
		this.city = city
		this.country = country
		this.tagline = tagline
		this.price = price
		this.portrait = portrait
	}

	get id() {
		return this._id
	}

	createLink() {
		const linkTo = document.createElement('a')
		linkTo.setAttribute('href', 'photographer.html?id=' + this._id) // récuperer l'id dans l'url pour le searchParams
		linkTo.classList.add('link_to')
		return linkTo
	}

	createImageElement() {
		const portraitWrapper = document.createElement('div')
		portraitWrapper.classList.add('portrait_wrapper')
		portraitWrapper.setAttribute('role', 'presentation')
		// portraitWrapper.setAttribute('tabindex', '0')
		portraitWrapper.setAttribute('id', this.id)

		const img = document.createElement('img')
		const picture = `assets/photographers/${this.portrait}`
		img.setAttribute('src', picture)
		img.setAttribute('alt', 'photo de profil du Photographe ' + this.name)

		portraitWrapper.appendChild(img)
		return portraitWrapper
	}

	createTitleElement() {
		const h2 = document.createElement('h2')
		h2.textContent = this.name
		return h2
	}

	createCityCountryElement() {
		const span = document.createElement('span')
		span.classList.add('city_country')
		span.setAttribute('role', 'label')
		span.textContent = this.city + ', ' + this.country
		return span
	}

	createTagLineElement() {
		const p = document.createElement('p')
		p.classList.add('tagline')
		p.setAttribute('role', 'label')
		p.textContent = this.tagline
		return p
	}

	createPriceElement() {
		const p2 = document.createElement('p')
		p2.classList.add('price')
		p2.setAttribute('role', 'label')
		p2.textContent = this.price + '€/jour'
		return p2
	}

	create() {
		const article = document.createElement('article')
		const section = document.createElement('section')
		section.classList.add('section_under_name')

		const portraitWrapper = this.createImageElement()
		const h2 = this.createTitleElement()
		const span = this.createCityCountryElement()
		const p = this.createTagLineElement()
		const p2 = this.createPriceElement()
		const linkTo = this.createLink()

		article.appendChild(linkTo)
		linkTo.appendChild(portraitWrapper)
		article.appendChild(h2)
		article.appendChild(section)
		section.appendChild(span)
		section.appendChild(p)
		section.appendChild(p2)
		return article
	}

}


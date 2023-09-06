function photographerTemplate(data) {
    const { name, id, city, portrait, country, tagline, price } = data

	const picture = `../../assets/photographers/${portrait}`

	function getUserCardDOM() {
		const article = document.createElement('article')
		const link = document.createElement('a')

		link.href = './photographer.html?id=' + id
		link.ariaLabel = name

		const img = document.createElement('img')

		img.setAttribute('src', picture)
		img.alt = 'Photo du profil de ' + name

		const h2 = document.createElement('h2')

		h2.textContent = name

		article.appendChild(link)
		link.appendChild(img)
		link.appendChild(h2)

		const div = document.createElement('div')
		const locationInfos = document.createElement('p')
		const taglineInfos = document.createElement('p')
		const priceInfos = document.createElement('p')

		locationInfos.textContent = city + ', ' + country
		taglineInfos.textContent = tagline
		priceInfos.textContent = price + '€/jour'

		div.appendChild(locationInfos)
		div.appendChild(taglineInfos)
		div.appendChild(priceInfos)
		article.appendChild(div)

		return article
	}

	return { getUserCardDOM }
}

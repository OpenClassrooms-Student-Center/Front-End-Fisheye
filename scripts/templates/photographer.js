function photographerTemplate(data) {
	const { id, name, portrait, price, tagline, city, country } = data;

	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
		const article = document.createElement("article");
		const img = document.createElement("img");
		img.setAttribute("src", picture);
		img.setAttribute("alt", `Portrait de ${name}`);
		const h2 = document.createElement("h2");
		h2.textContent = name;
		article.appendChild(img);
		article.appendChild(h2);

		const h3_city = document.createElement("h3");
		h3_city.innerText = city;

		const paragraph_tagline = document.createElement("p");
		paragraph_tagline.innerText = tagline;

		const paragraph_price = document.createElement("p");
		paragraph_price.innerText = `${price}€/jour`;

		[h3_city, paragraph_tagline, paragraph_price].forEach((element) =>
			article.appendChild(element)
		);

		return article;
	}

	return { id, name, picture, price, tagline, city, country, getUserCardDOM };
}

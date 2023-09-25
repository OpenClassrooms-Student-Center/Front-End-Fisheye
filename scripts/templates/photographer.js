function photographerTemplate(data) {
	const { id, name, portrait, price, tagline, city, country } = data;

	const picture = `assets/photographers/${portrait}`;
	const link = `photographer.html?id=${id}`;

	const taglineOptions = { tagName: "p", innerText: tagline };
	const priceOptions = {
		tagName: "h3",
		innerText: `${price}€/jour`,
	};

	const createUserCardDOM = () =>
		createElement({
			tagName: "article",
			children: [
				{
					tagName: "a",
					attributes: {
						href: link,
						"aria-label": name,
					},
					children: [
						{
							tagName: "img",
							attributes: {
								src: picture,
								alt: name,
							},
						},
						{
							tagName: "h2",
							innerText: name,
						},
					],
				},
				{
					tagName: "h3",
					innerText: city,
				},
				taglineOptions,
				priceOptions,
			],
		});

	/** @param {HTMLElement} photographHeader  */
	function addUserHeaderDOM(photographHeader) {
		if (!photographHeader) return;

		const divElement = createElement({
			tagName: "div",
			children: [
				{ tagName: "h1", innerText: name },
				{
					tagName: "h2",
					innerText: `${city}, ${country}`,
				},
				taglineOptions,
			],
		});

		const portraitElement = createElement({
			tagName: "img",
			attributes: {
				src: picture,
				alt: name,
			},
		});

		photographHeader.insertBefore(divElement, photographHeader.firstChild);
		photographHeader.appendChild(portraitElement);
	}

	/** @param {HTMLElement} photographerInfo  */
	function addPhotographInfoDOM(photographerInfo) {
		if (!photographerInfo) return;

		const likesElement = createElement({
			tagName: "h3",
			innerText: "0",
			children: [
				{
					tagName: "img",
					attributes: {
						src: "assets/icons/favorite.svg",
						alt: "total likes",
					},
					className: "icon favorite",
				},
			],
		});

		const priceElement = createElement(priceOptions);

		[likesElement, priceElement].forEach((el) =>
			photographerInfo.appendChild(el)
		);
	}

	return {
		id,
		name,
		picture,
		price,
		tagline,
		city,
		country,
		createUserCardDOM,
		addUserHeaderDOM,
		addPhotographInfoDOM,
	};
}

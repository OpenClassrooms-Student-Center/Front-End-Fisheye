export function photographerTemplate(data) {
	const { name, id, city, country, tagline, price, portrait } = data;


	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
	
		const photographerPageLink = document.createElement(`a`);
		photographerPageLink.setAttribute(`href`, `photographer.html?id=${id}`);
		const article = document.createElement(`article`);

		//division en 2 de l'article. 
		
		//1ere partie
		const idPhotographerPart = document.createElement(`div`);
		idPhotographerPart.classList.add(`photoNamePhotographer`);
		const img = document.createElement(`img`);
		img.setAttribute(`src`, picture);
		img.setAttribute(`alt`, `photo profil de ${name}. Accédez à sa page`);
		const h2 = document.createElement("h2");
		h2.textContent = name;

		//2eme partie
		const photographerInfo = document.createElement(`div`);
		photographerInfo.classList.add(`photographerInfo`);
		const photographerTown = document.createElement(`p`);
		photographerTown.classList.add(`photographerTown`);
		photographerTown.textContent = `${city}, ${country}`;
		const photographerTagLine = document.createElement(`p`);
		photographerTagLine.classList.add(`photographerSlogan`);
		photographerTagLine.textContent = tagline;
		const photographerPrice = document.createElement(`p`);
		photographerPrice.classList.add(`photographerPrice`);
		photographerPrice.textContent = `${price}€ /jours`;

		article.appendChild(photographerPageLink);
		article.appendChild(photographerInfo);

		photographerPageLink.appendChild(idPhotographerPart);

		idPhotographerPart.appendChild(img);
		idPhotographerPart.appendChild(h2);

		photographerInfo.appendChild(photographerTown);
		photographerInfo.appendChild(photographerTagLine);
		photographerInfo.appendChild(photographerPrice);

		return article;
	}
	return { getUserCardDOM };
}

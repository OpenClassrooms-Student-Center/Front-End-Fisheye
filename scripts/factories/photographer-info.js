function photographHeaderFactory(photographer) {

	const { name, portrait, city, country, tagline } = photographer;
	const picture = `assets/photographers/${portrait}`;

	const img = document.createElement( "img" );
	img.setAttribute("src", picture);
	img.setAttribute ("title", `${name}`);

	const h2 = document.createElement( "h2" );
	h2.textContent = name;

	const h3 = document.createElement( "h3" );
	h3.textContent = city + ", " + country;

	const h4 = document.createElement( "h4" );
	h4.textContent = tagline;
    
	const div = document.createElement( "div" );
	div.appendChild(h2);
	div.appendChild(h3);
	div.appendChild(h4);

	return {div, img};
}

function photographerFooterFactory(totalLikes, photographer) {

	const footerInfo = document.querySelector(".footer-info");

	const likesElement = document.createElement("div");
	const likes = document.createElement("p");
	likes.className = "total-likes";
	likes.textContent = `${totalLikes}`; 
	likesElement.appendChild(likes);
	const likesIcon = document.createElement("i");
	likesIcon.setAttribute("class", "fas fa-heart");
	likesIcon.setAttribute("area-label", "likes");
	likesElement.appendChild(likesIcon);
	const priceElement = document.createElement("p");
	priceElement.textContent = `${photographer.price} €/jour`;

	footerInfo.innerHTML = "";
	footerInfo.appendChild(likesElement);
	footerInfo.appendChild(priceElement);
}
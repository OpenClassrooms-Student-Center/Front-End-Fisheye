// Function Photographers
function photographerFactory(data) {
	const { id, name, portrait, city, country, tagline, price } = data;
	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
        
		const a = document.createElement("a");
		a.setAttribute("href",`photographer.html?id=${id}`);
		a.setAttribute ("title", `${name}`);
		
		const article = document.createElement( "article" );

		const img = document.createElement( "img" );
		img.setAttribute("src", picture);

		const h2 = document.createElement( "h2" );
		h2.textContent = name;

		const h3 = document.createElement( "h3" );
		h3.textContent = city + ", " + country;

		const h4 = document.createElement( "h4" );
		h4.textContent = tagline;

		const p = document.createElement( "p" );
		p.textContent = price + "€" + "/jour";
		
		a.appendChild(img);
		a.appendChild(h2);

		article.append(a , h3 , h4 , p);
		
		return (article);
	}
	return { name, picture, getUserCardDOM };
}
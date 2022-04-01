//Mettre le code JavaScript lié à la page photographer.html

function photographerFactory(data) {
	const { name, portrait, city, country, price, tagline, id } = data;

	const picture = `assets/photographers/${portrait}`;
	/*
	Sur la page index, affiche les infos sur tous les photographes
	*/
	function getUserCardDOM() {
		//création du a dans balise section avec href de base
		const tagPhotographerSection = document.querySelector(".photographer_section");
		const tagA = document.createElement("a");
		tagA.href = "photographer.html";
		tagPhotographerSection.appendChild(tagA);
		
		// création de l'article avec id dans la balise A
		const tagArticle = document.createElement( "article" );
		tagArticle.id = `article-${id}`;
		tagA.appendChild(tagArticle);
		
		//création des balises à mettre dans balise section
		const img = document.createElement( "img" );
		img.setAttribute("src", picture);
		img.setAttribute("alt", name );
		img.setAttribute("aria-label", name );

		const h2 = document.createElement( "h2" );
		h2.textContent = name;

		const tagCityCountry = document.createElement( "span" );
		tagCityCountry.innerHTML = city + ", "  + country;

		const tagPriceDay = document.createElement( "span");
		tagPriceDay.innerHTML = price + "€/jour";
		const pTagline = document.createElement( "p" );
		pTagline.innerHTML =  tagline;
		
		// ajout des balises dans la balise article
		tagArticle.appendChild(img);
		tagArticle.appendChild(h2);
		tagArticle.appendChild(tagCityCountry);
		tagArticle.appendChild(pTagline);
		tagArticle.appendChild(tagPriceDay);

		// au click sur l'article appel de la fonction qui affiche un photographe -> insertion de l'id dans l'url
		tagArticle.addEventListener("click", getOnePhotographer());

		return (tagA);

		function getOnePhotographer() {
			tagA.href += "?id=" + id;
		}
		
	}
	return { name, picture, city, country, price, tagline, getUserCardDOM };
}

/*
factory pour créer les balises de la galerie et injecter les éléments
*/
function displayPictureVideoFactory(item){
	//création et injection de toutes les balises communes aux vidéos et img
	const photographGalery = document.querySelector(".photograph-galery");
	
	const tagArticle = document.createElement("article");
	photographGalery.appendChild(tagArticle);

	const divContainerTitleLike = document.createElement("div");
	tagArticle.appendChild(divContainerTitleLike);
	divContainerTitleLike.className = "container-title-like";

	const tagTitle = document.createElement("p");
	divContainerTitleLike.appendChild(tagTitle);
	tagTitle.className = "title";
	
	tagTitle.innerHTML = item.title;
	tagTitle.setAttribute("tabindex", "0");

	const divContainerLike = document.createElement("div");
	divContainerTitleLike.appendChild(divContainerLike);
	divContainerLike.className = "container-like";

	const tagLikes = document.createElement("span");
	divContainerLike.appendChild(tagLikes);
	tagLikes.innerHTML = item.likes;
	// donne l'id = id à la balise du chiffre des likes
	tagLikes.id = `${item.id}`;
	tagLikes.setAttribute("tabindex","0");
	
	const like = document.createElement("i");
	divContainerLike.appendChild(like);
	like.className = "fas fa-heart";
	like.setAttribute("aria-label", `you like ${item.title}`);
	// donne l'id = like-id à la balise du coeur
	like.id = `like-${item.id}`;
	like.setAttribute("tabindex", "0");

	/*
	fonction qui créé une balise img + chemin dans src
	*/
	function createPicture(item) {
		const tagImg = document.createElement("img");
		tagArticle.prepend(tagImg); //après l'élément
		tagImg.src = `assets/images/${item.photographerId}/${item.image}`;
		tagImg.className = "media";
		tagImg.alt = item.alt;
		tagImg.setAttribute("tabindex", "0");
		tagImg.setAttribute("aria-label", `${item.title + " close up view"}`);
		tagImg.dataset.title = item.title;
	}
	/*
	fonction qui créé une balise img + chemin dans src
	*/
	function createVideo(item){
		const tagVideo = document.createElement("video");
		tagArticle.prepend(tagVideo); //après l'élémenet
		tagVideo.src = `assets/images/${item.photographerId}/${item.video}`;
		tagVideo.className = "media";
		tagVideo.setAttribute("alt", item.alt);
		tagVideo.setAttribute("tabindex", "0");
		tagVideo.setAttribute("aria-label", `${item.title + " close up view"}`);
		tagVideo.dataset.title = item.title;

	}
	return {createVideo, createPicture};
}
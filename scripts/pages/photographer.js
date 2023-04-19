//Mettre le code JavaScript lié à la page photographer.html
import { getPhotographers } from "./index.js";

const url = document.location.href;
const urlId = new URL(url);
const params = new URLSearchParams(urlId.search);
const paramsId = params.get("id");

async function getPhotographer() {
	const { photographers } = await getPhotographers();
	const photographer = photographers.find( ph => ph.id === Number(paramsId));

	return photographer;
}

//async function getMedia() {
//	const reponse = await fetch("data/photographers.json");
//	const data = await reponse.json();

//	return data.media;}

async function displayPhotographerHeader() {
	const photographer = await getPhotographer();
	const photographHeader = document.querySelector(".photograph-header");
	const { name, portrait, city, country, tagline, price } = photographer;

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

	const p = document.createElement( "p" );
	p.textContent = price + "€" + "/jour";
	
	const div = document.createElement( "div" );
    
	photographHeader.appendChild(img);
	div.appendChild(h2);
	div.appendChild(h3);
	div.appendChild(h4);
	div.appendChild(p);
	photographHeader.appendChild(div);
}

//async function displayMedia () {
//    const mediaContainer = document.querySelector("#main");
//    const media = await getMedia();}

async function init() {
	await displayPhotographerHeader();
}   

await init();




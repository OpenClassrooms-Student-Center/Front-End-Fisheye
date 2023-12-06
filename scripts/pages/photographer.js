
import DataObject from "./dataJson.js";


let params = new URL(document.location).searchParams;
let photographerID = params.get("id"); 

//getting photographer data
const Object= new DataObject;
console.log(Object.data);
// console.log(Object.data.photographers[0].name);


let photographer=await Object.getPhotographerById(photographerID);


// creating dom elements

//creating photographer section elements



const infoSection=document.createElement('section');

const Photographerimg=document.createElement('img');


//implementing photographer section elements

//implementing infosection





const NameH2 = document.createElement( 'h2' );
NameH2.setAttribute('class','name');
NameH2.textContent = `${photographer[0].name}`;

const localisationP=document.createElement('p');
localisationP.setAttribute('class','localisation');
localisationP.textContent=`${photographer[0].country}, ${photographer[0].city}`;

const tagP=document.createElement('p');
tagP.setAttribute('class','tag');
tagP.textContent=photographer[0].tagline;





infoSection.appendChild(NameH2);

infoSection.appendChild(localisationP);

infoSection.appendChild(tagP);




// implementing photographer section in the dom
const photographHeader=document.querySelector('.photographer');

//implementing infoSection
photographHeader.prepend(infoSection);

//implementing photo

const portraitImg = document.createElement( 'img' );
portraitImg.setAttribute("src", `assets/photographers/${photographer[0].portrait}`);
portraitImg.setAttribute(`alt`,`photo de ${name }`)
portraitImg.setAttribute('class','portrait')


// MEDIA SECTION

//getting media info
photographHeader.append(portraitImg);
const media=await Object.getMediaById(photographerID);
console.log(photographer[0].name);
console.log(media[0].image);

//creating media section
var mediaSection=document.getElementById('media');

media.forEach(media => {


    let mediaArticle=document.createElement('article');
let visualSection=document.createElement('section');
visualSection.setAttribute('class','visualSection');
let img=document.createElement('img');
img.setAttribute('src',`assets/media/${photographer[0].name.substr(0, photographer[0].name.indexOf(' '))}/${media.image}`)
img.setAttribute('alt',`${media.title}`);
img.setAttribute('class','mediaImg');
visualSection.appendChild(img);
let mediaDataSection=document.createElement('section');
mediaArticle.appendChild(visualSection);
mediaArticle.appendChild(mediaDataSection);
mediaSection.appendChild(mediaArticle);
});









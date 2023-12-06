
import DataObject from "./dataJson.js";


let params = new URL(document.location).searchParams;
let photographerID = params.get("id"); 

//getting photographer data
const Object= new DataObject;
console.log(Object.data);
console.log(Object.data.photographers[0].name);
let photographer=await Object.getPhotographerById(photographerID);


// creating dom elements

//creating photographer section elements



const infoSection=document.createElement('section');

const Photographerimg=document.createElement('img');


//implementing photographer section elements

//implementing infosection
const nameParagraph=document.createElement('p');
nameParagraph.setAttribute('class','name')
nameParagraph.textContent=`${photographer[0].name}`;

const placeParagraph=document.createElement('p');
placeParagraph.setAttribute('class','place')
placeParagraph.textContent=`${photographer[0].city}, ${photographer[0].country}`;

const tagParagraph=document.createElement('p');
tagParagraph.setAttribute('class','tag')
tagParagraph.textContent=`${photographer[0].tagline}`;

infoSection.appendChild(nameParagraph);
infoSection.appendChild(placeParagraph);
infoSection.appendChild(tagParagraph);





// implementing photographer section in the dom
const photographHeader=document.querySelector('.photograph-header');

//implementing infoSection
photographHeader.prepend(infoSection);

//implementing photo

const img = document.createElement( 'img' );
img.setAttribute("src", `assets/photographers/${photographer[0].portrait}`);
img.setAttribute(`alt`,`photo de ${photographer[0].name }`)
img.setAttribute('class','portrait');

photographHeader.append(img);
const media=await Object.getMediaById(photographerID);
console.log(media[0].title)










import { getData } from "../pages/dataJson.js";
import MediaTemplate from "../templates/mediaTemplate.js";

export default async function getCaroussel(PhotographerId){
const {photographers, media }= await getData();

const photographerMedia=media.filter( (media)=>media.photographerId==PhotographerId);
const photographer=photographers.filter((photographers)=>photographers.id==PhotographerId)


const carousselSection=document.getElementById("caroussel");
const carousselArticle=document.createElement("article");
carousselArticle.setAttribute('class','carousselArticle');

//CREATING RIGHT CAROUSSEL
const rightCaroussel=document.createElement('div');
//creating close button
const closeButton=document.createElement('button');
closeButton.setAttribute('class','fa-solid fa-chevron-right')
rightCaroussel.appendChild(closeButton);
//creating forward button
const forwardButton=document.createElement('button');
forwardButton.setAttribute('class','fa-solid fa-chevron-right')
rightCaroussel.appendChild(forwardButton);
//creqte pervious button
let carousselMediaArrey=[];
let carousselTitleArray=[];

//CREATING LEFT CAROUSSEL
const leftCaroussel=document.createElement('div');
//creating previous button
const previousButton=document.createElement('button');
previousButton.setAttribute('class','fa-solid fa-chevron-right')
//adding button
leftCaroussel.appendChild(previousButton);

photographerMedia.forEach((media) => {
    //creating caroussel Object


    //setting img if image
    if (media.image){
    let carousselMedia=document.createElement('img');
    carousselMedia.setAttribute('src',`assets/media/${photographer[0].name.substr(0, photographer[0].name.indexOf(' '))}/${media.image}`)
    carousselMedia.setAttribute('alt',`image ${media.title}`);
    carousselMedia.setAttribute("role","img");
    carousselMedia.setAttribute('class','carousselImg');
    carousselMedia.setAttribute('class','carousselMedia');
    //implementing img in article
    carousselMediaArrey.push(carousselMedia);
} else{
    //setting video if video
    let carousselMedia=document.createElement('video');
    carousselMedia.setAttribute('src',`assets/media/${photographer[0].name.substr(0, photographer[0].name.indexOf(' '))}/${media.video}`)
carousselMedia.setAttribute('alt',`video ${media.title}`);
carousselMedia.setAttribute('class','mediaVideo');
carousselMedia.setAttribute(`controls`,``);
//implementing video in article
carousselMediaArrey.push(carousselMedia);
        }
//setting title
    const carousselTitleP=document.createElement("p");   
    carousselTitleP.textContent=media.title; 
carousselTitleArray.push(carousselTitleP);
   


});
 
var selection=0;
carousselArticle.appendChild(carousselMediaArrey[selection]);
carousselArticle.appendChild(carousselTitleArray[selection]);
carousselArticle.appendChild(leftCaroussel);
carousselSection.appendChild(carousselArticle);
carousselSection.appendChild(rightCaroussel);

//creating eventListeners
forwardButton.addEventListener('click',function(){
    carousselArticle.removeChild(carousselMediaArrey[selection]);
    carousselArticle.removeChild(carousselTitleArray[selection]);
    selection++;
    carousselArticle.appendChild(carousselMediaArrey[selection]);
carousselArticle.appendChild(carousselTitleArray[selection]);

  });

previousButton.addEventListener('click',function(){
    carousselArticle.removeChild(carousselMediaArrey[selection]);
    selection--;

    carousselArticle.appendChild(carousselTitleArray[selection]);});

return (carousselArticle);
};




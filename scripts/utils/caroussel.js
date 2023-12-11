
import { getData } from "../pages/dataJson.js";
import MediaTemplate from "../templates/mediaTemplate.js";

export default async function getCaroussel(PhotographerId){
const {photographers, media }= await getData();

const photographerMedia=media.filter( (media)=>media.photographerId==PhotographerId);
const photographer=photographers.filter((photographers)=>photographers.id==PhotographerId)


const carousselSection=document.getElementById("caroussel");

photographerMedia.forEach((media) => {
    //creating article
    const carousselArticle=document.createElement('article');
    //setting img if image
    if (media.image){
    var carousselMedia=document.createElement('img');
    carousselMedia.setAttribute('src',`assets/media/${photographer[0].name.substr(0, photographer[0].name.indexOf(' '))}/${media.image}`)
    carousselMedia.setAttribute('alt',`image ${media.title}`);
    carousselMedia.setAttribute("role","img");
    carousselMedia.setAttribute('class','carousselImg');
    carousselMedia.setAttribute('class','carousselMedia');
    //implementing img in article
    carousselArticle.appendChild(carousselMedia);
} else{
    //setting video if video
    var carousselMedia=document.createElement('video');
    carousselMedia.setAttribute('src',`assets/media/${photographer[0].name.substr(0, photographer[0].name.indexOf(' '))}/${media.video}`)
carousselMedia.setAttribute('alt',`video ${media.title}`);
carousselMedia.setAttribute('class','mediaVideo');
carousselMedia.setAttribute(`controls`,``);
//implementing video in article
carousselArticle.appendChild(carousselMedia);
        }
//setting title
    const carousselTitleP=document.createElement("p");   
    carousselTitleP.textContent=media.title; 
    //implementing title in article
    carousselArticle.appendChild(carousselTitleP);
    //implementing article in dom
    carousselSection.appendChild(carousselArticle);
   


});
    
};




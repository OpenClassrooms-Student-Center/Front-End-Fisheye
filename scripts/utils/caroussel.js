
import { getData } from "../pages/dataJson.js";
import MediaTemplate from "../templates/mediaTemplate.js";

export default async function getCaroussel(PhotographerId){
const {photographers, media }= await getData();

const photographerMedia=media.filter( (media)=>media.photographerId==PhotographerId);
const photographer=photographers.filter((photographers)=>photographers.id==PhotographerId)


const carousselSection=document.getElementById("caroussel");
let carousselMediaArrey=[];
let carousselTitleArray=[];


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
 

const carousselObject= { media:carousselMediaArrey,  title:carousselTitleArray};
return carousselObject;
};




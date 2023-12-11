
import { getData } from "../pages/dataJson.js";
import MediaTemplate from "../templates/mediaTemplate.js";

export default async function getCaroussel(PhotographerId){
const {photographers, media }= await getData();

const photographerMedia=media.filter( (media)=>media.photographerId==PhotographerId);
const photographer=photographers.filter((photographers)=>photographers.id==PhotographerId)


const carousselArticle=document.createElement('article');

photographerMedia.forEach((media) => {
    if (media.image){
    const carousselImg=document.createElement('img');
    carousselImg.setAttribute('src',`assets/media/${photographer[0].name.substr(0, photographer[0].name.indexOf(' '))}/${media.image}`)
    carousselImg.setAttribute('alt',`image ${media.title}`);
    carousselImg.setAttribute("role","img");
    carousselImg.setAttribute('class','mediaImg');
} else{
    const carousselVideo=document.createElement('video');
        }
    const carousselTitleP=document.createElement("p");    
});
    
};




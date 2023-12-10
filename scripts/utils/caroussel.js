
import { getData } from "../pages/dataJson.js";
import MediaTemplate from "../templates/mediaTemplate.js";

export default async function getCaroussel(id){
const {photographers, media }= await getData();

const carousselArticle=await MediaTemplate(photographers,media);

const carousselSection=document.getElementById("caroussel");
carousselSection.appendChild(carousselArticle);

carousselSection.style.display="flex";
    
};




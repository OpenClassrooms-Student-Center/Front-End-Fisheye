
import { getData } from "../pages/dataJson.js";
import MediaTemplate from "../templates/mediaTemplate.js";

export default async function getCaroussel(id){
const {photographers, media }= await getData();

const carousselArticle=await MediaTemplate(photographers,media);


    
};




import carousel from "../../templates/carousel.js";
import photographerMedia  from "../../templates/photographerMedia.js";
// import { createElements, setAttributes, attachContent, addClasses, appendChilds  } from "../../templates/generic.js";


function MediaFactory(photographerName, media) {

    const { title, image, likes } = media

    function getUserMediaDOM(index) {

        let mediaArticle, carouselItem;
        if(media.hasOwnProperty('image')) {
            mediaArticle = photographerMedia.createImageHTML(photographerName, media)
            carouselItem = carousel.createImageHTML(photographerName, media, index)
        } else {
            mediaArticle = photographerMedia.createVideoHTML(photographerName, media)
            carouselItem = carousel.createVideoHTML(photographerName, media, index)
        }

        return { mediaArticle, carouselItem }
    }
    
    return { photographerName, media , getUserMediaDOM }
    
}

export default MediaFactory
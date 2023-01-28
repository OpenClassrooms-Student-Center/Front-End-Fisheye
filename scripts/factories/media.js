import photographerMedia  from "../../templates/photographerMedia.js";
// import { createElements, setAttributes, attachContent, addClasses, appendChilds  } from "../../templates/generic.js";


function MediaFactory(photographerName, media) {

    const { title, image, likes } = media

    // function getUserImageDOM() {

    //     const [mediaArticle, mediaLink, media, mediaInfos, mediaName, mediaLikes, mediaLikesNumber, mediaLikeIcon] = createElements('article', 'a', 'img', 'div', 'span', 'div', 'span', 'i')
        
    //     const listOfAttributes = photographerMedia.createAttributes(mediaLink, media, photographerName, image)
    //     setAttributes(listOfAttributes)

    //     const listOfContents = photographerMedia.createContent(mediaName, mediaLikesNumber, title, likes)
    //     attachContent(listOfContents)
    
    //     const listOfClasses = photographerMedia.createClasses(mediaArticle, mediaLink, media, mediaInfos, mediaName, mediaLikes, mediaLikesNumber, mediaLikeIcon)
    //     addClasses(listOfClasses)
        
    //     const listOfChilds = photographerMedia.createChilds(mediaArticle, mediaLink, media, mediaInfos, mediaName, mediaLikes, mediaLikesNumber, mediaLikeIcon)
    //     appendChilds(listOfChilds)
    
    //     return mediaArticle
    // }

    function getUserMediaDOM() {

        let mediaArticle;
        if(media.hasOwnProperty('image')) {
            mediaArticle = photographerMedia.createImageHTML(photographerName, media)
        } else {
            mediaArticle = photographerMedia.createVideoHTML(photographerName, media)
        }

        return mediaArticle
    }
    
    return { photographerName, media , getUserMediaDOM }
    
}

export default MediaFactory
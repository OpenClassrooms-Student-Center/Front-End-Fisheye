import photographersHome from "../../templates/photographersHome.js";
import generic from "../../templates/generic.js";

function photographerFactory(data) {

    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    
    function getUserCardDOM(profileScreen=false) {

        let userCardDOM;

        if(profileScreen) {
            userCardDOM = getUserCardProfileDOM()
        } else {
            userCardDOM = getUserCardHomeDOM()
        }

        return userCardDOM
    }
    
    function getUserCardHomeDOM() {

        const [article, profileLinkElement, imageElement, nameElement, presentationElement, locationElement, taglineElement, priceElement] = generic.createElements('article', 'a', 'img', 'h2', 'p', 'span', 'span', 'span')
    
        const listOfAttributes = photographersHome.createAttributes(id, name, picture, profileLinkElement, imageElement, nameElement, presentationElement, locationElement, taglineElement, priceElement)
        generic.setAttributes(listOfAttributes)
    
        const listOfContents = photographersHome.createContent(name, city, country, tagline, price, nameElement, locationElement, taglineElement, priceElement)
        generic.attachContent(listOfContents)
    
        const listOfClasses = photographersHome.createClasses(article, profileLinkElement, presentationElement, locationElement, taglineElement, priceElement)
        generic.addClasses(listOfClasses)
        
        const listOfChilds = photographersHome.createChilds(article, profileLinkElement, imageElement, nameElement, presentationElement, locationElement, taglineElement, priceElement)
        generic.appendChilds(listOfChilds)
    
        return (article);
    }


    function getUserCardProfileDOM() {
        
        const [photographerPresentationElement, photographerNameElement, photographerLocationElement, photogragrapherTaglineElement, photographerPictureElement] = createElements('div', 'h1', 'span', 'span', 'img')

        const listOfAttributes = createAttributesProfileHeader(photographerPictureElement)
        setAttributes(listOfAttributes)

        const listOfContents = createContent(photographerNameElement, photographerLocationElement, photogragrapherTaglineElement)
        attachContent(listOfContents)

        const listOfClasses = createClassesProfileHeader(photographerPresentationElement, photographerNameElement, photographerLocationElement, photogragrapherTaglineElement, photographerPictureElement)
        addClasses(listOfClasses)
        
        const listOfChilds = createChildsProfileHeader(photographerPresentationElement, photographerNameElement, photographerLocationElement, photogragrapherTaglineElement, photographerPictureElement)
        appendChilds(listOfChilds)

        return { photographerPresentationElement: photographerPresentationElement, photographerPictureElement: photographerPictureElement }
    }

    return { name, picture, getUserCardDOM }
}


function MediaFactory(photographerName, { id, photographerId, title, image, likes, date }) {

    function createElements(...args) {

        let listOfElements = []
        args.forEach(arg => listOfElements.push(document.createElement(arg)))

        return listOfElements
    }

    function createAttributesMedia(mediaLink, media) {

        const listOfAttributes = [
            {
                element: mediaLink,
                attributes: [['href', `#`]],
            },
            {
                element: media,
                attributes: [['src', `../../assets/Sample Photos/${photographerName}/${image}`]],
            }
        ] 
    
        return listOfAttributes
    }  
    

    function setAttributes([ ...args ]= []) {
        args.forEach(arg => arg.attributes.forEach(attribute => 
            arg.element.setAttribute(attribute[0], attribute[1])))
    }
    
    function createClassesMedia(mediaArticle, mediaLink, media, mediaInfos, mediaName, mediaLikes, mediaLikesNumber, mediaLikeIcon) {

        const listOfClasses = [

            {
                element: mediaArticle,
                classes: ["media__article"],
            },
            {
                element: mediaLink,
                classes: ["media__link"],
            },
            {
                element: media,
                classes: ["media__picture"],
            },
            {
                element: mediaInfos,
                classes: ["media__infos"],
            },
            {
                element: mediaName,
                classes: ["media__name"],
            },
            {
                element: mediaLikes,
                classes: ["media__likes"],
            },
            {
                element: mediaLikesNumber,
                classes: ["media__likes-number"],
            },
            {
                element: mediaLikeIcon,
                classes: ["fa-solid", "fa-heart", "like", "like--btn"],
            },
        ] 

        return listOfClasses
    }

    function createContentMedia(mediaName, mediaLikesNumber) {

        let listOfContents = [
            {
                element: mediaName,
                content: title,
            },
            {
                element: mediaLikesNumber,
                content: likes,
            },
        ]
    
        return listOfContents
        
    }


    function attachContent([ ...args ]) {
        args.forEach(arg => arg.element.textContent = arg.content)
    }

    function addClasses([ ...args ]) {
        args.forEach(arg => arg.classes.forEach(className => arg.element.classList.add(className)))
    }

    function createChildsMedia(mediaArticle, mediaLink, media, mediaInfos, mediaName, mediaLikes, mediaLikesNumber, mediaLikeIcon) {

        const listOfChilds = [

            {
                element: mediaLink,
                childs: [media],
            },
            {
                element: mediaLikes,
                childs: [mediaLikesNumber, mediaLikeIcon],
            },
            {
                element: mediaInfos,
                childs: [mediaName, mediaLikes],
            },
            {
                element: mediaArticle,
                childs: [mediaLink, mediaInfos],
            },
        ]

        return listOfChilds
    }

    function appendChilds([ ...args ]) {
        args.forEach(arg => arg.childs.forEach(child => arg.element.appendChild(child)))
    }

    function getUserImageDOM({ id, photographerId, title, image, likes, date }) {

        const [mediaArticle, mediaLink, media, mediaInfos, mediaName, mediaLikes, mediaLikesNumber, mediaLikeIcon] = createElements('article', 'a', 'img', 'div', 'span', 'div', 'span', 'i')
        
        const listOfAttributes = createAttributesMedia(mediaLink, media)
        setAttributes(listOfAttributes)

        const listOfContents = createContentMedia(mediaName, mediaLikesNumber)
        attachContent(listOfContents)
    
        const listOfClasses = createClassesMedia(mediaArticle, mediaLink, media, mediaInfos, mediaName, mediaLikes, mediaLikesNumber, mediaLikeIcon)
        addClasses(listOfClasses)
        
        const listOfChilds = createChildsMedia(mediaArticle, mediaLink, media, mediaInfos, mediaName, mediaLikes, mediaLikesNumber, mediaLikeIcon)
        appendChilds(listOfChilds)
    
        console.log(mediaArticle)
        return mediaArticle
    }

    function getUserMediaDOM(data) {

        let mediaArticle;
        if(data.hasOwnProperty('image')) {
            mediaArticle = getUserImageDOM(data)
        } else {
            mediaArticle = console.log('else')
        }

        return mediaArticle
    }
    
    return { getUserMediaDOM }
    
}

export default photographerFactory
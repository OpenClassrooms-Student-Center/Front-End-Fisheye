import photographersHome from "../../templates/photographersHome.js";
import photographerProfile from "../../templates/photographerProfile.js";
// import { createElements, setAttributes, attachContent, addClasses, appendChilds  } from "../../templates/generic.js";

function photographerFactory(data) {

    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    
    function getUserCardDOM(profileScreen=false) {

        let userCardDOM;

        if(profileScreen) {
            userCardDOM = photographerProfile.createHTML(name, city, country, tagline, picture)
        } else {
            userCardDOM = photographersHome.createHTML(id, name, city, country, tagline, price, picture)
        }

        return userCardDOM
    }
    
    // function getUserCardHomeDOM() {

    //     const [article, profileLinkElement, imageElement, nameElement, presentationElement, locationElement, taglineElement, priceElement] = createElements('article', 'a', 'img', 'h2', 'p', 'span', 'span', 'span')
    
    //     const listOfAttributes = photographersHome.createAttributes(id, name, picture, profileLinkElement, imageElement, nameElement, presentationElement, locationElement, taglineElement, priceElement)
    //     setAttributes(listOfAttributes)
    
    //     const listOfContents = photographersHome.createContent(name, city, country, tagline, price, nameElement, locationElement, taglineElement, priceElement)
    //     attachContent(listOfContents)
    
    //     const listOfClasses = photographersHome.createClasses(article, profileLinkElement, presentationElement, locationElement, taglineElement, priceElement)
    //     addClasses(listOfClasses)
        
    //     const listOfChilds = photographersHome.createChilds(article, profileLinkElement, imageElement, nameElement, presentationElement, locationElement, taglineElement, priceElement)
    //     appendChilds(listOfChilds)
    
    //     return (article);
    // }


    // function getUserCardProfileDOM() {
        
    //     const [photographerPresentationElement, photographerNameElement, photographerLocationElement, photogragrapherTaglineElement, photographerPictureElement] = createElements('div', 'h1', 'span', 'span', 'img')

    //     const listOfAttributes = photographerProfile.createAttributes(picture, photographerPictureElement)
    //     setAttributes(listOfAttributes)

    //     const listOfContents = photographerProfile.createContent(name, city, country, tagline, photographerNameElement, photographerLocationElement, photogragrapherTaglineElement)
    //     attachContent(listOfContents)

    //     const listOfClasses = photographerProfile.createClasses(photographerPresentationElement, photographerNameElement, photographerLocationElement, photogragrapherTaglineElement, photographerPictureElement)
    //     addClasses(listOfClasses)
        
    //     const listOfChilds = photographerProfile.createChilds(photographerPresentationElement, photographerNameElement, photographerLocationElement, photogragrapherTaglineElement, photographerPictureElement)
    //     appendChilds(listOfChilds)

    //     return { photographerPresentationElement: photographerPresentationElement, photographerPictureElement: photographerPictureElement }
    // }

    return { name, picture, getUserCardDOM }
}


export default photographerFactory
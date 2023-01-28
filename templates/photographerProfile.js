const photographerProfile = {

    createAttributes: function(picture, photographerPictureElement) {
    
        const listOfAttributes = [
            {
                element: photographerPictureElement,
                attributes: [["src", picture]]
            },
    
        ] 
    
        return listOfAttributes
    },
    
    
    createContent: function(name, city, country, tagline, nameElement, locationElement, taglineElement, priceElement=undefined) {
    
        let listOfContents = [
            {
                element: nameElement,
                content: name,
            },
            {
                element: locationElement,
                content: `${city}, ${country}`,
            },
            {
                element: taglineElement,
                content: tagline,
            },
        ]
    
        return listOfContents
        
    },
    
    
    createClasses: function(photographerPresentationElement, photographerNameElement, photographerLocationElement, photogragrapherTaglineElement, photographerPictureElement) {
    
        const listOfClasses = [
    
            {
                element: photographerPresentationElement,
                classes: ["presentation"],
            },
            {
                element: photographerNameElement,
                classes: ["presentation__name"],
            },
            {
                element: photographerLocationElement,
                classes: ["presentation__location"],
            },
            {
                element: photogragrapherTaglineElement,
                classes: ["presentation__tagline"],
            },
            {
                element: photographerPictureElement,
                classes: ["photograph-header__picture"],
            },
        ] 
    
        return listOfClasses
    },
    
    
    createChilds: function(photographerPresentationElement, photographerNameElement, photographerLocationElement, photogragrapherTaglineElement, photographerPictureElement) {
    
        const listOfChilds = [
            {
                element: photographerPresentationElement,
                childs: [photographerNameElement, photographerLocationElement, photogragrapherTaglineElement],
            },
        ]
    
        return listOfChilds
    }
}
    
export default photographerProfile
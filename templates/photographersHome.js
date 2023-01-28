
const photographerHome = {

    createContent: function(name, city, country, tagline, price, nameElement, locationElement, taglineElement, priceElement=undefined) {
    
        const listOfContents = [
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
            {
                element: priceElement,
                content: price + '€/jour',
            },
        ]
    
        return listOfContents
        
    },
    
    
    createAttributes: function(id, name, picture, profileLinkElement, imageElement, presentationElement, locationElement, taglineElement, priceElement) {
    
        const listOfAttributes = [
            {
                element: profileLinkElement,
                attributes: [['href', `./photographer.html?id=${id}`], ['aria-label', `Lien de redirection vers le profil du photographe ${name}`]],
            },
            {
                element: imageElement,
                attributes: [['src', picture], ['alt', name]],
            },
            {
                element: presentationElement,
                attributes: [["aria-label", `Paragraphe de présentation du photographe ${name}`]],
            },
            {
                element: locationElement,
                attributes: [["aria-label", `Location du photographe ${name}`]],
            },
            {
                element: taglineElement,
                attributes: [["aria-label", `Tagline du photographe ${name}`]],
            },
            {
                element: priceElement,
                attributes: [["aria-label", `Prix à la journée du photographe ${name}`]],
            },
    
        ] 
    
        return listOfAttributes
    },
    
    
    createClasses: function (article, profileLinkElement, presentationElement, locationElement, taglineElement, priceElement) {
    
        const listOfClasses = [
    
            {
                element: article,
                classes: ["photographer-view"],
            },
            {
                element: profileLinkElement,
                classes: ["photographer-view__link"],
            },
            {
                element: presentationElement,
                classes: ["photographer-view__presentation"],
            },
            {
                element: locationElement,
                classes: ["photographer-view__location"],
            },
            {
                element: taglineElement,
                classes: ["photographer-view__tagline"],
            },
            {
                element: priceElement,
                classes: ["photographer-view__price"],
            },
        ] 
    
        return listOfClasses
    },
    
    
    createChilds: function(article, profileLinkElement, imageElement, nameElement, presentationElement, locationElement, taglineElement, priceElement) {
    
        const listOfChilds = [
    
            {
                element: presentationElement,
                childs: [locationElement, taglineElement, priceElement],
            },
            {
                element: profileLinkElement,
                childs: [imageElement, nameElement],
            },
            {
                element: article,
                childs: [profileLinkElement, presentationElement],
            },
        ]
    
        return listOfChilds
    }
}


export default photographerHome
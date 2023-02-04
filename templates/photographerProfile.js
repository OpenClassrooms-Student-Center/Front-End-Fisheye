const photographerProfile = {

    // createAttributes: function(picture, photographerPictureElement) {
    
    //     const listOfAttributes = [
    //         {
    //             element: photographerPictureElement,
    //             attributes: [["src", picture]]
    //         },
    
    //     ] 
    
    //     return listOfAttributes
    // },
    
    
    // createContent: function(name, city, country, tagline, nameElement, locationElement, taglineElement, priceElement=undefined) {
    
    //     let listOfContents = [
    //         {
    //             element: nameElement,
    //             content: name,
    //         },
    //         {
    //             element: locationElement,
    //             content: `${city}, ${country}`,
    //         },
    //         {
    //             element: taglineElement,
    //             content: tagline,
    //         },
    //     ]
    
    //     return listOfContents
        
    // },
    
    
    // createClasses: function(photographerPresentationElement, photographerNameElement, photographerLocationElement, photogragrapherTaglineElement, photographerPictureElement) {
    
    //     const listOfClasses = [
    
    //         {
    //             element: photographerPresentationElement,
    //             classes: ["presentation"],
    //         },
    //         {
    //             element: photographerNameElement,
    //             classes: ["presentation__name"],
    //         },
    //         {
    //             element: photographerLocationElement,
    //             classes: ["presentation__location"],
    //         },
    //         {
    //             element: photogragrapherTaglineElement,
    //             classes: ["presentation__tagline"],
    //         },
    //         {
    //             element: photographerPictureElement,
    //             classes: ["photograph-header__picture"],
    //         },
    //     ] 
    
    //     return listOfClasses
    // },
    
    
    // createChilds: function(photographerPresentationElement, photographerNameElement, photographerLocationElement, photogragrapherTaglineElement, photographerPictureElement) {
    
    //     const listOfChilds = [
    //         {
    //             element: photographerPresentationElement,
    //             childs: [photographerNameElement, photographerLocationElement, photogragrapherTaglineElement],
    //         },
    //     ]
    
    //     return listOfChilds
    // }

    createHTML: function(name, city, country, tagline, picture) {

        const presentationElement = `

            <div class="presentation">
                <h1 class="presentation__name">${name}</h1>
                <p 
                    class="presentation__infos presentation__location"
                    aria-label="Location et tagline du photographe"
                >
                    <span>${city}, ${country}</span>
                    <span class="presentation__tagline"> ${tagline} </span>
                </p>
            </div>
        `

        const pictureElement = `          
            <img 
                src="${picture}" 
                class="photograph-header__picture"
                alt="${name}"
            >
        `

        return [presentationElement, pictureElement]
    }    
}
    





        


export default photographerProfile
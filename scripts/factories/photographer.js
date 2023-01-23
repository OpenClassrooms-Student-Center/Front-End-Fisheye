function photographerFactory(data, priceBasis) {

    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function createElements(...args) {

        let listOfElements = []
        args.forEach(arg => listOfElements.push(document.createElement(arg)))

        return listOfElements
    }
    
    function createAttributesForHome(profileLink, image, presentationParagraph, locationDiv, taglineDiv, priceDiv) {

        const listOfAttributes = [
            {
                element: profileLink,
                attributes: [['href', `./photographer.html?id=${id}`], ['aria-label', `Lien de redirection vers le profil du photographe ${name}`]],
            },
            {
                element: image,
                attributes: [['src', picture], ['alt', name]],
            },
            {
                element: presentationParagraph,
                attributes: ["aria-label", `Paragraphe de présentation du photographe ${name}`],
            },
            {
                element: locationDiv,
                attributes: ["aria-label", `Location du photographe ${name}`],
            },
            {
                element: taglineDiv,
                attributes: ["aria-label", `Tagline du photographe ${name}`],
            },
            {
                element: priceDiv,
                attributes: ["aria-label", `Prix à la journée du photographe ${name}`],
            },

        ] 

        return listOfAttributes
    }

    function setAttributes([ ...args ]= []) {
        args.forEach(arg => arg.attributes.forEach(attribute => 
            arg.element.setAttribute(attribute[0], attribute[1])))
    }

    function createContentForHome(photographerNameH2, locationDiv, taglineDiv, priceDiv) {

        const listOfContents = [
            {
                element: photographerNameH2,
                content: name,
            },
            {
                element: locationDiv,
                content: `${city}, ${country}`,
            },
            {
                element: taglineDiv,
                content: tagline,
            },
            {
                element: priceDiv,
                content: price + priceBasis,
            },
        ] 

        return listOfContents
    }

    function createContentForProfile(photographerNameH2, locationDiv, taglineDiv, priceDiv) {

        const listOfContents = [
            {
                element: photographerNameH2,
                content: name,
            },
            {
                element: locationDiv,
                content: `${city}, ${country}`,
            },
            {
                element: taglineDiv,
                content: tagline,
            },
            {
                element: priceDiv,
                content: price + priceBasis,
            },
        ] 

        return listOfContents
    }


    function attachContent([ ...args ]) {
        args.forEach(arg => arg.element.textContent = arg.content)
    }


    function createClassesHome(article, profileLink, presentationParagraph, locationDiv, taglineDiv, priceDiv) {

        const listOfClasses = [

            {
                element: article,
                classes: "photographer-view",
            },
            {
                element: profileLink,
                classes: "photographer-view__link",
            },
            {
                element: presentationParagraph,
                classes: "photographer-view__presentation",
            },
            {
                element: locationDiv,
                classes: "photographer-view__location",
            },
            {
                element: taglineDiv,
                classes: "photographer-view__tagline",
            },
            {
                element: priceDiv,
                classes: "photographer-view__price",
            },
        ] 

        return listOfClasses
    }

    function addClasses([ ...args ]) {
        args.forEach(arg => arg.element.classList.add(arg.classes))        
    }

    
    function createChildsHome(article, profileLink, image, photographerNameH2, presentationParagraph, locationDiv, taglineDiv, priceDiv) {

        const listOfChilds = [

            {
                element: presentationParagraph,
                childs: [locationDiv, taglineDiv, priceDiv],
            },
            {
                element: profileLink,
                childs: [image, photographerNameH2],
            },
            {
                element: article,
                childs: [profileLink, presentationParagraph],
            },
        ]

        return listOfChilds
    }


    function appendChilds([ ...args ]) {
        args.forEach(arg => arg.childs.forEach(child => arg.element.appendChild(child)))
    }
    
    function getUserCardDOM() {

        const [article, profileLink, image, photographerNameH2, presentationParagraph, locationDiv, taglineDiv, priceDiv] = createElements('article', 'a', 'img', 'h2', 'p', 'span', 'span', 'span')

        const listOfAttributes = createAttributesForHome(profileLink, image, photographerNameH2, presentationParagraph, locationDiv, taglineDiv, priceDiv)
        setAttributes(listOfAttributes)

        const listOfContents = createContentForHome(photographerNameH2, locationDiv, taglineDiv, priceDiv)
        attachContent(listOfContents)

        const listOfClasses = createClassesHome(article, profileLink, presentationParagraph, locationDiv, taglineDiv, priceDiv)
        addClasses(listOfClasses)
        
        const listOfChilds = createChildsHome(article, profileLink, image, photographerNameH2, presentationParagraph, locationDiv, taglineDiv, priceDiv)
        appendChilds(listOfChilds)

        return (article);
    }

    // function attachContentsProfile(photographer, photographerNameElement, photographerLocationElement, photogragrapherTaglineElement, photographerPictureElement) {

    //     photographerNameElement.textContent = 

    // }

    function getPhotographerProfileDom(photographer) {
        
        const photographerHeader = document.querySelector('.photograph-header')

        const [photographerPresentationElement, photographerNameElement, photographerLocationElement, photogragrapherTaglineElement, articleElement, photographerPictureElement] = createElements('div', 'h2', 'span', 'span', 'article', 'img')

        // const listOfAttributes = createAttributesForHome(profileLink, image, photographerNameH2, presentationParagraph, locationDiv, taglineDiv, priceDiv)
        // setAttributes(listOfAttributes)

        const listOfContents = createContentForProfile(photographerNameH2, locationDiv, taglineDiv, priceDiv)
        attachContent(listOfContents)

        const listOfClasses = createClassesHome(article, profileLink, presentationParagraph, locationDiv, taglineDiv, priceDiv)
        addClasses(listOfClasses)
        
        const listOfChilds = createChildsHome(article, profileLink, image, photographerNameH2, presentationParagraph, locationDiv, taglineDiv, priceDiv)
        appendChilds(listOfChilds)
                

        attachContentsProfile(photographer, photographerNameElement, photographerLocationElement, photogragrapherTaglineElement, photographerPictureElement)

        return data
    }

    return { name, picture, getUserCardDOM, getPhotographerProfileDom }
}
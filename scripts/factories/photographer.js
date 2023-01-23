function photographerFactory(data) {

    const { name, portrait, id, city, country, tagline, price } = data;

    const priceBasis = '€/jour';

    const picture = `assets/photographers/${portrait}`;

    function createElements(...args) {

        let listOfElements = []
        args.forEach(arg => listOfElements.push(document.createElement(arg)))

        return listOfElements
    }
    
    function createAttributesForHome(profileLinkElement, imageElement, presentationElement, locationElement, taglineElement, priceElement) {

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
                attributes: ["aria-label", `Paragraphe de présentation du photographe ${name}`],
            },
            {
                element: locationElement,
                attributes: ["aria-label", `Location du photographe ${name}`],
            },
            {
                element: taglineElement,
                attributes: ["aria-label", `Tagline du photographe ${name}`],
            },
            {
                element: priceElement,
                attributes: ["aria-label", `Prix à la journée du photographe ${name}`],
            },

        ] 

        return listOfAttributes
    }

    function setAttributes([ ...args ]= []) {
        args.forEach(arg => arg.attributes.forEach(attribute => 
            arg.element.setAttribute(attribute[0], attribute[1])))
    }

    function createContent(nameElement, locationElement, taglineElement, priceElement=undefined) {

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
        
        if(priceElement) {

            const priceContent = {
                element: priceElement,
                content: price + priceBasis,
            }

            listOfContents.push(priceContent)
        }

        return listOfContents
        
    }


    function attachContent([ ...args ]) {
        args.forEach(arg => arg.element.textContent = arg.content)
    }


    function createClassesHome(article, profileLinkElement, presentationElement, locationElement, taglineElement, priceElement) {

        const listOfClasses = [

            {
                element: article,
                classes: "photographer-view",
            },
            {
                element: profileLinkElement,
                classes: "photographer-view__link",
            },
            {
                element: presentationElement,
                classes: "photographer-view__presentation",
            },
            {
                element: locationElement,
                classes: "photographer-view__location",
            },
            {
                element: taglineElement,
                classes: "photographer-view__tagline",
            },
            {
                element: priceElement,
                classes: "photographer-view__price",
            },
        ] 

        return listOfClasses
    }

    function createClassesProfileHeader(presentationElement, nameElement, locationElement, taglineElement, imageElement) {

        const listOfClasses = [

            {
                element: presentationElement,
                classes: "presentation",
            },
            {
                element: nameElement,
                classes: "presentation__name",
            },
            {
                element: locationElement,
                classes: "presentation__location",
            },
            {
                element: taglineElement,
                classes: "presentation__tagline",
            },
            {
                element: imageElement,
                classes: "photograph-header__picture",
            },
        ] 

        return listOfClasses
    }

    function addClasses([ ...args ]) {
        args.forEach(arg => arg.element.classList.add(arg.classes))        
    }

    
    function createChildsHome(article, profileLinkElement, imageElement, nameElement, presentationElement, locationElement, taglineElement, priceElement) {

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

    function createChildsProfile(presentationElement, locationElement, taglineElement) {

        const listOfChilds = [
            {
                element: presentationElement,
                childs: [locationElement, taglineElement],
            },
        ]

        return listOfChilds
    }


    function appendChilds([ ...args ]) {
        args.forEach(arg => arg.childs.forEach(child => arg.element.appendChild(child)))
    }
    
    function getUserCardDOM(profileScreen=false) {

        if(profileScreen) {
            getUserCardHomeDOM()
        } else {
            getUserCardProfileDOM()
        }
    }
    
    function getUserCardHomeDOM() {

        const [article, profileLinkElement, imageElement, nameElement, presentationElement, locationElement, taglineElement, priceElement] = createElements('article', 'a', 'img', 'h2', 'p', 'span', 'span', 'span')
    
        const listOfAttributes = createAttributesForHome(profileLinkElement, imageElement, nameElement, presentationElement, locationElement, taglineElement, priceElement)
        setAttributes(listOfAttributes)
    
        const listOfContents = createContent(nameElement, locationElement, taglineElement, priceElement)
        attachContent(listOfContents)
    
        const listOfClasses = createClassesHome(article, profileLinkElement, presentationElement, locationElement, taglineElement, priceElement)
        addClasses(listOfClasses)
        
        const listOfChilds = createChildsHome(article, profileLinkElement, imageElement, nameElement, presentationElement, locationElement, taglineElement, priceElement)
        appendChilds(listOfChilds)
    
        return (article);
    }


    // function attachContentsProfile(photographer, photographerNameElement, photographerLocationElement, photogragrapherTaglineElement, photographerPictureElement) {

    //     photographerNameElement.textContent = 

    // }

    function getUserCardProfileDOM() {
        
        const [photographerPresentationElement, photographerNameElement, photographerLocationElement, photogragrapherTaglineElement, photographerPictureElement] = createElements('div', 'h2', 'span', 'span', 'img')

        // const listOfAttributes = createAttributesForHome(profileLinkElement, imageElement, nameElement, presentationElement, locationElement, taglineElement, priceElement)
        // setAttributes(listOfAttributes)

        const listOfContents = createContent(nameElement, locationElement, taglineElement)
        attachContent(listOfContents)

        const listOfClasses = createClassesHome(article, profileLinkElement, presentationElement, locationElement, taglineElement, priceElement)
        addClasses(listOfClasses)
        
        const listOfChilds = createChildsHome(article, profileLinkElement, imageElement, nameElement, presentationElement, locationElement, taglineElement, priceElement)
        appendChilds(listOfChilds)

        attachContentsProfile(photographer, photographerNameElement, photographerLocationElement, photogragrapherTaglineElement, photographerPictureElement)
console.log(photographerPresentationElement)
        return { photographerPresentationElement: photographerPresentationElement, photographerPictureElement: photographerPictureElement }
    }

    return { name, picture, getUserCardDOM }
}
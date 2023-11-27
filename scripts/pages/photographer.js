
function getIdFromUrl() {
    const idOfPhotographer = new URLSearchParams(window.location.search).get('id')
    return idOfPhotographer
}

async function getData() {
    const response = await fetch("/data/photographers.json")
    return await response.json()
}

async function loadPhotographerContent() {

    const { photographers } = await getData()
    const filteredPhotographer = photographers.find((photographer) => photographer.id == getIdFromUrl()) 

    const { name, city, country, tagline, price, portrait } = filteredPhotographer

    const photographHeader = document.querySelector(".photograph_header")
    const textContainer = document.querySelector(".text_container")
    textContainer.style.order = "-1"

    const nameOf = document.querySelector(".photographer_main_title")
    nameOf.textContent = name
    const cityOfCountryOf = document.querySelector(".city_of_country_of")
    const tagLineOf = document.querySelector(".photographer_tagline")

    const priceOf = document.createElement("p")
    priceOf.textContent = price

    const portraitOf = document.querySelector(".portrait_of_photographer")
    // refaire propremeent 
    portraitOf.setAttribute("src", `/assets/photographers/${name.replace(' ', '').replace('-', '')}.jpg`)
    portraitOf.setAttribute("alt", "portrait du photographe " + `${name}`)

    cityOfCountryOf.textContent = city + ', ' + country
    tagLineOf.textContent = tagline

    const imgWrapper = document.querySelector(".img_wrapper")

    photographHeader.appendChild(textContainer)
    photographHeader.appendChild(imgWrapper)
    textContainer.appendChild(nameOf)
    textContainer.appendChild(cityOfCountryOf)
    textContainer.appendChild(tagLineOf)
    imgWrapper.appendChild(portraitOf)

    loadMediaContent(price)
}

loadPhotographerContent()

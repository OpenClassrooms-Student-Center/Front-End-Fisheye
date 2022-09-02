// Function for build DOM
export function insertPictureInsideElement(element, picture, alt) {
    if (alt) {
        element.insertAdjacentHTML("beforeend", '<img src="' + picture + '" ' + 'alt="' + alt + '">');
    }
    else {
        element.insertAdjacentHTML("beforeend", '<img src="' + picture + '">');
    }
}

export function insertVideoInsideElement(element, video, ariaLabel) {

    if (ariaLabel) {
        element.insertAdjacentHTML("beforeend", '<video src="' + video + '" ' + 'aria-label="' + ariaLabel + '">');

    }
    else {
        element.insertAdjacentHTML("beforeend", '<video src="' + video + '">');
    }

}

export function insertHTMLAfterElement(element, html) {
    element.insertAdjacentHTML("afterend", html);
}

export function buildElement(balise, value) {
    // Create balise
    const element = document.createElement(balise);

    // Set Attribute or TextContened depend of balise
    switch (balise) {
        case "a":
            element.setAttribute("href", value);
            break;
        case "img":
            element.setAttribute("src", value);
            break;
        default:
            element.textContent = value;
    }
    return element;
}


export function setArialLabel(element, arialabel) {
    element.setAttribute("aria-label", arialabel);
}

export function setInnerHtml(querySelector, texte) {
    const texteElement = document.querySelector(querySelector);
    texteElement.innerHTML = texte;
}
// End Function for build DOM
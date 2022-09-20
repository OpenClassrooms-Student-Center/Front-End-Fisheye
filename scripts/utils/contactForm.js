function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "flex";
    document.documentElement.style.overflow = 'hidden';
    modal.setAttribute('aria-hidden', 'false');
    document.getElementById("first").focus();
    document.getElementById("main").setAttribute('aria-hidden', 'true');
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.documentElement.style.overflow = 'visible';
    modal.setAttribute('aria-hidden', 'true');
    document.getElementById("main").setAttribute('aria-hidden', 'false');
    document.getElementById("button_contact").focus();
}

/**
 * Check that the text is made up of letters and contains at least 2 characters.
 * @param {*} name 
 * @returns false if it is correct
 */
function validateNames(name) {
    if (!name.match(/^([a-zA-Z ]+)$/) || name.length < 2) {
        return true;
    }
    return false;
}

/**
 * Add the css to the input in case of error.
 * @param {*} items 
 * @param {*} erreurText 
 */
function addCssError(items, erreurId, erreurText) {
    items.setAttribute("style", "border: solid 3px red;");
    document.getElementById(erreurId).innerHTML = erreurText;
}

/**
 * Reset the css if a box is filled in correctly.
 * @param {*} items 
 * @param {string} erreurId 
 */
function resetCssError(items, erreurId) {
    items.setAttribute("style", "border: none;");
    document.getElementById(erreurId).innerHTML = "";
}

/**
 * Returns user input errors.
 * @returns return a string containing the error
*/
function validate(e) {
    e.preventDefault();
    let inputs = document.getElementsByClassName("text-control");
    let erreur = true;

    if (validateNames(inputs[0].value)) {
        erreur = false;
        addCssError(inputs[0], "erreur", "Veillez remplir le formulaire correctement !");
    } else {
        resetCssError(inputs[0], "erreur");
    }

    if (validateNames(inputs[1].value)) {
        erreur = false;
        addCssError(inputs[1], "erreur", "Veillez remplir le formulaire correctement !");
    } else {
        resetCssError(inputs[1], "erreur");
    }

    let regexEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    let emailValidate = inputs[2].value.match(regexEmail);
    if (!emailValidate) {
        erreur = false;
        addCssError(inputs[2], "erreur", "Veillez remplir le formulaire correctement !");
    } else {
        resetCssError(inputs[2], "erreur");
    }

    if (!inputs[3].value) {
        erreur = false;
        addCssError(inputs[3], "erreur", "Veillez remplir le formulaire correctement !");
    } else {
        resetCssError(inputs[3], "erreur");
    }

    if (erreur === true) {
        for (let i = 0; i < inputs.length; i++) {
            console.log(inputs[i].value);

        }
        let form = document.getElementById("reserve");
        form.reset();
        closeModal();
    }

    return erreur;
}

document.addEventListener('keydown', (event) => {
    const nomTouche = event.key;
     if ((nomTouche === 'Escape')){
        closeModal();
    }
});

export {displayModal, closeModal, validate};
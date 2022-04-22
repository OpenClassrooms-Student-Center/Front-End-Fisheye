/**
 * Cette fonction active/désactive la navigation au clavier pour les éléments a et button 
 * dont un des parents n'a pas le selecteur selector
 * @param {*} selector 
 * @param {*} flag : true: active la navigation
 */
function SetAccessLinksAndButtonsNotInModale(selector,flag){
    const listEl = document.querySelectorAll(":not("+selector+") a, :not("+selector+") button")
    listEl.forEach(el => {
        switch(flag){
            case true:
                el.removeAttribute("tabindex")
                break;
            case false:
                el.setAttribute("tabindex","-1")
                break;
        }
    })
}

/**
 * rend opaque ou non les autres éléments suivant que la modale de contact est ouverte
 * @param {*} flag
 */
function SetDivOpacityIfModaleToAriaHidden(flag=false){

    const header = document.querySelector(".header-logo")
    header.setAttribute("aria-hidden",(flag)?"true":"false")
    header.classList.toggle("opacity")
    
    const notModale = document.querySelector(".opacity-if-modale")
    notModale.setAttribute("aria-hidden",(flag)?"true":"false")
    notModale.classList.toggle("opacity")

    SetAccessLinksAndButtonsNotInModale("#contact_modal",!flag)
}

/**
 * DisplayModal() est appelé directement depuis le HTML
 */
function displayModal() {
    SetDivOpacityIfModaleToAriaHidden(true)
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    document.getElementById("btn-close-form").focus()
}

/**
 * Clos la modale de contact 
 * en cas de return, si on a le focus sur le bouton close
 */
function closeModal() {
    SetDivOpacityIfModaleToAriaHidden(false)
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.querySelector(".contact_button").focus()
}

/**
 * 
 * @param {*} inputs : clear des champs du formulaire à la fermeture de la modale
 */
function clearInputFields(inputs){
    inputs.forEach(input => {
        input.value = ''
    })
}

/**
 * le onsubmit du formulaire
 */
function contactEventControl() {
    document.querySelector('form').addEventListener('submit',e => {
        const inputTexts = document.querySelectorAll('.text-control')
        inputTexts.forEach(textEl => {
            // Ca semble demandé pour le rendu, mais pas sûr
            console.log(textEl.id+":"+textEl.value)
        })
        e.preventDefault();
        closeModal()
        clearInputFields(inputTexts)
    })
}

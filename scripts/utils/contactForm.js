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

function SetDivOpacityIfModaleToAriaHidden(flag=false){

    const header = document.querySelector(".header-logo")
    header.setAttribute("aria-hidden",(flag)?"true":"false")
    header.classList.toggle("opacity")
    
    const notModale = document.querySelector(".opacity-if-modale")
    notModale.setAttribute("aria-hidden",(flag)?"true":"false")
    notModale.classList.toggle("opacity")

    SetAccessLinksAndButtonsNotInModale("#contact_modal",!flag)
}
function displayModal() {
    SetDivOpacityIfModaleToAriaHidden(true)
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    document.getElementById("btn-close-form").focus()
}

function closeModal() {
    SetDivOpacityIfModaleToAriaHidden(false)
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.querySelector(".contact_button").focus()
}

function clearInputFields(inputs){
    inputs.forEach(input => {
        input.value = ''
    })
}
function contactEventControl()
{
    document.querySelector('form').addEventListener('submit',e => {
        const inputTexts = document.querySelectorAll('.text-control')
        inputTexts.forEach(textEl => {
            console.log(textEl.id+":"+textEl.value)

        })
        e.preventDefault();
        closeModal()
        clearInputFields(inputTexts)
        })
}
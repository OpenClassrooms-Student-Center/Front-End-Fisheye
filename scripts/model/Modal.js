export default class Modal {
    constructor(data) {
        this._name =  data
    }
    
    get name(){
        return this._name
    }

    displayModal() {
        const modal = document.getElementById("contact_modal");
        modal.style.display = "flex";
        modal.ariaHidden = "false"
        const form = modal.querySelector("form")
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            const inputs = form.querySelectorAll(".text")
            inputs.forEach((input) => {
                console.log(input.value)
            })
            closeModal()
        })
        document.addEventListener("keydown", (e) => {
            if (modal.ariaHidden === "false" && e.keyCode === 27) 
            closeModal()
        })
        
    }
    closeModal() {
        const modal = document.getElementById("contact_modal");
        modal.ariaHidden = "true"
        modal.style.display = "none";

    }
}
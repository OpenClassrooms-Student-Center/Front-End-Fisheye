//export class ModalsContainer {
//constructor(data) {
//  this.data = data
//}

//  // Creates a modal container ready to use and containing a closing button
//  createModalContainer(modalName, event) {
//    console.log(event.target)
//    const backgroundElements = document.querySelectorAll("header, main")
//    this.createBackgroundOverlay(backgroundElements)
//    const wrapper = document.querySelector("body")
//    const modalContainer = document.createElement("section")
//    modalContainer.classList = `modal-container ${modalName}`
//    modalContainer.setAttribute("aria-modal", true)
//    modalContainer.setAttribute("role", "dialog")
//    modalContainer.innerHTML = `<button class="modal_close-button" aria-label="Close dialog" tabindex="0">X</button>`
//    if (event.target.id == "profile_contact-button") {
//      modalContainer.innerHTML += `<h2>Contactez-moi <br>${this.data}</h2>`
//    }
//    wrapper.appendChild(modalContainer)

//    modalContainer.addEventListener("click", (event) => {
//      if (event.target.classList == "modal_close-button") {
//        console.log(document.activeElement)
//        this.closeModalEvent(backgroundElements)
//      }
//    })
//    document.querySelector("body").addEventListener("keydown", (event) => {
//      if (event.key == "Escape" && document.querySelector(".modal-container")) {
//        this.closeModalEvent(backgroundElements)
//      }
//    })
//    return modalContainer
//  }

//  // When closing modal event is triggered, removes the modal and display again the hidden elements
//  closeModalEvent(backgroundElements) {
//    document.querySelector(".modal-container").remove()
//    for (let el of backgroundElements) {
//      el.removeAttribute("inert")
//      el.classList.remove("modal-background-faded")
//      el.classList.remove("modal-background-hidden")
//      el.removeAttribute("aria-hidden")
//    }
//  }

//  createBackgroundOverlay(backgroundElements) {
//    for (let el of backgroundElements) {
//      el.setAttribute("inert", true)
//      el.setAttribute("aria-hidden", true)
//      if (event.target.id == "profile_contact-button") {
//        el.classList.add("modal-background-faded")
//      } else {
//        el.classList.add("modal-background-hidden")
//      }
//    }
//  }
//}

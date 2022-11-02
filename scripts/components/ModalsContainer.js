export class ModalsContainer {
  // Creates a modal container ready to use and containing a closing button
  static createModalContainer(modalName) {
    const wrapper = document.querySelector("body")
    const modalContainer = document.createElement("div")
    modalContainer.classList = `modal-container ${modalName}`
    wrapper.appendChild(modalContainer)
    const backgroundElements = document.querySelectorAll("header, main")
    for (let el of backgroundElements) {
      el.style = "display:none"
    }
    modalContainer.innerHTML = `<button class="modal_close-button" aria-label="Close dialog" tabindex="0">X</button>`
    this.addCloseModalListener(modalContainer)
    return modalContainer
  }

  // Adds event listeners to the close button of the modal container.
  static addCloseModalListener(modalContainer) {
    modalContainer.addEventListener("click", (event) => {
      if (event.target.classList == "modal_close-button") {
        this.closeModalEvent()
      }
    })
    document.querySelector("body").addEventListener("keydown", (event) => {
      if (event.key == "Escape" && document.querySelector(".modal-container")) {
        this.closeModalEvent()
      }
    })
  }

  // When closing modal button is pressed, removes the modal and display again the hidden elements
  static closeModalEvent() {
    document.querySelector(".modal-container").remove()
    const backgroundElements = document.querySelectorAll("header, main")
    for (let el of backgroundElements) {
      el.style = "display:block"
    }
  }
}

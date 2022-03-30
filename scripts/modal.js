"use strict";
export default class Modal {
  manageModal(data) {
    const modalBtn = document.getElementById("btn-contact");
    const closeBtn = document.getElementsByClassName("close-form-icon");

    if (modalBtn) {
      modalBtn.addEventListener("click", this.launchModal.bind(this));
      this.displayPhName(data);
    }
    if (closeBtn) {
      closeBtn[0].addEventListener("click", this.closeModal);
    }
  }
  // Ouverture modale
  launchModal() {
    const modalbg = document.getElementById("container");

    modalbg.style.display = "flex";
    document.addEventListener("keyup", this.tabPressed.bind(this));
    this.formInputs = [];
    modalbg.querySelectorAll("input").forEach((input) => {
      this.formInputs.push(input.id);
    });
    modalbg.querySelectorAll("textarea").forEach((input) => {
      this.formInputs.push(input.id);
    });
    modalbg.querySelectorAll("button").forEach((input) => {
      this.formInputs.push(input.id);
    });
    document.getElementById("close-btn").focus();
  }
  // Fermeture modale
  closeModal() {
    document.removeEventListener("keyup", this.tabPressed);
    let modalbg = document.getElementById("container");

    modalbg.style.display = "none";
  }
  // Affichage nom du photographe dans formulaire
  displayPhName(data) {
    let id = window.location.search.split("id=")[1];
    let photographers = !id
      ? data
      : data.filter((photographer) => photographer.id == id);
    let phName = document.getElementById("ph-form-name");
    let phNameTemplate = `${photographers[0].name}`;
    phName.innerHTML = phNameTemplate;
  }

  tabPressed(event) {
    if (event.keyCode !== 9) return;
    console.log(this, this.formInputs, document.activeElement.id);
    if (this.formInputs.indexOf(document.activeElement.id) === -1)
      document.getElementById("close-btn").focus();
  }
}

import { checkUserInputs } from "./FormHelper/index.js";

export class Form {
  constructor(photographer) {
    const photographerName = photographer.name;
    this.modalForm = document.getElementById("contact-modal");
    this.closeButton = document.querySelector(".close-form");

    this.openForm = document.querySelector(".open-form");
    this.submit = document.querySelector(".submit");
    this.openForm.addEventListener("click", () => {
      this.beforeElementFocus = document.activeElement;
      this.displayModal(photographerName);
    });
    this.manageEvent();
    this.keyboardNav();
  }

  displayModal(photographerName) {
    const formH2 = document.querySelector(".header-modal h2");
    formH2.innerHTML = "Contactez-moi<br>" + photographerName;
    this.modalForm.style.display = "flex";

    // Hide background page of focus
    Array.from(document.body.children).forEach((child) => {
      if (child !== this.modalForm) {
        child.inert = true;
      }
    });
    this.modalForm.querySelector(".modal").focus();
  }

  // submitData() {
  //   const inputs = document.querySelectorAll("#first, #last, #email, #message");
  //   let userMessage = [];
  //   console.log("inputs == ", inputs);
  //   inputs.forEach((input) => {
  //     console.log("input", input.values);
  //     userMessage.push(input.values);
  //   });
  //   const textarea = document.querySelector("form textarea").values;
  //   userMessage.push(textarea);
  //   userMessage.forEach((data) => {
  //     console.log(data);
  //   });
  // }

  /**
   * Close the modal dialog event handler
   */
  manageEvent() {
    this.closeButton.addEventListener("click", () => {
      this.closeModal();
    });
    this.submit.addEventListener("click", (e) => {
      // e.stopImmediatePropagation();
      // e.preventDefault();
      // this.submitData();
      const isValidFormData = checkUserInputs();
      if (isValidFormData.isValid) {
        console.log(isValidFormData.data);
        this.closeModal();

  }

  /**
   * Close the modal keyboard
   */
  keyboardNav() {
    this.modalForm.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && this.submit.contains(document.activeElement)) {
        e.preventDefault();
        this.closeButton.setAttribute("tabindex", "0");
        this.closeButton.focus();
      }
      if (
        e.key === "Escape" ||
        (e.key === " " && this.closeButton.contains(document.activeElement)) ||
        (e.key === " " && this.submit.contains(document.activeElement))
      ) {
        e.preventDefault();
        this.closeModal(this.beforeElementFocus);
      }
    });
  }

  closeModal(beforeElementFocus) {
    this.modalForm.style.display = "none";
    this.closeButton.setAttribute("tabindex", "-1");

    // Make the page focusable again
    Array.from(document.body.children).forEach((child) => {
      if (child !== this.modalForm) {
        child.inert = false;
      }
    });
    if (beforeElementFocus != undefined) {
      beforeElementFocus.focus();
    }
  }
}

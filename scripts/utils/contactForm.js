export class Form {
  constructor(photographer) {
    const photographerName = photographer.name;
    this.form = document.getElementById("contact-modal");
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
    const formh2 = document.querySelector(".header-modal h2");
    formh2.innerHTML = "Contactez-moi<br>" + photographerName;
    this.form.style.display = "flex";

    // Hide background page of focus
    Array.from(document.body.children).forEach((child) => {
      if (child !== this.form) {
        child.inert = true;
      }
    });
    this.form.querySelector(".modal").focus();
  }
  manageEvent() {
    this.closeButton.addEventListener("click", () => {
      this.closeModal();
    });
    this.submit.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      e.preventDefault();
      this.submitData();
      this.closeModal();
    });
  }
  keyboardNav() {
    this.form.addEventListener("keydown", (e) => {
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
  submitData() {
    const inputs = document.querySelectorAll("form input");
    const userMessage = [];
    inputs.forEach((input) => {
      console.log("user input ", input.value);
      userMessage.push(input.value);
    });
    const textarea = document.querySelector("form textarea").value;
    userMessage.push(textarea);
    userMessage.forEach((data) => {
      console.log(data);
    });
  }
  closeModal(beforeElementFocus) {
    this.form.style.display = "none";
    this.closeButton.setAttribute("tabindex", "-1");

    // Make the page focusable again
    Array.from(document.body.children).forEach((child) => {
      if (child !== this.form) {
        child.inert = false;
      }
    });
    if (beforeElementFocus != undefined) {
      beforeElementFocus.focus();
    }
  }
}

export default class contactForm {
  displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");

    const utilisateur = document.getElementById("prenomUtilisateur");
    modal.focus();
  }

  closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    body.setAttribute("aria-hidden", "false");
  }

  validModal() {
    // preventing default submit
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.closeModal();

      // capting data
      const body = document.querySelector("body");
      const inputPrenom = document.getElementById("inputPrenom");
      const inputNom = document.getElementById("inputNom");
      const inputEmail = document.getElementById(`inputEmail`);
      const inputMessage = document.getElementById(`inputMessage`);

      // eslint-disable-next-line no-console
      console.log(
        `Prenom: ${inputPrenom.value}\n` +
          `Nom: ${inputNom.value}\n` +
          `Email: ${inputEmail.value}\n` +
          `Message: ${inputMessage.value}`,
      );
      // hidding modal
      const modal = document.getElementById("contact_modal");
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");

      form.reset();
    });
  }
}

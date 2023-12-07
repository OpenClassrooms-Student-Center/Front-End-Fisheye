export default class contactForm{

 displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
}
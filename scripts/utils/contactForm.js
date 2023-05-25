function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    const html = document.querySelector("html");
    html.style.overflowY = "hidden";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    const html = document.querySelector("html");
    html.style.overflowY = "visible";
}

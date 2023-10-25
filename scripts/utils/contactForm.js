function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    modal.firstElementChild.children[1].style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    if (modal.firstElementChild.childElementCount >= 3) modal.firstElementChild.lastElementChild.remove();
    modal.style.display = "none";
}

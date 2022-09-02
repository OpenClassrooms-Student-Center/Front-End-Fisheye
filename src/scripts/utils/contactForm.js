export function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    centerModal(modal);

}

export function centerModal(modal) {
    let Mwidth = modal.offsetWidth;
    let Mheight = modal.offsetHeight;
    let Wwidth = window.innerWidth;
    let Wheight = window.innerHeight;

    modal.style.position = "absolute";
    modal.style.top = ((Wheight - Mheight) / 2 + window.pageYOffset) + "px";
    modal.style.left = ((Wwidth - Mwidth) / 2 + window.pageXOffset) + "px";
}

export function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


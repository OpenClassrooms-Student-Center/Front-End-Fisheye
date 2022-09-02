
export function modalMaster(bodyTag, mainTag, modalID) {


    /** CREATE A OBJECT WITH ALL PROPRIETY FOR MODEL DOM NEED */
    let modalPage = {
        bodyHTML: bodyTag,
        mainHTML: mainTag,
        modal: modalID,
        visible: 0,
    }

    modalPage = getDomPropriety(modalPage);
    /** END  */

    function addContactFormListener() {
        const modal = modelPage.modal;
        document.getElementById("openModal").addEventListener("click", function () {
            modal.displayModal();
        });
        document.getElementById("closeModal").addEventListener("click", function () {
            modal.closeModal();
        });

    }
    function getDomPropriety(object) {
        object.bodyHTML = document.querySelector(modalPage.bodyHTML); // We target the body HTML tag
        object.mainHTML = document.querySelector(modalPage.mainHTML); // We target our main HTML tag
        object.modal = document.getElementById(modalPage.modal); // We target our modal

        return modalPage; // We return new propriety for our object modalPage 
    }

    function centerModal(modal) {
        let Mwidth = modal.offsetWidth;
        let Mheight = modal.offsetHeight;
        let Wwidth = window.innerWidth;
        let Wheight = window.innerHeight;

        modal.style.position = "absolute";
        modal.style.top = ((Wheight - Mheight) / 2 + window.pageYOffset) + "px";
        modal.style.left = ((Wwidth - Mwidth) / 2 + window.pageXOffset) + "px";
    }

    function effectAnimation(hideclass, showclass) {
        if (modalPage.visible === 0) {
            modalPage.mainHTML.classList.remove(showclass);
            modalPage.modal.classList.remove(hideclass);

            modalPage.mainHTML.classList.add(hideclass);
            modalPage.modal.classList.add(showclass);

            modalPage.visible = 1
        }
        else {
            modalPage.modal.classList.remove(showclass);
            modalPage.mainHTML.classList.remove(hideclass);

            modalPage.modal.classList.add(hideclass);
            modalPage.mainHTML.classList.add(showclass);

            modalPage.visible = 0
        }
        return modalPage;
    }

    function displayModal() {
        effectAnimation("hide_content", "show_content");
        modalPage.bodyHTML.style.overflow = "hidden"; // Block Scroll
        modalPage.modal.style.display = "block"; // Display the Modal at the screen
        centerModal(modalPage.modal); // Center the Modal at the screen
    }

    function closeModal() {
        effectAnimation("hide_content", "show_content");
        modalPage.bodyHTML.style.overflow = "visible"; // Allow scroll 
        modalPage.modal.style.display = "none"; // Hide at the screen modal
    }

    function sendMessage() {

    }
    return { modalPage, addContactFormListener, displayModal, closeModal, sendMessage }
}
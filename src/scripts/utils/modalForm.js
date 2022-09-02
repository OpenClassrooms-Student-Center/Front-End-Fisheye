export function modalMaster(bodyTag, mainTag, modalID) {


    /** CREATE A OBJECT WITH ALL PROPRIETY FOR MODEL DOM NEED */
    let modalPage = {
        bodyHTML: document.querySelector(bodyTag),
        mainHTML: document.querySelector(mainTag),
        modalHTML: document.getElementById(modalID),
        modal: modalID,
        visible: 0,
    }
    /** END  */

    function addContactFormListener(modalPage) {
        document.getElementById("openModal").addEventListener("click", function () {
            displayModal(modalPage);
        });
        document.getElementById("closeModal").addEventListener("click", function () {
            closeModal(modalPage);
        });

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

    function effectAnimation(hideclass, showclass, modalPage) {
        if (modalPage.visible === 0) {
            modalPage.mainHTML.classList.remove(showclass);
            modalPage.modalHTML.classList.remove(hideclass);

            modalPage.mainHTML.classList.add(hideclass);
            modalPage.modalHTML.classList.add(showclass);

            modalPage.visible = 1
        }
        else {
            modalPage.modalHTML.classList.remove(showclass);
            modalPage.mainHTML.classList.remove(hideclass);

            modalPage.modalHTML.classList.add(hideclass);
            modalPage.mainHTML.classList.add(showclass);

            modalPage.visible = 0
        }
        return modalPage;
    }

    function displayModal(modalPage) {
        effectAnimation("hide_content", "show_content", modalPage);
        modalPage.bodyHTML.style.overflow = "hidden"; // Block Scroll
        modalPage.modalHTML.style.display = "block"; // Display the Modal at the screen
        centerModal(modalPage.modalHTML); // Center the Modal at the screen
    }

    function closeModal(modalPage) {
        effectAnimation("hide_content", "show_content", modalPage);
        modalPage.bodyHTML.style.overflow = "visible"; // Allow scroll 
        modalPage.modalHTML.style.display = "none"; // Hide at the screen modal
    }

    function sendMessage() {

    }


    return { modalPage, addContactFormListener, displayModal, closeModal, sendMessage }
}
import { setInnerHtml } from '../utils/dom';

export function modalMaster(bodyTag, headerTag, mainTag, modalID) {


    /** CREATE A OBJECT WITH ALL PROPRIETY FOR MODEL DOM NEED */
    let modalPage = {
        bodyHTML: document.querySelector(bodyTag),
        headerHTML: document.querySelector(headerTag),
        mainHTML: document.querySelector(mainTag),
        modalHTML: document.getElementById(modalID),
        modalID: modalID,
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
        document.getElementById("contact_button").addEventListener("click", function () {
            event.preventDefault();
            sendMessage(modalPage);
        });


        // This add listener for Escape Touch Keyboard
        document.onkeydown = function (evt) {
            evt = evt || window.event;
            if (evt.keyCode == 27) {
                closeModal(modalPage);
            }
        };
    }


    function setTitleModal(modalPage, tagHTML, titleModal) {
        return setInnerHtml("#" + modalPage.modalID + " " + tagHTML, titleModal);
    }


    function centerModal(modalID) {
        let Mwidth = modalID.offsetWidth;
        let Mheight = modalID.offsetHeight;
        let Wwidth = window.innerWidth;
        let Wheight = window.innerHeight;

        modalID.style.position = "absolute";
        modalID.style.top = ((Wheight - Mheight) / 2 + window.pageYOffset) + "px";
        modalID.style.left = ((Wwidth - Mwidth) / 2 + window.pageXOffset) + "px";
    }

    function effectAnimation(hideclass, showclass, modalPage) {
        if (modalPage.visible === 0) {
            modalPage.mainHTML.classList.remove(showclass);
            modalPage.headerHTML.classList.remove(showclass);
            modalPage.modalHTML.classList.remove(hideclass);

            modalPage.mainHTML.classList.add(hideclass);
            modalPage.headerHTML.classList.add(hideclass);
            modalPage.modalHTML.classList.add(showclass);

            modalPage.visible = 1
        }
        else {
            modalPage.modalHTML.classList.remove(showclass);
            modalPage.mainHTML.classList.remove(hideclass);
            modalPage.headerHTML.classList.remove(hideclass);

            modalPage.modalHTML.classList.add(hideclass);
            modalPage.mainHTML.classList.add(showclass);
            modalPage.headerHTML.classList.add(showclass);

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

    function sendMessage(modalPage) {

        const allInputs = document.querySelectorAll("#" + modalPage.modalID + " input");
        const allTextArea = document.querySelectorAll("#" + modalPage.modalID + " textarea");

        console.log("____Send Message_____");

        let fullmessage = "";

        allInputs.forEach(input => {
            fullmessage += '\n' + input.id + ": " + input.value;
        });

        allTextArea.forEach(textarea => {
            fullmessage += '\n' + textarea.id + ": " + textarea.value;
        });

        if (fullmessage) {
            console.log(fullmessage);
            alert("Message Envoyer !" + fullmessage);
            closeModal(modalPage); // Close modal after message send
        }
        else {
            console.error("Something wrong message no send because fullmessage is empty or don't exists from sendMessage()");
            alert("Erreur message non envoyer :(");
        }


    }


    return { modalPage, addContactFormListener, displayModal, closeModal, setTitleModal, sendMessage }
}
import { setInnerHtml } from './dom';

export function modalMaster(bodyTag, headerTag, mainTag, modalID) {


    /** CREATE TWO OBJECT WITH ALL PROPRIETY FOR MODELMASTER NEED */
    let backgroundPage = {
        // This is the background object (behind modal)
        bodyHTML: document.querySelector(bodyTag), // We want the <body> selected
        headerHTML: document.querySelector(headerTag), // We want the <header> selected
        mainHTML: document.querySelector(mainTag), // We want the <main> selected
    }

    let modalPage = {
        // This is the modal Object (call ModalPage)
        modalHTML: document.getElementById(modalID),
        modalID: modalID,
        visible: 0,
    }
    /** END  */


    function addContactFormListener(modalPage) {
        // This add listener about only contact form 
        document.getElementById("openModal").addEventListener("click", function () {
            openModal(modalPage);
        });
        document.getElementById("closeModal").addEventListener("click", function () {
            closeModal(modalPage);
        });
        document.getElementById("contact_button").addEventListener("click", function () {
            event.preventDefault();
            sendMessage(modalPage);
        });
    }


    function addKeyboardListener(modalPage) {
        if (modalPage.visible === 1) { // If modalPage is visible at the screen

            // This add listener for Keyboard and check if a key is pressed
            document.onkeydown = function (event) {

                if (event.key === "Escape") {
                    closeModal(modalPage);
                }

            };
        }
    }


    function setTitleModal(modalPage, tagHTML, titleModal) {
        return setInnerHtml(`#${modalPage.modalID} ${tagHTML}`, titleModal);
    }



    

    function effectAnimation(hideclass, showclass, modalPage) {
        if (modalPage.visible === 0) {
            backgroundPage.mainHTML.classList.remove(showclass);
            backgroundPage.headerHTML.classList.remove(showclass);
            modalPage.modalHTML.classList.remove(hideclass);

            backgroundPage.mainHTML.classList.add(hideclass);
            backgroundPage.headerHTML.classList.add(hideclass);
            modalPage.modalHTML.classList.add(showclass);

            modalPage.visible = 1
        }
        else {
            modalPage.modalHTML.classList.remove(showclass);
            backgroundPage.mainHTML.classList.remove(hideclass);
            backgroundPage.headerHTML.classList.remove(hideclass);

            modalPage.modalHTML.classList.add(hideclass);
            backgroundPage.mainHTML.classList.add(showclass);
            backgroundPage.headerHTML.classList.add(showclass);

            modalPage.visible = 0
        }

        return modalPage;
    }



    function openModal(modalPage) {
        effectAnimation("hide_content", "show_content", modalPage); // Effect Modal CSS
        modalPage.modalHTML.style.display = "block"; // Display the Modal at the screen
        addKeyboardListener(modalPage); // Add Keyboard Events
        document.querySelector(`#${modalPage.modalID} #closeModal`).focus(); // Focus the Close Modal 

        // Disable click or focus with inert to the BackgroundPage 
        backgroundPage.headerHTML.setAttribute("inert", "");
        backgroundPage.mainHTML.setAttribute("inert", "");
    }

    function closeModal(modalPage) {
        effectAnimation("hide_content", "show_content", modalPage); // Effect Modal CSS
        modalPage.modalHTML.style.display = "none"; // Hide at the screen modal

        // Allow click or focus with inert to the BackgroundPage 
        backgroundPage.mainHTML.removeAttribute("inert");
        backgroundPage.headerHTML.removeAttribute("inert");

    }


    function sendMessage(modalPage) {
        const allInputs = document.querySelectorAll(`#${modalPage.modalID} input`);
        const allTextArea = document.querySelectorAll(`#${modalPage.modalID} textarea`);

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
            alert(`Message Envoyer ! ${fullmessage}`);
            closeModal(modalPage); // Close modal after message send
        }
        else {
            console.error("Something wrong message no send because fullmessage is empty or don't exists from sendMessage()");
            alert("Erreur message non envoyer :(");
        }
    }


    return {
        backgroundPage, modalPage,
        addContactFormListener, addKeyboardListener,
        openModal, closeModal,
        setTitleModal,
        sendMessage
    }
}
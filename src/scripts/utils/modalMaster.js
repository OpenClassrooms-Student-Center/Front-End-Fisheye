import { setInnerHtml } from "./dom";
import "wicg-inert";

export function modalMaster(bodyTag, headerTag, mainTag, modalID) {


    /** CREATE TWO OBJECT WITH ALL PROPRIETY FOR MODELMASTER NEED */
    let backgroundPage = {
        // This is the background object (behind modal)
        bodyHTML: document.querySelector(bodyTag), // We want the <body> selected
        headerHTML: document.querySelector(headerTag), // We want the <header> selected
        mainHTML: document.querySelector(mainTag), // We want the <main> selected
    };

    let modalPage = {
        // This is the modal Object (call ModalPage)
        modalHTML: document.getElementById(modalID),
        modalID: modalID,
        visible: 0,
    };
    /** END  */


    function addContactFormListener(modalPage) {
        // This add listener about only contact form modal
        document.getElementById("openModal").addEventListener("click", function () {
            openModal(modalPage);
        });
        document.querySelector(`#${modalPage.modalID} #closeModal`).addEventListener("click", function () {
            closeModal(modalPage);
        });
        document.getElementById("contact_button").addEventListener("click", function () {
            event.preventDefault();
            sendMessage(modalPage);
        });
    }

    function addLightboxListener(modalPage, querySelectorRequest, medias) {
        // This add listener about lightbox modal
        document.querySelectorAll(querySelectorRequest).forEach(link =>
            link.addEventListener("click", function () {
                loadLightboxContent(modalPage, link, medias);
                openModal(modalPage);
            }));


        document.querySelector(`#${modalPage.modalID} #closeModal`).addEventListener("click", function () {
            closeModal(modalPage);
        });

        const previous_link = document.querySelector(".content_media a:first-child");
        const next_link = document.querySelector(".content_media a:last-child");

        previous_link.addEventListener("click", function () {
            closeModal(modalPage);
            loadLightboxContent(modalPage, previous_link, medias);
            openModal(modalPage);
        });
        next_link.addEventListener("click", function () {
            closeModal(modalPage);
            loadLightboxContent(modalPage, next_link, medias);
            openModal(modalPage);
        });

    }


    function loadLightboxContent(modalPage, link, medias) {

        const previous_link = document.querySelector(".content_media a:first-child");
        const next_link = document.querySelector(".content_media a:last-child");
        const picture_selected = document.getElementById("picture_selected");
        const video_selected = document.getElementById("video_selected");

        if (process.env.NODE_ENV === 'development') {
            console.log("___LIGHTBOX___");
            // console.log(modalPage);
            console.log(link.id); // Event has be fired by this LINK (where Link ID = Media ID)
            console.log(medias); // Medias that are displayed in order to the main page
        }


        
        /** GET THE PREVIOUS AND AFTER MEDIA THOUGH THE ARRAY */
        let previousMedia = 0;
        let nextMedia = 0;
        let actualMedia = 0;

        for (let i = 0; i < medias.length; i++) {
            if (medias[i].id == link.id) {
                previousMedia = medias[i - 1];
                nextMedia = medias[i + 1];
                actualMedia = medias[i];
                break;
            }
        }

        if (process.env.NODE_ENV === 'development') {
            console.log("____ ACTUAL MEDIA_______");
            console.log(actualMedia);
            console.log("____ PREVIOUS ID_______");
            console.log(previousMedia);
            console.log("_______ NEXT ID _______");
            console.log(nextMedia);
        }
        /** END */


        /** SET TITLE FORM */
        setTitleModal(modalPage, "h2", actualMedia.title);
        /** END */

        /* REMOVE MEDIA */
        if (picture_selected) {
            picture_selected.remove();
        }
        if (video_selected) {
            video_selected.remove();
        }
        /** END */

        /** ADD MEDIA */
        if (actualMedia.video) {
            const video = `<video
                id="video_selected"
                autoplay
                loop
                muted
            >
                <source src="./assets/video/${actualMedia.video}" type="video/mp4">
            </video>`;
            previous_link.insertAdjacentHTML("afterend", video);
        }
        if (actualMedia.image) {
            const picture = `./assets/images/${actualMedia.image}`;
            previous_link.insertAdjacentHTML("afterend", `<img id="picture_selected" src="${picture}" alt="Lilac breasted roller">`);
        }
        /** END */

        /** SET ARROW PREVIOUS */
        if (previousMedia) {
            previous_link.setAttribute("id", previousMedia.id);
            previous_link.classList.remove("hide");

        }
        else {
            previous_link.classList.add("hide");
        }
        /** END */

        /** SET ARROW NEXT  */
        if (nextMedia) {
            next_link.setAttribute("id", nextMedia.id);
            next_link.classList.remove("hide");

        }
        else {
            next_link.classList.add("hide");
        }
        /** END */
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


    function setTitleModal(modalPage, targetSelector, titleModal) {
        return setInnerHtml(`#${modalPage.modalID} ${targetSelector}`, titleModal);
    }





    function effectAnimation(hideclass, showclass, modalPage) {
        if (modalPage.visible === 0) {
            backgroundPage.mainHTML.classList.remove(showclass);
            backgroundPage.headerHTML.classList.remove(showclass);
            modalPage.modalHTML.classList.remove(hideclass);

            backgroundPage.mainHTML.classList.add(hideclass);
            backgroundPage.headerHTML.classList.add(hideclass);
            modalPage.modalHTML.classList.add(showclass);

            modalPage.visible = 1;
        }
        else {
            modalPage.modalHTML.classList.remove(showclass);
            backgroundPage.mainHTML.classList.remove(hideclass);
            backgroundPage.headerHTML.classList.remove(hideclass);

            modalPage.modalHTML.classList.add(hideclass);
            backgroundPage.mainHTML.classList.add(showclass);
            backgroundPage.headerHTML.classList.add(showclass);

            modalPage.visible = 0;
        }

        return modalPage;
    }



    function openModal(modalPage) {
        effectAnimation("hide_content", "show_content", modalPage); // Effect Modal CSS
        modalPage.modalHTML.style.display = "block"; // Display the Modal at the screen
        addKeyboardListener(modalPage); // Add Keyboard Events
        document.querySelector(`#${modalPage.modalID} #closeModal`).focus(); // Focus the Close Modal 

        // Disable click or focus with inert to the BackgroundPage 
        backgroundPage.headerHTML.inert = true;
        backgroundPage.mainHTML.inert = true;
    }

    function closeModal(modalPage) {
        effectAnimation("hide_content", "show_content", modalPage); // Effect Modal CSS
        modalPage.modalHTML.style.display = "none"; // Hide at the screen modal

        // Allow click or focus with inert to the BackgroundPage 
        backgroundPage.headerHTML.inert = false;
        backgroundPage.mainHTML.inert = false;

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
        addContactFormListener, addLightboxListener, addKeyboardListener,
        openModal, closeModal,
        setTitleModal,
        sendMessage
    };
}
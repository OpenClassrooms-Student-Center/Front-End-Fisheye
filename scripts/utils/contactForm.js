export const openCloseFormContact = () => {
    const contactBtn = document.querySelector(".btn_cta");
    const contactModal = document.querySelector(".contact__modal");
    const closeModal = document.querySelector(".modal__form--BtnClose");
    contactBtn.addEventListener("click", () => {
        contactModal.style.display = "flex";
        closeModal.focus();
    });
    closeModal.addEventListener("click", () => contactModal.style.display = "none");
};

export const validateForm = () => {
    const form = document.querySelector('.modal__form form');
    const firstName = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const email = document.querySelector("#email");
    const message = document.querySelector("#userMessage");

    form.addEventListener('input', () => displayCustomMessage());

    form.addEventListener('submit', event => {
        event.preventDefault();
        if (!form.checkValidity()) displayCustomMessage();
        else {
            const formDatas = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                message: message.value,
            };
            console.log(JSON.stringify(formDatas));
            document.querySelectorAll('.formField').forEach(input => input.classList.remove('valid'));
            form.reset();
        };
    });

    const checkInputValidity = (input, regex) => {
        const errorMessage = input.dataset.error;
        const messageProvider = input.nextElementSibling;
        const isValid = regex.test(input.value);

        if(isValid) {
            messageProvider.innerHTML = "";
            messageProvider.removeAttribute("role");
            input.removeAttribute("aria-invalid");
        } else {
            messageProvider.innerHTML = errorMessage;
            messageProvider.setAttribute("role", "alert")
            input.setAttribute("aria-invalid", "true");
        }

        input.classList.toggle('invalid', !isValid);
        input.classList.toggle('valid', isValid);
    };

    /*const displayCustomMessage = () => {
        const regexName = /^([A-Za-z|\s]{3,15})?([-]{0,1})?([A-Za-z|\s]{3,15})$/;
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const regexMessage = /^[A-Za-z0-9|\s]{20,200}$/;*/

        checkInputValidity(firstName, /*regexName*/);
        checkInputValidity(lastName, /*regexName*/);
        checkInputValidity(email, /*regexEmail*/);
        checkInputValidity(message, /*regexMessage*/);
    };
//};
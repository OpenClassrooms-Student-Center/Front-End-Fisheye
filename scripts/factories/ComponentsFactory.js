export class ComponentsFactory {
    constructor() {}

    getTextfieldDOM = (textfieldName, isTextArea) => {
        const textfield = document.createElement("fieldset");
        textfield.classList.add("form-group");

        const label = document.createElement("label");
        label.classList.add("form-group__label");
        label.setAttribute("for", textfieldName);
        label.textContent = textfieldName;

        let input;

        if (isTextArea) {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
            input.setAttribute("type", "text");
        }

        input.classList.add("form-group__textfield");
        input.id = textfieldName;
        input.setAttribute("name", textfieldName);
        input.setAttribute("placeholder", textfieldName);

        textfield.appendChild(label);
        textfield.appendChild(input);

        return textfield;
    };

    getLikeBtnDOM = (likes, isLiked) => {
        const button = document.createElement("button");
        button.classList.add("like-btn");

        const counter = document.createElement("p");
        counter.classList.add("like-btn__counter");
        counter.textContent = likes;

        const icon = document.createElement("i");
        icon.classList.add("like-btn__icon");

        if (isLiked) {
            icon.classList.add("like-btn__icon--liked");
            icon.addEventListener("click", unlike);
        } else {
            icon.addEventListener("click", like);
        }

        button.appendChild(counter);
        button.appendChild(icon);

        function unlike() {
            icon.removeEventListener("click", unlike);

            icon.classList.remove("like-btn__icon--liked");

            icon.addEventListener("click", like);
        }

        function like() {
            icon.removeEventListener("click", like);

            icon.classList.add("like-btn__icon--liked");

            icon.addEventListener("click", unlike);
        }

        return button;
    };
}

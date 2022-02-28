export class LayoutsFactory {
    constructor(data) {}

    getComponentsContainerDOM = () => {
        const componentsContainer = document.createElement("div");
        componentsContainer.classList.add("components-container");

        const formGroup = document.createElement("div");
        formGroup.classList.add("components-container__form-group");
        const buttons = document.createElement("div");
        buttons.classList.add("components-container__buttons");
        const logo = document.createElement("div");
        logo.classList.add("components-container__logo");
        const cards = document.createElement("div");
        cards.classList.add("components-container__cards");

        const cardComponents = document.createElement("div");
        cardComponents.classList.add("card-components");

        cards.appendChild(cardComponents);

        componentsContainer.appendChild(formGroup);
        componentsContainer.appendChild(buttons);
        componentsContainer.appendChild(logo);
        componentsContainer.appendChild(cards);

        return componentsContainer;
    };
}

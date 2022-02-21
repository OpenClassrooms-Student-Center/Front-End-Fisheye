export function btnFactory(btnText) {
    const btn = document.createElement("button");
    btn.textContent = btnText;
    btn.classList.add("btn");

    return btn;
}

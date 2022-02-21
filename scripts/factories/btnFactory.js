export function btnFactory() {
    const btn = document.createElement("button");
    btn.textContent = "Contactez-moi";
    btn.classList.add("btn");

    return btn;
}

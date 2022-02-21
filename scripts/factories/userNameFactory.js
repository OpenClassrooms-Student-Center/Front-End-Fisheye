export function userNameFactory(userName) {
    const name = document.createElement("h2");
    name.classList.add("user-name");
    name.textContent = userName;

    return name;
}

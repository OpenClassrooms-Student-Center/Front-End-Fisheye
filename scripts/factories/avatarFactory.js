export function avatarFactory(userImg, userName) {
    const avatar = document.createElement("div");
    avatar.classList.add("avatar");

    const image = document.createElement("img");
    image.classList.add("avatar__img");
    image.setAttribute("alt", `Avatar de ${userName}`);
    image.setAttribute("src", userImg);

    avatar.appendChild(image);

    return avatar;
}

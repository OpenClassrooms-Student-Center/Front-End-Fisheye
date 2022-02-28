export function likeBtnFactory(likes, isLiked) {
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
}

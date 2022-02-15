export function likeBtnFactory(likes, isLiked) {
    const button = document.createElement("button");
    button.classList.add("like-btn");

    const counter = document.createElement("span");
    counter.classList.add("like-btn__counter");
    counter.textContent = likes;

    const icon = document.createElement("span");
    icon.classList.add("like-btn__icon");
    isLiked ? icon.classList.add("like-btn__icon--liked") : null;

    button.appendChild(counter);
    button.appendChild(icon);

    return button;
}

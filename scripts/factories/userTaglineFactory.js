export function userTaglineFactory(tagline) {
    const userTagline = document.createElement("p");
    userTagline.classList.add("user-tagline");
    userTagline.textContent = tagline;

    return userTagline;
}

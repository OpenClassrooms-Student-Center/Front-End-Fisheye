export function logoFactory() {
    const logo = document.createElement("div");
    logo.classList.add("logo");

    const image = document.createElement("img");
    image.classList.add("logo__img");
    image.setAttribute("alt", "Logo FishEye");
    image.setAttribute("src", "./assets/images/logo.png");

    logo.appendChild(image);

    return logo;
}

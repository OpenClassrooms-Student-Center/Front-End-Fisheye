export function userLocationFactory(userLocation) {
    const location = document.createElement("p");
    location.classList.add("user-location");
    location.textContent = userLocation;

    return location;
}

function displayCarousel(media) {
    // const queryUrl_id = window.location.search;
    // const urlSeachParam = new URLSearchParams(queryUrl_id);
    // media = urlSeachParam.get("mediaId");
    const modalCarousel = document.getElementById('bodyCarousel');
    const main = document.getElementById('main');
    modalCarousel.setAttribute('aria-hidden', 'false')
    main.setAttribute('aria-hidden', 'true');
    modalCarousel.style.display = "block"
}

function closeCarousel() {
    const modalCarousel = document.getElementById('bodyCarousel');
    const main = document.getElementById('main');
    modalCarousel.setAttribute('aria-hidden', 'true')
    main.setAttribute('aria-hidden', 'false');
    modalCarousel.style.display = "none"
}


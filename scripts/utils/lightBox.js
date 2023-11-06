function lightboxClose() {
    const lightbox = document.querySelector(".lightbox");
    lightbox.style.display = "none";
}

function lightboxOpen() {
    const lightbox = document.querySelector(".lightbox");
    lightbox.style.display = "flex";
}


let indexSlide = 0;
function slide(n) {
    showSlide(indexSlide = n);
    window.addEventListener(
        "keydown",
        (event) => {
            if (event.key === "ArrowLeft") {
                if (document.querySelector(".lightbox").style.display === 'flex') {
                    prevSlide();

                }
            }

            if (event.key === "ArrowRight") {
                if (document.querySelector(".lightbox").style.display === 'flex') {
                    nextSlide();
                }
            }

            if (event.key === "Escape") {
                if (document.querySelector(".lightbox").style.display === 'flex') {
                    lightboxClose();
                }
            }

        },
        true,
    );
}

function nextSlide() {
    // Liste des médias
    const slides = document.querySelectorAll(".cardMedia");
    if (indexSlide === slides.length - 1) {
        showSlide(indexSlide = 0);
    } else {
        showSlide(indexSlide = indexSlide + 1);
    }
}

function prevSlide() {
    // Liste des médias
    const slides = document.querySelectorAll(".cardMedia");
    if (indexSlide === 0) {
        showSlide(indexSlide = slides.length - 1);
    } else {
        showSlide(indexSlide = indexSlide - 1);
    }
}

function showSlide(n) {
    // Liste des médias
    const slides = document.querySelectorAll(".cardMedia");

    slideDOM(slides[n]);
}


// Créer de l'affichage
function slideDOM(slide) {
    const lightboxContainer = document.querySelector(".lightbox-container");

    const image = slide.querySelector(".button-card > img");
    const video = slide.querySelector(".button-card > video");
    const titre = slide.querySelector(".textMedia > h2").innerText;

    let img;
    let mp4;

    // Si l'élément est une image
    if (image) {
        img = document.createElement('img');
        img.setAttribute("src", image.attributes.src.nodeValue);
        img.setAttribute("alt", titre);
    }

    // Si l'élément est une vidéo
    if (video) {
        mp4 = document.createElement('video');
        mp4.src = video.attributes.src.nodeValue;
        mp4.setAttribute("alt", titre);
        mp4.autoplay = true;
        mp4.controls = true;
    }


    let div = document.createElement('div');
    let title = document.createElement('h2');
    title.innerHTML = titre;

    if (image) {
        div.appendChild(img);
    }
    if (video) {
        div.appendChild(mp4);
    }
    div.appendChild(title);

    // Ajout des éléments sur la lightbox
    lightboxContainer.replaceChildren(div);
}


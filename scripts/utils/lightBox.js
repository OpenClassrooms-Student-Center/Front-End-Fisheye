function lightboxClose() {
    const lightbox = document.querySelector(".lightbox");

    lightbox.style.display = "none";
}

function lightboxOpen(media) {
    const lightbox = document.querySelector(".lightbox");
    const lightboxContainer = document.querySelector(".lightbox-container");

    const urlMedia = media.children[0];
    let img = document.createElement('img');
    if (urlMedia.localName === "img") {
        img.setAttribute("src", urlMedia.attributes.src.nodeValue);
        img.setAttribute("alt", urlMedia.parentNode.parentNode.children[1].children[0].innerHTML);
    }

    let mp4 = document.createElement( 'video' );
    if (urlMedia.localName === "video")     {
        mp4.setAttribute("alt", urlMedia.parentNode.parentNode.children[1].children[0].innerHTML);
        mp4.src = urlMedia.attributes.src.nodeValue;
        mp4.autoplay = true;
        mp4.controls = true;
    }

    let titre = document.createElement('h2');
    titre.innerHTML = urlMedia.parentNode.parentNode.children[1].children[0].innerHTML;

    let div = document.createElement('div');
    if (urlMedia.localName === "img") {
        div.appendChild(img);

    }
    if (urlMedia.localName === "video") {
        div.appendChild(mp4);
    }
    div.appendChild(titre);

    lightboxContainer.replaceChildren(div);

    lightbox.style.display = "flex";

    lightbox.querySelector('.lightbox-next').addEventListener('click', nextLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', prevLightbox);

    async function nextLightbox() {
        const listParent = urlMedia.parentNode.parentNode.parentNode.children;

        let nextMedia  = null;
        for (let i = 0; i < listParent.length; i++) {
            if (listParent[i].children[0].children[0] === urlMedia) {
                if (i === listParent.length - 1) {
                    nextMedia = listParent[0];
                } else {
                    nextMedia = listParent[i +1];
                }
            }
        }

        lightboxOpen(nextMedia.children[0]);
    }


    async function prevLightbox() {
        const listParent = urlMedia.parentNode.parentNode.parentNode.children;
        let prevMedia  = null;
        for (let i = 0; i < listParent.length; i++) {
            if (listParent[i].children[0].children[0] === urlMedia) {
                if (i === 0) {
                    prevMedia = listParent[listParent.length - 1];
                } else {
                    prevMedia = listParent[i - 1];
                }
            }
        }

        lightboxOpen(prevMedia.children[0]);
    }


    window.addEventListener(
        "keydown",
        (event) => {
            if (event.key === "ArrowLeft") {
                prevLightbox();
            }

            if (event.key === "ArrowRight") {
                nextLightbox();
            }

            // Cancel the default action to avoid it being handled twice
            event.preventDefault();
        },
        true,
    );

}




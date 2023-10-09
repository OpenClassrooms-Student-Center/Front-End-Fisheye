function lightboxClose() {
    const lightbox = document.querySelector(".lightbox");

    lightbox.style.display = "none";
}

function lightboxOpen(media) {
    const lightbox = document.querySelector(".lightbox");
    const lightboxContainer = document.querySelector(".lightbox-container");

    const urlMedia = media;
    let img = document.createElement('img');
    img.setAttribute("src", urlMedia.attributes.src.nodeValue);

    lightboxContainer.replaceChildren(img);

    lightbox.style.display = "block";

    lightbox.querySelector('.lightbox-next').addEventListener('click', function () {
        const listParent = urlMedia.parentNode.parentNode.children;

        let nextMedia  = null;
        for (let i = 0; i < listParent.length; i++) {
            if (listParent[i].children[0] === urlMedia) {
                nextMedia = listParent[++i];
            }
        }

        lightboxOpen(nextMedia.children[0]);
    });

    lightbox.querySelector('.lightbox-prev').addEventListener('click', function () {
        const listParent = urlMedia.parentNode.parentNode.children;

        let prevMedia  = null;
        for (let i = 0; i < listParent.length; i++) {
            if (listParent[i].children[0] === urlMedia) {
                let y = i - 1;
                prevMedia = listParent[y];
            }
        }

        lightboxOpen(prevMedia.children[0]);
    });
}
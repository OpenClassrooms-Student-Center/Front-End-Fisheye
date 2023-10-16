function lightboxClose() {
    const lightbox = document.querySelector(".lightbox");

    lightbox.style.display = "none";
}

function lightboxOpen(media) {
    const lightbox = document.querySelector(".lightbox");
    const lightboxContainer = document.querySelector(".lightbox-container");

    const urlMedia = media;
    let img = document.createElement('img');
    if (urlMedia.localName === "img") {
        img.setAttribute("src", urlMedia.attributes.src.nodeValue);
    }

    let mp4 = document.createElement( 'video' );
    if (urlMedia.localName === "video")     {
        mp4.src = urlMedia.attributes.src.nodeValue;
        mp4.autoplay = true;
        mp4.controls = true;
    }

    let titre = document.createElement('h2');
    titre.innerHTML = urlMedia.parentNode.children[1].children[0].innerHTML;

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

    lightbox.querySelector('.lightbox-next').addEventListener('click', function () {
        const listParent = urlMedia.parentNode.parentNode.children;

        let nextMedia  = null;
        for (let i = 0; i < listParent.length; i++) {
            if (listParent[i].children[0] === urlMedia) {
                if (i === listParent.length - 1) {
                    nextMedia = listParent[0];
                } else {
                    nextMedia = listParent[i +1];
                }
            }
        }

        lightboxOpen(nextMedia.children[0]);
    });

    lightbox.querySelector('.lightbox-prev').addEventListener('click', function () {
        const listParent = urlMedia.parentNode.parentNode.children;
        let prevMedia  = null;
        for (let i = 0; i < listParent.length; i++) {
            if (listParent[i].children[0] === urlMedia) {
                if (i === 0) {
                    prevMedia = listParent[listParent.length - 1];
                } else {
                    prevMedia = listParent[i - 1];
                }
            }
        }

        lightboxOpen(prevMedia.children[0]);
    });
}
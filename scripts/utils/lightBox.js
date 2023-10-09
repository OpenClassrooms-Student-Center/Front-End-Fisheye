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

    let titre = document.createElement('h2');
    titre.innerHTML = urlMedia.parentNode.children[1].children[0].innerHTML;

    let close = document.createElement('button');
    close.setAttribute("class", "lightbox-close");
    close.setAttribute("onclick", "lightboxClose()");
    close.innerHTML ='<img src="assets/icons/close.svg" alt="Close dialog">';

    let div = document.createElement('div');
    div.appendChild(close);
    div.appendChild(img);
    div.appendChild(titre);

    lightboxContainer.replaceChildren(div);

    lightbox.style.display = "flex";

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
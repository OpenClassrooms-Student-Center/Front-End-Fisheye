let selectedMedia = 0;
let selectedPhotographer = "";

/** pattern factory */
function mediaFactory(data, name, cptr) {
    const { photographerId, title, image, video, likes, id } = data;

    // liste photos constructor
    function getPhotosDOM() {
        const article = document.createElement('article');

        let img = document.createElement('img');
        img.setAttribute('alt', name);

        if (image === undefined) {
            img.setAttribute('role', "navigation");
            let picture = `assets/photos/${name}/${video}`;
            img = document.createElement('video');
            img.setAttribute("src", picture);
            img.setAttribute('alt', name + " " + title);
            img.addEventListener("click", function () {
                ClickOnMedia(title, name, image, video, cptr);
            });
        } else {
            img.setAttribute('role', "navigation");
            let picture = `assets/photos/${name}/${image}`;
            img.setAttribute("src", picture);
            img.setAttribute('alt', name + " " + title);
            img.addEventListener("click", function () {
                ClickOnMedia(title, name, image, video, cptr);
            });
        }

        const div = document.createElement('div');
        div.className = "red line marginV";

        const p = document.createElement('p');
        p.textContent = title;

        const div2 = document.createElement('div');
        div2.className = "line";

        const p2 = document.createElement('p');
        p2.textContent = likes;

        const linkLikes = document.createElement('a');
        linkLikes.className = "red fa-solid fa-heart";

        linkLikes.addEventListener("click", function () {
            ClickLike(id);
        });

        article.appendChild(img);
        article.appendChild(div);
        div.appendChild(p);
        div.appendChild(div2);
        div2.appendChild(p2);
        div2.appendChild(linkLikes);

        return (article);
    }

    return { getPhotosDOM }
}


function DisplayMedia(image, name, video, title) {
    const mediaContainer = document.getElementById("lightbox-media");
    mediaContainer.innerHTML = "";
    const mediaTitle = document.getElementById("lightbox-photo-title");
    if (image === undefined) {
        let picture = `assets/photos/${name}/${video}`;
        const media = document.createElement('video');
        media.setAttribute("src", picture);
        media.controls = true;
        mediaContainer.appendChild(media);
    } else {
        let picture = `assets/photos/${name}/${image}`;
        const media = document.createElement('img');
        media.setAttribute("src", picture);
        media.setAttribute('alt', title);
        mediaContainer.appendChild(media);
    }
    mediaTitle.textContent = title;
}



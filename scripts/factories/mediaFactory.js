// Créer un article contenant les informations de chaque photographe
function mediaFactory(data) {
    function getMediaDOM() {
        let mediaHtml = "";
        for (let i = 0; i < data.length; i++) {
            const { id, title, image, video, likes } = data[i];
            console.log(id, likes)
            let mediaSrc;
            let tagHTML;

            if (image) {
                mediaSrc = `assets/medias/${image}`;
                tagHTML = 'img';
            } else {
                mediaSrc = `assets/medias/${video}`;
                tagHTML = 'iframe'
            }

            mediaHtml += `
                <figure class="media-figure">
                    <${tagHTML}
                        src="${mediaSrc}" 
                        alt="${title}" 
                        class="media-figure-img"
                    >
                    <figcaption class="media-figure-figcaption">
                        <h2 class="media-figure-figcaption-title">${title}</h2>
                        <button id="like-${id}" class="media-figure-figcaption-btn" onclick="incrementLikes(${id}, ${likes})">${likes} <i class="fa-regular fa-heart"></i></i></button>
                    </figcaption>
                </figure>
            `;
        }
        
        const figure = document.createElement('figure');
        figure.innerHTML = mediaHtml;
        return figure.children;
    }

    return { getMediaDOM }
}

const incrementLikes = (id, likes) => {
    let mediaLikes = likes;
    let mediaLiked = mediaLikes += 1;

    // Mettre à jour le nombre de likes et l'icône
    const likeBtn = document.getElementById(`like-${id}`);
    if (!likeBtn.classList.contains('dislike')) {
        mediaLikes += 1
        likeBtn.classList.add('dislike')
        likeBtn.innerHTML = `${mediaLiked} <i class="fa-solid fa-heart"></i>`;
    } else {
        mediaLiked -= 1;
        likeBtn.classList.remove('dislike')
        likeBtn.innerHTML = `${mediaLiked} <i class="fa-regular fa-heart"></i>`;
    }
}
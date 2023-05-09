function mediaFactory(data, lightboxOpen = false){
    const {image, video, id, photographerId, title, likes, date} = data;
    const mediaImage = `assets/images/${photographerId}/${image}`;
    const mediaVideo = `assets/images/${photographerId}/${video}`;

    
    const article = document.createElement( 'article' );
    article.setAttribute('data-id',data.id);
    const pMedia = document.createElement( 'p' );
    

    if (lightboxOpen){
        article.classList.add('lightboxArticle');
        pMedia.classList.add('pLightbox');
    } else {
        article.classList.add('mediaArticle');
        pMedia.classList.add('pMedia');
    }

    
    

    if (image){
        const img = document.createElement( 'img' );
        img.setAttribute("src", mediaImage);
        img.alt = title;
        img.classList.add('mediaImg');
        pMedia.innerHTML = `${title} <span> ${likes} <i class="fas fa-heart"></i></span>`;
        article.appendChild(img);
        article.appendChild(pMedia);
    } else if (video){
        const video = document.createElement( 'video' );
        video.setAttribute("src", mediaVideo);
        video.setAttribute("aria-label", title);
        video.classList.add('mediaVideo');
        pMedia.innerHTML = `${title} <span> ${likes} <i class="fas fa-heart"></i></span>`;
        video.setAttribute("controls", true);
        video.setAttribute("poster", "");
        article.appendChild(video);
        article.appendChild(pMedia);
    }
    return article;
}

export { mediaFactory };

function mediaFactory(data){
    const {image, video, id, photographerId, title, likes, date} = data;
    const mediaImage = `assets/images/${photographerId}/${image}`;
    const mediaVideo = `assets/images/${photographerId}/${video}`;

    
    const article = document.createElement( 'article' );
    const pMedia = document.createElement( 'p' );
    pMedia.classList.add('pMedia');
    article.classList.add('mediaArticle');
    article.setAttribute('data-id',data.id);
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

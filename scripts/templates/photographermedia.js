class PhotographerMedia {
  constructor(media) {
    this._media = media;
  }

  createPhotographerMedia() {
    const $wrapperMedia = document.createElement("article");
    $wrapperMedia.classList.add("mediaCard");
    // $wrapperMedia.classList.add('photographer-profile-wrapper')

    const photographerMedia = `
        
            <a href=/assets/photographersMedias/${
              this._media.image || this._media.video
            }>
                ${
                  this._media.image
                    ? `<img alt="${this._media.title}" src="/assets/photographersMedias/${this._media.image}"/>`
                    : `<video autoplay controls loop><source src="/assets/photographersMedias/${this._media.video}" type="video/mp4" ></video>`
                }
            
                </a>

            <div class="media_infos">
            <p>${this._media.title}</p>
            <p><span id="likeNmbr"> ${
              this._media.likes
            }</span><i id="btnLike" class="fa-solid fa-heart"></i></p>
            </div>
            
   
        `;
    $wrapperMedia.innerHTML = photographerMedia;
    return $wrapperMedia;
  }
}




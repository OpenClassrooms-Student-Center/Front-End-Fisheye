class Factory {
  static getLightboxMedia(media, name) {
    if (media.video) {
      const vids = `assets/Sample Photos/${name}/${media.video}`;
      console.log(vids);
      const video = document.createElement("video");
      video.src = vids;
      video.controls = true;
      video.setAttribute("class", "lightbox-img lightbox-media");
      return video;
      //
    } else if (media.image) {
      const img = document.createElement("img");
      img.setAttribute("class", "lightbox-img lightbox-media");
      const pictures = `assets/Sample Photos/${name}/${media.image}`;
      img.src = pictures;
      return img;
    }
  }
}

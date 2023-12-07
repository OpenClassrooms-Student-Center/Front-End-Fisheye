class Image {
  constructor(data) {
    this.title = data.title;
    this.type = 'image';
    this.url = `assets/photographers/${data.firstname}/${data.image}`;
  }

  createMediaElement() {
    const mediaElement = document.createElement('img');
    mediaElement.src = this.url;
    mediaElement.alt = this.title;
    return mediaElement.outerHTML;
  }
}

class Video {
  constructor(data) {
    this.title = data.title;
    this.type = 'video';
    this.url = `assets/photographers/${data.firstname}/${data.video}`;
  }

  createMediaElement() {
    const mediaElement = document.createElement('video');
    mediaElement.setAttribute("src", this.url);
    mediaElement.setAttribute("aria-label", `${this.title} video`);
    mediaElement.autoplay = true;
    mediaElement.loop = true;
    mediaElement.muted = true;
    return mediaElement.outerHTML;
  }
}

export function createMedia(data) {
  if (data.image) {
    return new Image(data);
  } else if (data.video) {
    return new Video(data);
  } else {
    throw new Error('Invalid media data');
  }
}
class Image {
  constructor(data) {
    this.title = data.title;
    this.image = data.image;
    this.type = 'image';
    this.firstname = data.firstname;
    this.url = `assets/photographers/${this.firstname}/${this.image}`;
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
    this.firstname = data.firstname;
    this.video = data.video;
    this.url = `assets/photographers/${this.firstname}/${this.video}`;
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
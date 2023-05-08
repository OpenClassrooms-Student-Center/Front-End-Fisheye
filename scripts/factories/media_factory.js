class MediaFactory {
  constructor(mediaData) {
    this.mediaDOMData(mediaData)
  }

  mediaDOMData(mediaData) {
    if (typeof(mediaData) == "image") {
      return new ImageInfo(mediaData)
    } else if (typeof(mediaData) == "image") {
      return new VideoInfo(mediaData)
    }
  }
}

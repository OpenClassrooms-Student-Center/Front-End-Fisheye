/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
class MediaFactory {
  constructor(mediaData, photographerFolder) {
    const type = ('image' in mediaData) ? 'image' : 'video'
    if (type === 'image') {
        return new ImageMedia(mediaData, photographerFolder)
    } else if (type === 'video') {
        return new VideoMedia(mediaData, photographerFolder)
    }
  }
}
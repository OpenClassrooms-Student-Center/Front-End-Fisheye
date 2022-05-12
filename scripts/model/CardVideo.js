import Media from './Media.js';

export default class Photo extends Media {
  constructor(media, name) {
    super(media, name);
    this._pathMedia = media.video;
    this._tag = 'video';
    this._path = `../assets/Sample_Photos/${this._pathName}/${this._pathMedia}`;
  }

  get tag() {
    return this._tag;
  }

  get path() {
    return this._path;
  }
}

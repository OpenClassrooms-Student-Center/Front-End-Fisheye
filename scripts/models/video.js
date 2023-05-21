import { MediaModel } from "../models/media.js";

export class VideoModel extends MediaModel {
  constructor(data) {
    super(data);
    this._video = data.video;
  }

  _setSource(path, video) {
    const source = document.createElement("source");
    const extension = this._video.split(".")[1];
    source.setAttribute("src", path + video);
    source.setAttribute("type", `video/${extension}`);
  }

  _setTrack() {
    const track = document.createElement("track");
    track.setAttribute("src", "captions/vtt/captions_fr.vtt")
    track.setAttribute("kind", "captions")
    track.setAttribute("srclang", "fr")
    track.setAttribute("label", "french_captions")
    track.setAttribute("default", "true")
  }

  getMedia() {
    const video = document.createElement("video");
    video.classList.add("media");
    video.setAttribute("tabindex", "-1");
    const videoSource = this._setSource(this.path, this._video);
    const videoTrack = this._setTrack();
    video.append(videoSource, videoTrack);
  }
}

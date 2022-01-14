class MediaFactory {
  constructor(data, photographerName) {
    if (data.image) {
      return new Photo(data, photographerName);
    } else if (data.video) {
      return new Video(data, photographerName);
    } else {
      throw "Unknown type format";
    }
  }
}

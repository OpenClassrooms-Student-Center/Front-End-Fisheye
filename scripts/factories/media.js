class MediaFactory {
  constructor(data, type) {
    if (type === "photograph") {
      return new Photo(data);
    } else if (type === "video") {
      return new Movie(data);
    } else {
      throw "Unknown type format";
    }
  }
}

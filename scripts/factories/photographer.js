class photographerFactory {
  constructor(data) {
    if (data.name) {
      return new Photographer(data);
    } else if (data.photographerId) {
      if (data.video) {
        return new Movie(data);
      } else {
        return new Picture(data);
      }
    } else {
      throw "Unknow type format";
    }
  }
}

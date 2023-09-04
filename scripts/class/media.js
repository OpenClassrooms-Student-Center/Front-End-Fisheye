// Define Media class
class Media {
  constructor(data) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._description = data.description;
    this._tags = data.tags;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
  }
}

// Define Image class with Media
class Image extends Media {
  constructor(data) {
    super(data);
    this._image = data.image;
  }
}

// Define Video class with Media
class Video extends Media {
  constructor(data) {
    super(data);
    this._video = data.video;
  }
}

export { Media, Image, Video };

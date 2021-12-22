class Media {
  constructor(data) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
  }

  get id() {
    return this._id;
  }

  get photographerId() {
    return this._photographerId;
  }

  get title() {
    return this._title;
  }

  get likes() {
    return this._likes;
  }

  get date() {
    return this._date;
  }

  get price() {
    return this._price;
  }
}

class Picture extends Media {
  constructor(data) {
    super(data);
    this._image = data.image;
  }

  get link() {
    return `./assets/images/${this._image}`;
  }

  get mediaDOM() {
    const article = document.createElement("article");
    article.innerHTML = `
        <img class="article__media" src="${this.link}">
        <div>
          <h4>${this._title}<span>${this._likes}</span></h4>
        </div>
      `;
    return article;
  }
}

class Movie extends Media {
  constructor(data) {
    super(data);
    this._video = data.video;
  }

  get link() {
    return `./assets/images/${this._video}`;
  }

  get mediaDOM() {
    const article = document.createElement("article");
    article.innerHTML = `
        <video class="article__media" src="${this.link}"></video>
        <div>
          <h4>${this._title}<span>${this._likes}</span></h4>
        </div>
      `;
    return article;
  }
}

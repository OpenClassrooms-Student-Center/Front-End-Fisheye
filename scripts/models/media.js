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
    article.classList.add("media__article");
    article.innerHTML = `
        <img class="media__article__image" src="${this.link}" alt="${this.title}">
        <div class="media__article__desc">
          <span class="media__article__desc__title">${this._title}</span>
          <span class="media__article__desc__like">${this._likes}
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"/>
            </svg>
          </span>
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
    article.classList.add("media__article");
    article.innerHTML = `
        <video class="media__article__video" src="${this.link}" alt="${this.title}"></video>
        <div class="media__article__desc">
          <span class="media__article__desc__title">${this._title}</span>
          <span class="media__article__desc__like">${this._likes}
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"/>
            </svg>
          </span>
        </div>
      `;
    return article;
  }
}

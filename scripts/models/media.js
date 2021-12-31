class Media {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
  }

  liked() {
    this.likes++;
  }
}

class Picture extends Media {
  constructor(data) {
    super(data);
    this.image = data.image;
  }

  get link() {
    return `./assets/images/${this.image}`;
  }

  get mediaDOM() {
    const article = document.createElement("article");
    article.classList.add("media__article");
    article.innerHTML = `
        <img class="media__article__image" src="${this.link}" alt="${this.title}">
        <div class="media__article__desc">
          <span class="media__article__desc__title">${this.title}</span>
          <span class="media__article__desc__like">${this.likes}
            <svg onclick="app.incrementLikes(${this.id})" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    this.video = data.video;
  }

  get link() {
    return `./assets/images/${this.video}`;
  }

  get mediaDOM() {
    const article = document.createElement("article");
    const linkThumbnail =
      this.link.substring(0, this.link.lastIndexOf(".")) + ".jpg";
    article.classList.add("media__article");
    article.innerHTML = `
        <video class="media__article__video" autobuffer=true src="${this.link}" alt="${this.title}" poster="${linkThumbnail}"></video>
        <div class="media__article__desc">
          <span class="media__article__desc__title">${this.title}</span>
          <span class="media__article__desc__like">${this.likes}
            <svg onclick="app.incrementLikes(${this.id})" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"/>
            </svg>
          </span>
        </div>
      `;
    return article;
  }
}

export class MediaModel {
  constructor(data) {
    this._data = data;

    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
    this._path = "assets/medias/";
  }

  get id() { return this._id; }

  get photographerId() { return this._photographerId; }

  get title() { return this._title; }

  get likes() { return this._likes; }

  get date() { return this._date; }

  get price() { return this._price; }

  get path() { return this._path; }

  _setTitle(title) {
    // Element in caption
    const dataTitle = document.createElement("span");
    dataTitle.classList.add("title");
    dataTitle.textContent = `${title}`

    return dataTitle;
  }

  _setLikes(likes) {
    // Element in caption
    const dataLikes = document.createElement("span");
    dataLikes.classList.add("like-text");
    dataLikes.textContent = `${likes}`;

    return dataLikes;
  }

  _setIcon() {
    // Element in caption
    const dataIcon = document.createElement("span");
    dataIcon.classList.add("like-icon");
    dataIcon.setAttribute("aria-label", "like");
    dataIcon.setAttribute("role", "button");
    dataIcon.setAttribute("tabindex", "0");

    const icon = document.createElement("i");
    icon.classList.add("fa");
    icon.classList.add("fa-heart");

    dataIcon.append(icon);

    return dataIcon;
  }

  _createCaption() {
    const caption = document.createElement("p");
    caption.classList.add("caption");

    const captionTitle = this._setTitle(this._data.title);
    const captionLikes = this._setLikes(this._data.likes);
    const captionIcon = this._setIcon();

    caption.append(captionTitle, captionLikes, captionIcon);

    return caption;
  }

  _createLink(title, media) {
    const link = document.createElement("a");
    link.classList.add("lnk-media");
    link.classList.add("open");
    link.setAttribute("href", "#");
    link.setAttribute("aria-label", title);
    link.setAttribute("closeup", "");
    link.setAttribute("view", "");
    link.textContent = `${media}`;

    return link
  }

  _createArticle(id, likes, date, title) {
    const article = document.createElement("article");
    article.setAttribute("data-id", id);
    article.setAttribute("data-user-like", "false");
    article.setAttribute("data-likes", likes);
    article.setAttribute("data-date", date);
    article.setAttribute("data-title", title);

    return article;
  }

  getMediaCardDOM() {
    const article = this._createArticle(this._data.id, this._data.likes, this._data.date, this._data.title);
    const caption = this._createCaption();
    const link = this._createLink(this._data.title, this._data.media);

    article.append(caption, link);
  }
}

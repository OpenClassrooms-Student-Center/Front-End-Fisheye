export default class Media {
  constructor(media, name) {
    this._name = name;
    this._title = media.title;
    this._likes = Number(media.likes);
    this._pathName = this.name.split(/-| /).join('');
    this._id = media.id;
    this._date = media.date;
    this._userLike = false;
  }

  get pathName() {
    return this._pathName;
  }

  get name() {
    return this._name;
  }

  get title() {
    return this._title;
  }

  get likes() {
    return this._likes;
  }

  get id() {
    return this._id;
  }

  get date() {
    return this._date;
  }

  get userLike() {
    return this._userLike;
  }

  toggleLike(e) {
    const sumLikes = document.querySelector('.totalLikes__likes');

    if (this._userLike) {
      this._likes -= 1;
      sumLikes.innerHTML = Number(sumLikes.innerHTML) - 1;
    } else {
      this._likes += 1;
      sumLikes.innerHTML = Number(sumLikes.innerHTML) + 1;
    }
    this._userLike = !this._userLike;
    e.currentTarget.querySelector('span').textContent = this._likes;
  }
}

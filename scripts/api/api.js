class Api {
  constructor(url) {
    this._url = url;
  }

  get() {
    return fetch(this._url)
      .then((res) => res.json())
      .catch((err) => console.log("an error occurs", err));
  }
}

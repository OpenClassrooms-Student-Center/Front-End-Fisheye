export default class Api {
  constructor(url) {
    this.url = url;
  }

  get() {
    return fetch(this.url)
      .then((res) => res.json())
      .catch((err) => console.log('an error occurs', err));
  }
}

class Model {
  static async getPhotographers() {
    return fetch("http://127.0.0.1:5500/data/photographers.json").then(
      function (response) {
        return response.json().then(function (json) {
          console.log(json);
          return json.photographers;
        });
      }
    );
  }
  static async getMediaPhotographers() {
    return fetch("http://127.0.0.1:5500/data/photographers.json").then(
      function (response) {
        return response.json().then(function (json) {
          console.log(json);
          return json.media;
        });
      }
    );
  }
}

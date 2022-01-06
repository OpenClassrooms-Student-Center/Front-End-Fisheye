import PhotographerFactory from '../factories/photographer.js';
import Api from '../api/api.js';

class App {
  constructor() {
    this.$photographWrapper = document.querySelector('.photographer-section');

    this.photographersApi = new Api('./data/photographers.json');

    this.allPhotographers = [];
  }

  async fetchData() {
    const data = await this.photographersApi.get();
    this.allPhotographers = data.photographers.map(
      (photograph) => new PhotographerFactory(photograph),
    );
  }

  async main() {
    await this.fetchData();

    this.allPhotographers.forEach((photograph) => {
      this.$photographWrapper.appendChild(photograph.userCard);
    });
  }
}

const app = new App();
app.main();

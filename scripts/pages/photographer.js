import PhotographerFactory from '../factories/photographer.js';
import Api from '../api/api.js';
import Lightbox from '../utils/lightbox.js';

class App {
  constructor() {
    this.photographersApi = new Api('./data/photographers.json');
    this.url = new URL(document.location);

    this.$mediaWrapper = document.querySelector('.media');
    this.$sorterWrapper = document.getElementsByName('sorter');

    this.photographerData = {};
  }

  async fetchData() {
    const localPhotographerData = JSON.parse(
      localStorage.getItem('photographerData'),
    );

    if (localPhotographerData) {
      this.photographerData = {
        photographers: localPhotographerData.photographers.map(
          (photograph) => new PhotographerFactory(photograph),
        ),
        media: localPhotographerData.media.map(
          (media) => new PhotographerFactory(media),
        ),
      };
    } else {
      const data = await this.photographersApi.get();
      this.photographerData = {
        photographers: data.photographers.map(
          (photograph) => new PhotographerFactory(photograph),
        ),
        media: data.media.map((media) => new PhotographerFactory(media)),
      };
    }
  }

  getPhotographerById() {
    const id = this.getUrlId();
    const photographerIdExist = this.photographerData.photographers.some(
      (obj) => obj.id === id,
    );

    if (photographerIdExist) {
      return this.photographerData.photographers.find(
        (photographer) => photographer.id === id,
      );
    }
    window.location.replace(window.location.origin);
    return null;
  }

  getMediaByPhotographerId() {
    const id = this.getUrlId();
    const photographerIdExist = this.photographerData.photographers.some(
      (obj) => obj.id === id,
    );

    if (photographerIdExist) {
      return this.photographerData.media.filter(
        (media) => media.photographerId === id,
      );
    }
    window.location.replace(window.location.origin);
    return null;
  }

  getSumLikes() {
    const ArrayMediaLikes = Array.from(this.getMediaByPhotographerId()).map(
      (media) => media.likes,
    );
    const sum = ArrayMediaLikes.reduce((a, b) => a + b);
    return sum;
  }

  incrementLikes(id) {
    const mediaById = this.getMediaByPhotographerId().find(
      (media) => media.id === id,
    );
    mediaById.liked();
    this.saveLocalStorage();
    this.displayMedia(this.getSorter());
  }

  getUrlId() {
    const params = this.url.searchParams;
    return parseInt(params.get('photographerId'), 10);
  }

  getSorter() {
    const params = this.url.searchParams;
    return params.get('sorting');
  }

  getInputSorterChecked() {
    const inputs = Array.from(document.getElementsByName('sorter'));
    const inputChecked = inputs.find((elt) => elt.checked);
    return inputChecked.value;
  }

  displayHeader() {
    this.getPhotographerById().photographHeaderDOM;
  }

  displaySummaryMedia() {
    const likes = document.querySelector('.summary__likes');
    const price = document.querySelector('.summary__price');
    const sumLikes = this.getSumLikes();
    const valuePrice = this.getPhotographerById().price;

    likes.setAttribute('value', sumLikes);
    price.setAttribute('value', valuePrice);
    likes.innerText = sumLikes;
    price.innerText = `${valuePrice}€ / jour`;
  }

  displayMedia(sorter) {
    this.$mediaWrapper.innerHTML = '';
    let media = this.getMediaByPhotographerId();

    if (!sorter) {
      media = this.sortingMedia(this.getInputSorterChecked());
      this.url.searchParams.set('sorting', this.getInputSorterChecked());
      window.history.pushState({}, '', this.url);
    } else {
      media = this.sortingMedia(sorter);
    }

    for (const m of media) {
      const DOM = m.mediaDOM;

      this.$mediaWrapper.appendChild(DOM);
      this.displaySummaryMedia();
    }
    Lightbox.init();
  }

  displaySorter() {
    this.$sorterWrapper.forEach((element) => {
      element.addEventListener('click', (e) => {
        const sorter = e.target.value;
        this.url.searchParams.set('sorting', sorter);
        window.history.pushState({}, '', this.url);
        this.update();
      });
    });
  }

  sortingMedia(sorter) {
    if (sorter === 'like') {
      return Array.from(this.getMediaByPhotographerId()).sort(
        (a, b) => b.likes - a.likes,
      );
    }
    if (sorter === 'date') {
      return Array.from(this.getMediaByPhotographerId()).sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );
    }
    if (sorter === 'title') {
      return Array.from(this.getMediaByPhotographerId()).sort((a, b) =>
        a.title.localeCompare(b.title),
      );
    }
    this.url.searchParams.delete('sorting');
    window.history.pushState({}, '', this.url);
    this.update();
    return null;
  }

  update() {
    this.displayMedia(this.getSorter());
    Lightbox.init();
  }

  saveLocalStorage() {
    localStorage.setItem(
      'photographerData',
      JSON.stringify(this.photographerData),
    );
  }

  displayNameIntoForm() {
    const wrapper = document.querySelector('.modal header h2');
    wrapper.innerHTML += `<br> ${this.getPhotographerById().name}`;
  }

  async main() {
    try {
      await this.fetchData();
      this.displayHeader();
      this.displaySorter();
      this.displayMedia(this.getSorter());
      this.displayNameIntoForm();
    } catch (e) {
      console.log(e);
    }
  }
}

const app = new App();
app.main();

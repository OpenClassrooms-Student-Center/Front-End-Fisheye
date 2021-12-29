//Mettre le code JavaScript lié à la page photographer.html

class App {
  constructor() {
    this.photographersApi = new Api("./data/photographers.json");
    this.url = new URL(document.location);

    this.$mediaWrapper = document.querySelector(".media");
    this.$sorterWrapper = document.getElementsByName("sorter");

    this.photographerData = {};
  }

  async fetchData() {
    const localPhotographerData = JSON.parse(
      localStorage.getItem("photographerData")
    );

    if (localPhotographerData) {
      this.photographerData = {
        photographers: localPhotographerData.photographers.map(
          (photograph) => new photographerFactory(photograph)
        ),
        media: localPhotographerData.media.map(
          (media) => new photographerFactory(media)
        ),
      };
    } else {
      const data = await this.photographersApi.get();
      this.photographerData = {
        photographers: data.photographers.map(
          (photograph) => new photographerFactory(photograph)
        ),
        media: data.media.map((media) => new photographerFactory(media)),
      };
    }
  }

  getPhotographerById() {
    const id = this.getUrlId();
    const photographerIdExist = this.photographerData.photographers.some(
      (obj) => obj.id === id
    );

    if (photographerIdExist) {
      return this.photographerData.photographers.find(
        (photographer) => photographer.id === id
      );
    } else {
      window.location.replace(window.location.origin);
    }
  }

  getMediaByPhotographerId() {
    const id = this.getUrlId();
    const photographerIdExist = this.photographerData.photographers.some(
      (obj) => obj.id === id
    );

    if (photographerIdExist) {
      return this.photographerData.media.filter(
        (media) => media.photographerId === id
      );
    } else {
      window.location.replace(window.location.origin);
    }
  }

  getSumLikes() {
    let sum = 0;
    for (const media of this.getMediaByPhotographerId()) {
      sum += media.likes;
    }
    return sum;
  }

  incrementLikes(id) {
    const mediaById = this.getMediaByPhotographerId().find(
      (media) => media.id === id
    );
    mediaById.liked();
    this.update();
  }

  getUrlId() {
    const params = this.url.searchParams;
    return parseInt(params.get("photographerId"));
  }

  getSorter() {
    const params = this.url.searchParams;
    return params.get("sorting");
  }

  displayHeader() {
    this.getPhotographerById().photographHeaderDOM;
  }

  displaySummaryMedia() {
    const likes = document.querySelector(".summary__likes");
    const price = document.querySelector(".summary__price");
    likes.innerText = this.getSumLikes();
    price.innerText = this.getPhotographerById().price + " € / jour";
  }

  displayMedia(sorter) {
    this.$mediaWrapper.innerHTML = "";
    let media = this.getMediaByPhotographerId();

    if (sorter) {
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
      element.addEventListener("click", (e) => {
        const sorter = e.target.value;
        this.url.searchParams.set("sorting", sorter);
        window.history.pushState({}, "", this.url);
        this.update();
      });
    });
  }

  sortingMedia(sorter) {
    if (sorter === "like") {
      return Array.from(this.getMediaByPhotographerId()).sort(
        (a, b) => b.likes - a.likes
      );
    } else if (sorter === "date") {
      return Array.from(this.getMediaByPhotographerId()).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    } else if (sorter === "title") {
      return Array.from(this.getMediaByPhotographerId()).sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else {
      this.url.searchParams.delete("sorting");
      window.history.pushState({}, "", this.url);
      this.update();
    }
  }

  displayNameIntoForm() {
    const wrapper = document.querySelector(".modal header h2");
    wrapper.innerHTML += `<br> ${this.getPhotographerById().name}`;
  }

  update() {
    this.displayMedia(this.getSorter());
    Lightbox.init();
    localStorage.setItem(
      "photographerData",
      JSON.stringify(this.photographerData)
    );
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

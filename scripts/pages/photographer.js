//Mettre le code JavaScript lié à la page photographer.html

class App {
  constructor() {
    this.photographersApi = new Api("./data/photographers.json");
    this.url = new URL(document.location);

    this.$mediaWrapper = document.querySelector(".media");
    this.$sorterWrapper = document.getElementsByName("sorter");

    this.photographerData = {};
  }

  async fetchDataPhotographer() {
    const data = await this.photographersApi.get();
    const id = this.getUrlId();
    const photographerIdExist = data.photographers.some((obj) => obj.id === id);

    if (photographerIdExist) {
      const photographer = new photographerFactory(
        data.photographers.find((photograph) => photograph.id === id)
      );
      const mediaById = data.media.filter(
        (media) => media.photographerId === id
      );
      this.photographerData = {
        photographer: photographer,
        media: mediaById.map((media) => new photographerFactory(media)),
      };
    } else {
      throw "unknow photograph id";
    }
  }

  getUrlId() {
    const params = this.url.searchParams;
    return parseInt(params.get("photographer-id"));
  }

  getSorter() {
    const params = this.url.searchParams;
    return params.get("sorting");
  }

  displayHeader() {
    this.photographerData.photographer.photographHeaderDOM;
  }

  displayMedia(sorter) {
    this.$mediaWrapper.innerHTML = "";
    if (sorter) {
      this.photographerData.media = this.sortingMedia(sorter);
    }
    for (const m of this.photographerData.media) {
      const DOM = m.mediaDOM;
      this.$mediaWrapper.appendChild(DOM);
    }
  }

  displaySorter() {
    this.$sorterWrapper.forEach((element) => {
      element.addEventListener("click", (e) => {
        const sorter = e.target.value;
        this.url.searchParams.set("sorting", sorter);
        window.history.pushState({}, "", this.url);
        this.displayMedia(sorter);
        Lightbox.init();
      });
    });
  }

  sortingMedia(sorter) {
    if (sorter === "like") {
      return Array.from(this.photographerData.media).sort(
        (a, b) => b.likes - a.likes
      );
    } else if (sorter === "date") {
      return Array.from(this.photographerData.media).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    } else if (sorter === "title") {
      return Array.from(this.photographerData.media).sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else {
      throw "unknow sorter type";
    }
  }

  async main() {
    try {
      await this.fetchDataPhotographer();
      this.displayHeader();
      this.displaySorter();
      this.displayMedia(this.getSorter());
      Lightbox.init();
    } catch (e) {
      console.log(e);
      //window.location.replace(window.location.origin);
    }
  }
}

const app = new App();
app.main();

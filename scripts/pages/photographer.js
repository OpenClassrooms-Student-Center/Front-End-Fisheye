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

  getSumLikes() {
    let sum = 0;
    for (const media of this.photographerData.media) {
      sum += media.likes;
    }
    return sum;
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
    const div = document.createElement("div");
    div.classList.add("media__summary");
    div.innerHTML = `
      <span class="media__summary__likes">${this.getSumLikes()}
        <svg width="19" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.125 18.35L7.85625 17.03C3.35 12.36 0.375 9.28 0.375 5.5C0.375 2.42 2.4925 0 5.1875 0C6.71 0 8.17125 0.81 9.125 2.09C10.0787 0.81 11.54 0 13.0625 0C15.7575 0 17.875 2.42 17.875 5.5C17.875 9.28 14.9 12.36 10.3938 17.04L9.125 18.35Z" fill="black"/>
        </svg>
      </span>
      <span class="media__summary__price">${
        this.photographerData.photographer.price
      }€ / jour</span>
    `;
    this.$mediaWrapper.appendChild(div);
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

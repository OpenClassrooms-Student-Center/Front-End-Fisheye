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
    this.saveLocalStorage();
    this.displayMedia(this.getSorter());
  }

  getUrlId() {
    const params = this.url.searchParams;
    return parseInt(params.get("photographerId"));
  }

  getSorter() {
    const params = this.url.searchParams;
    return params.get("sorting");
  }

  getInputSorterChecked() {
    const inputs = document.getElementsByName("sorter");
    for (const elt of inputs) {
      if (elt.checked) {
        return elt.value;
      }
    }
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

    if (!sorter) {
      media = this.sortingMedia(this.getInputSorterChecked());
      this.url.searchParams.set("sorting", this.getInputSorterChecked());
      window.history.pushState({}, "", this.url);
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

  update() {
    this.displayMedia(this.getSorter());
    Lightbox.init();
  }

  saveLocalStorage() {
    localStorage.setItem(
      "photographerData",
      JSON.stringify(this.photographerData)
    );
  }

  displayNameIntoForm() {
    const wrapper = document.querySelector(".modal header h2");
    wrapper.innerHTML += `<br> ${this.getPhotographerById().name}`;
  }

  firstNameIsValid(firstname) {
    const regName = /^[A-zÀ-ú -]{2,}$/;
    if (regName.test(firstname));
  }

  removeMsgError(element) {
    if (element.parentElement.hasAttribute("data-error")) {
      element.parentElement.removeAttribute("data-error");
      element.parentElement.removeAttribute("data-error-visible");
    }
  }

  setMsgError(element, name) {
    element.parentElement.setAttribute(
      "data-error",
      `Veuillez entrer un ${name} valide`
    );
    element.parentElement.setAttribute("data-error-visible", "true");
  }

  firstNameIsValid(firstname) {
    const regName = /^[A-zÀ-ú -]{2,}$/;
    return regName.test(firstname.value);
  }

  lastNameIsValid(lastname) {
    const regName = /^[A-zÀ-ú -]{2,}$/;
    return regName.test(lastname.value);
  }

  emailIsValid(email) {
    const regEmail =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEmail.test(email.value);
  }

  messageIsValid(message) {
    if (message.value != "") {
      return true;
    }
    return false;
  }

  validate(event) {
    event.preventDefault();

    const form = event.target;
    const firstname = form[0];
    const lastname = form[1];
    const email = form[2];
    const message = form[3];

    this.messageIsValid(message)
      ? this.removeMsgError(message)
      : this.setMsgError(message, "message");
    this.firstNameIsValid(firstname)
      ? this.removeMsgError(firstname)
      : this.setMsgError(firstname, "prénom");
    this.lastNameIsValid(lastname)
      ? this.removeMsgError(lastname)
      : this.setMsgError(lastname, "nom");
    this.emailIsValid(email)
      ? this.removeMsgError(email)
      : this.setMsgError(email, "email");
    if (
      this.messageIsValid(message) &&
      this.firstNameIsValid(firstname) &&
      this.lastNameIsValid(lastname) &&
      this.emailIsValid(email)
    ) {
      console.log(`Bonjour ${firstname.value} ${lastname.value}, 
Voici votre message :
${message.value}`);
      closeModal();
      form.reset();
    }
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

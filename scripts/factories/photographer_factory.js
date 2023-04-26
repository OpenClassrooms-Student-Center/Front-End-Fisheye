class PhotographerFactory {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
    this.hrefPhotographer = `./photographer.html?id=${this.id}`;
    this.picture = `./assets/photographers/photographer/${this.portrait}`;
  }

  getUserCardDOM() {
    // DOM elements of photographer
    this.article = document.createElement("article");
    this.link = document.createElement("a");
    this.img = document.createElement("img");
    this.description = document.createElement("div");
    this.userName = document.createElement("h2");
    this.userCity = document.createElement("p");
    this.userTagline = document.createElement("p");
    this.userPrice = document.createElement("p");

    // Add classList
    this.description.classList.add("description");
    this.userCity.classList.add("city");
    this.userTagline.classList.add("tagline");
    this.userPrice.classList.add("price");

    // Set attributes and class for the CSS
    this.img.setAttribute("src", this.picture);
    this.img.setAttribute("alt", this.name);
    this.link.setAttribute("href", this.hrefPhotographer);
    this.link.setAttribute("aria-label", this.name);

    // Text injected in HTML elements
    this.userName.textContent = this.name;
    this.userCity.textContent = `${this.city}, ${this.country}`;
    this.userTagline.textContent = this.tagline;
    this.userPrice.textContent = `${this.price}€/jour`;

    // Add creates element in the DOM
    this.article.appendChild(this.link);
    this.article.appendChild(this.description);
    this.description.appendChild(this.userCity);
    this.description.appendChild(this.userTagline);
    this.description.appendChild(this.userPrice);
    this.link.appendChild(this.img);
    this.link.appendChild(this.userName);

    const article = this.article;
    const price = this.price;
    return { article, price };
  }

  getPhotographerInfos() {
    // DOM elements of photographer
    this.article = document.createElement("article")
    this.img = document.createElement("img");
    this.userName = document.createElement("h1")
    this.userCity = document.createElement("p");
    this.userTagline = document.createElement("p");
    this.description = document.createElement("div");
    // Set attributes and class for the CSS
    this.img.setAttribute("src", this.picture);
    this.img.setAttribute("alt", this.name);
    this.description.setAttribute("class", "header-left");

    // Text injected in HTML elements
    this.userName.textContent = this.name;
    this.userCity.textContent = `${this.city}, ${this.country}`;
    this.userTagline.textContent = this.tagline;

    // Add creates element in the DOM
    this.article.appendChild(this.description);
    this.article.appendChild(this.img);
    this.description.appendChild(this.userName);
    this.description.appendChild(this.userCity);
    this.description.appendChild(this.userTagline);

    const article = this.article
    return { article }
  }
}

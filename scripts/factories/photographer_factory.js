class PhotographerFactory {
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
  }

  getUserCardDOM() {
    // Init ID and Picture
    const hrefPhotographer = `./photographer.html?id=${this.id}`;
    const picture = `./assets/photographers/photographers/${this.portrait}`;

    //DOM elements of photographer
    this.h2 = document.createElement("h2");
    this.article = document.createElement("article");
    this.a = document.createElement("a");
    this.img = document.createElement("img");
    this.divCity = document.createElement("div");
    this.divTagline = document.createElement("div");
    this.divPrice = document.createElement("div");
    this.divPhotographerInfos = document.createElement("div");

    //Set attributes and class for the CSS
    this.img.setAttribute("src", picture);
    this.a.setAttribute("href", hrefPhotographer);
    this.a.setAttribute("aria-label", this.name);
    this.divCity.classList.add("city");
    this.divTagline.classList.add("tagline");
    this.divPrice.classList.add("price");
    this.divPhotographerInfos.classList.add("photographer-infos");

    //Text injected in HTML elements
    this.h2.textContent = this.name;
    this.divCity.textContent = `${this.city}, ${this.country}`;
    this.divTagline.textContent = this.tagline;
    this.divPrice.textContent = `${this.price}€/jour`;

    //Add creates element in the DOM
    this.article.appendChild(this.a);
    this.a.appendChild(this.img);
    this.a.appendChild(this.h2);
    this.article.appendChild(this.divCity);
    this.article.appendChild(this.divTagline);
    this.article.appendChild(this.divPrice);

    const article = this.article;
    const price = this.price;
    return { article, price };
  }

  getPhotographerInfos() {
    //DOM elements of photographer
    this.h1 = document.createElement("h1");


    //Text injected in HTML elements
    this.h1.textContent = this.name;
    this.divCity.textContent = `${this.city}, ${this.country}`;
    this.divTagline.textContent = this.tagline;

    //Add created elements in the DOM
    this.divPhotographerInfos.appendChild(this.h1);
    this.divPhotographerInfos.appendChild(this.divCity);
    this.divPhotographerInfos.appendChild(this.divTagline);

    const photographerName = this.name;
    const photographerPic = this.img;
    const divPhotographerInfos = this.divPhotographerInfos;
    return { photographerPic, photographerName, divPhotographerInfos };
}
}

// class PhotographerFactory {
//   constructor(data) {
//     this.name = data.name;
//     this.id = data.id;
//     this.city = data.city;
//     this.country = data.country;
//     this.tagline = data.tagline;
//     this.price = data.price;
//     this.portrait = data.portrait;

//     // Init ID and Picture
//     const hrefPhotographer = `./photographer.html?id=${this.id}`;
//     const picture = `./assets/photographers/aIDPhotographersImages/${this.portrait}`;

//     //DOM elements of photographer
//     this.h1 = document.createElement("h1");
//     this.h2 = document.createElement("h2");
//     this.article = document.createElement("article");
//     this.a = document.createElement("a");
//     this.img = document.createElement("img");
//     this.divCity = document.createElement("div");
//     this.divTagline = document.createElement("div");
//     this.divPrice = document.createElement("div");
//     this.divPhotographerInfos = document.createElement("div");

//     //Set attributes and class for the CSS
//     this.img.setAttribute("src", picture);
//     this.a.setAttribute("href", hrefPhotographer);
//     this.a.setAttribute("aria-label", this.name);
//     this.divCity.classList.add("city");
//     this.divTagline.classList.add("tagline");
//     this.divPrice.classList.add("price");
//     this.divPhotographerInfos.classList.add("photographer-infos");
//   }

//   getUserCardDOM() {
//     //Text injected in HTML elements
//     this.h2.textContent = this.name;
//     this.divCity.textContent = `${this.city}, ${this.country}`;
//     this.divTagline.textContent = this.tagline;
//     this.divPrice.textContent = `${this.price}€/jour`;

//     //Add creates element in the DOM
//     this.article.appendChild(this.a);
//     this.a.appendChild(this.img);
//     this.a.appendChild(this.h2);
//     this.article.appendChild(this.divCity);
//     this.article.appendChild(this.divTagline);
//     this.article.appendChild(this.divPrice);

//     const article = this.article;
//     const price = this.price;
//     return { article, price };
//   }

//   getPhotographerInfos() {
//     //Text injected in HTML elements
//     this.h1.textContent = this.name;
//     this.divCity.textContent = `${this.city}, ${this.country}`;
//     this.divTagline.textContent = this.tagline;

//     //Add created elements in the DOM
//     this.divPhotographerInfos.appendChild(this.h1);
//     this.divPhotographerInfos.appendChild(this.divCity);
//     this.divPhotographerInfos.appendChild(this.divTagline);

//     const photographerName = this.name;
//     const photographerPic = this.img;
//     const divPhotographerInfos = this.divPhotographerInfos;
//     return { photographerPic, photographerName, divPhotographerInfos };
// }
// }

export class PhotographerModel {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.city = data.city;
    this.country = data.country;
    this.tagline = data.tagline;
    this.price = data.price;
    this.portrait = data.portrait;
    this.hrefPhotographer = `./photographer.html?id=${this.id}`;
    this.picture = `./assets/photographers/${this.portrait}`;
    this.userDiv = document.createElement("div");
  }

  /**
   *
   * @ProtectionMethods
   * @SetUserElements
   */
  _setUserImage(picture, name) {
    const userImage = document.createElement("img");
    userImage.classList.add('photographer__link--photo');
    userImage.setAttribute("src", picture);
    userImage.setAttribute("alt", name);
    return userImage;
  }

  _setUserName(name) {
    const userName = document.createElement("h2");
    userName.classList.add('photographer__link--name');
    userName.textContent = name;
    return userName;
  }

  _setUserCity(city, country) {
    const userCity = document.createElement("p");
    userCity.classList.add("photographer__description--city");
    userCity.textContent = `${city}, ${country}`;
    return userCity;
  }

  _setUserTagline(tagline) {
    const userTagline = document.createElement("p");
    userTagline.classList.add("photographer__description--tagline");
    userTagline.textContent = tagline;
    return userTagline;
  }

  _setUserPrice(price) {
    const userPrice = document.createElement("p");
    userPrice.classList.add("photographer__description--price");
    userPrice.textContent = `${price}€/jour`;
    return userPrice;
  }

  /**
   *
   * @ProtectionMethods
   * @CreationUserElements
   */
  _createPhotographersLink(hrefPhotographer, name) {
    const userLink = document.createElement('a');
    const userImage = this._setUserImage(this.picture, this.name);
    const userName = this._setUserName(this.name);
    userLink.classList.add("photographer__link");
    userLink.setAttribute("href", hrefPhotographer);
    userLink.setAttribute("aria-label", name);
    userLink.append(userImage, userName);
    return userLink;
  }

  _createUserDescription() {
    const description = document.createElement('div');
    const userCity = this._setUserCity(this.city, this.country);
    const userTagline = this._setUserTagline(this.tagline);
    const userPrice = this._setUserPrice(this.price);
    description.classList.add("photographer__description");
    description.append(userCity, userTagline, userPrice);
    return description;
  }

  _createPhotographerDescription() {
    const description = document.createElement('div');
    const userName = this._setUserName(this.name);
    const userCity = this._setUserCity(this.city, this.country);
    const userTagline = this._setUserTagline(this.tagline);
    description.classList.add("description");
    description.append(userName, userCity, userTagline);
    return description;
  }

  _createContactButton() {
    const buttonElement = document.createElement("div");
    const userButton = document.createElement("button");
    userButton.setAttribute("class", "button");
    userButton.setAttribute("arial-label", "Contact me");
    userButton.setAttribute("onclick", "displayModal()");
    userButton.textContent = "Contactez-moi";
    buttonElement.append(userButton);
    return buttonElement;
  }

  getUserCardDOM() {
    const userLink = this._createPhotographersLink(this.hrefPhotographer, this.name);
    const description = this._createUserDescription();
    this.userDiv.classList.add("photographer");
    this.userDiv.append(userLink, description);
    return this.userDiv;
  }

  getPhotographerInfos() {
    const userDescription = this._createPhotographerDescription();
    const userContactButton = this._createContactButton();
    const userImage = document.createElement("div");
    const imageElement = this._setUserImage(this.picture, this.name);
    userImage.append(imageElement)
    this.userDiv.classList.add("photographers");
    this.userDiv.append(userDescription, userContactButton, userImage);
    return this.userDiv
  }
}

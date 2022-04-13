// eslint-disable-next-line no-unused-vars
class Photographer {
  constructor(data) {
    this.city = data.city
    this.country = data.country
    this.id = data.id
    this.name = data.name
    this.portrait = data.portrait
    this.price = data.price
    this.tagline = data.tagline

    this.totalLikes = 0

    this.picture = `assets/images/photographers/${this.portrait}`
  }

  getUserCardDOM () {
    return document.createRange().createContextualFragment(`
      <article class="photographerCard">
        <a class="photographerCard__link" href="photographer.html?id=${this.id}" title="Lien vers le photographe ${this.name}">
          <img class="photographerCard__img" src="${this.picture}" alt="">
          <h2 class="photographerCard__title">${this.name}</h2>
        </a>
        <div class="photographerCard__infos">
          <p class="photographerCard__infos--location">${this.city}, ${this.country}</p>
          <p class="photographerCard__infos--tagline">${this.tagline}</p>
          <p class="photographerCard__infos--price">${this.price}€/jour</p>
        </div>
      </article>
    `)
  }

  getPhotographerInfo () {
    return `
      <div class="photographHeader__infos">
        <h1 class="photographHeader__infos--title">${this.name}</h1>
        <p class="photographHeader__infos--location">${this.city}, ${this.country}</p>
        <p class="photographHeader__infos--tagline">${this.tagline}</p>
      </div>
    `
  }

  getPhotographerContact () {
    return `
    <div class="photographHeader__contact">
    <button class="contact_button">Contactez-moi</button>
    </div>
    `
  }

  getPhotographerImg () {
    return `
      <div class="photographHeader__img">
        <img class="photographHeader__img" src="${this.picture}" alt="">
      </div>
    `
  }

  getPhotographerHeaderDOM () {
    return document.createRange().createContextualFragment(
      this.getPhotographerInfo() + this.getPhotographerContact() + this.getPhotographerImg()
    )
  }

  getPhotographerComplementaryDOM () {
    return document.createRange().createContextualFragment(`
      <p>${this.totalLikes} <i class="fa-solid fa-heart"></i></p>
      <p>${this.price}€ / jour</p>
    `)
  }

  getPhotographerModalDOM () {
    return document.createRange().createContextualFragment(`
      <dialog class="modal display-none" id="contact_modal">
          <header>
            <h2>Contactez-moi<br>${this.name}</h2>
            <img class="close_modal" src="assets/icons/close.svg" alt="Fermez la modale" />
          </header>
          <form id="form" method="dialog">
            <div>
              <label for="first">Prénom</label>
              <input type="text" id="first" name="first" />
            </div>
            <div>
              <label for="last">Nom</label>
              <input type="text" id="last" name="last" />
            </div>
            <div>
              <label for="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>
            <div>
              <label for="message">Votre message</label>
              <textarea id="message" name="message"></textarea>
            </div>
            <button class="contact_button">Envoyer</button>
          </form>
      </dialog>
    `)
  }
}
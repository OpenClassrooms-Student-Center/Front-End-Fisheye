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
          <img class="photographerCard__img" src="${this.picture}" alt="${this.name}">
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
      <button class="contact_button" aria-label="Contactez-moi">Contactez-moi</button>
    </div>
    `
  }

  getPhotographerImg () {
    return `
      <div class="photographHeader__img">
        <img class="photographHeader__img" src="${this.picture}" alt="${this.name}">
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
      <p><span id="photographComplementary__totalLikes">${this.totalLikes}</span> <i class="fa-solid fa-heart"></i></p>
      <p>${this.price}€ / jour</p>
    `)
  }

  addLike () {
    this.totalLikes++
    this.updateComplementaryDOM ()
  }

  removeLike () {
    this.totalLikes--
    this.updateComplementaryDOM ()
  }

  updateComplementaryDOM () {
    const totalPhotographerLikesElement = document.querySelector(`#photographComplementary__totalLikes`)
    totalPhotographerLikesElement.textContent = this.totalLikes
  }

  getPhotographerModalDOM () {
    return document.createRange().createContextualFragment(`
      <dialog class="modal" id="contact_modal" aria-labelledby="modalTitle">
          <header>
            <h2 id="modalTitle">Contactez-moi<br>${this.name}</h2>
            <img class="close_modal" src="assets/icons/close.svg" alt="Fermez la modale" tabindex="0" />
          </header>
          <form id="form" method="dialog">
            <div>
              <label id="label_first" for="first">Prénom</label>
              <input type="text" id="first" name="first" aria-labelledby="label_first" />
            </div>
            <div>
              <label id="label_last" for="last">Nom</label>
              <input type="text" id="last" name="last" aria-labelledby="label_last" />
            </div>
            <div>
              <label id="label_email" for="email">Email</label>
              <input type="email" id="email" name="email" aria-labelledby="label_email" />
            </div>
            <div>
              <label id="label_message" for="message">Votre message</label>
              <textarea id="message" name="message" aria-labelledby="label_message"></textarea>
            </div>
            <button class="contact_button" aria-label="Envoyer">Envoyer</button>
          </form>
      </dialog>
    `)
  }
}
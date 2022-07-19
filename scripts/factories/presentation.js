import modalTemplate from '../templates/modal.js';
import Modal from '../model/Modal.js';

export default function presentationFactory() {
  function createPresentation(newPresentation) {
    const presentationInnerHTML = `<aside class="photographer__presentation" aria-label="informations">
        <h1 id="${newPresentation.name}" class="photographer__name">${newPresentation.name}</h1>
        <p class="photographer__location" aria-describedby="${newPresentation.name}">${newPresentation.city}, ${newPresentation.country}</p>
        <p class="photographer__quote" aria-describedbynewPresentation.name}">${newPresentation.tagline} </p>
        </aside>
        <button id="btnOppenModal" class="contact_button" aria-label="contactez moi" aria-describedby="${newPresentation.name}">
            Contactez-moi
        </button>
        <img class="photographer__profile portrait" src="${newPresentation._pathPortrait}" aria-label="${newPresentation.name}" alt="profil de ${newPresentation.name}" aria-describedby="${newPresentation.name}">`;

    const section = document.createElement('section');
    section.innerHTML = presentationInnerHTML;
    document.querySelector('.presentation__section').appendChild(section);
    section.className = 'photograph-header';

    const modalContainer = document.getElementById('contact_modal');
    const modal = document.createElement('section');
    modalContainer.appendChild(modal);
    modal.outerHTML = modalTemplate(newPresentation.name);
    const modalData = new Modal();
    const contactButton = document.querySelector('.contact_button');
    contactButton.addEventListener('click', () => modalData.displayModal());
  }
  return createPresentation;
}

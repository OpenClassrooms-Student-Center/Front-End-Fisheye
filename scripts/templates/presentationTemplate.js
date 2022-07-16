export default function presentationTemplate(data) {
  return `<aside class="photographer__presentation" aria-label="informations">
        <h1 id="${data.name}" class="photographer__name">${data.name}</h1>
        <p class="photographer__location" aria-describedby="${data.name}">${data.city}, ${data.country}</p>
        <p class="photographer__quote" aria-describedby="${data.name}">${data.tagline} </p>
    </aside>
    <button id="btnOppenModal" class="contact_button" aria-label="contactez moi" aria-describedby="${data.name}">
        Contactez-moi
    </button>
    <img class="photographer__profile portrait" src="${data._pathPortrait}" aria-label="${data.name}" alt="profil de ${data.name}" aria-describedby="${data.name}">`;
}

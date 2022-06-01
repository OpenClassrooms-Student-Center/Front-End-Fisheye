export default function presentationTemplate(data) {
  return `<div class="photographer__presentation" aria-label="informations">
        <h1 id="${data.name}" class="photographer__name">${data.name}</h1>
        <span class="photographer__location" aria-label="location" aria-describedby="${data.name}">${data.city}, ${data.country}</span>
        <span class="photographer__quote" aria-label"quote" aria-describedby="${data.name}">${data.tagline} </span>
    </div>
    <button id="btnOppenModal" class="contact_button" role="Buttons" aria-label="contactez moi" aria-describedby="${data.name}">
        Contactez-moi
    </button>
    <img class="photographer__profile portrait" src="${data._pathPortrait}" aria-label="${data.name}" alt="profil de ${data.name}" aria-describedby="${data.name}">`;
}

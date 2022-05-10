export default function presentationTemplate(data) {
    return `<div class="photographer__presentation" aria-label="infos">
        <h1 class="photographer__name">${data.name}</h1>
        <span class="photographer__location" aria-label="location">${data.city}, ${data.country}</span>
        <span class="photographer__quote" aria-label"quote">${data.tagline}</span>
    </div>
    <button class="contact_button">
        Contactez-moi
    </button>
    <img class="photographer__profile portrait" src="${data._pathPortrait}" aria-label="${data.name}" alt="profile">`

    
}
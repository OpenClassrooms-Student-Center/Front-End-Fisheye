export class PhotographerProfile {
  constructor(photographer) {
    this.photographer = photographer
  }

  createProfile(wrapper) {
    const photographerName = document.createElement("h1")
    photographerName.textContent = this.photographer.name
    photographerName.classList = "photographer-name"
    const photographerDetailsWrapper = document.createElement("article")
    photographerDetailsWrapper.classList  = "photographer-profile"
    photographerDetailsWrapper.appendChild(photographerName)
    wrapper.appendChild(photographerDetailsWrapper)
    const photographerDetailsLocation = document.createElement("p")
    photographerDetailsLocation.textContent = this.photographer.location
    photographerDetailsLocation.classList = "photographer-location"
    photographerDetailsWrapper.appendChild(photographerDetailsLocation)
    const photographerDetailsTagline = document.createElement("p")
    photographerDetailsTagline.textContent = this.photographer.tagline
    photographerDetailsTagline.classList = "photographer-tagline"
    photographerDetailsWrapper.appendChild(photographerDetailsTagline)
  return wrapper
}

}
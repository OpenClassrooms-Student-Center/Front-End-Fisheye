function photographerHeader(data) {

  const { name, portrait, city, country, tagline, price, id } = data;
  const picture = `assets/images/Sample Photos/Photographers ID Photos/${portrait}`;

  const photographerContent = document.querySelector('.photographer-content')
  const photographerName = document.querySelector('.photographer-name')
  const photographerLocation = document.querySelector('.photographer-location')
  const photographerDescription = document.querySelector('.photographer-description')
  const photographerPhoto = document.querySelector('.photographer-photo')

  photographerName.textContent = `${name}`;
  photographerLocation.textContent = `${city}, ${country}`;
  photographerDescription.textContent = `${tagline}`;
  photographerPhoto.setAttribute('src', `${picture}`)
}

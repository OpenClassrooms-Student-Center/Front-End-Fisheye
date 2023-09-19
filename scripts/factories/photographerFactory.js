function photographerTemplate(photographerData, mediasData) {
  const { id, name, portrait, city, country, tagline, price } = photographerData;

  const picture = `assets/photographers/${portrait}`;
  const url = `photographer.html?id=${id}`;

  /**
   * Photographer article factory
   * @returns A photographers list element to detail one photograph
   */
  function getUserCardDOM() {
    const article = document.createElement( 'article' );

    // Image and title photograph
    const imgLink = document.createElement('a');
    imgLink.href = url;
    imgLink.ariaLabel = name;
    const profilePicture = createProfilePicture(picture, name);
    
    imgLink.appendChild(profilePicture);

    const h2 = document.createElement('h2');
    h2.textContent = name;

    // Photograph informations
    const h3 = document.createElement('h3');
    h3.textContent = `${city}, ${country}`;
    const p = document.createElement('p');
    p.textContent = tagline;
    const span = document.createElement('span');
    span.textContent = `${price}€/jour`;

    article.appendChild(imgLink);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(span);

    return (article);
  }

  function getPhotographerDetails() {
    const photographHeader = document.createElement('section');
    photographHeader.ariaLabel = 'Détails du photographe';
    photographHeader.classList.add('photograph_header');

    // Create photographer informations div
    const photographerInformations = createPhotographerInformations(name, city, country, tagline);
    
    // Create contact button
    const buttonContainer = createContactButton(photographerData);

    // Create profile picture
    const photographImgContainer = createProfilePicture(picture, name);

    // Create likes sum and price container
    const likeAndPriceContainer = createLikeAndPrice(mediasData, price);
    
    photographHeader.appendChild(photographerInformations);
    photographHeader.appendChild(buttonContainer);
    photographHeader.appendChild(photographImgContainer);
    photographHeader.appendChild(likeAndPriceContainer);

    return photographHeader
  }

  

  return {
    name,
    picture,
    getUserCardDOM,
    getPhotographerDetails
  }
}

/**
 * Create a div which contains photographer informations
 * @param {*} name 
 * @param {*} city 
 * @param {*} country 
 * @param {*} tagline 
 * @returns div
 */
function createPhotographerInformations(name, city, country, tagline) {
  const div = document.createElement('div');
  const h2 = document.createElement( 'h2' );
  h2.textContent = name;
  const h3 = document.createElement('h3');
  h3.textContent = `${city}, ${country}`;
  const p = document.createElement('p');
  p.textContent = tagline;

  div.appendChild(h2);
  div.appendChild(h3);
  div.appendChild(p);

  return div;
}

/**
 * Create the contact button
 * @returns div containing contact button
 */
function createContactButton(photographerData) {
  const div = document.createElement('div');
  div.classList.add('btn_container');
  const contactMeButton = document.createElement('button');
  contactMeButton.classList.add('contact_button');
  contactMeButton.textContent = 'Contactez-moi';
  contactMeButton.addEventListener('click', () => openContactModal(photographerData));

  div.appendChild(contactMeButton)

  return div
}

/**
 * Create profile picture element
 * @param {*} picture 
 * @param {*} name 
 * @returns div containing profile picture
 */
function createProfilePicture(picture, name) {
  const div = document.createElement('div');
  div.classList.add('profile_picture_container');
  const photographImg = document.createElement('img');
  photographImg.classList.add('profile_picture');
  photographImg.src = picture;
  photographImg.alt = name;

  div.appendChild(photographImg);

  return div;
}

/**
 * Create div which contains photographer likes sum and his price
 * @param {*} mediasData 
 * @param {*} price 
 * @returns div
 */
function createLikeAndPrice(mediasData, price) {  
  const totalLikes = getTotalLikes(mediasData);

  const div = document.createElement('div');
  div.classList.add('like_and_price_container');

  const likesContainer = document.createElement('div');
  likesContainer.classList.add('likes_container');
  const likesCount = document.createElement('p');
  likesCount.textContent = totalLikes;
  const likesIcon = document.createElement('span');
  likesIcon.ariaHidden = true;
  likesIcon.className = 'fa-solid fa-heart';

  const priceInformation = document.createElement('p');
  priceInformation.textContent = `${price}€ / jour`;

  likesContainer.appendChild(likesCount);
  likesContainer.appendChild(likesIcon);
  div.appendChild(likesContainer);
  div.appendChild(priceInformation);

  return div;
}

/**
 * Count photographer likes sum
 * @param {*} medias 
 * @returns Sum of likes
 */
function getTotalLikes(medias) {
  return likes = medias.reduce((acc, curr) => acc += curr.likes, 0);
}
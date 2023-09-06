function photographerTemplate(photographerData, mediasData) {
  const { id, name, portrait, city, country, tagline, price } = photographerData;

  const picture = `assets/photographers/${portrait}`;
  const url = `photographer.html?id=${id}`;
  const totalLikes = getTotalLikes(mediasData);

  /**
   * Photographer article factory
   * @returns A photographers list element to detail one photograph
   */
  function getUserCardDOM() {
    const article = document.createElement( 'article' );

    // Image and title photograph
    const imgTitleLink = document.createElement('a');
    imgTitleLink.href = url;
    const img = document.createElement('img');
    img.classList.add('profile_picture');
    img.src = picture;
    img.alt = name;
    const h2 = document.createElement('h2');
    h2.textContent = name;
    
    imgTitleLink.appendChild(img);
    imgTitleLink.appendChild(h2);

    // Photograph informations
    const h3 = document.createElement('h3');
    h3.textContent = `${city}, ${country}`;
    const p = document.createElement('p');
    p.textContent = tagline;
    const span = document.createElement('span');
    span.textContent = `${price}€/jour`;

    article.appendChild(imgTitleLink);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(span);

    return (article);
  }

  function getPhotographerDetails() {
    const photographHeader = document.createElement('section');
    photographHeader.classList.add('photograph_header');

    // Create photographer informations div
    const photographerInformations = document.createElement('div');
    console.log(`photographHeader`, photographHeader);
    const h2 = document.createElement( 'h2' );
    h2.textContent = name;
    const h3 = document.createElement('h3');
    h3.textContent = `${city}, ${country}`;
    const p = document.createElement('p');
    p.textContent = tagline;

    photographerInformations.appendChild(h2);
    photographerInformations.appendChild(h3);
    photographerInformations.appendChild(p);

    photographHeader.appendChild(photographerInformations);
    
    // Create contact button
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('btn_container');
    const contactMeButton = document.createElement('button');
    contactMeButton.classList.add('contact_button');
    contactMeButton.textContent = 'Contactez-moi';
    contactMeButton.addEventListener('click', displayModal);
    buttonContainer.appendChild(contactMeButton)
    photographHeader.appendChild(buttonContainer);

    // Create profile picture
    const photographImgContainer = document.createElement('div');
    photographImgContainer.classList.add('profile_picture_container');
    const photographImg = document.createElement('img');
    photographImg.classList.add('profile_picture');
    photographImg.src = picture;
    photographImg.alt = name;

    photographImgContainer.appendChild(photographImg);
    photographHeader.appendChild(photographImgContainer);
    console.log(`photographerHeader`, photographHeader);

    // Create likes sum and price container
    const likeAndPriceContainer = document.createElement('div');
    likeAndPriceContainer.classList.add('like_and_sum_container');

    const likesContainer = document.createElement('div');
    likesContainer.classList.add('likes_container');
    const likesCount = document.createElement('p');
    likesCount.textContent = totalLikes;
    const likesIcon = document.createElement('span');
    likesIcon.className = 'fa-solid fa-heart';

    const priceInformation = document.createElement('p');
    priceInformation.textContent = `${price}€ / jour`;

    likesContainer.appendChild(likesCount);
    likesContainer.appendChild(likesIcon);
    likeAndPriceContainer.appendChild(likesContainer);
    likeAndPriceContainer.appendChild(priceInformation);
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

function getTotalLikes(medias) {
  let likes = 0;
  medias.forEach(media => {
    likes += media.likes;
  });
  return likes;
}
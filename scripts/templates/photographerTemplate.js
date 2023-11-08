/**
 * Function that takes a photographer as parameter
 * Contains a function to create a card for the home page
 * Contains a function to create the header content for a photographer's page
 * @param {object} photographer
 * @returns
 */
function photographerTemplate(photographer) {
  // constructor with factory function
  const { name, portrait, city, country, tagline, price, id } = photographer;
  console.log(photographer);
  /**
   * create image element
   * @param {jpg} picture
   * @param {string} elementClass
   * @param {string} alt
   * @returns
   */
  const createImage = (picture, elementClass, alt) => {
    const profilePicture = document.createElement('img');
    profilePicture.className = elementClass;
    profilePicture.src = picture;
    profilePicture.alt = alt;
    return profilePicture;
  };
  /**
   * create element
   * @param {string} tag
   * @param {string} elementClass
   * @param {string} content
   * @returns
   */
  const createElement = (tag, elementClass, content) => {
    const element = document.createElement(tag);
    element.className = elementClass;
    element.textContent = content;

    return element;
  };

  /**
   * Function that creates an article to display the photographer's card
   * and returns an article containing several DOM elements (a, img, h2, div, p)
   *    A card is contained in an article composed of :
   *        a link containing :
   *            profile picture
   *            photographer's name
   *        a description containing :
   *            location (city + country)
   *            tagline
   *            daily rate
   * @returns
   */
  const createPhotographerCard = () => {
    // article container
    const article = document.createElement('article');
    article.className = 'photographer';
    // link to profil page (img + name)
    const photographerPageLink = createElement('a', 'photographer__link');
    photographerPageLink.setAttribute(
      'href',
      `./pages/photographer.html?id=${id}`
    );
    // profile picture
    // get photographer profile picture
    const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;
    const profilePicture = createImage(
      picture,
      'photographer__profile-picture profile-picture',
      `Profil de ${name}`
    );
    // photographer name
    const photographerName = createElement(
      'h2',
      'photographer__name name',
      name
    );

    photographerPageLink.appendChild(profilePicture);
    photographerPageLink.appendChild(photographerName);

    // description container (location, tagline, price)
    const photographerDescription = document.createElement('div');
    // location
    const photographerLocation = createElement(
      'p',
      'photographer__location location',
      `${city}, ${country}`
    );
    // tagline
    const photographerTagline = createElement(
      'p',
      'photographer__tagline',
      tagline
    );
    // price
    const photographerPrice = createElement(
      'p',
      'photographer__price',
      `${price}€/jour`
    );

    photographerDescription.appendChild(photographerLocation);
    photographerDescription.appendChild(photographerTagline);
    photographerDescription.appendChild(photographerPrice);
    // add all childs to article
    article.appendChild(photographerPageLink);
    article.appendChild(photographerDescription);

    return article;
  };
  /**
   * Function that creates an div to display the photographer's profile
   * and returns a div containing several DOM elements (a, img, h2, div, p)
   *    Profile is composed of :
   *       a presentation containing :
   *          photographer's name
   *          location (city + country)
   *          tagline
   *       a button contact
   *       a profile picture
   * @returns
   */
  const createPhotographerProfile = () => {
    // div container
    const photographerHeader = document.createElement('div');
    photographerHeader.className = 'photographer__header';
    photographerHeader.setAttribute(
      'aria-label',
      `Entête de la page de ${name}`
    );
    // presentation container
    const photographerPresentation = document.createElement('section');
    photographerPresentation.className = 'photographer__presentation';
    // name
    // photographer name
    const photographerName = createElement(
      'h1',
      'photographer__presentation-name name',
      name
    );
    // location
    const photographerLocation = createElement(
      'h2',
      'photographer__presentation-location location',
      `${city}, ${country}`
    );
    // tagline
    const photographerTagline = createElement(
      'p',
      'photographer__presentation-tagline',
      tagline
    );

    // add elements to presentation container
    photographerPresentation.appendChild(photographerName);
    photographerPresentation.appendChild(photographerLocation);
    photographerPresentation.appendChild(photographerTagline);

    // contact button
    const photographerContactButton = createElement(
      'button',
      'photographer__contact-button contact__button',
      'Contactez-moi'
    );
    photographerContactButton.onclick = 'displayModal()';
    // profile picture
    // get photographer profile picture
    const picture = `../assets/photographers/Photographers_ID_Photos/${portrait}`;
    const alt = name ?? '';
    const photographerProfilePicture = createImage(
      picture,
      'photographer__profile-picture profile-picture',
      alt
    );
    // add elements to photographer header container
    photographerHeader.appendChild(photographerPresentation);
    photographerHeader.appendChild(photographerContactButton);
    photographerHeader.appendChild(photographerProfilePicture);
    return photographerHeader;
  };
  return { createPhotographerCard, createPhotographerProfile };
}

export { photographerTemplate };

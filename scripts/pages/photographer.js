  async function getPhotographer() {
    const parameters = new URLSearchParams(window.location.search)
    const idString = parameters.get('id')
  
    // get photographers data with fetch
    const photographerData = await fetch('../data/photographers.json')
      .then((data) => data.json());
  
    // extract photographer object
    const photographer = photographerData.photographers.find(
      (photographer) => photographer.id == idString
    )
    return photographer
  }
  
  // get medias and set popularity by filtering default
  async function getPhotographerMedias(sortBy = 'popularity') {
    const parameters = new URLSearchParams(window.location.search)
    const idString = parameters.get('id')
  
    // get photographers data with fetch
    const photographerData = await fetch('../data/photographers.json')
      .then((data) => data.json())
  
    // extract media objects by photographer ID
    let media = photographerData.media.filter(
      (mediaObj) => mediaObj.photographerId == idString
    )
  
    // sort the media by the specified property for filtering options
    if (sortBy === 'popularity') {
      media.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === 'date') {
      media.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'title') {
      media.sort((a, b) => a.title.localeCompare(b.title));
    }
  
    return media
  }
  
  // photographers
  async function displayHeader(photographer) {
    const photographerHeader = document.querySelector('.photograph-header');
    const photographerModel = photographerFactory(photographer);
    const photographerHeaderDOM = photographerModel.getPhotographerHeaderDOM();
    photographerHeader.appendChild(photographerHeaderDOM);
  }
  
  // medias
  async function displayMedia(media) {
    const mediaContainer = document.querySelector('.photograph-body');
  
    if (mediaContainer) {
      media.forEach((mediaObj) => {
        const mediaModel = mediaFactory(mediaObj);
        const mediaDOM = mediaModel.getMediaDOM();
        mediaContainer.appendChild(mediaDOM);
      });
    }
  }
  
  // price per day photographer
  async function displayCounts(photographer) {
    const main = document.querySelector('main');
    const countDOM = document.createElement('div');
    countDOM.classList.add('counter');
  
    // Get all divs with the class .photograph-media-likes-count
    const likesList = document.querySelectorAll('.photograph-media-likes-count');
  
    let totalLikes = 0;
    // Iterate through each div and add up the total likes
    likesList.forEach(likesDiv => {
      const likes = parseInt(likesDiv.textContent);
      totalLikes += likes;
    });
  
    countDOM.innerHTML =
      `<div class="counter-likes">
          ${totalLikes} <i class="fas fa-heart"></i>
      </div>
      <div class="counter-daily">
          ${photographer.price} <span>€ /jour</span>
      </div>`;
  
    main.appendChild(countDOM);
  }
  
// Get the select element and add an event listener to it
const filterSelect = document.querySelector('#filter-select');
filterSelect.addEventListener('change', (event) => {
  // Get the selected option value
  const sortBy = event.target.value;

  // Update the URL with the selected option value
  const parameters = new URLSearchParams(window.location.search);
  parameters.set('sort', sortBy);
  window.location.search = parameters.toString();

  // Update the selected option in the filter button
  filterSelect.value = sortBy;
});
  
async function init() {

    // Get photographers infos
    const photographer = await getPhotographer();
    displayHeader(photographer);
  
    // Get the sort filter from the URL parameters
    const parameters = new URLSearchParams(window.location.search);
    const sortBy = parameters.get('sort');
  
    // Get photographers media with the specified sort filter
    const photographerMedias = await getPhotographerMedias(sortBy);
    displayMedia(photographerMedias);
    
    // Display photographer's price
    displayCounts(photographer);
  
    // Add photographer's name to contact form title
    const contactModalTitle = document.querySelector('#contact_modal_title');
    contactModalTitle.innerHTML = `Contactez-moi ${photographer.name}`;
  
    // Set the selected option in the filter button based on the URL parameter
    if (sortBy === 'date') {
      filterSelect.selectedIndex = 1;
    } else if (sortBy === 'title') {
      filterSelect.selectedIndex = 2;
    } else {
      filterSelect.selectedIndex = 0;
    }
  }
  
  init();  
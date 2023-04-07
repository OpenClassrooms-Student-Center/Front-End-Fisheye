// Get the query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');
let filter = urlParams.get('filter');

// If no filter is specified, set the default filter to 'populaire'
if (!filter) {
  filter = 'popularité';
  // Add the default filter to the URL
  urlParams.set('filter', filter);
  window.history.replaceState(null, null, "?" + urlParams.toString());
}

// Filter the photographers based on the filter parameter
let filteredPhotographers = photographers;

if (filter === 'popularité') {
  filteredPhotographers = photographers.filter(photographer => photographer.popularity >= 4);
} else if (filter === 'nouveaute') {
  filteredPhotographers = photographers.filter(photographer => photographer.date_added > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
}

// Render the filtered photographers
renderPhotographers(filteredPhotographers, photographerId);

const filterSelect = document.getElementById('filter-select');
const mediaContainer = document.getElementById('media-container');
const mediaObjects = [...document.querySelectorAll('.photograph-body')];

filterSelect.addEventListener('change', function() {
  const selectedOption = this.value;
  let filteredMediaObjects = [];

  if (selectedOption === 'popularité') {
    filteredMediaObjects = mediaObjects.filter(mediaObject => {
      const likesCount = Number(mediaObject.querySelector('.photograph-media-likes-count').textContent);
      return likesCount >= 4;
    });
  } else if (selectedOption === 'date') {
    filteredMediaObjects = mediaObjects.filter(mediaObject => {
      const dateString = mediaObject.querySelector('.photograph-media-date').textContent;
      const date = new Date(dateString);
      return date > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    });
  } else if (selectedOption === 'title') {
    filteredMediaObjects = mediaObjects.sort((a, b) => {
      return a.querySelector('.photograph-media-title').textContent.localeCompare(
        b.querySelector('.photograph-media-title').textContent);
    });
  }

  const filteredMediaHTML = filteredMediaObjects.map(mediaObject => mediaObject.outerHTML).join('');
  mediaContainer.innerHTML = filteredMediaHTML;

  // Update the filter parameter in the URL
  urlParams.set('filter', selectedOption);
  window.history.replaceState(null, null, "?" + urlParams.toString());
});

filterSelect.value = filter || 'popularité';

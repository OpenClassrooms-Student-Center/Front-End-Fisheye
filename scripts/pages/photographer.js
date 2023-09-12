let mediasSorted = [];
let currentFilter = 'likes';
let currentPhotographer = null;
const mainElt = document.querySelector('main');

function displayData(photographer, medias) {
  mediasSorted = medias;
  currentPhotographer = photographer;

  // const mainElt = document.querySelector('main');

  // const photographerModel = photographerTemplate(photographer, medias);
  // const photographerDetails = photographerModel.getPhotographerDetails();

  // const sortedByContainer = createSortedByContainerElement();
  
  // const mediasContainer = document.createElement('section');
  // mediasContainer.classList.add('photograph_medias');
  
  // mediasSorted = sortMedias('likes');

  // mediasSorted.forEach((media, index, list) => {
  //   const mediaModel = mediaTemplate(media, photographer, list);
  //   const mediaDOM = mediaModel.mediaDOM();
  //   mediasContainer.appendChild(mediaDOM);
  // });
  
  // mainElt.appendChild(photographerDetails);
  // mainElt.appendChild(sortedByContainer);
  // mainElt.appendChild(mediasContainer);

  const photographerDetails = displayPhotographerData();

  const sortedByContainer = createSortedByContainerElement();

  const mediasContainer = document.createElement('section');
  mediasContainer.classList.add('photograph_medias');

  mediasSorted = sortMedias(currentFilter);

  displayMedias(mediasContainer);

  mainElt.appendChild(photographerDetails);
  mainElt.appendChild(sortedByContainer);
  mainElt.appendChild(mediasContainer);

}

function displayPhotographerData() {
  const photographerModel = photographerTemplate(currentPhotographer, mediasSorted);
  const photographerDetails = photographerModel.getPhotographerDetails();

  return photographerDetails;
}

function displayMedias(mediasContainer) {

  console.log(`dans displayMedias`, mediasSorted);
  mediasSorted.forEach((media, index, list) => {
    const mediaModel = mediaTemplate(media, currentPhotographer, list);
    const mediaDOM = mediaModel.mediaDOM();
    mediasContainer.appendChild(mediaDOM);
  });
}

async function init() {
  const params =  new URL(document.location).searchParams;
  const id = parseInt(params.get('id'));

  try {
    const photographerData = await getPhotographerById(id);
    displayData(photographerData.photographer, photographerData.media);
  } catch (error) {
    console.log(`error`, error);
  }
}

init();

function createSortedByContainerElement() {
  // Containt title and dropdown list
  const sortedByContainer = document.createElement('div');
  sortedByContainer.classList.add('sorted_by_container');
  // Title
  const sortedByTitle = document.createElement('h3');
  sortedByTitle.textContent = 'Trier par';

  // Dropdown container (button + dropdown div)
  const dropdownContainer = document.createElement('div');
  dropdownContainer.classList.add('dropdown_container');

  // Button
  const sortButton = createSortButton();

  dropdownContainer.appendChild(sortButton);

  // Dropdown div
  const dropdownElt = document.createElement('div');
  dropdownElt.classList.add('dropdown_list');
  dropdownElt.classList.add('hidden');
  
  // Dropdown option
  const opt1Container = document.createElement('div');
  opt1Container.classList.add('dropdown_option_container');
  const opt1 = document.createElement('span');
  opt1.textContent = 'Titre';
  opt1.dataValue = 'title'
  opt1.classList.add('dropdown_option');
  opt1Container.appendChild(opt1);
  opt1Container.addEventListener('click', (e) => selectOpt(opt1.dataValue, opt1.textContent, e));

  dropdownElt.appendChild(opt1Container);
  
  dropdownContainer.appendChild(dropdownElt);
  
  sortedByContainer.appendChild(sortedByTitle);
  sortedByContainer.appendChild(dropdownContainer);

  return sortedByContainer;
}

function createSortButton() {
  const sortButton = document.createElement('button');
  sortButton.classList.add('sort_btn');
  sortButton.dataValue = 'likes';
  const btnText = document.createElement('p');
  btnText.textContent = 'Popularité';
  sortButton.addEventListener('click', openDropdown);
  const btnIcon = document.createElement('span');
  btnIcon.className = 'fa-solid fa-chevron-down';
  sortButton.appendChild(btnText);
  sortButton.appendChild(btnIcon);

  return sortButton;
}

function openDropdown() {
  toggleSortIcon();
  toggleIsOpened();
}

function selectOpt(value, text, e) {
  e.stopPropagation();
  sortMedias(value);
  const mediasContainer = document.querySelector('.photograph_medias');
  mediasContainer.innerHTML = '';

  toggleIsOpened()
  toggleSortIcon();

  
  const sortButton = document.querySelector('.sort_btn');
  const sortButtonText = document.querySelector('.sort_btn p');
  setOptValues(sortButton.dataValue, sortButtonText.textContent);
  setSortButtonValues(sortButton, sortButtonText, value, text);

  displayMedias(mediasContainer);
}

function sortMedias(property) {
  return mediasSorted.sort((a, b) => {
    if (property === 'likes') {
      return b[property] - a[property]
    }
    return a[property].localeCompare(b[property])
  })
}

function toggleSortIcon() {
  const btnIcon = document.querySelector('.sorted_by_container .sort_btn span');
  btnIcon.className = btnIcon.className === 'fa-solid fa-chevron-up' ? 
  'fa-solid fa-chevron-down' : 
  'fa-solid fa-chevron-up';
}

function toggleIsOpened() {
  const sortBtn = document.querySelector('.sort_btn');
  sortBtn.classList.toggle('opened');
  const dropdownElt = document.querySelector('.dropdown_list');
  dropdownElt.classList.toggle('hidden');
}

function setSortButtonValues(sortButton, sortButtonText, value, text) {
  // const sortButton = document.querySelector('.sort_btn');
  // const sortButtonText = document.querySelector('.sort_btn p');
  console.log(`sortButton`, sortButton);
  sortButton.dataValue = value;
  sortButtonText.textContent = text;
}

function setOptValues(value, text) {
  const opt1 = document.querySelector('.dropdown_option');
  opt1.dataValue = value;
  opt1.textContent = text;
}
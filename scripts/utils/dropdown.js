/**
 * Create the container of dropdown title and dropdown
 */
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
  opt1.dataset.value = 'title'
  opt1.classList.add('dropdown_option');
  opt1Container.appendChild(opt1);
  opt1Container.addEventListener('click', (e) => selectOpt(opt1.dataset.value, opt1.textContent, e));

  
  const opt2Container = document.createElement('div');
  opt2Container.classList.add('dropdown_option_container');
  const opt2 = document.createElement('span');
  opt2.textContent = 'Date';
  opt2.dataset.value = 'date'
  opt2.classList.add('dropdown_option');
  opt2Container.appendChild(opt2);
  opt2Container.addEventListener('click', (e) => selectOpt(opt2.dataset.value, opt2.textContent, e));

  dropdownElt.appendChild(opt1Container);
  dropdownElt.appendChild(opt2Container);
  
  dropdownContainer.appendChild(dropdownElt);
  
  sortedByContainer.appendChild(sortedByTitle);
  sortedByContainer.appendChild(dropdownContainer);

  return sortedByContainer;
}

/**
 * Create the button dropdown to sort medias
 * @returns button
 */
function createSortButton() {
  const sortButton = document.createElement('button');
  sortButton.classList.add('sort_btn');
  sortButton.dataset.value = 'likes';
  const btnText = document.createElement('p');
  btnText.textContent = 'Popularité';
  sortButton.addEventListener('click', openDropdown);
  const btnIcon = document.createElement('span');
  btnIcon.className = 'fa-solid fa-chevron-down';
  sortButton.appendChild(btnText);
  sortButton.appendChild(btnIcon);

  return sortButton;
}

/**
 * On click on dropdown, toggle sort button icon and is_opened class
 */
function openDropdown() {
  toggleSortIcon();
  toggleIsOpenedAndHidden();
}

/**
 * On click on dropdown option, sort media with the dataValue,
 * reset the medias list, close Dropdown and update dropdown element,
 * and finally display new medias list
 * @param {*} value
 * @param {*} text
 * @param {*} e
 */
function selectOpt(value, text, e) {
  sortMedias(value);
  const mediasContainer = document.querySelector('.photograph_medias');
  mediasContainer.innerHTML = '';

  toggleIsOpenedAndHidden()
  toggleSortIcon();

  const sortButton = document.querySelector('.sort_btn');
  const sortButtonText = document.querySelector('.sort_btn p');
  setOptValues(sortButton.dataset.value, sortButtonText.textContent, value);
  setSortButtonValues(sortButton, sortButtonText, value, text);

  displayMedias(mediasContainer);
}

/**
 * Sort the medias list by Property
 * @param {*} property the property chosen to sort the medias list
 * @returns new sorted list
 */
function sortMedias(property) {
  console.log(`property`, property);
  return mediasSorted.sort((a, b) => {
    if (property === 'likes') {
      return b[property] - a[property]
    }
    return a[property].localeCompare(b[property])
  })
}

/**
 * Toggle the dropdown button icon
 */
function toggleSortIcon() {
  const btnIcon = document.querySelector('.sorted_by_container .sort_btn span');
  btnIcon.className = btnIcon.className === 'fa-solid fa-chevron-up' ? 
  'fa-solid fa-chevron-down' : 
  'fa-solid fa-chevron-up';
}

/**
 * Toggle the opened class on button and the hidden class on dropdownElt
 */
function toggleIsOpenedAndHidden() {
  const sortBtn = document.querySelector('.sort_btn');
  sortBtn.classList.toggle('opened');
  const dropdownElt = document.querySelector('.dropdown_list');
  dropdownElt.classList.toggle('hidden');
}

/**
 * Set the new values of sortButton dataValue and sortButtonText textContent
 * @param {*} sortButtonElt 
 * @param {*} sortButtonTextElt
 * @param {*} value 
 * @param {*} text 
 */
function setSortButtonValues(sortButtonElt, sortButtonTextElt, value, text) {
  sortButtonElt.dataset.value = value;
  sortButtonTextElt.textContent = text;
}

/**
 * Set the new value of dropdown opt
 * @param {*} value 
 * @param {*} text 
 */
function setOptValues(value, text, oldValue) {
  const opt1 = document.querySelector(`[data-value="${oldValue}"]`);
  opt1.dataset.value = value;
  opt1.textContent = text;
}
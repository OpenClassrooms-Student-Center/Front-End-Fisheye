/**
 * Create the container of dropdown title and dropdown
 */
function createDropdown(dropdownOptions) {
  // Containt title and dropdown list
  const sortedByContainer = document.createElement('div');
  sortedByContainer.classList.add('sorted_by_container');
  // Title
  const sortedByTitle = document.createElement('h3');
  sortedByTitle.textContent = 'Trier par';

  // Dropdown container (button + dropdown list)
  const dropdownContainer = document.createElement('div');
  dropdownContainer.classList.add('dropdown_container');

  // Create button dynamically
  const sortButton = createSortButton(dropdownOptions);
  // window.addEventListener('click', closeDropdown);

  dropdownContainer.appendChild(sortButton);
  // Dropdown div
  const dropdownElt = document.createElement('div');
  dropdownElt.classList.add('dropdown_list');
  dropdownElt.classList.add('hidden');
  
  // Create options dynamically
  dropdownOptions.filter(opt => !opt.isSelected).forEach(opt => {
    const divider = document.createElement('div');
    divider.classList.add('divider');
    const option = createOption(opt);
    dropdownElt.appendChild(divider);
    dropdownElt.appendChild(option);
  });
  dropdownContainer.appendChild(dropdownElt);

  sortedByContainer.appendChild(sortedByTitle);
  sortedByContainer.appendChild(dropdownContainer);

  return sortedByContainer;
}

/**
 * Create the button dropdown to sort medias
 * @returns button
 */
function createSortButton(dropdownOptions) {
  const selectedOption = dropdownOptions.find(opt => opt.isSelected);
  const sortButton = document.createElement('button');
  sortButton.classList.add('sort_btn');
  sortButton.dataset.value = selectedOption.value;
  const btnText = document.createElement('p');
  btnText.textContent = selectedOption.text;
  sortButton.addEventListener('click', (e) => openDropdown(e), true);
  const btnIcon = document.createElement('span');
  btnIcon.className = 'fa-solid fa-chevron-down';
  sortButton.appendChild(btnText);
  sortButton.appendChild(btnIcon);

  return sortButton;
}

/**
 * Create option
 * @param {*} opt 
 */
function createOption(opt) {
  const optContainer = document.createElement('div');
  optContainer.classList.add('dropdown_option_container');
  const option = document.createElement('span');
  option.dataset.value = opt.value
  option.textContent = opt.text;
  option.classList.add('dropdown_option');
  optContainer.appendChild(option);
  optContainer.addEventListener('click', () => selectOpt(option.dataset.value, option.textContent));

  return optContainer;
}

/**
 * On click on dropdown, toggle sort button icon and is_opened class
 */
function openDropdown(e) {
  e.stopPropagation();
  window.addEventListener('click', closeDropdown);

  toggleSortIcon();
  toggleIsOpenedAndHidden();
  
}

/**
 * Close the dropdown when click outside
 */
function closeDropdown() {
  const btnIcon = document.querySelector('.sorted_by_container .sort_btn span');
  btnIcon.className = 'fa-solid fa-chevron-down';
  const sortBtn = document.querySelector('.sort_btn');
  sortBtn.classList.remove('opened');
  const dropdownElt = document.querySelector('.dropdown_list');
  dropdownElt.classList.add('hidden');
  window.removeEventListener('click', closeDropdown);
}

/**
 * On click on dropdown option, sort media with the dataValue,
 * reset the medias list, close Dropdown and update dropdown element,
 * and finally display new medias list
 * @param {*} value
 * @param {*} text
 */
function selectOpt(value, text) {
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
  
  if (dropdownElt.classList.contains('hidden')) {
    window.removeEventListener('click', closeDropdown);
  }
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
  const opt = document.querySelector(`[data-value="${oldValue}"]`);
  opt.dataset.value = value;
  opt.textContent = text;
}

let dropdownContainer = document.querySelector('.dropdown_container') ?? null;
let focusableElts = [];

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
  dropdownContainer = document.createElement('div');
  dropdownContainer.classList.add('dropdown_container');

  // Create button dynamically
  const sortButton = createSortButton(dropdownOptions);
  sortButton.role = 'listbox';
  sortButton.ariaHasPopup = true;
  sortButton.ariaExpanded = false;
  sortButton.classList.add('sort_btn');
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
    option.role = 'option';
    option.tabIndex = 0;
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
  sortButton.dataset.value = selectedOption.value;
  const btnText = document.createElement('p');
  btnText.textContent = selectedOption.text;
  sortButton.addEventListener('click', openDropdown, true);
  const btnIcon = document.createElement('span');
  btnIcon.ariaHidden = true;
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
  handleAriaExpanded();
  focusableElts = Array.from(dropdownContainer.querySelectorAll('button, .dropdown_option_container'));
  trapFocusInDropdown(dropdownContainer);
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
  handleAriaExpanded();

  window.removeEventListener('click', closeDropdown);
  dropdownContainer.removeEventListener('keydown', handleKeydownOnDropdown);
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
  dropdownContainer.removeEventListener('keydown', handleKeydownOnDropdown);
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
    console.log(`a et b`, a, b);
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
  } else {
    const options = document.querySelectorAll('.dropdown_option_container');
    options.forEach(opt => {
      opt.tabIndex = 0;
    })
    // ajouter aussi option sur le bouton, ou au moins le label
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

/**
 * Handle dropdown aria-expanded
 */
function handleAriaExpanded() {
  const sortButton = document.querySelector('.sort_btn');
  sortButton.setAttribute('aria-expanded', `${!(sortButton.getAttribute('aria-expanded') === 'true')}`)
}

function trapFocusInDropdown() {
  dropdownContainer.addEventListener('keydown', handleKeydownOnDropdown);
}

function handleKeydownOnDropdown(e) {
  const keyCode = e.key;
  const firstFocusableElt = focusableElts[0];
  const lastFocusableElt = focusableElts[focusableElts.length - 1];
  currentEltIndex = focusableElts.findIndex(elt => elt === document.activeElement);
  const dropdownElt = document.querySelector('.dropdown_list');

  if (keyCode === 'Escape') {
    closeDropdown();
  } else if (e.key === 'Enter') {
    if (!dropdownElt.classList.contains('hidden')) {
      const opt = e.currentTarget.querySelector('.dropdown_option');
      selectOpt(opt.dataset.value, opt.textContent);
      dropdownContainer.removeEventListener('keydown', handleKeydownOnDropdown);
    }
  } else if (keyCode === 'ArrowUp') {
    e.preventDefault();
    if (document.activeElement === firstFocusableElt) {
      lastFocusableElt.focus();
    } else {
      currentEltIndex -= 1;
      focusableElts[currentEltIndex].focus();
    }
  } else if (keyCode === 'ArrowDown') {
    e.preventDefault();
    if (document.activeElement === lastFocusableElt) {
      firstFocusableElt.focus();
    } else {
      currentEltIndex += 1;
      focusableElts[currentEltIndex].focus();
    }
  } else if (keyCode === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElt) {
        lastFocusableElt.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElt) {
        firstFocusableElt.focus();
        e.preventDefault();
      }
    }
  }
}
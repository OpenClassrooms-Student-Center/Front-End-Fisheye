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

export { createElement, createImage };

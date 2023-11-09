/**
 * create image element
 * @param {jpg} picture
 * @param {string} elementClass
 * @param {string} alt
 * @returns
 */
export const createImage = (picture, elementClass, alt) => {
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
export const createElement = (tag, elementClass, content) => {
  const element = document.createElement(tag);
  element.className = elementClass;
  element.textContent = content;

  return element;
};

/**
 * @typedef {Object} ElementOptions
 * @property {Object.<string, string>} [attributes]
 * @property {string} [innerText]
 * @property {Array<{ tagName: string, options: ElementOptions }>} [children]
 */

/**
 * @param {string} tagName
 * @param {ElementOptions} options
 * @returns {HTMLElement}
 */
export function createElement(tagName, options = {}) {
	const { attributes, innerText, children } = options;

	const element = document.createElement(tagName);

	if (attributes) {
		Object.entries(attributes).forEach(([name, value]) => {
			element.setAttribute(name, value);
		});
	}
	if (innerText) {
		element.innerText = innerText;
	}
	if (children) {
		children.forEach(({ tagName, options }) => {
			const childElement = createElement(tagName, options);
			element.appendChild(childElement);
		});
	}

	return element;
}

/**
 * @param {{}} options
 * @returns {HTMLElement}
 */
function createElement(options) {
	const {
		tagName,
		attributes = {},
		innerText,
		className,
		children,
	} = options;

	const element = document.createElement(tagName);

	Object.entries(attributes).forEach(([name, value]) => {
		element.setAttribute(name, value);
	});

	if (innerText) element.innerText = innerText;
	if (className) element.className = className;

	children?.forEach((options) => {
		const childElement = createElement(options);
		element.appendChild(childElement);
	});

	return element;
}

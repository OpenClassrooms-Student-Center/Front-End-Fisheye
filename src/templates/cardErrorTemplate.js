import { createElement } from "../utils/createElement";

/**
 * @param {{errorMessage: string}} props
 * @returns {HTMLElement}
 */
export function cardErrorTemplate(props) {
	const { errorMessage } = props;

	const cardErrorDOM = createElement("div", {
		attributes: {
			class: "error-body",
		},
		children: [
			{
				tagName: "div",
				options: {
					attributes: { class: "error-message" },
					children: [
						{
							tagName: "p",
							options: { innerText: errorMessage },
						},
					],
				},
			},
		],
	});

	return cardErrorDOM;
}

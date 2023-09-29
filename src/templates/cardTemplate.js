// eslint-disable-next-line no-unused-vars
import { PhotographerModel } from "../models/photographerModel";
import { createElement } from "../utils/createElement";

/**
 * @param {PhotographerModel} props
 * @returns {HTMLElement}
 */
export function cardTemplate(props) {
	const { name, id, city, country, tagline, price, portrait } = props;

	const linkHref = `photographer.html?id=${id}`;
	const linkPortrait = `photographers/${portrait}`;
	const location = `${city}, ${country}`;
	const tjm = `${price}€/jour`;

	const cardDOM = createElement("article", {
		children: [
			{
				tagName: "a",
				options: {
					attributes: {
						href: linkHref,
						"aria-label": name,
					},
					children: [
						{
							tagName: "img",
							options: {
								attributes: {
									src: linkPortrait,
									alt: name,
								},
							},
						},
						{
							tagName: "h2",
							options: {
								innerText: name,
							},
						},
					],
				},
			},
			{
				tagName: "p",
				options: { innerText: location },
			},
			{
				tagName: "p",
				options: { innerText: tagline },
			},
			{
				tagName: "p",
				options: { innerText: tjm },
			},
		],
	});

	return cardDOM;
}

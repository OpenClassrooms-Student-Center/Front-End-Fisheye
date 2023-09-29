// eslint-disable-next-line no-unused-vars
import { PhotographerModel } from "../models/photographerModel";
import { cardErrorTemplate } from "../templates/cardErrorTemplate";
import { cardTemplate } from "../templates/cardTemplate";

export class PhotographersView {
	/**  @param {string} selector */
	constructor(selector) {
		this.photographersList = document.querySelector(selector);
	}

	/** @param {PhotographerModel[]} photographers */
	displayPhotographers(photographers) {
		this.photographersList.innerHTML = "";

		photographers.forEach((photographer) => {
			const card = cardTemplate(photographer);
			this.photographersList.appendChild(card);
		});
	}

	/**  @param {string} errorMessage */
	displayError(errorMessage) {
		const cardError = cardErrorTemplate({ errorMessage });
		this.photographersList.appendChild(cardError);
	}
}

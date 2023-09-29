import { FetchAPIException } from "../utils/FetchAPIException";
// eslint-disable-next-line no-unused-vars
import { PhotographersService } from "../services/PhotographersService";
// eslint-disable-next-line no-unused-vars
import { PhotographersView } from "../views/PhotographersView";

export class PhotographersController {
	/**
	 * @param {PhotographersService} photographersService
	 * @param {PhotographersView} photographersView
	 */
	constructor(photographersService, photographersView) {
		this._photographersService = photographersService;
		this._photographersView = photographersView;
	}

	async init() {
		try {
			const photographers =
				await this._photographersService.getAllPhotographersData();

			this._photographersView.displayPhotographers(photographers);
		} catch (error) {
			if (error instanceof FetchAPIException) {
				this._photographersView.displayError(error?.message);
				return;
			}
			console.error(error);
		}
	}
}

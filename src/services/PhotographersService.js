// eslint-disable-next-line no-unused-vars
import { IPhotographerAPI } from "../interfaces/PhotographerAPI";
import { PhotographerModel } from "../models/photographerModel";

export class PhotographersService {
	/** @param {IPhotographerAPI} apiService */
	constructor(apiService) {
		this._apiService = apiService;
	}

	/** @returns {Promise<PhotographerModel[]>} */
	async getAllPhotographersData() {
		const apiData = await this._apiService.fetchPhotographers();

		if (!apiData?.photographers) throw apiData;

		const photographers = apiData.photographers.map(
			({ name, id, city, country, tagline, price, portrait }) =>
				new PhotographerModel(
					name,
					id,
					city,
					country,
					tagline,
					price,
					portrait
				)
		);

		return photographers;
	}
}

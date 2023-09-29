export class IPhotographerAPI {
	/** @returns {Promise<{photographers: PhotographerModel[]}>} */
	async fetchPhotographers() {
		throw new Error("fetchPhotographers() à implémenter !");
	}

	async fetchMedia() {
		throw new Error("fetchMedia() à implémenter !");
	}
}

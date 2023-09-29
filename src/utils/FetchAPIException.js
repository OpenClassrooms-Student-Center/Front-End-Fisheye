export class FetchAPIException extends Error {
	/**
	 * @param {number} status
	 * @param {string} statusText
	 */
	constructor(status, statusText) {
		super();
		this.name = "FetchAPIException";
		this.status = status;
		this.statusText = statusText;
		this.message = this.getStatusMessage(status);
	}

	/**
	 * @param {number} status
	 * @returns {string}
	 */
	getStatusMessage(status) {
		switch (status) {
			case 404:
				return this.notFound();
			default:
				return "";
		}
	}

	notFound() {
		return "Les photographes ne sont pas disponible.";
	}
}

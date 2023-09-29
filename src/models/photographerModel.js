export class PhotographerModel {
	/**
	 * @param {string} name
	 * @param {number} id
	 * @param {string} city
	 * @param {string} country
	 * @param {string} tagline
	 * @param {number} price
	 * @param {string} portrait
	 */
	constructor(name, id, city, country, tagline, price, portrait) {
		this.name = name;
		this.id = id;
		this.city = city;
		this.country = country;
		this.tagline = tagline;
		this.price = price;
		this.portrait = portrait;
	}
}

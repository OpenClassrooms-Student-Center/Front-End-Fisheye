

export default class UserCardFactory {

	static createFromPhotographer(photographerData) {

		const { name, id, city, country, tagline, price, portrait } = photographerData
		return new UserCard(name, id, city, country, tagline, price, portrait).create()
	}
}

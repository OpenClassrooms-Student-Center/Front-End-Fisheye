/**
 * class Api
 */
export default class Api {

    static photographers
    static media

    /**
     * ENG: This function retrieves all json data
     * FRA: Cette fonction récupère toutes les données json
     */
    static init = async () => {

        const request = await fetch('../../data/photographers.json');

        if (!request.ok) {
            console.log('Data introuvable', `status code: ${request.status}`);
        }

        const data =  await request.json();

        Api.photographers = data.photographers;
        Api.medias = data.media;
    }

    /* GETTERS */

    /**
     * ENG: Get all Photographers
     * FRA: Obtenir tous les photographes
     * @returns {object}
     */
    static getAllPhotographers = () => {
        return Api.photographers;
    }
}
// Importer le fichier JSON des photographes
/**
 * @class Api
 * @description - Crée une nouvelle instance de la  classe Api
 * @param {String} url - URL de l'API
 * @export {Api}
 * 
 */
export default class Api {
  constructor(url){
      this.url = url;
  }
  async get(){
    try{
        const response = await fetch(this.url);
        const data = await response.json();
        return data;
    } catch(err){
        throw new Error(err);
    }
}
};
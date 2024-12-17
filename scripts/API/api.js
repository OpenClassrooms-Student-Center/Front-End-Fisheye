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
  async get() {
    try {
      const response = await fetch(this.url);

      // Vérifiez l'en-tête Content-Type avant de parser en JSON
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return data;
      } else {
        // Gérer les réponses non-JSON de manière appropriée
        console.error("Le serveur a renvoyé des données non-JSON:", response.status, await response.text());
        return null; // Ou lancez une erreur, ou gérez-la d'une autre manière
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des données:", err);
      return null; // ou lancez une erreur
    }
  }
}
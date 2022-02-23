class ApiProvider {
  
    getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        return fetch("./data/photographers.json");
        
        }
}

export {ApiProvider}

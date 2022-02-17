class ApiProvider {
  
    constructor(city, id )
    {
        this.city 
        this.id 
    }
}

async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    let response = await fetch("./data/photographers.json");
    let data = await response.json();
    
    return data;
  }
export { ApiProvider }
export { getPhotographers }

// creation d'une factory standard

function photographerFactoryBis(data) {
    // construit le html du header
    function getUserHeader() {
      const htmlHeader = `
                  <h2>test</h2>       
              <div class="photographer-details">
                          <h3>test, test</h3>
                          <h5>test</h5>
                         
              </div>`;
      const article = document.createElement("article");
      article.innerHTML = htmlHeader;
      console.log("je passe par ici");
  
      return article;
    }
  
    return  getUserHeader ;
  }
photographerFactoryBis()

export class Onephotographer{
    async getOnePhotographer() {
        const url = new URLSearchParams(document.location.search);
        const id = parseInt(url.get("id"));
        
          const response = await fetch("../../data/photographers.json");
          const data = await response.json();
          const photographer = data.photographers.find((onePhotographer) => onePhotographer.id === id)
          console.log(photographer)
          this.insertHeaderPhotographer(photographer)
    }     
    

      insertHeaderPhotographer(photographer) {
        const {name, portrait, city, country, tagline, price} = photographer
        console.log(name)
      }
    }
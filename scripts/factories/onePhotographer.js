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
        const {name, portrait, city, country, tagline} = photographer
        const nameElement = document.querySelector('.photograph_infos > h1')
        const locationElement = document.querySelector('.photograph_infos > p')
        const taglineElement = document.querySelector('.photograph_infos > p2')
      
        nameElement.textContent = name
        locationElement.textContent = city + ', ' + country
        taglineElement.textContent = tagline
      
        const header = document.querySelector('.photograph-header')
        const image = document.createElement('img')
      
        image.src = `../../assets/photographers/${portrait}`
        image.alt = photographer.name
      
        header.appendChild(image)
      }      
      }
    
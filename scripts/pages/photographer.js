import { MediasApi } from "../api/api.js";
// import {
//   photographerPageTemplate,
//   photographerMediaTemplate,
// } from "../templates/photographerPage.js";
import { PhotographersApi } from "../api/api.js";
import { Photographer } from "../class/photographer.js";

// Get photographer id
let id = new URLSearchParams(window.location.search).get("id");

class PhotographerPages {
  constructor() {
    this.photographersApi = new PhotographersApi(
      "../../data/photographers.json"
    );
    this.mediasApi = new MediasApi("../../data/photographers.json");

    this.photographer = async () => {
      const photographerData = await this.photographersApi.getPhotographers();
      photographerData.map((photographer) => new Photographer(photographer));
      const photographerDataFiltered = photographerData.find(
        (photographer) => photographer.id == id
      );
      return photographerDataFiltered;
    };

    this.media = async () => {
      const mediasData = await this.mediasApi.getMedias();
      mediasData.map((media) => new MediasFactory(media));
      const mediasDataFiltered = mediasData.filter(
        (photographer) => photographer.photographerId == id
      );
      return mediasDataFiltered;
    };
    
  }
  	// Render aboutPhotographer
	async aboutPhotographer() {
		const photographer = await this.photographer();
		const template = new AboutPhotographer(photographer);
		this.$aboutPhotographerWrapper.appendChild(template.createAboutPhotographer());
	}
}

export { PhotographerPages };

// async function getPhotographerById(id) {
//   const photographersApi = new PhotographersApi("/data/photographers.json");

//   // Retrieve photographers using the API
//   const getPhotographers = await photographersApi.getPhotographers();

//   const fetchedPhotographer = getPhotographers.find(
//     (photographer) => photographer.id === Number(id)
//   );

//   return fetchedPhotographer;
// }

// async function displayPhotographerData(id) {
//   try {
//     const photographer = await getPhotographerById(id);

//     if (!photographer) {
//       console.log("Photographer not found");
//       return;
//     }

//     // Create the photographer's template
//     const photographerModel = photographerPageTemplate(photographer);
//     const userCardDOM = photographerModel.getUserCardDOM();

//     // Add the elements to the "photograph-header" class
//     const photographerInfo = document.querySelector(".photograph-header");
//     photographerInfo.appendChild(userCardDOM);

//     // Update the page title
//     document.title = `Fisheye - ${photographer.name}`;

//     // Pass photographer to photographerMediaTemplate
//     photographerMediaTemplate(id);
//   } catch (error) {
//     console.error("Error fetching photographer data:", error);
//   }
// }

// //------------------------------------------------------------------------
// class PhotographerPagesMedia {
//   constructor() {
//     this.mediasApi = new MediasApi("/data/photographers.json");
//   }

//   // Fetch media data
//   async media() {
//     const mediasApiData = await this.mediasApi.getMedias();

//     try {
//       const mediasApi = new MediasApi("../../data/photographers.json");
//       const mediasData = await mediasApi.getMedias();
//       return mediasData;
//     } catch (error) {
//       console.error("Error fetching media data:", error);
//       return [];
//     }
//   }

//   // Render medias
//   async medias(id) {
//     try {
//       const photographer = await getPhotographerById(id);
//       const mediasData = await this.media();
//       const filteredMedias = mediasData.filter(
//         (media) => media.photographerId === Number(id)
//       );
//       return photographerMediaTemplate(filteredMedias, photographer);
//     } catch (error) {
//       console.error("Error rendering media:", error);
//     }
//   }
// }

// // Create an instance of the class and call the medias method
// const photographerPagesMedia = new PhotographerPagesMedia();
// photographerPagesMedia.medias();

// //------------------------------------------------------------------------

// async function init() {
//   const id = new URLSearchParams(window.location.search).get("id");
//   const app = new PhotographerPagesMedia();
//   const mediaData = await app.medias(id);

//   // Get photographer data
//   try {
//     await displayPhotographerData(id);
//   } catch (error) {
//     console.error("Error fetching photographers data:", error);
//   }
// }

// init();

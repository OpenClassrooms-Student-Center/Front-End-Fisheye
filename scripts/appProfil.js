import { ApiProvider } from "./providers/apiProvider.js";
import { buildFilters } from "./factories/buildFilters.js";
import { ProfilPage } from "./pages/ProfilPage.js";
import { Lightbox } from "./utils/Lightbox.js";
import { submitForm} from "./utils/contactForm.js";
// import { addOneLike} from "./utils/likes.js"
////////////////////////////////////////

//va chercher les données du json dans la class ApiProvider
new ApiProvider()
  .getPhotographers()

  .then(function (apiResult) {
    return apiResult.json();
  })
  .then(function (response) {
    let page = new ProfilPage(response);
    page.generateAll();
    let lightbox = new Lightbox(response) ;
    lightbox.generateLightbox();
    submitForm()
  })
  .catch(function (e) {
    console.log("zut ça ne marche pas");
  });


buildFilters();

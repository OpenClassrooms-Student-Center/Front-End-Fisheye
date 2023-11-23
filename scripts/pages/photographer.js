import { getAllorOnePhotographer } from "../api/getPhotographer.js";
import { photographerHero } from "../templates/photographer.js";
import { medias, displayLikesContainer } from "../templates/media.js";
import { getFirstName, changeFilter } from "../utils/utils.js";

async function init() {
  let urlParams = new URLSearchParams(window.location.search);
  let id = parseInt(urlParams.get("id"));

  const { photographers } = await getAllorOnePhotographer(id);
  const photographer = photographers[0];

  const allLikes = photographer.media.reduce(
    (total, media) => total + media.likes,
    0
  );

  const allMedias = {
    allMedias: changeFilter(photographer.media),
    firstName: getFirstName(photographer.name),
    photographerPrice: photographer.price,
    allLikes: allLikes,
  };

  filter.addEventListener("change", (event) => {
    const sort = event.target.value;
    medias({...allMedias, allMedias: changeFilter(allMedias.allMedias, sort)}
  );
  });



  photographerHero(photographers[0]);
  medias(allMedias);
  displayLikesContainer(allLikes, photographers[0].price);
}

init();

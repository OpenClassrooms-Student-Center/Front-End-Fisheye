import { getMediasByPhotographer } from "./getMediasByPhotographer.js";
import { getPhotographersById } from "./getPhotographerById.js";
import { displayModal } from "./modal.js";

async function createLightBox() {
  const photographer = await getPhotographersById();
  const medias = await getMediasByPhotographer();
  // console.log(medias);
  const modal = document.querySelector(".modal__window");
  const carouselWrapper = document.createElement("div");
  carouselWrapper.classList.add("carousel");
  carouselWrapper.style.display = "none"
  carouselWrapper.setAttribute("aria-label",`media carousel for ${photographer.name}`);

  const list = document.createElement("ul");
  list.classList.add("carousel__list");
  modal.appendChild(carouselWrapper);
  carouselWrapper.appendChild(list);

  medias.forEach(media => {
    const listItem = document.createElement("li");
    listItem.classList.add("carousel__item", `item-${medias.indexOf(media)}`);
    listItem.setAttribute("aria-hidden", "false");
    listItem.innerHTML = `
    <div role="button" class="controls controls-left">
      <span class="img prev-image">
        <i aria-hidden="true" class="fa fa-arrow-circle-left"></i>
      </span>
      <p class="sr-only">Previous</p>
    </div>
    <div role="button" class="controls controls-right">
        <span class="img next-image">
            <i aria-hidden="true" class="fa fa-arrow-circle-right"></i>
        </span>
        <p class="sr-only">Next</p>
    </div>
    <div class="caroussel-title">
    </div>
      <img src="../../assets/photographers/${photographer.id}/${media.image}"
    `
    list.appendChild(listItem);
  });
  // return list
}
// createLightBox();

export function displayLightBox() {
  displayModal();
  createLightBox();
  const lightBox = document.querySelector(".carousel");
  lightBox.style.display = "flex"
  console.log("click");
}

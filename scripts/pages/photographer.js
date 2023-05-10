import { getPhotographersById } from "../utils/getPhotographerById.js";
import { displayModal, closeModal } from "../utils/contactForm.js";

const photographer = await getPhotographersById();

console.log(photographer);

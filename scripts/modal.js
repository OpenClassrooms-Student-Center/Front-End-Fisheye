import { getDataPhotographers } from "./api.js";
const contactBtn = document.getElementById("btn-contact");
const formContact = document.getElementById("form-container");
export function modalOpen(data) {
  const dataPhotographers = data;
  formContact[0].addEventListener(
    "click",
    () => (contactBtn[0].style.display = "flex")
  );
}
console.log(contactBtn);
modalOpen();

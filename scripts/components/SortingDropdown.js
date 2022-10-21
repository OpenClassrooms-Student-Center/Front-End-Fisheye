export function createDropdownOrder() {
  const wrapper = document.createElement("section")
  wrapper.classList = "photographer-media"
  document.querySelector("main").appendChild(wrapper)
  wrapper.innerHTML += `<label for="order-by">Trier par</label><select name="sort" id="order-by" class="dropdown-sort"><option value="popularite">Popularité</option><option value="date">Date</option><option value="titre">Titre</option></select>`
}
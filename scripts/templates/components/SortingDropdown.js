export async function createMediaList() {
  const wrapper = document.createElement("section")
  wrapper.classList = "photographer-media"
  document.querySelector("main").appendChild(wrapper)
  wrapper.innerHTML += `<label for="order-by">Trier par</label><select name="sort" id="order-by" class="dropdown-sort"><option value="popularite" id="dropdown-popularite">Popularité</option><option value="date" id="dropdown-date">Date</option><option value="titre" id="dropdown-titre">Titre</option></select>`
  await getDropdownStatus()
}

function getDropdownStatus() {
  const dropdownMenu = document.querySelectorAll("select")
}
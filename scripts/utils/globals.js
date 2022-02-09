// tri
document.querySelector("select").addEventListener("change", sort);
function sort() {
  document.querySelector(".media-section").innerHTML = "";
  init(this.value);
}

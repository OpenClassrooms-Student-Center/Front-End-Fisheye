// tri
document.querySelector("select").addEventListener("change", sort);
function sort() {
  //   document.querySelector(".photograph-header").innerHTML = "";
  document.querySelector(".media-section").innerHTML = "";
  init(this.value);
}

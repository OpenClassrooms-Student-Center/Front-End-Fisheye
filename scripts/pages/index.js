async function displayData() {
  const jsonPhotographers = DataManager.getPhotographers();
  for (let jsonPhotographer of jsonPhotographers) {
    const photographer = new Photographer(jsonPhotographer);
    document.getElementsByClassName("photographer_section")[0].innerHTML +=
      photographer.getPreviewDOM();
  }
}

async function init() {
  await DataManager.loadJson("../../data/photographers.json");
  displayData();
}

init();

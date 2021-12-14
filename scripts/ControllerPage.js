class ControllerPage {
  async showPhotographersDetails() {
    let searchParams = new URLSearchParams(window.location.search);
    let id = searchParams.get("id");
    console.log(id);
    // Récupère les medias des photographes
    const photographer = await Model.getPhotographer(id);
    console.log(photographer);
    DetailsPhotographersView.showDetailsPhotographer(photographer);
  }
}

class ControllerPage {
  async showPhotographersDetails() {
    // Récupère les medias des photographes
    const photographers = await Model.getMediaPhotographers();

    DetailsPhotographersView.datasPhotographersPage(photographers);
  }
}

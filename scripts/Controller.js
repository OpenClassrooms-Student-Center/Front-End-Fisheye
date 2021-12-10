class Controller {
  async showPhotographersList() {
    // Récupère les datas des photographes
    const photographers = await Model.getPhotographers();
    console.log(photographers);
    ListPhotographersView.datasPhotographersList(photographers);
  }
}

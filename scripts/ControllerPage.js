class ControllerPage {
  async showPhotographersDetails() {
    let searchParams = new URLSearchParams(window.location.search); //recupère id du phtotgraphe ds l'url+
    let id = searchParams.get("id"); // renvoie la 1ere valeur associée à id (paramètre)
    console.log(id);

    // Récupère au model les photographes par id et demande à la vue de les afficher
    const photographer = await Model.getPhotographer(id);
    console.log(photographer);
    DetailsPhotographersView.showDetailsPhotographer(photographer);

    //recupère au model les médias des photographes par id et demande à la vue des les afficher
    const medias = await Model.getMediasByPhotographerId(id);
    console.log(medias);
    DetailsPhotographersView.showListMediasPhotographer(medias, photographer);
  }
}

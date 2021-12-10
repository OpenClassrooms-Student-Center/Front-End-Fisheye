class DetailsPhotographersView {
  static async datasPhotographersPage(photographers) {
    const photographersSection = document.querySelector(".photograph_header");

    photographers.forEach((photograph) => {
      const photographerModel = photographerPageFactory(photograph);
      const userBigCardDOM = photographerModel.getPhotographerCardDOM();
      photographersSection.appendChild(userBigCardDOM);
    });
  }
}

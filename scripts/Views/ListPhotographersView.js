class ListPhotographersView {
  static async datasPhotographersList(photographers) {
    const photographersSection = document.querySelector(
      ".photographer_section"
    );

    photographers.forEach((photographer) => {
      const photographerModel = photographerFactoryList(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      console.log(photographerModel);
      photographersSection.appendChild(userCardDOM);
    });
  }
}

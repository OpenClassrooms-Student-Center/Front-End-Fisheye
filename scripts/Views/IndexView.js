class IndexView {
  static async displayData(photographers) {
    const photographersSection = document.querySelector(
      ".photographer_section"
    );

    photographers.forEach((photographer) => {
      const photographerModel = photographerFactory(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
    });
  }
}

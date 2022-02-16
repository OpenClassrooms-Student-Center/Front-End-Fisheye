class ListPhotographersView {
  static datasPhotographersList(photographers) {
    const photographersSection = document.querySelector(
      ".photographer_section"
    );

    photographers.forEach((photographer) => {
      const photographerCard = photographerFactoryList(photographer);
      const userCardDOM = photographerCard.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
    });
  }
}

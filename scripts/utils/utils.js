function changeFilter(medias, sort = "popularite") {

    switch (sort) {
      case "Popularite":
        medias.sort((a, b) => b.likes - a.likes);
        break;
      case "Date":
        medias.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "Titre":
        medias.sort((a, b) => (a.title > b.title ? 1 : -1));
        break;
    }
    return medias;
  }

  function getFirstName(photographerFirstName) {
    const firstName = photographerFirstName.split(" ")[0].replace("-", " ");
    return firstName;
  }

  export {changeFilter, getFirstName}
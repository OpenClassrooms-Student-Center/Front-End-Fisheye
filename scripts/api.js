// recuperatation des donnees sources
export async function getDataPhotographers() {
  const response = await fetch("./data/photographers.json");
  console.log(response);
  const dataFisheye = await response.json();
  console.log(dataFisheye);
  const dataPhotographers = [...dataFisheye.photographers];
  const dataMedias = [...dataFisheye.media];
  return {
    dataPhotographers,
    dataMedias,
  };
}

//deuxieme methode de recuperation des donnees juste pour voir le resultat
/*
export async function getDataPhotographers() {
  let dataPhotographers = await fetch("../data/photographers.json")
    .then((response) => response.json())
    .then((data) => data.photographers);

  return dataPhotographers;
}
export async function getDataMedias() {
  let dataMedias = await fetch("../data/photographers.json")
    .then((response) => response.json())
    .then((data) => data.media);

  return dataMedias;
}*/

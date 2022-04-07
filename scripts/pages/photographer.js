async function getPhotographers () {
  const photographersData = fetch('./data/photographers.json')
    .then(function (res) {
      if (res.ok) {
        return res.json()
      }
    })
    .catch(function (err) {
      console.log(err)
    })
  return photographersData
}

async function init () {
  // Récupère l'id passer en parametre de l'url
  const photographerId = parseInt(new URL(document.location).searchParams.get('id'))
  // Récupère les datas des photographes et des medias
  const { photographers, media } = await getPhotographers()
  // Filtre pour obtenir le photographe et les medias liés
  const photographer = photographers.filter(elt => elt.id === photographerId)
  const medias = media.filter(elt => elt.photographerId === photographerId)
  // displayData(photographer, medias)
  console.log(photographer, medias)
};

init()

import { getPhotographers } from "./fetchData.js";


// on récupère l'id du photographe grâce à l'url, et on utilise cet id pour afficher les médias ayant pour photographId l'id en url
export async function getMediasByPhotographer() {
  const { media } = await getPhotographers();
  const params = (new URL(document.location).searchParams);
  const id = parseInt(params.get("id"));

  const medias =  media.filter(media => media.photographerId === id)
  return medias
}

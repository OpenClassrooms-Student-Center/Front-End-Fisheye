export default function totalLikes(medias) {
  const sum = 0;
  return medias.reduce((a, b) => a + b.elt.likes, sum);
}

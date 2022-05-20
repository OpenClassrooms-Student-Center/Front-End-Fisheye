function mediaFactory() {
  const { id, photographerId, title, image, likes, date, price } = data;
  console.log(id, photographerId, title, image, likes, date, price);
  return { id, photographerId, title, image, likes, date, price };
}

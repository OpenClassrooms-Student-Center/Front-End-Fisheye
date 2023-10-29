async function getPhotographerById(id) {
  const response = await fetch("/data/photographers.json");
  const data = await response.json();
  const photographer = data.photographers.find((p) => p.id === parseInt(id, 10));
  return photographer;
}


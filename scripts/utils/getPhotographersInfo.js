

import { fetchJsonData } from "./fetchJsonData.js";

// Retrieve a photographer's info from the JSON data by their id
export async function getPhotographerInfo() {
  // Fetch the photographer object from the JSON data
  const { photographers } = await fetchJsonData();
  // Retrieve the photographer's id from the URL parameters
  const params = new URL(document.location).searchParams;
  const photographerId = parseInt(params.get("id"));
  // Find the photographer object in the photographers array with the matching id
  return photographers.find(
    (photographer) => photographer.id === photographerId
  );
}
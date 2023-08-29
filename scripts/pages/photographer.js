// Get the photographer ID from the URL parameter
let id = new URLSearchParams(window.location.search).get("id");

//------------------------------------------------------------------------

async function getPhotographers() {
  // Retrieve photographers
  const photographersResponse = await fetch("photographers.json");
  const photographersData = await photographersResponse.json();
  console.log("photographersData", photographersData);

  return photographersData;
}

//------------------------------------------------------------------------

async function displayData(photographers) {
  // Find the photographer with the matching id
  const photographer = photographers.find(
    (photographer) => photographer.id === Number(id)
  );
  if (!photographer) {
    console.log("Photographer not found");
    return;
  }

  // Create the photographer's template
  const photographerModel = photographerPageTemplate(photographer);
  const userCardDOM = photographerModel.getUserCardDOM();

  // Add the elements to the "photograph-header" class
  const photographerInfo = document.querySelector(".photograph-header");
  photographerInfo.appendChild(userCardDOM);

  // Update the page title
  document.title = `Fisheye - ${photographer.name}`;
}

//------------------------------------------------------------------------

async function init() {
  // Get photographer data
  try {
    const photographers = await getPhotographers();
    displayData(photographers);
  } catch (error) {
    console.error("Error fetching photographers data:", error);
  }
}

init();

async function getPhotographerById(id) {
  // Retrieve photographers
  const photographersResponse = await fetch("photographers.json");
  const photographersData = await photographersResponse.json();
  console.log("photographersData", photographersData);

  const photographer = photographersData.find(
    (photographer) => photographer.id === Number(id)
  );

  return photographer;
}

//------------------------------------------------------------------------

async function displayData() {
  // Find the photographer with the matching id
  let id = new URLSearchParams(window.location.search).get("id");

  try {
    const photographer = await getPhotographerById(id);
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
  } catch (error) {
    console.error("Error fetching photographer data:", error);
  }
}

//------------------------------------------------------------------------

async function init() {
  // Get photographer data
  try {
    const photographers = await getPhotographerById();
    displayData(photographers);
  } catch (error) {
    console.error("Error fetching photographers data:", error);
  }
}

init();

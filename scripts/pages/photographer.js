// Allows to retrieve the photographer's ID.
let params = new URL(document.location).searchParams;
let id = parseInt(params.get("id"));

// Allows to retrieve all photographers from the JSON file.
async function getPhotographers() {
  try {
      const response = await fetch('data/photographers.json');
      if (!response.ok) {
          throw new Error('Unable to retrieve photographer data.');
      }
      const data = await response.json();
      return data.photographers;
  } catch (error) {
      console.error(error);
      return [];
  }
}

// Allows to retrieve a photographer from his ID.
async function getPhotographersById(id) {
    const photographers = await getPhotographers();

    const photographer = photographers.find(function (photographer) {
      return photographer.id === id;
    });

    if (photographer) {
      console.log("Photographer found :", photographer);
      return photographer;
    } else {
      console.log("No photographer found with the ID", id);
      return null;
    }
}

async function displayPhotographer() {
  const photographer = await getPhotographersById(id) // Photographer object retrieved.
  photographerHeader(photographer)
}

displayPhotographer()

export async function getAllorOnePhotographer(id) {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
  
    const photographers = data.photographers
      .filter((photographer) => !id || photographer.id === id) // Filter by id if id is provided
      .map((photographer) => {
        const media = data.media.filter((media) => media.photographerId === photographer.id); // Filter by photographerId
        return { ...photographer, media };
      });
  
    return { photographers };
  }

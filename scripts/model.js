export const state = {
  url: "",
  photographers: [],
  photographer: {
    data: {},
    photos: [],
  },
};

export const getPhotographers = async () => {
  // Penser à remplacer par les données récupérées dans le json
  const photographers = [
    {
      name: "Ma data test",
      id: 1,
      city: "Paris",
      country: "France",
      tagline: "Ceci est ma data test",
      price: 400,
      portrait: "account.png",
    },
    {
      name: "Autre data test",
      id: 2,
      city: "Londres",
      country: "UK",
      tagline: "Ceci est ma data test 2",
      price: 500,
      portrait: "account.png",
    },
  ];
  state.photographers = [...photographers, ...photographers, ...photographers];
};

export const getPhotographer = async (id) => {
  const photographer = {
    name: "Tracy Galindo",
    id: 82,
    city: "Montreal",
    country: "Canada",
    tagline: "Photographe freelance",
    price: 500,
    portrait: "TracyGalindo.jpg",
  };
  state.photographer.data = photographer;
};

export const getPhotographerPhotos = async (id) => {
  const photos = [
    {
      id: 8523492,
      photographerId: 82,
      title: "Purple Tunnel",
      image: "Art_Purple_light.jpg",
      likes: 24,
      date: "2018-05-05",
      price: 55,
    },
    {
      id: 75902334,
      photographerId: 82,
      title: "Art Mine",
      image: "Art_Mine.jpg",
      likes: 75,
      date: "2019-11-25",
      price: 55,
    },
  ];
  state.photographer.photos = [...photos, ...photos, ...photos];
};

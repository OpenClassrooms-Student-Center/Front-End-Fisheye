import { useEffect, useState } from "react";
import "../stylesheets/style.css";
import photographerFactory from "./utilities/Factory";

function Index() {
  const [allPhotographers, setAllPhotographers] = useState([]);

  useEffect(() => {
    // Code appelé au mount du composant
    function getPhotographers() {
      let photographersList = require("../data/photographers.json");
      const photographers = photographersList.photographers;
      return { photographers: photographers };
    }

    async function displayData(photographers) {
      // Chaque photographe est ajouté à l'array allPhotographers
      photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        setAllPhotographers((allPhotographers) => [...allPhotographers, userCardDOM]);
      });
    }

    async function init() {
      // Récupère les datas des photographes
      const { photographers } = await getPhotographers();
      displayData(photographers);
    }
    init();
  }, []);

  return (
    <>
      <header>
        <img src="assets/images/logo.png" alt="fisheye logo" className="logo" />
        <h1 className="text-4xl font-normal">Nos photographes</h1>
      </header>
      <main id="main">
        <div className="photographer_section">{allPhotographers}</div>
      </main>
    </>
  );
}

export default Index;

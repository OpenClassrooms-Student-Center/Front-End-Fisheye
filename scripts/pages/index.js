import { photographerTemplate } from "../templates/photographer.js";
async function getPhotographers() {
  try {
    const response = await fetch("http://localhost:5500/data/photographers.json");
    if (!response.ok) {
      throw new Error("datas can not be fetched");
    }
    const dataJson = await response.json();
    const photographers = dataJson.photographers;
    return photographers;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function displayData() {
  const photographersInfo = await getPhotographers();
  const sectionHome = document.getElementById("photographer_section");

  photographersInfo.forEach((photographer) => {
    const contentHTML = photographerTemplate(photographer);
    const article = document.createElement("article");

    article.innerHTML = contentHTML;
    sectionHome.appendChild(article);

    // Ajoute l'événement de redirection à cet article
    article.addEventListener("click", () => {
      window.location.href = `photographer.html?id=${photographer.id}`;
    });
  });
}

displayData();

// async function displayData() {
//   const photographersInfo = await getPhotographers();
//   const sectionHome = document.getElementById("photographer_section");

//   let contentHTML = "";
//   photographersInfo.forEach((photographer) => {
//     contentHTML += photographerTemplate(photographer);
//   });
//   sectionHome.innerHTML = contentHTML;

// }

// displayData();

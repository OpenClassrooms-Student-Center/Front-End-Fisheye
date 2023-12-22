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

  let articlesToAdd = "";
  photographersInfo.forEach((photographer) => {
    const photographerCard = photographerTemplate(photographer);
    articlesToAdd += photographerCard;
  });

  sectionHome.innerHTML = articlesToAdd;

  const allArticles = Array.from(document.getElementsByTagName("article"));
  allArticles.forEach((article) => {
    article.addEventListener("click", () => {
      window.location.href = `photographer.html?id=${article.dataset.photographeid}`;
    });
  });
}

displayData();

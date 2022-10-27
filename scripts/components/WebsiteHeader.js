// Create header for each page

export function createHeader(page) {
  const header = document.querySelector("header")
  header.innerHTML = `<a href="index.html" aria-label="Se rendre sur la page d'accueil"><img class="logo" alt="Fisheye Home page" src="assets/images/logo.png"></a>`
  if (page === "mainPage") {
    header.innerHTML += `<h1 class="header-title">Nos photographes</h1>`
  }
}
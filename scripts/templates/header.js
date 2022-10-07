// Create header for each page

export function createHeader(page) {
  const header = document.querySelector("header")
  const headerLinkToMainPage = document.createElement("a")
  headerLinkToMainPage.href = "index.html"
  headerLinkToMainPage.ariaLabel = "Se rendre sur la page d'accueil"
  const headerLogo = document.createElement("img")
  headerLogo.classList = "logo"
  headerLogo.alt = "Fisheye Home page"
  headerLogo.src = "assets/images/logo.png"
  header.appendChild(headerLinkToMainPage)
  headerLinkToMainPage.appendChild(headerLogo)
  if (page === "mainPage") {
    const mainPageHeaderTitle = document.createElement("h1")
    mainPageHeaderTitle.textContent = "Nos photographes"
    header.appendChild(mainPageHeaderTitle)
  }
}

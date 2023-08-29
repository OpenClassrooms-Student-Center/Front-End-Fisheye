//template for index page -> la view
function photographerTemplatePage(photographer) {
  const photographerPage = document.createElement("div");
  photographerPage.classList.add("photographer-page");

  return {
    getUserCardDOM: () => photographerPage,
  };
}

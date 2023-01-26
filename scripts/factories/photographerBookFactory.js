export function bookFactory(data) {
  // Destructuring the data object to extract its properties
  const { id, photographerId, title, image } = data;

  // Defining a function that will return a DOM element for the media card
  function getBookCardDOM() {
    // Create an article element to contain the media card
    const article = document.createElement("article");
    article.className += "book-card";
    article.id = id;

    return article;
  }
  return getBookCardDOM;
}

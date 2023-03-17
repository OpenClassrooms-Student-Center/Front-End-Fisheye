function photographerFactory(data) {
  const {
    name,
    portrait,
    tagline,
    city,
    country,
    price,
    alternative,
    ariaLabel,
    tabindex,
    id,
  } = data;
  const picture = `assets/photographers/${portrait}`;

  const article = document.createElement("article");
  const [img, h2, location, tag, pricing] = ["img", "h2", "h3", "p", "p"].map(
    (elem) => document.createElement(elem)
  );

  img.setAttribute("src", picture);
  img.setAttribute("alt", alternative);
  article.setAttribute("aria-label", ariaLabel);
  article.setAttribute("tabindex", tabindex);
  article.setAttribute("data-id", id);
  article.addEventListener("click", (event) => {
    const photographerId = event.currentTarget.getAttribute("data-id");
    window.location.href = `photographer.html?id=${photographerId}`;
  });
  article.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      window.location.href = `photographer.html?id=${id}`;
    }
  });

  h2.textContent = name;
  location.textContent = `${city}, ${country}`;
  tag.textContent = tagline;
  pricing.textContent = `${price}€/jour`;

  [img, h2, location, tag, pricing].forEach((elem) =>
    article.appendChild(elem)
  );

  return { getUserCardDOM: () => article };
}

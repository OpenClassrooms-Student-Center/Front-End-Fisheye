function photographerFactory(data) {
  const {
    name,
    portrait,
    tagline,
    city,
    country,
    price,
    alternative,
    ariaFigcaptionLabel,
    ariaSectionLabel,
    tabindex,
    id,
  } = data;
  const picture = `assets/photographers/${portrait}`;
  const labelForPrice = "€/jour";

  const article = document.createElement("article");
  const [figure, figcaption, section] = ["figure", "figcaption", "div"].map(
    (elem) => document.createElement(elem)
  );
  const [img, h2, location, tag, pricing] = ["img", "h2", "h3", "p", "p"].map(
    (elem) => document.createElement(elem)
  );

  img.setAttribute("src", picture);
  img.setAttribute("alt", alternative);
  figcaption.setAttribute("aria-label", ariaFigcaptionLabel);
  figcaption.setAttribute("tabindex", tabindex);
  section.setAttribute("aria-label", ariaSectionLabel);
  section.setAttribute("tabindex", tabindex);
  article.setAttribute("data-id", id);

  article.addEventListener("click", (event) => {
    const photographerId = event.currentTarget.getAttribute("data-id");
    // console.log("L'id de l'utilisateur est " + photographerId);
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
  pricing.textContent = `${price}${labelForPrice}`;

  [img, h2].forEach((elem) => figcaption.appendChild(elem));
  [location, tag, pricing].forEach((elem) => section.appendChild(elem));
  [figcaption, section].forEach((elem) => figure.appendChild(elem));

  article.appendChild(figure);

  return { getUserCardDOM: () => article };
}

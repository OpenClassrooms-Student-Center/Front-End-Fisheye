function mediaFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;
  function getMediaCardDOM() {
    const article = document.createElement("article");

    function testvideo() {
      video
        ? (img = document.createElement("video")).setAttribute(
            "src",
            `assets/images/${video}`
          )
        : (img = document.createElement("img")).setAttribute(
            "src",
            `assets/images/${image}`
          );

      img.classList.add("sample-image");
      return img;
    }

    testvideo();
    // if (img.tagName === "VIDEO") {
    //   img.setAttribute("controls", true);
    // }
    article.appendChild(img);

    return article;
  }
  return {
    id,
    photographerId,
    title,
    image,
    video,
    likes,
    date,
    price,
    getMediaCardDOM,
  };
}

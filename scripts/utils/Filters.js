class Filters {
  constructor(response) {
    this.medias = response.media;
    let url = new URL(window.location.href);
    let photographerId = url.searchParams.get("id");

    this.mediaFotographers = new Set();
    this.medias.forEach((media) => {
      if (photographerId == media.photographerId) {
        this.mediaFotographers.add(media);
      }
    });
  }

  generateFilter() {
    this.eventListener();
  }

  eventListener() {
    const gallery = document.querySelector(".gallerie");
    let array = Array.from(this.mediaFotographers);

    gallery.addEventListener("click", function (event) {
      let elt = event.target.value;
      if (elt === "popularity") {
        console.log("ok");
        array.sort(function compare(a, b) {
          if (a.likes < b.likes) {
            return -1;
          } else if (a.likes == b.likes) {
            return 0;
          } else {
            return 1;
          }
        });
      //  console.log(array);
     
        return array
      }
      if (elt === "title") {
        console.log("titre");
        array.sort(function compare(a, b) {
          if (a.title < b.title) {
            return -1;
          } else if (a.title == b.title) {
            return 0;
          } else {
            return 1;
          }
        });
       console.log(array);
        return array
      }
    });
  }
}

export { Filters };

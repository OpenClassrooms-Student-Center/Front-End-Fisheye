class Profile {
  constructor() {
    this.$photographerWrapperProfile =
      document.querySelector(".photograph-header");
    this.$photographerMedia = document.querySelector(".photograph-content");
    this.photographerApi = new PhotographerApi("/data/photographers.json");
  }

  async main() {
    //   const photographersData = await this.photographerApi.getPhotographers();
    const photographersMediaData = await this.photographerApi.getMedias();
    let params = new URL(document.location).searchParams;
    let idphotograph = params.get("id");

    photographersMediaData.forEach((media) => {
      if (media.photographerId == idphotograph) {
        const TemplateMedia = new PhotographerMedia(media);
        this.$photographerMedia.appendChild(
          TemplateMedia.createPhotographerMedia()
          
        );
      }

      

      // return true;
    });
  }
}

const profile = new Profile();
profile.main();
console.log("mes medias sont chargés");
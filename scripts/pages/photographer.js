import Api from "../API/api.js";
import photographeData from "../patterns/constructorPattern/photographeData.js";
import MediasFactory from "../patterns/factoriesPattern/MediasFactory.js";
import photographerPageHeader from "../patterns/factoriesPattern/photographerPageHeaderFactory.js";
import photographerPageMedia from "../patterns/factoriesPattern/photographerPageMediaFactory.js";

const photographersApi = new Api("../../data/photographers.json");
const photographerId = new URLSearchParams(window.location.search).get("id");

export const getPhotographerById = async () => {
    const { photographers, media } = await photographersApi.get();
    const photographer = photographers
        .map(photographer => new photographeData(photographer))
        .find(photographer => photographer.id == photographerId);
    const medias = media
        .map(media => new MediasFactory(media))
        .filter(media => media.photographerId == photographerId);
    return { photographer, medias };
};

const displayPhotographerPage = async () => {
    const { photographer, medias } = await getPhotographerById();
    const header = new photographerPageHeader(photographer);
    const media = new photographerPageMedia(medias);
    header.createPhotographerHeader();
    media.createMedias();
}
displayPhotographerPage();
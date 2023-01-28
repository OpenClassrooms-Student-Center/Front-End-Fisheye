import { ApiJson } from "./Api";

async function getPhotographers() {

    const fetchingURL = '../../data/photographers.json';

    let results;
    try {
        results = await ApiJson(fetchingURL)
    } catch(err) {
        throw new Error(`getPhotographers got an issue: ${err}`)
    }

    return ({
        photographers: results.photographers,
        media: results.media
    })
}

export { getPhotographers }
export async function fetchJSON(url, type) {
    const response = await fetch(url); // Wait for the Async Fecth Function

    // fetch returns an object with a response property which if set to false means that the connection is not good and so we stop the function 
    if (!response.ok) { throw new Error("Thrown from fetchJSON()"); }

    let jsonResponse = await response.json(); // parsing JSON
    return jsonResponse[type]; // Get data from the Array that we want

}


export async function getPhotographers() {
    const url = "../data/photographers.json"; // Data source .JSON
    const photographers = await fetchJSON(url, "photographers"); // use fetchJSON function from utils/fetch.js
    return photographers; // Return data of PhotoGraphers
}

export async function getMedias() {
    const url = "../data/photographers.json"; // Data source .JSON
    const medias = await fetchJSON(url, "media"); // use fetchJSON function from utils/fetch.js
    return medias; // Return data of Media
}

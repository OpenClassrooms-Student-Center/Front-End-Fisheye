/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************************!*\
  !*** ./src/scripts/utils/fetch.js ***!
  \************************************/
async function fetchJSON(url, type) {
    const response = await fetch(url); // Wait for the Async Fecth Function

    // fetch returns an object with a response property which if set to false means that the connection is not good and so we stop the function 
    if (!response.ok) { throw new Error("Thrown from fetchJSON()"); }

    let jsonResponse = await response.json(); // parsing JSON
    jsonResponse = jsonResponse[type]; // Get data from the Array that we want

    return jsonResponse;
}


async function getPhotographers() {
    const url = "./data/photographers.json"; // Data source .JSON
    photographers = await fetchJSON(url, "photographers"); // use fetchJSON function from utils/fetch.js
    return { photographers }; // Return data of PhotoGraphers
}

async function getMedias() {
    const url = "./data/photographers.json"; // Data source .JSON
    medias = await fetchJSON(url, "media"); // use fetchJSON function from utils/fetch.js
    return { medias }; // Return data of Media
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0EsOENBQThDO0FBQzlDLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0MsMkRBQTJEO0FBQzNELGFBQWEsaUJBQWlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3Qyw0Q0FBNEM7QUFDNUMsYUFBYSxVQUFVO0FBQ3ZCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy91dGlscy9mZXRjaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJhc3luYyBmdW5jdGlvbiBmZXRjaEpTT04odXJsLCB0eXBlKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7IC8vIFdhaXQgZm9yIHRoZSBBc3luYyBGZWN0aCBGdW5jdGlvblxyXG5cclxuICAgIC8vIGZldGNoIHJldHVybnMgYW4gb2JqZWN0IHdpdGggYSByZXNwb25zZSBwcm9wZXJ0eSB3aGljaCBpZiBzZXQgdG8gZmFsc2UgbWVhbnMgdGhhdCB0aGUgY29ubmVjdGlvbiBpcyBub3QgZ29vZCBhbmQgc28gd2Ugc3RvcCB0aGUgZnVuY3Rpb24gXHJcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7IHRocm93IG5ldyBFcnJvcihcIlRocm93biBmcm9tIGZldGNoSlNPTigpXCIpOyB9XHJcblxyXG4gICAgbGV0IGpzb25SZXNwb25zZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTsgLy8gcGFyc2luZyBKU09OXHJcbiAgICBqc29uUmVzcG9uc2UgPSBqc29uUmVzcG9uc2VbdHlwZV07IC8vIEdldCBkYXRhIGZyb20gdGhlIEFycmF5IHRoYXQgd2Ugd2FudFxyXG5cclxuICAgIHJldHVybiBqc29uUmVzcG9uc2U7XHJcbn1cclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRQaG90b2dyYXBoZXJzKCkge1xyXG4gICAgY29uc3QgdXJsID0gXCIuL2RhdGEvcGhvdG9ncmFwaGVycy5qc29uXCI7IC8vIERhdGEgc291cmNlIC5KU09OXHJcbiAgICBwaG90b2dyYXBoZXJzID0gYXdhaXQgZmV0Y2hKU09OKHVybCwgXCJwaG90b2dyYXBoZXJzXCIpOyAvLyB1c2UgZmV0Y2hKU09OIGZ1bmN0aW9uIGZyb20gdXRpbHMvZmV0Y2guanNcclxuICAgIHJldHVybiB7IHBob3RvZ3JhcGhlcnMgfTsgLy8gUmV0dXJuIGRhdGEgb2YgUGhvdG9HcmFwaGVyc1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRNZWRpYXMoKSB7XHJcbiAgICBjb25zdCB1cmwgPSBcIi4vZGF0YS9waG90b2dyYXBoZXJzLmpzb25cIjsgLy8gRGF0YSBzb3VyY2UgLkpTT05cclxuICAgIG1lZGlhcyA9IGF3YWl0IGZldGNoSlNPTih1cmwsIFwibWVkaWFcIik7IC8vIHVzZSBmZXRjaEpTT04gZnVuY3Rpb24gZnJvbSB1dGlscy9mZXRjaC5qc1xyXG4gICAgcmV0dXJuIHsgbWVkaWFzIH07IC8vIFJldHVybiBkYXRhIG9mIE1lZGlhXHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
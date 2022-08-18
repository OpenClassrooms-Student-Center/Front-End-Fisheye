

async function fetchJSON(url, type) {
    const response = await fetch(url); // Wait for the Async Fecth Function

    // fetch returns an object with a response property which if set to false means that the connection is not good and so we stop the function 
    if (!response.ok) { throw new Error("Thrown from fetchJSON()"); }

    let jsonResponse = await response.json(); // parsing JSON
    jsonResponse = jsonResponse[type]; // Get data from the Array that we want

    return jsonResponse;
}

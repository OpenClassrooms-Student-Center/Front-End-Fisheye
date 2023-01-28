async function Api(url) {
    const response = await fetch(url)
    return response 
}


async function ApiJson(url) {

    let response;
    try {
        response = await Api(url)
    } catch(err) {
        throw new Error(`Network failure - ${err}`)
    }

    let results;
    if(response.ok) {
        results = await response.json()
        return results 
    } else {
        throw new Error(`Network response - ${response}`)
    }
}

export { ApiJson }
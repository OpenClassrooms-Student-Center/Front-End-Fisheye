async function getUrlParameter(parameter) {
    const fullUrl = window.location.href; // Get full url
    const url = new URL(fullUrl); // Create URL Object
    const parameterValue = url.searchParams.get(parameter); // get parameter value
    return parameterValue;
}
// --------------- FONCTIONS ASSOCIEES AUX REQUETES D'API (ici juste fichiers internes) --------------- 

/* Fetch une url
    Paramètres :
        - une url
    Renvoie :
        - la réponse reçue par le serveur au bon format 
*/
async function fetchDataFromApi(url) {

    const response = await fetch(url)
    
    let getDataMethod;
    if(response.ok) {
        getDataMethod = getDataTreatmentMethod(response)
    } else {
        throw new Error(`Mauvaise réponse du serveur - ${response}`)
    }

    const results = await getDataMethod(response)
    
    return results 
}


/* Identifie la fonction permettant de traiter la réponse reçue par le serveur
    Paramètres :
        - une réponse du serveur
    Renvoie :
        - La fonction appropriée
*/
function getDataTreatmentMethod(response) {

    const headerContentType = response.headers.get("content-type")
    const contentType = headerContentType ? headerContentType.split(';')[0] : null

    let getDataMethod

    switch (contentType) {

        case 'application/json':
            getDataMethod = getJsonData
            break;

        default:
            getDataMethod = getJsonData
            break;                
    }    

    return getDataMethod
}


/* Sort la data d'un fichier json
    Paramètres :
        - une réponse du serveur
    Renvoie :
        - la data incluse dans la réponse
*/
async function getJsonData(response) {
    const results = await response.json()
    return results 
}

export { fetchDataFromApi }
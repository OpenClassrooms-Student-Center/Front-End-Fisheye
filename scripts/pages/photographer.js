//Mettre le code JavaScript lié à la page photographer.html
function getParams() {

    const paramsURL = (new URL(document.location)).searchParams,
        id = paramsURL.get('id')
    console.log(id)
}


getParams()

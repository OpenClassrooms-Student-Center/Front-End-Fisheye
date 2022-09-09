/*
Code JavaScript lié à la page photographer.html
*/

/**
 * Get id in URL
 * @returns id
 */
function getId(){
    let paramsUrl = new URLSearchParams(window.location.search);
    let id = paramsUrl.get('id');
    console.log(id);
    return id;
}

getId();
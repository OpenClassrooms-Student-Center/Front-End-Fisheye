async function loadJsonData(){
    const response=await fetch("./assets/data/photographers.json");
    const myJsonData=response.json();
    return myJsonData;
}

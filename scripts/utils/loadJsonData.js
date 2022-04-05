async function loadJsonData(){
    const response=await fetch("./data/photographers.json");
    const pJsonData=response.json();
    return pJsonData;
}

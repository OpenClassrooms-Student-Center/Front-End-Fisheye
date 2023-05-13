async function get_Datas() {
   
    let response = await fetch("./data/photographers.json");
    // et bien retourner le tableau photographers seulement une fois récupéré
    const Datas = await response.json();
    return Datas;
  }

    export { get_Datas };
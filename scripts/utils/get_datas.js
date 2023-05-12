async function get_Datas() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    let response = await fetch("/data/photographers.json");
    // et bien retourner le tableau photographers seulement une fois récupéré
    const Datas = await response.json();
    return Datas;
  }

    export { get_Datas };
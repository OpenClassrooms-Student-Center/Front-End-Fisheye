/*recupére les donnés du fichier jSon*/
export const getJsonData = async() => {
      const url = "API/data.json"//specifie le chemin
      const jsonData = await fetch(url)// recuperation du jSon
      const data = await jsonData.json()// conversion du jSon
     
      console.log(data);
      const photographData = [...data.photographers];//decomposition des data
      const mediaData = [...data.media];//decomposition des data

      return {
        photographData,
        mediaData
      }
}

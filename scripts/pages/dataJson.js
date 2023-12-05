




 class getData{
async getPhotographers() {
    //   importation des donnes json
//importation des donnes json
       
const reponse = await fetch('data/photographers.json');
const data=await reponse.json();

        return data;
   
    }
}
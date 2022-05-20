

//Mettre le code JavaScript lié à la page photographer.html
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";  
    
    
}
closeModal()

// Récuperation du nom JSON
const testPhotographer = async (data) => {
  
  await getUsers;

  
  
  

  // Récupertation de l'id dans l'URL

  const main_photographer = document.getElementById('section_profile')

  const queryString_url_id = window.location.search;

  const urlSearchParams = new URLSearchParams(queryString_url_id);

  const id = urlSearchParams.get('id')
  
  // modification des informations de chaque photographe suivant l'id 
  
  
  // je veux transformer id qui est en string en nombre
  const valueId = parseInt(id, 10)
  
  
  const photographerfiltred =  filterIdPhotographers(data, valueId)
  
  // recuperer les photos des photographers
  const picturePhotgraphe = `./assets/photographers/${photographerfiltred.portrait}`
  

  const photographerId = valueId


  const mediafiltred = filterMediaOfPhotographer(data, photographerId)
  
  console.log(mediafiltred);
  

  const structurePhotographer = `
  <div class="photograph-header"> 
        
    <div class="main_information  position_main_information">
      <h1 id="profile_name">${photographerfiltred.name}</h1>
      <p id="profile_city">${photographerfiltred.city + ', ' + photographerfiltred.country  }</p>
      <p id="profile_tagline">${photographerfiltred.tagline  }</p>
    </div> 
       
    <div>
      <button class="contact_button flexcenter" onclick="displayModal()">Contactez-moi</button>
    </div>
    <div class="main_information">
      <p id="profile_picture">
      <img class="img_profile" alt = "oui" src="${picturePhotgraphe}"></p>
    </div>
  </div> `

  main_photographer.innerHTML = structurePhotographer
  
  
  
  
}



const getUsers = async function () {
    let response = await fetch(`/data/photographers.json`)
    if (response.ok) {
        let data = await response.json()
        
        testPhotographer(data)
        gridOfPhotographer(data)
        
        

    } else {
        console.error('Retour du serveur :', response.status)
    }
    
}
getUsers()





// launch modal event


function filterIdPhotographers(data ,id){

  
    
  // Récuperer le tableau data des photographes
  const BoardOfPhotographers = data.photographers
  

  // Je souhaite récupérer les informations d'un photographe à partir de son id 
  const photographer = BoardOfPhotographers.find(element => element.id === id )


  
  //Retourner les informations 
    
  return photographer
  
}


// récuperer les videos et photos des photographes
function filterMediaOfPhotographer(data, photographerId){

  
  // Récuperer le tableau media 
  const BoardOfMedia = data.media
  

  /* Je souhaite récupérer les medias d'un photographe à partir de son id */
  const medias = BoardOfMedia.filter(element => element.photographerId === photographerId)
  
  // retourner les medias 
  return medias

}









// Ouvrir le menu déroulant au clic
function dropDown(){
  document.getElementById('myDropDown').classList.toggle('show');
// modifier le css lors de l'ouverture 
  document.getElementById('dropbtn').classList.toggle('border_raduis_btn_down')
  document.getElementById('dropbtn').classList.toggle('border_raduis_btn_up')
  

}

// fermer le menu déroulant si l'utilisateur clic en dehors 
     
/* window.onclick = function(event) {
   if (!event.target.matches('#dropbtn')){
     let dropDowns = document.getElementsByClassName('dropDownContent');
     let i;
     for (i = 0; i < dropDowns.length; i++){
       let openDropDown = dropDowns[i]
       if (openDropDown.classList.contains('show')){
         openDropDown.classList.remove('show');
       }
     }
   }
 }   */  




// Photos / videos des photographer 


function gridOfPhotographer(data) {
  console.log(data);

  const grid = document.getElementById('grid_element')
  grid.classList.add('grid')


  const section = document.getElementById('element_of_photographer')
    


    grid.innerHTML = `
        <a href="./assets/photographers/Sample Photos/Ellie Rose/Architecture_Connected_Curves.jpg">
          <img class="photos_of_photographer" src="./assets/photographers/Sample Photos/Ellie Rose/Architecture_Connected_Curves.jpg" alt="">
            <p class="">Arc en Ciel</p>
        </a>
        <a href="https://picsum.photos/id/1/200/300.jpg">
          <img class="photos_of_photographer" src="https://picsum.photos/id/1/200/300.jpg" alt="">
        </a>
        <a href="/assets/photographers/Sample Photos/Marcel/Architecture_coverr_circle_empty_highway_in_buenos_aires_587740985637.mp4">
          <img class="photos_of_photographer" src="/assets/photographers/Sample Photos/Marcel/Architecture_coverr_circle_empty_highway_in_buenos_aires_587740985637.mp4" alt="">
        </a>
        <a href="#">
          <img class="photos_of_photographer" src="https://picsum.photos/id/210/900/1800" alt="">
        </a>`



    section.appendChild(grid)
}


   


 























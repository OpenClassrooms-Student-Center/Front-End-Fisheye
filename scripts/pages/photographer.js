

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


  
  
  
  

  const structurePhotographer = `
  <div class="photograph-header"> 
        
    <div class="main_information  position_main_information">
      <h1 id="profile_name">${photographerfiltred.name}</h1>
      <p class="red">${photographerfiltred.city + ', ' + photographerfiltred.country  }</p>
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
  
  
  // Grille des medias des photographe

  const gridOfMediaOfPhotographer = async(a)=>{
    
    const mediafiltred = filterMediaOfPhotographer(data, photographerId)
    
    
    

    /* const structureMedia = 
    `<div>
        <a href="/assets/photographers/Sample Photos/${valueId}/${mediafiltred[a].image}">
      <img src="/assets/photographers/Sample Photos/${valueId}/${mediafiltred[a].image}" alt="" >
        </a>
      <p id="profile_city">${mediafiltred[a].title}</p>
    </div>` */
    
    
    
    
    
    let test = mediafiltred[a].image||mediafiltred[a].video.substring(mediafiltred[a].image||mediafiltred[a].video.lastIndexOf('.')+1)
   
    const div_grid_element = document.getElementById('element_of_photographer')
      
      
      let div_media = document.createElement('div')
      
      
      let title_media = document.createElement('h2')
      title_media.textContent = mediafiltred[a].title
      title_media.classList.add('red')
      

      let likes_media = document.createElement('p')
      likes_media.textContent = mediafiltred[a].likes
      likes_media.classList.add('likes')
      
      let title_and_likes = document.createElement('div')
      title_and_likes.classList.add('flexbetween')
      let title = document.createElement('div')
      

      let likes = document.createElement('div')
      likes.classList.add('flexcenter')

      let heart = document.createElement('p')
      heart.classList.add('heart')

      
    

    if(test == 'mp4'){
      console.log('oui');
          
      
      let div_media = document.createElement('div')
      
      let video_media = document.createElement('video')
      let video_url = '/assets/photographers/Sample Photos/' + valueId + '/' + mediafiltred[a].video
      video_media.src = video_url
      
      let aHref = document.createElement('a')
      aHref.href = video_url
      
      div_grid_element.appendChild(div_media)
      div_media.appendChild(aHref)
      aHref.appendChild(video_media)
      div_media.appendChild(title_and_likes)
      div_media.appendChild(likes)
      title.appendChild(title_media)
      title_and_likes.appendChild(title)
      title_and_likes.appendChild(likes)
      likes.appendChild(likes_media)
      likes.appendChild(heart)
      

      
    
    } else  {
      
      
      let img_media = document.createElement('img')
      let media_photo = '/assets/photographers/Sample Photos/' + valueId + '/' + mediafiltred[a].image
      img_media.src = media_photo
      
      let aHref = document.createElement('a')
      aHref.href = media_photo
      
      div_grid_element.appendChild(div_media)
      div_media.appendChild(aHref)
      aHref.appendChild(img_media)
      div_media.appendChild(title_and_likes)
      div_media.appendChild(likes)
      title.appendChild(title_media)
      title_and_likes.appendChild(title)
      title_and_likes.appendChild(likes)
      likes.appendChild(likes_media)
      likes.appendChild(heart)
      
    }
   
  }
  const mediafiltred = filterMediaOfPhotographer(data, photographerId)
  for (a = 0; a < mediafiltred.length; a++) {
    gridOfMediaOfPhotographer(a)
  }

  // rectangle des prix et des likes
  // prix
  
  
  let pricePerDay = document.getElementById('price_per_day')
  pricePerDay.innerHTML = photographerfiltred.price + '€ / jour'
  
  //likes
  // creer un tableau avec tout les likes des medias

  const i = []
  for (let a = 0; a < mediafiltred.length; a++) {
    
    const totalOfLikes = i.push(mediafiltred[a].likes)
    
  }
  // additioner les likes du tableau
  let totalOfLikes = 0
  for (let e = 0; e < i.length; e++) {
    totalOfLikes += i[e];
    
  }

  let allLikes = document.getElementById('total_of_likes')
  allLikes.innerHTML = totalOfLikes




}



const getUsers = async function () {
    let response = await fetch(`/data/photographers.json`)
    if (response.ok) {
        let data = await response.json()
        
        testPhotographer(data)
       
        
        

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








   




 

/* grid.innerHTML = `
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
        </a>` */





















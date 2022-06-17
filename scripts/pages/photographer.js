

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

  function gridOfMediaOfPhotographer() {
    
    const mediaFiltred = filterMediaOfPhotographer(data, photographerId)
    
    const test = TestMedia(mediaFiltred)
    

    if(test == 'mp4'){
          
      CreateVideo(mediaFiltred, valueId)
      
    } else  {
      
      CreateImage(mediaFiltred, valueId)
      
    }
    
  }
  const mediaFiltred = filterMediaOfPhotographer(data, photographerId)
  
  // Afficher la Grille
 
  filterMediaWithButton(mediaFiltred)
  displayGrid(mediaFiltred, gridOfMediaOfPhotographer, filterMediaWithButton)

  // trier la grille 
  



  // rectangle des prix et des likes
  // prix
  
  let pricePerDay = document.getElementById('price_per_day')
  pricePerDay.innerHTML = photographerfiltred.price + '€ / jour'
  

  //likes
  
  let totalOfLikesOfMedia = totalOfLikes(mediaFiltred) 
  
  let allLikes = document.getElementById('total_of_likes')
  allLikes.innerHTML = totalOfLikesOfMedia
  addLike(mediaFiltred, allLikes)
  
  /* testPush(mediaFiltred, addLike) */

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

function TestMedia(mediaFiltred){
  
  // Trouver quels medias sont des videos 
  let test = mediaFiltred[a].image||mediaFiltred[a].video.substring(mediaFiltred[a].image||mediaFiltred[a].video.lastIndexOf('.')+1)
  // renvoyer "mp4" lorsque le media est une video  
  return test
}

function CreateVideo(mediaFiltred, valueId ){

  const div_grid_element = document.getElementById('element_of_photographer')
      
      
  let div_media = document.createElement('div')
  
  
  let title_media = document.createElement('h2')
  title_media.textContent = mediaFiltred[a].title
  title_media.classList.add('red')
  

  let likes_media = document.createElement('p')
  likes_media.textContent = mediaFiltred[a].likes
  likes_media.classList.add('likes')
  
  let title_and_likes = document.createElement('div')
  title_and_likes.classList.add('flexbetween')
  let title = document.createElement('div')
  

  let likes = document.createElement('div')
  likes.classList.add('flexcenter')

  let heart = document.createElement('p')
  heart.classList.add('heart')

      
  let video_media = document.createElement('video')
  let video_url = '/assets/photographers/Sample Photos/' + valueId + '/' + mediaFiltred[a].video
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

}

function CreateImage(mediaFiltred, valueId){

  const div_grid_element = document.getElementById('element_of_photographer')
      
      
  let div_media = document.createElement('div')
  
  
  let title_media = document.createElement('h2')
  title_media.textContent = mediaFiltred[a].title
  title_media.classList.add('red')
  

  let likes_media = document.createElement('p')
  likes_media.textContent = mediaFiltred[a].likes
  likes_media.classList.add('likes')
  
  let title_and_likes = document.createElement('div')
  title_and_likes.classList.add('flexbetween')
  let title = document.createElement('div')
  

  let likes = document.createElement('div')
  likes.classList.add('flexcenter')

  let heart = document.createElement('p')
  heart.classList.add('heart')

  let img_media = document.createElement('img')
  let media_photo = '/assets/photographers/Sample Photos/' + valueId + '/' + mediaFiltred[a].image
  img_media.src = media_photo
  
  let aHref = document.createElement('a')
  aHref.href = media_photo
  aHref.classList.add('box')
  
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

function totalOfLikes(mediaFiltred){
  // Creer un tableau avec tous les likes des medias 
  const i = []
  for (let a = 0; a < mediaFiltred.length; a++) {
    
     i.push(mediaFiltred[a].likes)

  }
  // additioner les likes du tableau
  let totalOfLikes = 0
  
  i.forEach(likes => totalOfLikes += likes)
  return totalOfLikes
}
function displayGrid(mediaFiltred, gridOfMediaOfPhotographer, filterMediaWithButton){
  /* const media */
  for (a = 0; a < mediaFiltred.length; a++) {
    gridOfMediaOfPhotographer(a)
    
  }
 
  
}

function addLike(mediaFiltred, allLikes){
 
  let totalOfLikesOfMedia = totalOfLikes(mediaFiltred)
  
  let likesOfMedia = document.querySelectorAll('.likes')
  
  const heartOfMedia = document.querySelectorAll('.heart')
  
  for (let i = 0; i < heartOfMedia.length; i++) {
    heartOfMedia[i].addEventListener('click', function(){
      
      if(this.classList.contains('likesAdd1')){
        this.classList.remove('likesAdd1')
        totalOfLikesOfMedia -= 1
        allLikes.innerHTML = totalOfLikesOfMedia
        likesOfMedia[i].textContent = likesOfMedia[i].textContent -= 1

      } else {
        this.classList.add('likesAdd1')

        totalOfLikesOfMedia += 1
        allLikes.innerHTML = totalOfLikesOfMedia
        likesOfMedia[i].textContent = likesOfMedia[i].textContent -= -1
      }
    })
    
  }
  /* .forEach(heart => heart.addEventListener('click', e => {
    var v = new Boolean
    if(v){
      likesOfMedia += 1
      totalOfLikesOfMedia += 1
      console.log("test");

      return  v = false ,allLikes.innerHTML = totalOfLikesOfMedia
    } 
    if(!v) {
      likesOfMedia += -1
      totalOfLikesOfMedia += -1
      console.log("test 2 ");
      return v = true, allLikes.innerHTML = totalOfLikesOfMedia
    }
    console.log(oui);
    
  })) */

 /*  for (let i = 0; i < heartOfMedia.length; i++) {
    const test = likesOfMedia[i]
    var v = true
    forEach(heartOfMedia => heartOfMedia.addEventListener('click', e =>{
       
      

      return  

    }))
    
  } */

    


}


function filterMediaWithButton(mediaFiltred){
  let a = []

  for (let i = 0; i < mediaFiltred.length; i++) {
    a.push(mediaFiltred[i].likes)
    
  }
  a.sort((a, b)=> b - a)
 
  // recuperer le tableau des likes trier du plus grand au plus petit 
  const boardOFLikes = a
  let BoardMostLikesToLessLikes = []
  for (let i = 0; i < boardOFLikes.length; i++) {

    likes = boardOFLikes[i]
    
    const findMediaWithLikes = mediaFiltred.find(element => element.likes === likes)
    BoardMostLikesToLessLikes.push(findMediaWithLikes)
  }
  console.log(mediaFiltred);
  console.log(BoardMostLikesToLessLikes);
  return BoardMostLikesToLessLikes
  
}
// Ouvrir le menu déroulant au clic
function dropDown(){
  document.getElementById('myDropDown').classList.toggle('show');
// modifier le css lors de l'ouverture 
  document.getElementById('dropbtn').classList.toggle('border_raduis_btn_down')
  document.getElementById('dropbtn').classList.toggle('border_raduis_btn_up')
  document.getElementById('cross').classList.toggle('icone_cross_button_nav_return')
  

}






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





















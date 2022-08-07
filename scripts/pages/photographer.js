import {Lightbox} from '../utils/lightbox.js'

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

  const queryString_url_id = window.location.search;

  const urlSearchParams = new URLSearchParams(queryString_url_id);

  const id = urlSearchParams.get('id')
  
  // modification des informations de chaque photographe suivant l'id 
  
  
  // je veux transformer id qui est en string en nombre
  const valueId = parseInt(id, 10)
  
  
  const photographerfiltred =  filterIdPhotographers(data, valueId)
  
  // recuperer les photos des photographers
  
  

  const photographerId = valueId
  let structure = structurePhotographer(photographerfiltred)

  
  // Grille des medias des photographe


  const mediaFiltred = filterMediaOfPhotographer(data, photographerId)
  let mediaFiltredByName = filterMediaWithName(mediaFiltred)
  let mediaFiltredByLikes = filterMediaByLikes(mediaFiltred)
  let mediaFiltredByDate = filterMediaByDate(mediaFiltred)
  // Afficher la Grille
  displayGrid(mediaFiltredByLikes)
  filterMediaByLikes(mediaFiltred)
  
  
  
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
        return data

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

function TestMedia(media){
  // Trouver quels medias sont des videos 
  let test = media.image||media.video.substring(media.image||media.video.lastIndexOf('.')+1)
  
  // renvoyer "mp4" lorsque le media est une video  
  return test
}
function structurePhotographer(photographerfiltred){
  const main_photographer = document.getElementById('section_profile')
  const picturePhotgraphe = `./assets/photographers/${photographerfiltred.portrait}
  
  `
  const structurePhotographer = `
  <div class="photograph-header"> 
        
    <div class="main_information  position_main_information">
      <h1 id="profile_name">${photographerfiltred.name}</h1>
      <p class="red">${photographerfiltred.city + ', ' + photographerfiltred.country  }</p>
      <p id="profile_tagline">${photographerfiltred.tagline  }</p>
    </div> 
       
    <div>
      <button id="contact_button" class="contact_button flexcenter"  >Contactez-moi</button>
    </div>
    <div class="main_information">
      <p id="profile_picture">
      <img class="img_profile" alt = "oui" src="${picturePhotgraphe}"></p>
    </div>
  </div> `

  main_photographer.innerHTML = structurePhotographer
  main_photographer.querySelector('#contact_button').addEventListener('click', displayModal)
  
  const contact_modal = document.getElementById('contact_modal')
  contact_modal.querySelector('#closeModal').addEventListener('click', closeModal)
  return main_photographer
}

function CreateVideo(media){
  /* arraySort =  filterMediaByLikes(mediaFiltred) */
   
  const div_grid_element = document.getElementById('element_of_photographer')
      
      
  let div_media = document.createElement('div')
  
  
  let title_media = document.createElement('h2')
  title_media.textContent = media.title
  title_media.classList.add('red')
  

  let likes_media = document.createElement('p')
  likes_media.textContent = media.likes
  likes_media.classList.add('likes')
  
  let title_and_likes = document.createElement('div')
  title_and_likes.classList.add('flexbetween')
  let title = document.createElement('div')
  

  let likes = document.createElement('div')
  likes.classList.add('flexcenter')

  let heart = document.createElement('p')
  heart.classList.add('heart')

      
  let video_media = document.createElement('video')
  let video_url = '/assets/photographers/Sample Photos/' + media.photographerId + '/' + media.video
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

function CreateImage( media){
/* arraySort = filterMediaByLikes(mediaFiltred) */
  const div_grid_element = document.getElementById('element_of_photographer')
      
      
  let div_media = document.createElement('div')
  
  
  let title_media = document.createElement('h2')
  title_media.textContent = media.title
  title_media.classList.add('red')
  

  let likes_media = document.createElement('p')
  likes_media.textContent = media.likes
  likes_media.classList.add('likes')
  
  let title_and_likes = document.createElement('div')
  title_and_likes.classList.add('flexbetween')
  let title = document.createElement('div')
  

  let likes = document.createElement('div')
  likes.classList.add('flexcenter')

  let heart = document.createElement('p')
  heart.classList.add('heart')

  let img_media = document.createElement('img')
  let media_photo = '/assets/photographers/Sample Photos/' + media.photographerId + '/' + media.image
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
function gridOfMediaOfPhotographer(media) {
    
  const test = TestMedia(media)
  

  if(test == 'mp4'){
        
    CreateVideo(media)
    
  } else  {
    
    CreateImage(media)
    
  }
  
}
function displayGrid(mediaFiltred){
  
  mediaFiltred.forEach(media => {
    gridOfMediaOfPhotographer(media)
  }); 
  Lightbox.init()

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


function filterMediaByLikes(mediaFiltred){
  let a = []

  for (let i = 0; i < mediaFiltred.length; i++) {
    a.push(mediaFiltred[i].likes)
    
  }
  a.sort((a, b)=> b - a)
 
  // recuperer le tableau des likes trier du plus grand au plus petit 
  const boardOFLikes = a
  let BoardMostLikesToLessLikes = []
  for (let i = 0; i < boardOFLikes.length; i++) {

    let likes = boardOFLikes[i]
    
    const findMediaWithLikes = mediaFiltred.find(element => element.likes === likes)
    BoardMostLikesToLessLikes.push(findMediaWithLikes)
  }
  return BoardMostLikesToLessLikes
  
}
function filterMediaWithName(mediaFiltred){
  let a = []
  for (let i = 0; i < mediaFiltred.length; i++) {
    
    a.push(mediaFiltred[i].title)
    
  }
  a.sort()
  
  const BoardOfName = a
  let BoardOfNameFilter = []
  for (let i = 0; i < BoardOfName.length; i++) {
    
    let title = BoardOfName[i]
    
    const findMediaByTitle = mediaFiltred.find(element => element.title === title)
    BoardOfNameFilter.push(findMediaByTitle)
    
  }
  return BoardOfNameFilter
}
function filterMediaByDate(mediaFiltred){
// creation d'un tableau 
let dates= []
// insertion des dates dans le tableau 
for (let i = 0; i < mediaFiltred.length; i++) {
  dates.push(mediaFiltred[i].date)
  
}
// trier le tableau en fonction du temps 
function compareTimes(a, b) {
  if (a.valueOf() < b.valueOf()) return -1;
  if (a.valueOf() > b.valueOf()) return 1;
  return 0;
}
dates.sort(compareTimes)
// creer un nouveau tableau pour insérer les infos des medias 
let boardOfDateFilter = []
// recuperer les medias en fonction des dates 
for (let i = 0; i < mediaFiltred.length; i++) {
  
  let date = dates[i]
  
  const findMediaWithDate = mediaFiltred.find(element => element.date === date)
  boardOfDateFilter.push(findMediaWithDate)
  
}
return boardOfDateFilter
}
buttonFilter()
function dropDown(){
  let show =  document.getElementById('myDropDown')
  show.classList.toggle('show');
  
 
 // modifier le css lors de l'ouverture 
   document.getElementById('dropbtn').classList.toggle('border_raduis_btn_down')
   document.getElementById('dropbtn').classList.toggle('border_raduis_btn_up')
   document.getElementById('cross').classList.toggle('icone_cross_button_nav_return')
   
   ListenerBtnFilter ()
   
}
// Menu déroulant 

function buttonFilter() {

const navFilter = document.getElementById('filter')                                                            
const button = document.createElement('div')                                                                

  button.innerHTML =    `
  <div class="dropdown" id="test">
  <button  id="dropbtn"  class="flexaround border_raduis_btn_up PopularityFirst ">Popularité 
  <i class="icone_cross_button_nav" id="cross"></i>
  
   </button>
  <div id="myDropDown" class="dropDownContent">
    <a id="textSecondBtn" href="#"" >Date</a>
    <div  id="secondBtn" class="border_design_btn"></div>
    <a href="#" id="thirdBtn" class="border_raduis_btn_bottom">Titre</a>          
  </div>
</div>`



navFilter.appendChild(button)
  


}

const test = document.getElementById('test')
test.addEventListener('click', function(){
  dropDown()
})
function GetMedia(data){
  const queryString_url_id = window.location.search;
  const urlSearchParams = new URLSearchParams(queryString_url_id);
  let id = urlSearchParams.get('id')

  const valueId = parseInt(id, 10)
  const photographerId = valueId

  const BoardOfMedia = data.media


  /* Je souhaite récupérer les medias d'un photographe à partir de son id */
  const medias = BoardOfMedia.filter(element => element.photographerId === photographerId)
  return medias
}
/* console.log(GetMedia); */

function ListenerBtnFilter (){


let firstBtn = document.getElementById('dropbtn')                                                          
let secondBtn = document.getElementById('secondBtn')
let thirdBtn = document.getElementById('thirdBtn')
let myDropDown = document.getElementById('myDropDown')
let textSecondBtn = document.getElementById('textSecondBtn')

if (myDropDown.classList.contains('show')) {
  if (firstBtn.classList.contains('PopularityFirst')) {
    

    secondBtn.addEventListener('click', function () {
      firstBtn.innerHTML = 'Date <i class="icone_cross_button_nav" id="cross"></i>'          
      textSecondBtn.innerHTML = 'Titre'
      thirdBtn.innerHTML = 'Popularité'
      firstBtn.classList.remove('PopularityFirst')
      firstBtn.classList.add('DateFirst')
      

      // récuperer les data 
      getUsers().then((data => {

        const mediaFiltred = GetMedia(data)
        
        const element_of_photographer = document.getElementById('element_of_photographer')
        element_of_photographer.innerHTML = ''
        const mediaByDate = filterMediaByDate(mediaFiltred)
        displayGrid(mediaByDate)
        
         

      }))
      
      
    }) 
    thirdBtn.addEventListener('click', function () {
      firstBtn.innerHTML = 'Titre <i class="icone_cross_button_nav" id="cross"></i>'           
      textSecondBtn.innerHTML = 'Popularité'
      thirdBtn.innerHTML = 'Date'
      firstBtn.classList.remove('PopularityFirst')
      firstBtn.classList.add('TitleFirst')
       
      dropDown()
            // récuperer les data 
            getUsers().then((data => {
            
              const mediaFiltred = GetMedia(data)
              const element_of_photographer = document.getElementById('element_of_photographer')
              // mettre la page blanche
              element_of_photographer.innerHTML = ''
               // Afficher la nouvelle grille 
              const mediaByName = filterMediaWithName(mediaFiltred)
              displayGrid(mediaByName)
              
      
      
      
            }))
    }) 


  } else if (firstBtn.classList.contains('DateFirst')){
    

    secondBtn.addEventListener('click', function () {
      firstBtn.innerHTML = 'Titre <i class="icone_cross_button_nav" id="cross"></i>'           
      textSecondBtn.innerHTML = 'Popularité'
      thirdBtn.innerHTML = 'Date'
      firstBtn.classList.remove('DateFirst')
      firstBtn.classList.add('TitleFirst')
      dropDown()
      getUsers().then((data => {
            
          const mediaFiltred = GetMedia(data)
          const element_of_photographer = document.getElementById('element_of_photographer')
          // mettre la page blanche
          element_of_photographer.innerHTML = ''
           // Afficher la nouvelle grille 
          const mediaByName = filterMediaWithName(mediaFiltred)
          displayGrid(mediaByName)
          
  
  
  
        }))
    }) 
    thirdBtn.addEventListener('click', function () {
      firstBtn.innerHTML = 'Popularité<i class="icone_cross_button_nav" id="cross"></i>'           
      textSecondBtn.innerHTML = 'Date'
      thirdBtn.innerHTML = 'Titre'
      firstBtn.classList.remove('DateFirst')
      firstBtn.classList.add('PopularityFirst')
      dropDown()
      getUsers().then((data => {
            
          const mediaFiltred = GetMedia(data)
          const element_of_photographer = document.getElementById('element_of_photographer')
          // mettre la page blanche
          element_of_photographer.innerHTML = ''
           // Afficher la nouvelle grille 
          const mediaByLikes = filterMediaByLikes(mediaFiltred)
          displayGrid(mediaByLikes)
          
  
  
  
        }))
    }) 
  
  
  } else if (firstBtn.classList.contains('TitleFirst')){
    

    secondBtn.addEventListener('click', function () {
      firstBtn.innerHTML = 'Popularité<i class="icone_cross_button_nav" id="cross"></i>'           
      textSecondBtn.innerHTML = 'Date'
      thirdBtn.innerHTML = 'Titre'
      firstBtn.classList.remove('TitleFirst')
      firstBtn.classList.add('PopularityFirst')
      dropDown()
      getUsers().then((data => {
            
          const mediaFiltred = GetMedia(data)
          const element_of_photographer = document.getElementById('element_of_photographer')
          // mettre la page blanche
          element_of_photographer.innerHTML = ''
           // Afficher la nouvelle grille 
          const mediaByLikes = filterMediaByLikes(mediaFiltred)
          displayGrid(mediaByLikes)
          
  
  
  
        }))
    }) 
    thirdBtn.addEventListener('click', function () {
      firstBtn.innerHTML = 'Date<i class="icone_cross_button_nav" id="cross"></i>'           
      textSecondBtn.innerHTML = 'Popularité'
      thirdBtn.innerHTML = 'Titre'
      firstBtn.classList.remove('TitleFirst')
      firstBtn.classList.add('DateFirst')
      dropDown()
      getUsers().then((data => {
        
        const mediaFiltred = GetMedia(data)
        const element_of_photographer = document.getElementById('element_of_photographer')
        element_of_photographer.innerHTML = ''
        const mediaByDate = filterMediaByDate(mediaFiltred)
        displayGrid(mediaByDate)
        



      }))
    }) 
  }
  
} 

}
// Ouvrir le menu déroulant au clic









   




 






















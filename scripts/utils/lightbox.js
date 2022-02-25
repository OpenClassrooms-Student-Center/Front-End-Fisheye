function generateLightbox() {
  //DOM elements
  const images = document.querySelectorAll("a img");
  console.log(images);
  const lightbox = document.createElement("div");

  //ajout d'elements HTML
  lightbox.id = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox__close">
        <i class="fa-solid fa-xmark"></i></button>
    <button class="lightbox__prev">
        <i class="fas fa-chevron-left"></i>
        </button>
    <button class="lightbox__next">
        <i class="fas fa-chevron-right"></i>
        </button>`;
  document.body.appendChild(lightbox);

  //ajoute une classe "active" qui rend la lightbox visible au clic
  images.forEach((image) => {
    const img = document.createElement("img");
    //cree les img dans la lightbox
    lightbox.appendChild(img);
    img.src = image.src;

    image.addEventListener("click", (e) => {
      //affiche la lightbox
      lightbox.classList.add("active");
      //affiche la photo selectionnée
      img.classList.add("lightboxImg");
    });
  });
  const pix = document.querySelectorAll("#lightbox img");

 
  //ferme la lightbox et retire la classe "acitve" quand on clic sur la croix
  const closeBtn = document.querySelector(".lightbox__close");
  closeBtn.addEventListener("click", (e) => {
    let imgActive = document.querySelector(".lightboxImg");
    lightbox.classList.remove("active");
    lightbox.removeChild(imgActive);
  });

  //suivant
  const nextBtn = document.querySelector(".lightbox__next");
  const prevBtn = document.querySelector(".lightbox__prev");
  //const pix = document.querySelectorAll("#lightbox img");
  let etape =0;

  nextBtn.addEventListener('click', ()=> {
    
       console.log(pix);
      
      etape ++;

      if(etape >= pix.length) {
          etape= 0;
      }
      console.log(etape);
      enleverImg();
      pix[etape].classList.add('lightboxImg');

  })

  prevBtn.addEventListener('click', ()=> {

    etape --;
    if(etape < 0) {
        etape= pix.length - 1;
    }
    enleverImg();
    pix[etape].classList.add('lightboxImg')

  })


  //   //aller au suivant
  //   //retirer la class lighboxImg

  //   let etape = 0;
     function enleverImg() {
      images.forEach((image, i) => {
         let currentImg = document.querySelector(".lightboxImg");
         pix[i].classList.remove("lightboxImg");
       });
     }

  //   
  //   const prevBtn = document.querySelector(".lightbox__prev");
  //   const pix = document.querySelectorAll(".lightbox img");
  //   console.log(pix);
  //   prevBtn.addEventListener("click", (e) => {
  //     etape++;
  //     console.log(images[etape]);
  //     enleverImg();
  //     pix.classList.add('ligghtboxImg');

  //     images.classList.add("lightboxImg");
  //   });
}

export { generateLightbox };

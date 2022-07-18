export class AsideLikes {
  /**
   * @param {Collection} medias
   * @param {Object} photographer
   */
  constructor(medias, photographerProfil) {
    this.medias = medias;
    this.photographerProfil = photographerProfil;
  }
  createAsideLikes() {
    const aside = document.createElement("aside");
    let likes = 0;
    this.medias.forEach((media) => {
      likes = likes + parseFloat(media.likes);
    });

    const contentAside = `        
            <div>
            <div class="rowLikes">
             <span class="globalLikes">${likes}</span>
             <i class="fas fa-heart"></i>
            </div>
               
                <div class="countLikes">
                   
                    <span>${this.photographerProfil.price}€ / jour</span>                      
                </div>
            </div>`;
    aside.innerHTML = contentAside;
    return aside;
  }
}

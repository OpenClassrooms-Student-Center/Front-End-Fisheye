export function Photograph(name, id, city, country, tags, tagline, price, portrait) {

    this.name = name
    this.id = id;
    this.city = city;
    this.country = country;
    this.tags = tags
    this.tagline = tagline
    this.price = price
    this.portrait = portrait
    this.newName= name.replace(/ /g, ""); // permet de cré le nom a affiché
    
  }

export class Galery  { // fonction Objet
  constructor(id, photographerId, title, likes, date, price){
    this.id = id;
    this.photographerId = photographerId
    this.title = title;
    this.likes = likes
    this.date = date
    this.price = price
    }
  
  createMedia (data)   {
    if (data.image) 
    return new Image(data)
    if (data.video) 
    return new Video(data)
  }
  
    foundSrc  (pathName) { // permet de cré l'url de l'objet
      let media
      if (this.image)media =this.image
      else media = this.video
      this.src=`./assets/SamplePhotos/${pathName}/${media}`
    }
  }
 class Video extends Galery{//class qui extend la fonction galery et permet de crée les videos
  constructor(data) {
    super(data.id, data.photographerId, data.title, data.likes, data.date, data.price)
    this.video = data.video
  }
}

 class Image extends Galery{
  constructor(data) {
    super(data.id, data.photographerId, data.title, data.likes, data.date, data.price)
    this.image = data.image
  }
}
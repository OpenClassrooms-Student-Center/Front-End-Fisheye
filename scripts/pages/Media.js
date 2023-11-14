class Media {
  constructor(data, name) {
    this.id = data.id
    this.photographerId = data.photographerId
    this.title = data.title
    this.likes = data.likes
    this.date = data.date
    this.price = data.price
    this.firstName = this.getFirstName(name)
    if (data.hasOwnProperty('image')) this.image = data.image
    else if (data.hasOwnProperty('video')) this.video = data.video
    else console.error('No image or video found')
  }

  getFirstName(fullName) {
    let name = fullName.split(' ')[0]
    //Ellie-Rose => Ellie Rose
    if (name.indexOf('-') !== -1) name = name.replace('-', ' ')
    return name
  }

  createMedia() {
    const mediaCard = document.createElement('article')
    if (this.hasOwnProperty('image')) mediaCard.innerHTML = this.createImage()
    else if (this.hasOwnProperty('video')) mediaCard.innerHTML = this.createVideo()
    else console.error('No image or video found')
    mediaCard.innerHTML += `
      <div class='media-info'>
        <h2 class='title'>${this.title}</h2>
        <div class='likes'>
          <h3 class='number-likes'>${this.likes}</h3>
          <span class="fa-solid fa-heart"></span>
        </div>
      </div> 
    `
    return mediaCard
  }

  createImage() {
    return `
    <img class='image' src="assets/Sample Photos/${this.firstName}/${this.image}" alt="${this.title}">
    `
  }

  createVideo() {
    return `
    <video class='video' controls preload="metadata">
      <source src="assets/Sample Photos/${this.firstName}/${this.video}#t=1.1">
    </video>
    `
  }
}

export default Media

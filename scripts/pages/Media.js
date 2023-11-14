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
    return fullName.split(' ')[0]
  }

  createMedia() {
    const mediaCard = document.createElement('div')
    if (this.hasOwnProperty('image')) mediaCard.innerHTML = this.createImage()
    else if (this.hasOwnProperty('video')) mediaCard.innerHTML = this.createVideo()
    else console.error('No image or video found')
    mediaCard.innerHTML += `
      <div class='media-info'>
        <p class='title'>${this.title}</p>
        <div class='likes'>
          <p class='number-likes'>${this.likes}</p>
          <span class="fa-solid fa-heart"></span>
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
    <video class='video' controls>
      <source src="assets/Sample Photos/${this.firstName}/${this.video}">
    </video>
    `
  }
}

export default Media

/* eslint-disable no-unused-expressions */
class LikeSubject {
  constructor () {
    this._observers = []
  }

  like (observer) {
    this._observers.push(observer)
  }

  unlike (observer) {
    this._observers = this._observers.filter((obs) => obs !== observer)
  }

  fire (action) {
    this._observers.forEach((observer) => observer.update(action))
  }
}

export { LikeSubject }

const mediaLikeHeartElementClicked = document.querySelector('.fas')

export async function changeHeart () {
  console.log(mediaLikeHeartElementClicked)
  const heartClicked = mediaLikeHeartElementClicked.style.display

  heartClicked === 'none' ? 'block' : 'none'
}

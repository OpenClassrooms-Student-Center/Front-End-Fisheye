class LikeCounter {
  constructor () {
    this._count = 0
    this._likes = document.querySelector('.likes')
  }

  update (action) {
    if (action === 'INC') {
      this._count += 1
    } else if (action === 'DEC') {
      this._count -= 1
    } else {
      // eslint-disable-next-line no-throw-literal
      throw 'Unknow action'
    }

    this._likes.innerHTML = this._count
  }
}

export { LikeCounter }

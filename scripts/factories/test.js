class Media {
    constructor({src}) {
        this.id = 0
        this.likes = 9
        this.title = ""
        this.src = ""
    }
    
    getDom() {}
}

class Image extends Media {
    constructor({image}) {
        super({src: image});
    }
    
    getDom() {
        return `<image src="${this.src}" />`
    }
}

class Video extends Media {
    constructor({video}) {
        super({src: video});
    }

    getDom() {
        return `<video src="${this.src}" />`
    }
}

/**
 * 
 * @param type
 * @return {Media}
 */
const factory = type => {
    if (type === 'Image') return new Image("src/toto.jpg")
    if (type === 'Video') return new Image("src/toto.mp4")
    throw new Error('')
}

const media = factory('Image')
media.getDom()
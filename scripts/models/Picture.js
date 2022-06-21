import { Media } from './Media.js' 

export { Picture }

class Picture extends Media {
    constructor(data) {
        super(data)   
        this.image = data.image
    }
}

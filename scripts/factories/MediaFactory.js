import { Picture } from '../models/Picture.js'
import { Video } from '../models/Video.js'

export { MediaFactory }
class MediaFactory {
    constructor(data, type) {
        // Si le type est picture retourne une instance image
        if (type === 'picture') {
            return new Picture(data)
        } else if (type === 'video') {
            // Si le type est video retourne une instance video
            return new Video(data)
        } else {
            // Sinon retourne une erreur
            throw new Error('Unknown type format')
        }
    }
}

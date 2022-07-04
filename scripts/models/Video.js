import { Media } from "./Media.js"

export { Video }
class Video extends Media {
    constructor(data) {
        super(data)
        this.video = data.video
    }
}

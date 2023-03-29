
class typeMediaFactory {
    constructor(media, type) {
        if(type === "image"){
            return media.image;
        } else if(type === "video") {
            return media.video;
        } else {
            return "Unknow format type !"
        }

    }
}
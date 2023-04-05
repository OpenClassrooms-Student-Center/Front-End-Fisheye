
class TypedataFactory {
    constructor(media, type) {
        if(type === "image"){
            return new PhotographerMedia(media);
        } else if(type === "video") {
            return new PhotographerMedia(media);
        } else {
            return "Unknow format type !"
        }
    }
}
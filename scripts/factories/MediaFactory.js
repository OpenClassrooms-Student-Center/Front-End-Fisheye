
class typeMediaFactory {
    constructor(data, type) {
        if(type === "image"){
            return data.image;
        } else if(type === "video") {
            return data.video;
        } else {
            return "Unknow format type !"
        }

    }
}
export default class Video {
    constructor(media, name) {
        this._name = name[0].name
        this._pathMedia = media.video
        this._tag = "video"
        this._title = media.title
        this._likes = media.likes
        this._pathName = this.name.split(/-| /).join("")
        this._path = `../assets/Sample_Photos/${this._pathName}/${this._pathMedia}`
        this._id = media.id
        this._date = media.date
    }
    
    get path(){
        return this._path
    }
    get pathName(){
        return this._pathName
    }
    get name() {
        return this._name
    }
    get tag(){
        return this._tag
    }
    get title(){
        return this._title
    }
    get likes(){
        return this._likes
    }
    get id(){
        return this._id
    }
}

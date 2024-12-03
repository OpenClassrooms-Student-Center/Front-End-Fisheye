import mediaData from "./mediaData";

export default class imagesData extends  mediaData{
    constructor(data){
       super(data);
        this._image = data.image           
    }
}
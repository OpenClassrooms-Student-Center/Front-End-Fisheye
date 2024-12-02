import mediaFormatData from "./mediaFormatData";

export default class imagesFormatData extends  mediaFormatData{
    constructor(data){
       super(data);
        this._image = data.image           
    }
}
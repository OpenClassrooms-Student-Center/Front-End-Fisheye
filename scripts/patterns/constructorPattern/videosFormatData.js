import mediaFormatData from "./mediaFormatData";

export default class videosFormatData extends  mediaFormatData{
        constructor(data){
           super(data);
            this._video = data.video                     
    }
}
class MediaFactory {
    static createMedia(mediaData) {
        switch (mediaData.type) {
            case 'image':
                return new ImageMedia(mediaData);
            case 'video':
                return new VideoMedia(mediaData);
            default:
                throw new Error('Unknown media type');
        }
    }
}

class ImageMedia {
    constructor(mediaData) {
        this.title = mediaData.title;
        this.url = mediaData.url;
        this.type = mediaData.type;
    }

    display() {
        return `<img src="${this.url}" alt="${this.title}">`;
    }
}

class VideoMedia {
    constructor(mediaData) {
        this.title = mediaData.title;
        this.url = mediaData.url;
        this.type = mediaData.type;
    }

    display() {
        return `<video controls>
                    <source src="${this.url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>`;
    }
}

// Example usage:
const mediaData1 = { type: 'image', title: 'Beautiful Landscape', url: 'landscape.jpg' };
const mediaData2 = { type: 'video', title: 'Amazing Video', url: 'video.mp4' };

const media1 = MediaFactory.createMedia(mediaData1);
const media2 = MediaFactory.createMedia(mediaData2);

console.log(media1.display());
console.log(media2.display());
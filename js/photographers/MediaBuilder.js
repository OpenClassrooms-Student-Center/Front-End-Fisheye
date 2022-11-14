'use strict';
/////////////////////////////////////////

import GalleryFactory from '../Factory/GalleryFactory.js';
import LikeSubscriber from './Likes.js';

export default class MediaBuilder {
    // call the GalleryFactory to create the media section with 'Like' function and the box
    photographersMedias(data) {
        let media = data.media;
        let gallery = new GalleryFactory().builder(media);
        this.boxLikesAndPrice(gallery.totalLike, data.photographers);
        new LikeSubscriber();
    }

    // creates a box containing the total number of likes and the photographer's price
    boxLikesAndPrice(totalLike, photographers) {
        const id = window.location.search.split('id=')[1];

        photographers.forEach(element => {
            if (id == element.id) {
                let box = document.getElementById('box');
                let boxTemplate = `
                <span id="total-likes">${totalLike}</span>
                <i class="fas fa-heart" aria-label='likes'></i>
                <span>${element.price} €/ jour</span>
                `
                box.innerHTML = boxTemplate;
            }
        })
    }
}

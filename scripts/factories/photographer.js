import Photographer from '../models/photographer.js';
import Picture from '../models/picture.js';
import Movie from '../models/movie.js';

export default class PhotographerFactory {
  constructor(data) {
    if (data.name) {
      return new Photographer(data);
    }
    if (data.photographerId) {
      if (data.video) {
        return new Movie(data);
      }
      return new Picture(data);
    }
    throw new Error('Unknow type format');
  }
}

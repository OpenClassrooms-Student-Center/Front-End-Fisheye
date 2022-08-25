import PhotoView from '../views/photoView';
import VideoView from '../views/videoView';

export const mediaFactory = type => {
  switch (type) {
    case 'image':
      return new PhotoView('Erreur de chargement de la photo');
    case 'video':
      return new VideoView('Error de chargement de la vidéo');
  }
  return null;
};

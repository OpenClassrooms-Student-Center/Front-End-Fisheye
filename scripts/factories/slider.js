import sliderVideo from '../model/SliderVideo.js';
import sliderPhoto from '../model/SliderPhoto.js';

export default function sliderFactory(firstMedia, sortMedia) {
  let n = 0;
  const slider = document.querySelector('.slider');
  const slidesContainer = document.querySelector('.slides__container');
  const slides = [];
  sortMedia.forEach((media, index) => {
    const slide = document.createElement('article');
    slide.classList.add('slide');
    if (media.tag === 'video') {
      slide.innerHTML = sliderVideo(media);
    } else if (media.tag === 'img') {
      slide.innerHTML = sliderPhoto(media);
    }

    if (firstMedia.id === media.id) {
      n = index;
    }

    slidesContainer.appendChild(slide);
    slides.push(slide);
  });

  slider.classList.add('active');
  slider.ariaHidden = 'false';
  const firstSlide = slides[n];
  firstSlide.className += ' active';
  const body = document.querySelector('body');
  body.style.overflow = 'hidden';

  const nbrSlider = slides.length;
  const totalLikes = document.querySelector('.totalLikes');
  totalLikes.style.display = 'none';

  function goPreviousSlide() {
    slides[n].classList.remove('active');
    slides[n].ariaHidden = 'true';
    n--;
    if (n < 0) { n = nbrSlider - 1; }
    slides[n].classList.add('active');
    slides[n].ariaHidden = 'false';
  }

  function goNextSlide() {
    slides[n].classList.remove('active');
    slides[n].ariaHidden = 'true';
    n++;
    if (n >= nbrSlider) { n = 0; }
    slides[n].classList.add('active');
    slides[n].ariaHidden = 'false';
  }
  function closeSlider() {
    slidesContainer.innerHTML = '';
    slider.classList.remove('active');
    slider.ariaHidden = 'true';
    totalLikes.style.display = 'grid';
    body.style.overflow = 'scroll';
  }

  const back = document.querySelector('.back');
  const next = document.querySelector('.next');
  const close = document.querySelector('.close');

  back.addEventListener('click', () => goPreviousSlide());
  next.addEventListener('click', () => goNextSlide());
  close.addEventListener('click', () => closeSlider());
  document.addEventListener('keydown', (e) => {
    if (slider.ariaHidden === 'false' && e.code === 'ArrowRight') {
      goNextSlide();
    } else if (slider.ariaHidden === 'false' && e.code === 'ArrowLeft') {
      goPreviousSlide();
    } else if (slider.ariaHidden === 'false' && e.code === 'Escape') {
      closeSlider();
    }
  });
}

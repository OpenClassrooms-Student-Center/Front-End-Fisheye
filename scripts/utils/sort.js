// function sortMedias(media){
//     media = this._media;
//     const mediasDisplay = document.getElementById('mediaDisplay');
//     const popular = document.querySelector('.filter_popular');
//     const date = document.querySelector('.filter_date');
//     const title = document.querySelector('.filter_title');
//     const mediasPopularity = allMedia.sort((a, b) => b.likes - a.likes);
//     const mediasDate = allMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
//     const mediasTitle = allMedia.sort((a, b) => a.title.localeCompare(b.title));
    
//     popular.addEventListener('click', () => {
//         mediasDisplay.innerHTML = '';
//         mediasPopularity.forEach(media => {
//             const TemplateMedia = new PhotographerPage(this._photographer, media).createPhotographerMedia();
//             mediasDisplay.appendChild(TemplateMedia);
//         });
//     });
//     date.addEventListener('click', () => {
//         mediasDisplay.innerHTML = '';
//         mediasDate.forEach(media => {
//             const TemplateMedia = new PhotographerPage(this._photographer, media).createPhotographerMedia();
//             mediasDisplay.appendChild(TemplateMedia);
//         });
//     });
//     title.addEventListener('click', () => {
//         mediasDisplay.innerHTML = '';
//         mediasTitle.forEach(media => {
//             const TemplateMedia = new PhotographerPage(this._photographer, media).createPhotographerMedia();
//             mediasDisplay.appendChild(TemplateMedia);
//         });
//     });
// }
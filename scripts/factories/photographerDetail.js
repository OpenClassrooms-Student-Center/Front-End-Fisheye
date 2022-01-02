function photographerDetailFactory(data, photos) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const profilePicture = `assets/photographers/${portrait}`;
    const slideShow = new SlideShow(name, photos);


    function getPhotographersInfo() {
        const img = document.getElementById("profile-pic")
        img.src = profilePicture
        const nameElement = document.getElementById("name")
        nameElement.innerHTML = name
        const location = document.getElementById("location")
        location.innerHTML = city + ', ' + country
        const description = document.getElementById("desc")
        description.innerHTML = tagline
    }

    function getVideoDOM(index, video) {

        const videoLink = `assets/images/${name}/${video.video}`;
        const iconImage = `assets/icons/Vector.png`;

        const article = document.createElement('article');
        const link = document.createElement('a');
        const videoElement = document.createElement('video');
        const srcVideo = document.createElement('source');

        videoElement.appendChild(srcVideo);
        videoElement.setAttribute('width', 350);
        videoElement.setAttribute('height', 300);

        videoElement.addEventListener("click", function () {
            slideShow.open(index)

        }, true);
        srcVideo.setAttribute('src', videoLink);

        const titleDiv = document.createElement('div');

        const title = document.createElement('p');
        title.textContent = video.title;

        const span = document.createElement('span');
        span.textContent = video.likes;

        const icon = document.createElement('img');
        icon.setAttribute("src", iconImage);
        span.appendChild(icon);

        article.appendChild(link);

        link.appendChild(videoElement);
        titleDiv.appendChild(title)
        article.appendChild(titleDiv);
        title.appendChild(span);

        return (article);

    }

    function getPhotoDOM(index, photo, photos) {
        const photoLink = `assets/images/${name}/${photo.image ? photo.image : photo.video}`;
        const likeIcon = `assets/icons/Vector.png`;
        const article = document.createElement('article');
        const link = document.createElement('a');

        const img = document.createElement('img');
        img.addEventListener("click", function () {
            slideShow.open(index, photos)

        }, true);

        const titleDiv = document.createElement('div');

        const title = document.createElement('p');
        title.textContent = photo.title;

        const span = document.createElement('span');
        span.textContent = photo.likes;

        const icon = document.createElement('img');
        icon.setAttribute("src", likeIcon);
        icon.setAttribute("alt", "likes")
        span.appendChild(icon);

        img.setAttribute("src", photoLink)
        img.setAttribute("alt", photo.title)
        img.setAttribute("aria-pressed", false)
        img.setAttribute("role", "button")
        link.setAttribute("href", "javascript:void(0)")
        article.appendChild(link);

        link.appendChild(img);
        titleDiv.appendChild(title)
        article.appendChild(titleDiv);
        title.appendChild(span);

        return (article);
    }
    return { name, profilePicture, city, country, tagline, price, getPhotoDOM, getPhotographersInfo, getVideoDOM }
}

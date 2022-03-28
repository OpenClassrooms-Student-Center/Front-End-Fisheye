export class ComponentsFactory {
    constructor() {}

    getTextfieldDOM = (textfieldName, isTextArea) => {
        const textfield = document.createElement("fieldset");
        textfield.classList.add("form-group");

        const label = document.createElement("label");
        label.classList.add("form-group__label");
        label.setAttribute("for", textfieldName);
        label.textContent = textfieldName;

        let input;

        if (isTextArea) {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
            input.setAttribute("type", "text");
        }

        input.classList.add("form-group__textfield");
        input.id = textfieldName;
        input.setAttribute("name", textfieldName);
        input.setAttribute("placeholder", textfieldName);

        textfield.appendChild(label);
        textfield.appendChild(input);

        return textfield;
    };

    getLikeBtnDOM = (likes, isLiked) => {
        const button = document.createElement("button");
        button.classList.add("like-btn");

        const counter = document.createElement("p");
        counter.classList.add("like-btn__counter");
        counter.textContent = likes;

        const icon = document.createElement("i");
        icon.classList.add("like-btn__icon");

        if (isLiked) {
            icon.classList.add("like-btn__icon--liked");
            icon.addEventListener("click", unlike);
        } else {
            icon.addEventListener("click", like);
        }

        button.appendChild(counter);
        button.appendChild(icon);

        function unlike() {
            icon.removeEventListener("click", unlike);

            icon.classList.remove("like-btn__icon--liked");

            icon.addEventListener("click", like);
        }

        function like() {
            icon.removeEventListener("click", like);

            icon.classList.add("like-btn__icon--liked");

            icon.addEventListener("click", unlike);
        }

        return button;
    };

    getSortBtnDOM = () => {
        const sortContainer = document.createElement("div");
        sortContainer.classList.add("sort-container");

        const sortLabel = document.createElement("label");
        sortLabel.classList.add("sort-container__label");
        sortLabel.textContent = "Trier par";

        const sortBtn = document.createElement("ul");
        sortBtn.classList.add("sort-btn");

        const selectedContainer = document.createElement("li");
        const selected = document.createElement("button");
        selected.textContent = "Popularité";
        selectedContainer.classList.add("sort-btn__selected");

        selectedContainer.appendChild(selected);

        const icon = document.createElement("i");
        icon.classList.add("sort-btn__icon");

        selected.appendChild(icon);

        selectedContainer.addEventListener("click", openDropdown);

        const option1Container = document.createElement("li");
        const option1 = document.createElement("button");
        option1.textContent = "Date";
        option1Container.classList.add("sort-btn__option");
        option1Container.classList.add("sort-btn__option--hidden");

        option1Container.appendChild(option1);

        const option2Container = document.createElement("li");
        const option2 = document.createElement("button");
        option2.textContent = "Titre";
        option2Container.classList.add("sort-btn__option");
        option2Container.classList.add("sort-btn__option--hidden");

        option2Container.appendChild(option2);

        const options = [selectedContainer, option1Container, option2Container];

        sortBtn.appendChild(selectedContainer);
        sortBtn.appendChild(option1Container);
        sortBtn.appendChild(option2Container);

        function openDropdown() {
            selectedContainer.removeEventListener("click", openDropdown);

            icon.classList.add("sort-btn__icon--alt");
            option1Container.classList.remove("sort-btn__option--hidden");
            option2Container.classList.remove("sort-btn__option--hidden");

            options.forEach((option) => {
                option.addEventListener("click", closeDropdown);
            });
        }

        function closeDropdown(e) {
            options.forEach((option) => {
                option.removeEventListener("click", closeDropdown);
            });

            let filterChoosen = e.target.textContent;

            if (filterChoosen === "") {
                filterChoosen = selected.textContent;
            }

            if (filterChoosen !== selected.textContent) {
                switch (filterChoosen) {
                    case option1.textContent:
                        option1.textContent = selected.textContent;
                        break;
                    case option2.textContent:
                        option2.textContent = selected.textContent;
                        break;
                    default:
                        break;
                }

                selected.textContent = filterChoosen;
                selected.appendChild(icon);
            }

            icon.classList.remove("sort-btn__icon--alt");
            option1Container.classList.add("sort-btn__option--hidden");
            option2Container.classList.add("sort-btn__option--hidden");

            selectedContainer.addEventListener("click", openDropdown);
        }

        sortContainer.appendChild(sortLabel);
        sortContainer.appendChild(sortBtn);

        return sortContainer;
    };

    getMainBtnDOM = (btnText) => {
        const btn = document.createElement("button");
        btn.textContent = btnText;
        btn.classList.add("btn");

        return btn;
    };

    getLogoDOM = () => {
        const logo = document.createElement("button");
        logo.classList.add("logo");

        const image = document.createElement("img");
        image.classList.add("logo__img");
        image.setAttribute("alt", "Logo FishEye");
        image.setAttribute("src", "./assets/images/logo.png");

        logo.appendChild(image);

        logo.addEventListener("click", () => {
            window.location.href = "./index.html";
        });

        return logo;
    };

    getAvatarDOM = (data, isInCard) => {
        const { portrait, name } = data;

        const avatar = document.createElement("div");
        avatar.classList.add("avatar");

        const image = document.createElement("img");
        image.classList.add("avatar__img");
        image.setAttribute("alt", `Avatar de ${name}`);
        image.setAttribute("src", `../../assets/photographers/${portrait}`);

        avatar.appendChild(image);

        if (isInCard) {
            avatar.classList.add("avatar--card");
        }

        return avatar;
    };

    getUserNameDOM = (data, isInCard) => {
        const { name } = data;

        const userName = document.createElement("h2");
        userName.classList.add("user-name");
        userName.textContent = name;

        if (isInCard) {
            userName.classList.add("user-name--card");
        }

        return userName;
    };

    getUserLocationDOM = (data, isInCard) => {
        const { city, country } = data;

        const location = document.createElement("p");
        location.classList.add("user-location");
        location.textContent = `${city}, ${country}`;

        if (isInCard) {
            location.classList.add("user-location--card");
        }

        return location;
    };

    getUserTaglineDOM = (data, isInCard) => {
        const { tagline } = data;

        const userTagline = document.createElement("p");
        userTagline.classList.add("user-tagline");
        userTagline.textContent = tagline;

        if (isInCard) {
            userTagline.classList.add("user-tagline--card");
        }

        return userTagline;
    };

    getImageDOM = (data, photographerName, isLiked) => {
        const { title, image, likes } = data;

        const mediaContainer = document.createElement("figure");
        mediaContainer.classList.add("media-container");

        const mediaButton = document.createElement("button");

        const media = document.createElement("img");
        media.classList.add("media-container__media");
        media.setAttribute("alt", title);
        media.setAttribute("src", `../../assets/images/${photographerName.split(" ")[0]}/${image}`);

        mediaButton.appendChild(media);
        mediaContainer.appendChild(mediaButton);

        const figCaption = document.createElement("figcaption");
        figCaption.classList.add("media-container__figcaption");

        const mediaTitle = document.createElement("p");
        mediaTitle.textContent = title;

        figCaption.appendChild(mediaTitle);

        const likeBtn = this.getLikeBtnDOM(likes, isLiked);

        figCaption.appendChild(likeBtn);

        mediaContainer.appendChild(figCaption);

        return mediaContainer;
    };

    getVideoDOM = (data, photographerName, isLiked) => {
        const { title, video, likes } = data;

        const mediaContainer = document.createElement("figure");
        mediaContainer.classList.add("media-container");

        const mediaButton = document.createElement("button");

        const media = document.createElement("video");
        media.classList.add("media-container__media");

        const mediaSource = document.createElement("source");
        mediaSource.setAttribute("src", `../../assets/images/${photographerName.split(" ")[0]}/${video}`);
        mediaSource.setAttribute("type", "video/mp4");
        mediaSource.textContent = "Désolé, votre navigateur ne peut lire cette vidéo.";

        media.appendChild(mediaSource);
        mediaButton.appendChild(media);
        mediaContainer.appendChild(mediaButton);

        const figCaption = document.createElement("figcaption");
        figCaption.classList.add("media-container__figcaption");

        const mediaTitle = document.createElement("p");
        mediaTitle.textContent = title;

        figCaption.appendChild(mediaTitle);

        const likeBtn = this.getLikeBtnDOM(likes, isLiked);

        figCaption.appendChild(likeBtn);

        mediaContainer.appendChild(figCaption);

        return mediaContainer;
    };

    getUserCardDOM = (data) => {
        const { portrait, name, city, country, tagline, price, id } = data;

        const userCard = document.createElement("button");
        userCard.classList.add("user-card");

        const avatar = this.getAvatarDOM({ portrait, name }, true);
        avatar.classList.add("user-card__avatar");
        const userName = this.getUserNameDOM({ name }, true);
        const location = this.getUserLocationDOM({ city, country }, true);
        const userTagline = this.getUserTaglineDOM({ tagline }, true);

        const userPrice = document.createElement("p");
        userPrice.classList.add("user-card__price");
        userPrice.textContent = `${price}€/jour`;

        userCard.appendChild(avatar);
        userCard.appendChild(userName);
        userCard.appendChild(location);
        userCard.appendChild(userTagline);
        userCard.appendChild(userPrice);

        userCard.addEventListener("click", () => {
            window.location.href = `./photographer.html?id=${id}`;
        });

        return userCard;
    };

    getPhotographerHeaderDOM = (data, btnText) => {
        const { portrait, name, city, country, tagline } = data;

        const header = document.createElement("div");
        header.classList.add("photographer-header");

        const infos = document.createElement("div");
        infos.classList.add("photographer-header__infos");

        const userName = this.getUserNameDOM({ name }, false);
        const userLocation = this.getUserLocationDOM({ city, country }, false);
        const userTagline = this.getUserTaglineDOM({ tagline }, false);

        infos.appendChild(userName);
        infos.appendChild(userLocation);
        infos.appendChild(userTagline);

        const btnContainer = document.createElement("div");
        btnContainer.classList.add("photographer-header__btn-container");

        const button = this.getMainBtnDOM(btnText);

        btnContainer.appendChild(button);

        const avatarContainer = document.createElement("div");
        avatarContainer.classList.add("photographer-header__avatar-container");

        const avatar = this.getAvatarDOM({ portrait, name }, true);

        avatarContainer.appendChild(avatar);

        header.appendChild(infos);
        header.appendChild(btnContainer);
        header.appendChild(avatarContainer);

        return header;
    };

    getPhotographerLikesDOM = (data) => {
        const { price, medias } = data;

        const card = document.createElement("div");
        card.classList.add("photographer-likes");

        let count = 0;

        medias.forEach((media) => {
            count += media.likes;
        });

        const counter = document.createElement("p");
        counter.classList.add("photographer-likes__counter");
        counter.textContent = `${count}`;

        const icon = document.createElement("i");
        icon.classList.add("photographer-likes__counter__icon");

        counter.appendChild(icon);

        const photographerPrice = document.createElement("p");
        photographerPrice.classList.add("photographer-likes__photographerPrice");
        photographerPrice.textContent = `${price}€ / jour`;

        card.appendChild(counter);
        card.appendChild(photographerPrice);

        return card;
    };

    getLightboxDOM = (data) => {
        const { medias, index, photographerName } = data;

        const lightbox = document.createElement("dialog");
        lightbox.classList.add("lightbox");

        const previousBtn = document.createElement("button");
        previousBtn.classList.add("lightbox__previous");

        const previousIcon = document.createElement("i");
        previousIcon.classList.add("lightbox__previous__icon");

        previousBtn.appendChild(previousIcon);

        const figure = document.createElement("figure");
        figure.classList.add("lightbox__figure");

        const closeBtn = document.createElement("button");
        closeBtn.classList.add("lightbox__figure__close");
        closeBtn.setAttribute("id", "close-lightbox");

        const closeIcon = document.createElement("i");
        closeIcon.classList.add("lightbox__figure__close__icon");

        closeBtn.appendChild(closeIcon);

        let media;

        if (medias[index].image) {
            media = document.createElement("img");
            media.classList.add("lightbox__figure__media");
            media.setAttribute("src", `../../assets/images/${photographerName.split(" ")[0]}/${medias[index].image}`);
            media.setAttribute("alt", medias[index].title);
        }

        if (medias[index].video) {
            media = document.createElement("video");
            media.classList.add("lightbox__figure__media");
            media.setAttribute("controls", "true");

            const mediaSource = document.createElement("source");
            mediaSource.setAttribute("src", `../../assets/images/${photographerName.split(" ")[0]}/${medias[index].video}`);
            mediaSource.setAttribute("type", "video/mp4");
            mediaSource.textContent = "Désolé, votre navigateur ne peut lire cette vidéo.";

            media.appendChild(mediaSource);
        }

        const caption = document.createElement("figcaption");
        caption.classList.add("lightbox__figure__caption");
        caption.textContent = medias[index].title;

        figure.appendChild(closeBtn);
        figure.appendChild(media);
        figure.appendChild(caption);

        const nextBtn = document.createElement("button");
        nextBtn.classList.add("lightbox__next");

        const nextIcon = document.createElement("i");
        nextIcon.classList.add("lightbox__next__icon");

        nextBtn.appendChild(nextIcon);

        lightbox.appendChild(previousBtn);
        lightbox.appendChild(figure);
        lightbox.appendChild(nextBtn);

        return lightbox;
    };
}

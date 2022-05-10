export class ComponentsFactory {
    constructor() {}

    getTextfieldDOM = (data) => {
        const { textfieldName, type } = data;
        const textfield = document.createElement("fieldset");
        textfield.classList.add("form-group");

        const label = document.createElement("label");
        label.classList.add("form-group__label");
        label.setAttribute("for", textfieldName);
        label.textContent = textfieldName;

        let input;

        switch (type) {
            case "textarea":
                input = document.createElement("textarea");
                input.setAttribute("rows", "5");
                break;
            case "email":
                input = document.createElement("input");
                input.setAttribute("type", "email");
                break;
            default:
                input = document.createElement("input");
                input.setAttribute("type", "text");
                break;
        }

        input.classList.add("form-group__textfield");
        input.id = textfieldName;
        input.setAttribute("name", textfieldName);

        textfield.appendChild(label);
        textfield.appendChild(input);

        return textfield;
    };

    getLikeBtnDOM = (data) => {
        const { likes, id, isLiked } = data;

        const button = document.createElement("button");
        button.classList.add("like-btn");
        button.setAttribute("id", `${id}`);
        button.setAttribute("type", "button");

        const counter = document.createElement("p");
        counter.classList.add("like-btn__counter");
        counter.textContent = likes;

        const icon = document.createElement("i");
        icon.classList.add("like-btn__icon");
        icon.setAttribute("aria-label", "likes");

        if (isLiked) {
            icon.classList.add("like-btn__icon--liked");
            button.addEventListener("click", unlike);
        } else {
            button.addEventListener("click", like);
        }

        button.appendChild(counter);
        button.appendChild(icon);

        function unlike() {
            button.removeEventListener("click", unlike);

            icon.classList.remove("like-btn__icon--liked");

            button.addEventListener("click", like);
        }

        function like() {
            button.removeEventListener("click", like);

            icon.classList.add("like-btn__icon--liked");

            button.addEventListener("click", unlike);
        }

        return button;
    };

    getSortBtnDOM = (photographerId) => {
        const sortContainer = document.createElement("div");
        sortContainer.classList.add("sort-container");

        const sortLabel = document.createElement("label");
        sortLabel.setAttribute("id", "sort-label");
        sortLabel.classList.add("sort-container__label");
        sortLabel.textContent = "Trier par";

        const sortBtn = document.createElement("ul");
        sortBtn.classList.add("sort-btn");
        sortBtn.setAttribute("role", "button");
        sortBtn.setAttribute("aria-haspopup", "listbox");
        sortBtn.setAttribute("aria-expanded", "false");

        const selectedContainer = document.createElement("li");
        selectedContainer.setAttribute("id", "selected");
        selectedContainer.setAttribute("type", "button");
        selectedContainer.setAttribute("role", "listbox");
        selectedContainer.setAttribute("aria-activedescendant", "selected");
        selectedContainer.setAttribute("aria-selected", "true");
        selectedContainer.setAttribute("aria-labelledby", "sort-label");
        const selected = document.createElement("button");
        selected.textContent =
            window.location.search.includes("sort=") && window.location.search.split("&")[1].split("=")[1] !== "Popularit%C3%A9"
                ? window.location.search.split("&")[1].split("=")[1]
                : "Popularité";
        selectedContainer.classList.add("sort-btn__selected");

        selectedContainer.appendChild(selected);

        const icon = document.createElement("i");
        icon.classList.add("sort-btn__icon");

        selected.appendChild(icon);

        selectedContainer.addEventListener("click", openDropdown);

        const option1Container = document.createElement("li");
        option1Container.setAttribute("id", "option1");
        option1Container.setAttribute("type", "button");
        option1Container.setAttribute("role", "listbox");
        option1Container.setAttribute("aria-activedescendant", "option1");
        option1Container.setAttribute("aria-selected", "false");
        option1Container.setAttribute("aria-labelledby", "sort-label");
        const option1 = document.createElement("button");
        option1.textContent = selected.textContent === "Date" ? "Popularité" : "Date";
        option1Container.classList.add("sort-btn__option");
        option1Container.classList.add("sort-btn__option--hidden");

        option1Container.appendChild(option1);

        const option2Container = document.createElement("li");
        option2Container.setAttribute("id", "option2");
        option2Container.setAttribute("type", "button");
        option2Container.setAttribute("role", "listbox");
        option2Container.setAttribute("aria-activedescendant", "option2");
        option2Container.setAttribute("aria-selected", "false");
        option2Container.setAttribute("aria-labelledby", "sort-label");
        const option2 = document.createElement("button");
        option2.textContent = selected.textContent === "Titre" ? "Popularité" : "Titre";
        option2Container.classList.add("sort-btn__option");
        option2Container.classList.add("sort-btn__option--hidden");

        option2Container.appendChild(option2);

        const options = [selectedContainer, option1Container, option2Container];

        sortBtn.appendChild(selectedContainer);
        sortBtn.appendChild(option1Container);
        sortBtn.appendChild(option2Container);

        function openDropdown() {
            selectedContainer.removeEventListener("click", openDropdown);

            sortBtn.setAttribute("aria-expanded", "true");

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

            sortBtn.setAttribute("aria-expanded", "false");

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

            window.location.search = `id=${photographerId}&sort=${filterChoosen}`;

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
        btn.setAttribute("type", "button");
        btn.textContent = btnText;
        btn.classList.add("btn");

        return btn;
    };

    getSubmitBtnDOM = () => {
        const submitBtn = document.createElement("input");
        submitBtn.setAttribute("type", "submit");
        submitBtn.setAttribute("value", "Envoyer");
        submitBtn.classList.add("btn");

        return submitBtn;
    };

    getLogoDOM = () => {
        const logo = document.createElement("button");
        logo.setAttribute("type", "button");
        logo.classList.add("logo");

        const image = document.createElement("img");
        image.classList.add("logo__img");
        image.setAttribute("alt", "Fisheye Home page");
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

        if (isInCard) {
            image.setAttribute("alt", "");
        } else {
            image.setAttribute("alt", `Avatar de ${name}`);
        }

        image.setAttribute("src", `../../assets/photographers/${portrait}`);

        avatar.appendChild(image);

        if (isInCard) {
            avatar.classList.add("avatar--card");
        }

        return avatar;
    };

    getUserNameDOM = (data, isInCard) => {
        const { name } = data;

        let userName;

        if (isInCard) {
            userName = document.createElement("h2");
            userName.classList.add("user-name--card");
        } else {
            userName = document.createElement("h1");
        }

        userName.classList.add("user-name");
        userName.textContent = name;

        return userName;
    };

    getUserLocationDOM = (data, isInCard) => {
        const { city, country } = data;

        let location;

        if (isInCard) {
            location = document.createElement("p");
            location.classList.add("user-location--card");
        } else {
            location = document.createElement("h2");
        }

        location.classList.add("user-location");
        location.textContent = `${city}, ${country}`;

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

    getImageDOM = (data, photographerName) => {
        const { title, image, likes, id, isLiked } = data;

        const mediaContainer = document.createElement("figure");
        mediaContainer.classList.add("media-container");

        const mediaButton = document.createElement("button");
        mediaButton.setAttribute("type", "button");
        mediaButton.setAttribute("aria-haspopup", "dialog");

        const media = document.createElement("img");
        media.classList.add("media-container__media");
        media.setAttribute("alt", `image : ${title}`);
        media.setAttribute("src", `../../assets/images/${photographerName.split(" ")[0]}/${image}`);

        mediaButton.appendChild(media);
        mediaContainer.appendChild(mediaButton);

        const figCaption = document.createElement("figcaption");
        figCaption.classList.add("media-container__figcaption");

        const mediaTitle = document.createElement("p");
        mediaTitle.textContent = title;

        figCaption.appendChild(mediaTitle);

        const likeBtn = this.getLikeBtnDOM({ likes, id, isLiked });

        figCaption.appendChild(likeBtn);

        mediaContainer.appendChild(figCaption);

        return mediaContainer;
    };

    getVideoDOM = (data, photographerName) => {
        const { title, video, likes, id, isLiked } = data;

        const mediaContainer = document.createElement("figure");
        mediaContainer.classList.add("media-container");

        const mediaButton = document.createElement("button");
        mediaButton.setAttribute("type", "button");
        mediaButton.setAttribute("aria-haspopup", "dialog");

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

        const likeBtn = this.getLikeBtnDOM({ likes, id, isLiked });

        figCaption.appendChild(likeBtn);

        mediaContainer.appendChild(figCaption);

        return mediaContainer;
    };

    getUserCardDOM = (data) => {
        const { portrait, name, city, country, tagline, price, id } = data;

        const userCard = document.createElement("button");
        userCard.setAttribute("type", "button");
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
        button.setAttribute("id", "contact-btn");
        button.setAttribute("aria-haspopup", "dialog");

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
        icon.setAttribute("aria-label", "likes");

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
        let previousIndex;
        let updatedIndex = index;

        const lightbox = document.createElement("dialog");
        lightbox.classList.add("lightbox");
        lightbox.setAttribute("aria-label", "image closeup view");
        lightbox.setAttribute("aria-hidden", "true");

        const previousBtn = document.createElement("button");
        previousBtn.setAttribute("type", "button");
        previousBtn.setAttribute("aria-label", "Previous image");
        previousBtn.classList.add("lightbox__previous");
        previousBtn.setAttribute("tabindex", "3");

        const previousIcon = document.createElement("i");
        previousIcon.classList.add("lightbox__previous__icon");

        previousBtn.appendChild(previousIcon);

        const figure = document.createElement("figure");
        figure.classList.add("lightbox__figure");

        const closeBtn = document.createElement("button");
        closeBtn.classList.add("lightbox__figure__close");
        closeBtn.setAttribute("id", "close-lightbox");
        closeBtn.setAttribute("type", "button");
        closeBtn.setAttribute("aria-label", "Close dialog");
        closeBtn.setAttribute("tabindex", "1");

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

        media.removeAttribute("aria-haspopup");

        const caption = document.createElement("figcaption");
        caption.classList.add("lightbox__figure__caption");
        caption.textContent = medias[index].title;

        figure.appendChild(closeBtn);
        figure.appendChild(media);
        figure.appendChild(caption);

        const nextBtn = document.createElement("button");
        nextBtn.setAttribute("type", "button");
        nextBtn.setAttribute("aria-label", "Next image");
        nextBtn.classList.add("lightbox__next");
        nextBtn.setAttribute("tabindex", "2");

        const nextIcon = document.createElement("i");
        nextIcon.classList.add("lightbox__next__icon");

        nextBtn.appendChild(nextIcon);

        lightbox.appendChild(previousBtn);
        lightbox.appendChild(figure);
        lightbox.appendChild(nextBtn);

        const dispatchKeyEvent = (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    if (updatedIndex !== 0) {
                        previousMedia();
                    }
                    break;
                case "ArrowRight":
                    if (updatedIndex !== medias.length - 1) {
                        nextMedia();
                    }
                    break;
                default:
                    break;
            }
        };

        const previousMedia = () => {
            previousIndex = updatedIndex;
            updatedIndex--;
            figure.removeChild(media);

            if (medias[updatedIndex].image) {
                media = document.createElement("img");
                media.classList.add("lightbox__figure__media");
                media.setAttribute("src", `../../assets/images/${photographerName.split(" ")[0]}/${medias[updatedIndex].image}`);
                media.setAttribute("alt", medias[updatedIndex].title);
            }

            if (medias[updatedIndex].video) {
                media = document.createElement("video");
                media.classList.add("lightbox__figure__media");
                media.setAttribute("controls", "true");

                const mediaSource = document.createElement("source");
                mediaSource.setAttribute("src", `../../assets/images/${photographerName.split(" ")[0]}/${medias[updatedIndex].video}`);
                mediaSource.setAttribute("type", "video/mp4");
                mediaSource.textContent = "Désolé, votre navigateur ne peut lire cette vidéo.";

                media.appendChild(mediaSource);
            }

            figure.prepend(media);

            caption.textContent = medias[updatedIndex].title;

            if (updatedIndex === 0) {
                previousIcon.classList.add("lightbox__previous__icon--disabled");
                previousBtn.removeEventListener("click", previousMedia);
            } else {
                previousBtn.addEventListener("click", previousMedia);
            }

            if (previousIndex === medias.length - 1) {
                nextIcon.classList.remove("lightbox__next__icon--disabled");
                nextBtn.addEventListener("click", nextMedia);
            }
        };

        const nextMedia = () => {
            previousIndex = updatedIndex;
            updatedIndex++;
            figure.removeChild(media);

            if (medias[updatedIndex].image) {
                media = document.createElement("img");
                media.classList.add("lightbox__figure__media");
                media.setAttribute("src", `../../assets/images/${photographerName.split(" ")[0]}/${medias[updatedIndex].image}`);
                media.setAttribute("alt", medias[updatedIndex].title);
            }

            if (medias[updatedIndex].video) {
                media = document.createElement("video");
                media.classList.add("lightbox__figure__media");
                media.setAttribute("controls", "true");

                const mediaSource = document.createElement("source");
                mediaSource.setAttribute("src", `../../assets/images/${photographerName.split(" ")[0]}/${medias[updatedIndex].video}`);
                mediaSource.setAttribute("type", "video/mp4");
                mediaSource.textContent = "Désolé, votre navigateur ne peut lire cette vidéo.";

                media.appendChild(mediaSource);
            }

            figure.prepend(media);

            caption.textContent = medias[updatedIndex].title;

            if (updatedIndex === medias.length - 1) {
                nextIcon.classList.add("lightbox__next__icon--disabled");
                nextBtn.removeEventListener("click", nextMedia);
            } else {
                nextBtn.addEventListener("click", nextMedia);
            }

            if (previousIndex === 0) {
                previousIcon.classList.remove("lightbox__previous__icon--disabled");
                previousBtn.addEventListener("click", previousMedia);
            }
        };

        if (updatedIndex === 0) {
            previousIcon.classList.add("lightbox__previous__icon--disabled");
        } else {
            previousBtn.addEventListener("click", previousMedia);
        }

        if (updatedIndex === medias.length - 1) {
            nextIcon.classList.add("lightbox__next__icon--disabled");
        } else {
            nextBtn.addEventListener("click", nextMedia);
        }

        document.addEventListener("keydown", dispatchKeyEvent);

        return lightbox;
    };

    getContactFromDOM = (data) => {
        const { photographerName } = data;

        const contactFormContainer = document.createElement("dialog");
        contactFormContainer.classList.add("contact-form-container");

        const contactForm = document.createElement("form");
        contactForm.classList.add("contact-form");

        const contactHeading = document.createElement("h1");
        contactHeading.classList.add("contact-form__heading");
        contactHeading.textContent = `Contactez-moi ${photographerName}`;

        const firstName = this.getTextfieldDOM({ textfieldName: "Prénom", type: "text" });
        const lastName = this.getTextfieldDOM({ textfieldName: "Nom", type: "text" });
        const email = this.getTextfieldDOM({ textfieldName: "Email", type: "email" });
        const message = this.getTextfieldDOM({ textfieldName: "Votre message", type: "textarea" });
        const submit = this.getSubmitBtnDOM();

        const closeBtn = document.createElement("button");
        closeBtn.classList.add("contact-form__close");
        closeBtn.setAttribute("id", "close-contact-form");

        const closeIcon = document.createElement("i");
        closeIcon.classList.add("contact-form__close__icon");

        closeBtn.appendChild(closeIcon);

        contactForm.appendChild(contactHeading);
        contactForm.appendChild(firstName);
        contactForm.appendChild(lastName);
        contactForm.appendChild(email);
        contactForm.appendChild(message);
        contactForm.appendChild(submit);
        contactForm.appendChild(closeBtn);

        contactFormContainer.appendChild(contactForm);

        return contactFormContainer;
    };
}

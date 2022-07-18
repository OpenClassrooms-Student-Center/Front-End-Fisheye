import { LightboxContainer } from "../components/lightbox/LightboxContainer.js";
import { LightboxFactory } from "../factories/lightboxFactory.js";

export class Lightbox {
  // Init a new lightbox object based on the clicked media
  static init() {
    const generatedMedias = Array.from(
      document.querySelectorAll(
        ".mediaBox img[src$='.jpg'], video[src$='.mp4']"
      )
    );
    const generatedTitles = Array.from(document.querySelectorAll(".titles"));
    const tabLinks = generatedMedias.map((media) => media.getAttribute("src"));
    const titles = generatedTitles.map((title) => title.innerText);
    for (let i = 0; i < generatedMedias.length; i++) {
      const media = generatedMedias[i];
      const mediaLink = media.getAttribute("src");
      const title = generatedTitles[i];
      media.addEventListener("click", () => {
        const beforeElementFocus = document.activeElement;
        new Lightbox(
          mediaLink,
          tabLinks,
          title.innerText,
          titles,
          beforeElementFocus
        );
      });
      media.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter") {
          media.click();
          e.preventDefault();
        }
      });
    }
  }

  
  constructor(mediaLink, tabLinks, title, tabTitles, beforeElementFocus) {
    this.mediaLink = mediaLink;
    this.tabLinks = tabLinks;
    this.title = title;
    this.tabTitles = tabTitles;
    this.beforeElementFocus = beforeElementFocus;
    this.main = document.querySelector("main");

    const buildLightbox = new LightboxContainer();
    this.lightbox = buildLightbox.buildDOM();
    this.main.appendChild(this.lightbox);
    this.lightbox.focus();

    this.leftArrow = document.querySelector(".previous");
    this.rightArrow = document.querySelector(".next");
    this.closeIcon = document.querySelector(".close");

    this.displayLightboxContent(mediaLink, title);
    this.manageEvent();
    this.keyboardNav();
  }


  displayLightboxContent(mediaLink, title) {
    const contentContainer = this.lightbox.querySelector(
      ".lightbox-content div"
    );
    const lightboxContent = new LightboxFactory(
      mediaLink.split(".").pop(),
      mediaLink,
      title
    );
    contentContainer.innerHTML = lightboxContent.buildDOM();
    this.mediaLink = mediaLink;

    // Hide background page of focus
    Array.from(this.main.children).forEach((child) => {
      if (child !== this.lightbox) {
        child.inert = true;
      }
    });
  }


  manageEvent() {
    this.leftArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      this.previous();
    });
    this.rightArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      this.next();
    });
    this.closeIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      this.close(this.beforeElementFocus);
    });
  }

  keyboardNav() {
    this.lightbox.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close(this.beforeElementFocus);
      } else if (e.key === "ArrowLeft") {
        this.previous();
      } else if (e.key === "ArrowRight") {
        this.next();
      } else if (
        e.key === "Tab" &&
        this.closeIcon.contains(document.activeElement)
      ) {
        e.preventDefault();
        document.querySelector(".previous").focus();
      }
    });
  }
  next() {
    let currentPos = this.tabLinks.findIndex(
      (mediaLink) => mediaLink == this.mediaLink
    );
    if (currentPos == this.tabLinks.length - 1) {
      currentPos = -1;
    }
    this.displayLightboxContent(
      this.tabLinks[currentPos + 1],
      this.tabTitles[currentPos + 1]
    );
  }

  previous() {
    let currentPos = this.tabLinks.findIndex(
      (mediaLink) => mediaLink == this.mediaLink
    );
    if (currentPos == 0) {
      currentPos = this.tabLinks.length;
    }
    this.displayLightboxContent(
      this.tabLinks[currentPos - 1],
      this.tabTitles[currentPos - 1]
    );
  }

  close(beforeElementFocus) {
    this.lightbox.remove();

    // Make the page focusable again
    Array.from(this.main.children).forEach((child) => {
      if (child !== this.lightbox) {
        child.inert = false;
      }
    });
    if (beforeElementFocus != undefined) {
      beforeElementFocus.focus();
    }
  }
}

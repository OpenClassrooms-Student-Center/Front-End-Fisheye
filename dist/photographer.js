/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/

module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/scripts/data/displayData.js":
/*!*****************************************!*\
  !*** ./src/scripts/data/displayData.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayData": () => (/* binding */ displayData),
/* harmony export */   "displayDataAll": () => (/* binding */ displayDataAll)
/* harmony export */ });
/* harmony import */ var _factories_photographerFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/photographerFactory */ "./src/scripts/factories/photographerFactory.js");

async function displayData(photographers, id) {
  let photographerSelected = "";
  photographers.forEach(photographer => {
    if (photographer.id == id) {
      // Then we are going use the PhotographerFactory to set DOM
      if (true) {
        console.log(photographer);
      }

      const photographerModel = (0,_factories_photographerFactory__WEBPACK_IMPORTED_MODULE_0__.photographerFactory)(photographer);
      photographerModel.setPhotographerHeader();
      photographerModel.setStickyBarPrice();
      photographerSelected = photographer; // End of PhotographerFactory Work
    }
  });
  return photographerSelected; // Return the photographerShow at the end
}
async function displayDataAll(photographers, querySelector) {
  photographers.forEach(photographer => {
    // Then we are going use the PhotographerFactory to generate DOM
    const photographersSection = document.querySelector(querySelector);
    const photographerModel = (0,_factories_photographerFactory__WEBPACK_IMPORTED_MODULE_0__.photographerFactory)(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();

    if (true) {
      console.log(photographer);
    }

    if (userCardDOM) {
      photographersSection.appendChild(userCardDOM);
    } // End of PhotographerFactory Work

  });
}

/***/ }),

/***/ "./src/scripts/data/displayMedia.js":
/*!******************************************!*\
  !*** ./src/scripts/data/displayMedia.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayMedia": () => (/* binding */ displayMedia)
/* harmony export */ });
/* harmony import */ var _factories_mediaFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/mediaFactory */ "./src/scripts/factories/mediaFactory.js");
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dom */ "./src/scripts/utils/dom.js");


async function displayMedia(medias, querySelector, photographerId) {
  let totalLikes = 0;
  medias.forEach(media => {
    if (photographerId == media.photographerId) {
      if (true) {
        console.log(media);
      } // Then we are going use the MediaFactory to generate DOM


      const mediasSection = document.querySelector(querySelector);
      const mediaModel = (0,_factories_mediaFactory__WEBPACK_IMPORTED_MODULE_0__.mediaFactory)(media);
      const mediaDOM = mediaModel.getMediaDOM();

      if (mediaDOM) {
        mediasSection.appendChild(mediaDOM);
      } // End of MediaFactory Work
      // If media object got Likes propriety then


      if (media.likes) {
        totalLikes += media.likes; // Count all likes

        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_1__.setInnerHtml)(".total_likes", totalLikes);
      } else {
        console.warn("Theres is no like and totalLikes, look mediaFactory returned a object without likes propriety");
      }
    }
  });

  if (true) {
    console.log("Total Like: " + totalLikes);
  }
}

/***/ }),

/***/ "./src/scripts/factories/mediaFactory.js":
/*!***********************************************!*\
  !*** ./src/scripts/factories/mediaFactory.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mediaFactory": () => (/* binding */ mediaFactory)
/* harmony export */ });
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom */ "./src/scripts/utils/dom.js");

function mediaFactory(data) {
  const {
    id,
    photographerId,
    title,
    image,
    video,
    likes
  } = data;
  const movie = "assets/video/".concat(video);
  const picture = "assets/images/".concat(image);

  function getMediaDOM() {
    // Create DOM only if we got ids and a Picture or a Video
    const hasPhotographer = id && photographerId;
    const hasContent = image || video;

    if (hasPhotographer && hasContent) {
      // CREATE A ARTICLE
      const article = document.createElement("article");
      article.setAttribute("class", "media_card"); // Build A HREF ELEMENT

      const linkElement = article.appendChild(_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement("a", "photographer.html?id=" + id));
      _utils_dom__WEBPACK_IMPORTED_MODULE_0__.setArialLabel(linkElement, "Lilac breasted roller, closeup view"); // Set ArielLabel to AHref
      // Check if image or video exists

      if (image) {
        _utils_dom__WEBPACK_IMPORTED_MODULE_0__.insertPictureInsideElement(linkElement, picture, title); // Insert picture with ALT
      } else if (video) {
        _utils_dom__WEBPACK_IMPORTED_MODULE_0__.insertVideoInsideElement(linkElement, movie, "Movie " + video); // Insert Video with Ariel Label
      } // Generate Details (title + Likes)


      if (title) {
        let title_h6 = "<h6>" + title + "</h6>";
        let likes_h6 = "<h6 aria-label='likes'>" + 0 + "</h6>";

        if (likes) {
          likes_h6 = "<h6 aria-label='likes'>" + likes + "</h6>";
        }

        _utils_dom__WEBPACK_IMPORTED_MODULE_0__.insertHTMLAfterElement(linkElement, "<div class='details'>" + title_h6 + likes_h6 + "</div>");
      } // Return Article


      return article;
    } else {
      return false;
    }
  }

  return {
    photographerId,
    picture,
    movie,
    getMediaDOM
  };
}

/***/ }),

/***/ "./src/scripts/factories/photographerFactory.js":
/*!******************************************************!*\
  !*** ./src/scripts/factories/photographerFactory.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "photographerFactory": () => (/* binding */ photographerFactory)
/* harmony export */ });
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom */ "./src/scripts/utils/dom.js");

function photographerFactory(data) {
  const {
    name,
    id,
    city,
    country,
    tagline,
    portrait,
    price
  } = data; // console.log(data);

  const picture = "assets/images/".concat(portrait);

  function getUserCardDOM() {
    // Create DOM only if we got a picture a id and a name
    if (name && id && portrait) {
      // BUILD A ARTICLE 
      const article = document.createElement("article");
      article.setAttribute("class", "photographer_card"); // Create Dynamique LINK with Picture

      const linkElement = article.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement)("a", "photographer.html?id=" + id) // Build AHref
      );
      (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.setArialLabel)(linkElement, "Link to " + name); // Set ArielLabel to AHref

      (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.insertPictureInsideElement)(linkElement, picture, name); // END Create Dynamique LINK with Picture

      article.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement)("h2", name));

      if (city && country) {
        article.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement)("h3", city + ", " + country));
      }

      if (tagline) {
        article.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement)("h4", tagline));
      }

      if (price) {
        article.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement)("h5", price + "€/jour"));
      } // RETURN A ARTICLE 


      return article;
    } else {
      return false;
    }
  }

  function setPhotographerHeader() {
    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.setInnerHtml)(".photograph_header h1", name);

    if (city && country) {
      (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.setInnerHtml)(".photograph_header h2", city + ", " + country);
    } else {
      (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.setInnerHtml)(".photograph_header h2", "");
    }

    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.setInnerHtml)(".photograph_header h3", tagline);
    /** WE USE a different method that insertPictureInsideElement() since picture is already in the DOM */

    const imgProfile = document.querySelector(".photograph_header img");
    imgProfile.setAttribute("src", picture);
    imgProfile.setAttribute("alt", name);
    /** */
  }

  function setStickyBarPrice() {
    if (price) {
      (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.setInnerHtml)(".price_rate_daily", price + " € / jour");
    } else {
      (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.setInnerHtml)(".price_rate_daily", price + "");
    }
  }

  return {
    name,
    picture,
    getUserCardDOM,
    setPhotographerHeader,
    setStickyBarPrice
  };
}

/***/ }),

/***/ "./src/scripts/utils/dom.js":
/*!**********************************!*\
  !*** ./src/scripts/utils/dom.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildElement": () => (/* binding */ buildElement),
/* harmony export */   "insertHTMLAfterElement": () => (/* binding */ insertHTMLAfterElement),
/* harmony export */   "insertPictureInsideElement": () => (/* binding */ insertPictureInsideElement),
/* harmony export */   "insertVideoInsideElement": () => (/* binding */ insertVideoInsideElement),
/* harmony export */   "setArialLabel": () => (/* binding */ setArialLabel),
/* harmony export */   "setInnerHtml": () => (/* binding */ setInnerHtml)
/* harmony export */ });
// Function for build DOM
function insertPictureInsideElement(element, picture, alt) {
  // ?? operator 
  element.insertAdjacentHTML("beforeend", '<img src="' + picture + '" ' + 'alt="' + alt + '">');
}
function insertVideoInsideElement(element, video, ariaLabel) {
  if (ariaLabel) {
    element.insertAdjacentHTML("beforeend", '<video src="' + video + '" ' + 'aria-label="' + ariaLabel + '">');
  } else {
    element.insertAdjacentHTML("beforeend", '<video src="' + video + '">');
  }
}
function insertHTMLAfterElement(element, html) {
  element.insertAdjacentHTML("afterend", html);
}
function buildElement(balise, value) {
  // Create balise
  const element = document.createElement(balise); // Set Attribute or TextContened depend of balise

  switch (balise) {
    case "a":
      element.setAttribute("href", value);
      break;

    case "img":
      element.setAttribute("src", value);
      break;

    default:
      element.textContent = value;
  }

  return element;
}
function setArialLabel(element, arialabel) {
  element.setAttribute("aria-label", arialabel);
}
function setInnerHtml(querySelector, texte) {
  const texteElement = document.querySelector(querySelector);
  texteElement.innerHTML = texte;
} // End Function for build DOM

/***/ }),

/***/ "./src/scripts/utils/fetch.js":
/*!************************************!*\
  !*** ./src/scripts/utils/fetch.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchJSON": () => (/* binding */ fetchJSON),
/* harmony export */   "getMedias": () => (/* binding */ getMedias),
/* harmony export */   "getPhotographers": () => (/* binding */ getPhotographers)
/* harmony export */ });
async function fetchJSON(url, type) {
  const response = await fetch(url); // Wait for the Async Fecth Function
  // fetch returns an object with a response property which if set to false means that the connection is not good and so we stop the function 

  if (!response.ok) {
    throw new Error("Thrown from fetchJSON()");
  }

  let jsonResponse = await response.json(); // parsing JSON

  return jsonResponse[type]; // Get data from the Array that we want
}
async function getPhotographers() {
  const url = "./data/photographers.json"; // Data source .JSON

  const photographers = await fetchJSON(url, "photographers"); // use fetchJSON function from utils/fetch.js

  return photographers; // Return data of PhotoGraphers
}
async function getMedias() {
  const url = "./data/photographers.json"; // Data source .JSON

  const medias = await fetchJSON(url, "media"); // use fetchJSON function from utils/fetch.js

  return medias; // Return data of Media
}

/***/ }),

/***/ "./src/scripts/utils/getUrlParameter.js":
/*!**********************************************!*\
  !*** ./src/scripts/utils/getUrlParameter.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUrlParameter": () => (/* binding */ getUrlParameter)
/* harmony export */ });
async function getUrlParameter(parameter) {
  const fullUrl = window.location.href; // Get full url

  const url = new URL(fullUrl); // Create URL Object

  const parameterValue = url.searchParams.get(parameter); // get parameter value

  return parameterValue;
}

/***/ }),

/***/ "./src/scripts/utils/modalForm.js":
/*!****************************************!*\
  !*** ./src/scripts/utils/modalForm.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "modalMaster": () => (/* binding */ modalMaster)
/* harmony export */ });
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom */ "./src/scripts/utils/dom.js");

function modalMaster(bodyTag, headerTag, mainTag, modalID) {
  /** CREATE A OBJECT WITH ALL PROPRIETY FOR MODEL DOM NEED */
  let modalPage = {
    bodyHTML: document.querySelector(bodyTag),
    headerHTML: document.querySelector(headerTag),
    mainHTML: document.querySelector(mainTag),
    modalHTML: document.getElementById(modalID),
    modalID: modalID,
    visible: 0
  };
  /** END  */

  function addContactFormListener(modalPage) {
    document.getElementById("openModal").addEventListener("click", function () {
      displayModal(modalPage);
    });
    document.getElementById("closeModal").addEventListener("click", function () {
      closeModal(modalPage);
    });
    document.getElementById("contact_button").addEventListener("click", function () {
      event.preventDefault();
      sendMessage(modalPage);
    });
  }

  function setTitleModal(modalPage, tagHTML, titleModal) {
    return (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.setInnerHtml)("#" + modalPage.modalID + " " + tagHTML, titleModal);
  }

  function centerModal(modalID) {
    let Mwidth = modalID.offsetWidth;
    let Mheight = modalID.offsetHeight;
    let Wwidth = window.innerWidth;
    let Wheight = window.innerHeight;
    modalID.style.position = "absolute";
    modalID.style.top = (Wheight - Mheight) / 2 + window.pageYOffset + "px";
    modalID.style.left = (Wwidth - Mwidth) / 2 + window.pageXOffset + "px";
  }

  function effectAnimation(hideclass, showclass, modalPage) {
    if (modalPage.visible === 0) {
      modalPage.mainHTML.classList.remove(showclass);
      modalPage.headerHTML.classList.remove(showclass);
      modalPage.modalHTML.classList.remove(hideclass);
      modalPage.mainHTML.classList.add(hideclass);
      modalPage.headerHTML.classList.add(hideclass);
      modalPage.modalHTML.classList.add(showclass);
      modalPage.visible = 1;
    } else {
      modalPage.modalHTML.classList.remove(showclass);
      modalPage.mainHTML.classList.remove(hideclass);
      modalPage.headerHTML.classList.remove(hideclass);
      modalPage.modalHTML.classList.add(hideclass);
      modalPage.mainHTML.classList.add(showclass);
      modalPage.headerHTML.classList.add(showclass);
      modalPage.visible = 0;
    }

    return modalPage;
  }

  function displayModal(modalPage) {
    effectAnimation("hide_content", "show_content", modalPage);
    modalPage.bodyHTML.style.overflow = "hidden"; // Block Scroll

    modalPage.modalHTML.style.display = "block"; // Display the Modal at the screen

    centerModal(modalPage.modalHTML); // Center the Modal at the screen
  }

  function closeModal(modalPage) {
    effectAnimation("hide_content", "show_content", modalPage);
    modalPage.bodyHTML.style.overflow = "visible"; // Allow scroll 

    modalPage.modalHTML.style.display = "none"; // Hide at the screen modal
  }

  function sendMessage(modalPage) {
    const allInputs = document.querySelectorAll("#" + modalPage.modalID + " input");
    const allTextArea = document.querySelectorAll("#" + modalPage.modalID + " textarea");
    console.log("____Send Message_____");
    let fullmessage = "";
    allInputs.forEach(input => {
      fullmessage += '\n' + input.id + ": " + input.value;
    });
    allTextArea.forEach(textarea => {
      fullmessage += '\n' + textarea.id + ": " + textarea.value;
    });

    if (fullmessage) {
      console.log(fullmessage);
      alert("Message Envoyer !" + fullmessage);
      closeModal(modalPage); // Close modal after message send
    } else {
      console.error("Something wrong message no send because fullmessage is empty or don't exists from sendMessage()");
      alert("Erreur message non envoyer :(");
    }
  }

  return {
    modalPage,
    addContactFormListener,
    displayModal,
    closeModal,
    setTitleModal,
    sendMessage
  };
}

/***/ }),

/***/ "./src/scripts/utils/selectFilter.js":
/*!*******************************************!*\
  !*** ./src/scripts/utils/selectFilter.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "selectFilterComponent": () => (/* binding */ selectFilterComponent)
/* harmony export */ });
/* harmony import */ var _data_displayMedia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/displayMedia */ "./src/scripts/data/displayMedia.js");
/* harmony import */ var _utils_sortBy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/sortBy */ "./src/scripts/utils/sortBy.js");


/** GENERATE EVENT FOR SELECT FILTER COMPONENTS AND BEHAVIOR */

function selectFilterComponent(data, idURL) {
  const selectFilterButton = document.querySelector('.select_filter .select_button'); // Button Select

  const selectFilterSelect1 = document.getElementById("select1"); // First Select (by default Date)

  const selectFilterSelect2 = document.getElementById("select2"); // 2nd Select (by default Titre)

  function handleFilterAction(event) {
    const selectedItem = event.target.innerHTML; // Get innerHTML of selected item

    switch (selectedItem) {
      case 'Date':
        selectFilterButton.innerHTML = "Date";
        selectFilterSelect1.innerHTML = "Popularité";
        selectFilterSelect2.innerHTML = "Titre";
        document.querySelector('.media_section').innerHTML = ""; // Build Medias Data

        (0,_data_displayMedia__WEBPACK_IMPORTED_MODULE_0__.displayMedia)(data.sort(_utils_sortBy__WEBPACK_IMPORTED_MODULE_1__.sortByDate), ".media_section", idURL); // End build Medias Data

        break;

      case 'Titre':
        selectFilterButton.innerHTML = "Titre";
        selectFilterSelect1.innerHTML = "Date";
        selectFilterSelect2.innerHTML = "Popularité";
        document.querySelector('.media_section').innerHTML = ""; // Build Medias Data

        (0,_data_displayMedia__WEBPACK_IMPORTED_MODULE_0__.displayMedia)(data.sort(_utils_sortBy__WEBPACK_IMPORTED_MODULE_1__.sortByTitle), ".media_section", idURL); // End build Medias Data

        break;

      case 'Popularité':
        selectFilterButton.innerHTML = "Popularité";
        selectFilterSelect1.innerHTML = "Date";
        selectFilterSelect2.innerHTML = "Titre";
        document.querySelector('.media_section').innerHTML = ""; // Build Medias Data

        (0,_data_displayMedia__WEBPACK_IMPORTED_MODULE_0__.displayMedia)(data.sort(_utils_sortBy__WEBPACK_IMPORTED_MODULE_1__.sortByLikes), ".media_section", idURL); // End build Medias Data

        break;

      default:
        console.error("selectedItem not found error about handleFilterAction()");
    }
  }

  ;
  selectFilterSelect1.addEventListener("click", handleFilterAction);
  selectFilterSelect2.addEventListener("click", handleFilterAction);
}
/** END GENERATE EVENT FOR SELECT FILTER COMPONETNS AND BEHAVIOR */

/***/ }),

/***/ "./src/scripts/utils/sortBy.js":
/*!*************************************!*\
  !*** ./src/scripts/utils/sortBy.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sortByDate": () => (/* binding */ sortByDate),
/* harmony export */   "sortByLikes": () => (/* binding */ sortByLikes),
/* harmony export */   "sortByTitle": () => (/* binding */ sortByTitle)
/* harmony export */ });
/** Function to sort by Likes,Dates or Title */
function sortByLikes(a, b) {
  if (a.likes > b.likes) {
    return -1;
  }

  if (a.likes < b.likes) {
    return 1;
  }

  return 0;
}
function sortByDate(a, b) {
  if (a.date > b.date) {
    return -1;
  }

  if (a.date < b.date) {
    return 1;
  }

  return 0;
}
function sortByTitle(a, b) {
  if (a.title < b.title) {
    return -1;
  }

  if (a.title > b.title) {
    return 1;
  }

  return 0;
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/scss/main.scss":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/scss/main.scss ***!
  \*******************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n/** Used to load all variables for this project about SCSS **/ /** FONT **/\n/** END FONT **/\n/** COLOR VARIABLES **/\n/** END COLOR VARIABLES **/\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\n/********************** GENERAL **********************/\nhtml,\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: \"DM Sans\", sans-serif;\n  animation: 1s ease-in forwards fade-in;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n/********************** END GENERAL **********************/\n/** IMPORT MIXIN **/\n/** IMPORT HEADER STYLES **/\nheader {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  height: 120px;\n}\nheader h1 {\n  color: #901C1C;\n  top: 44px;\n  margin-right: 100px;\n  font-weight: 400;\n  font-size: 36px;\n  line-height: 47px;\n}\nheader .logo,\nheader .logo_photographer {\n  height: 50px;\n}\nheader .logo {\n  margin-left: 115px;\n}\nheader .logo_photographer {\n  margin-left: 100px;\n  margin-top: 10px;\n}\n\n/** IMPORT PHOTOGRAPHERS CARDS **/\n.photographer_card {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  justify-self: center;\n}\n.photographer_card img {\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  transition: box-shadow 1s;\n  height: 200px;\n  width: 200px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.photographer_card img:hover {\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.photographer_card h2,\n.photographer_card h3,\n.photographer_card h4,\n.photographer_card h5 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n}\n.photographer_card h2 {\n  margin-top: 20px;\n  color: #D3573C;\n  font-size: 36px;\n}\n.photographer_card h3 {\n  font-size: 13.0010834236px;\n  line-height: 17px;\n  color: #901C1C;\n}\n.photographer_card h4 {\n  margin-top: 2px;\n  font-size: 10px;\n  line-height: 13px;\n  color: #000000;\n}\n.photographer_card h5 {\n  margin-top: 2px;\n  font-size: 9px;\n  line-height: 12px;\n  text-align: center;\n  color: #757575;\n}\n\n@media (max-width: 1100px) {\n  .photographer_card h3 {\n    font-size: 16.9014084507px;\n    margin-top: 10px;\n  }\n  .photographer_card h4 {\n    font-size: 13px;\n    margin-top: 10px;\n  }\n  .photographer_card h5 {\n    font-size: 11.7px;\n    margin-top: 10px;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_card h3 {\n    font-size: 19.5016251354px;\n  }\n  .photographer_card h4 {\n    font-size: 15px;\n  }\n  .photographer_card h5 {\n    font-size: 13.5px;\n  }\n  .photographer_card img {\n    width: 230px;\n    height: 230px;\n  }\n}\n/** IMPORT MODAL COMPONENT **/\n.modal {\n  display: none;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  position: absolute;\n  left: 25%;\n  right: 25%;\n  border-radius: 5px;\n  background-color: #DB8876;\n  align-items: baseline;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n  padding: 35px;\n  margin: auto;\n}\n.modal .modal_header {\n  justify-content: space-between;\n  width: 100%;\n  margin-top: -20px;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: baseline;\n}\n.modal .modal_header img {\n  cursor: pointer;\n}\n.modal .modal_header h2 {\n  font-size: 63.72px;\n  font-weight: normal;\n}\n.modal form input {\n  font-size: 30px;\n  margin-bottom: 5px;\n  padding: 10px;\n}\n.modal form textarea {\n  margin-top: 15px;\n  font-size: 24px;\n  margin-bottom: 20px;\n  resize: vertical;\n}\n.modal form input,\n.modal form textarea {\n  width: 100%;\n  height: 68px;\n  border: none;\n  border-radius: 5px;\n}\n.modal form label {\n  color: #000000;\n  font-size: 36px;\n}\n.modal form label:last-child {\n  margin-top: 15px;\n}\n\n.hide_content {\n  animation: 0.5s ease-in forwards fade-off;\n}\n@keyframes fade-off {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.4;\n  }\n}\n\n.show_content {\n  animation: 0.5s ease-in forwards fade-in;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0.4;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n/** IMPORT CONTACT BUTTON COMPONENT **/\n.fisheye_button {\n  font-size: 20px;\n  font-weight: 700;\n  font-family: \"DM Sans\", sans-serif;\n  color: white;\n  padding: 11px;\n  min-width: 170px;\n  min-height: 70px;\n  border: none;\n  background-color: #901C1C;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: color 0.5s ease-in, background-color 0.5s ease-in;\n}\n.fisheye_button:hover {\n  color: #000000;\n  background-color: #DB8876;\n}\n\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\n.photograph_header {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: no-wrap;\n  align-content: fled-end;\n  justify-content: space-between;\n  background-color: #FAFAFA;\n  height: 313px;\n  margin-top: 10px;\n  padding-left: 30px;\n  padding-right: 30px;\n}\n.photograph_header div:nth-child(3) {\n  margin-right: 20px;\n}\n.photograph_header h1,\n.photograph_header h2,\n.photograph_header h3 {\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 400;\n}\n.photograph_header h1 {\n  font-size: 63.72px;\n  margin-bottom: -15px;\n  color: #D3573C;\n}\n.photograph_header h2 {\n  margin-top: 15px;\n  margin-bottom: 20px;\n  font-size: 23.2258064516px;\n  color: #901C1C;\n}\n.photograph_header h3 {\n  font-size: 18px;\n  color: #525252;\n}\n.photograph_header .photograph_about,\n.photograph_header .photograph_button {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n}\n.photograph_header .photograph_button {\n  margin-top: 30px;\n  margin-right: 80px;\n}\n.photograph_header .photograph_about {\n  margin-left: 20px;\n  margin-bottom: 10px;\n}\n\n@media (max-width: 1100px) {\n  .photograph_header {\n    background-color: white;\n    display: flex;\n    flex-direction: column;\n    flex-wrap: wrap;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n    padding-top: 15px;\n  }\n  .photograph_header h1 {\n    font-size: 41.4px;\n  }\n  .photograph_header h2 {\n    font-size: 20px;\n  }\n  .photograph_header h3 {\n    font-size: 16.3636363636px;\n  }\n  .photograph_button {\n    margin-bottom: 30px;\n  }\n}\n@media (max-width: 800px) {\n  .photograph_header {\n    display: flex;\n    flex-direction: column;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n  }\n  .photograph_header .photograph_button {\n    align-items: inherit;\n    margin-right: 0px;\n    position: absolute;\n    margin-top: 200px;\n  }\n  .photograph_header > .photograph_about {\n    margin-left: 0;\n    align-items: center;\n  }\n  .photograph_header h1,\nh2,\nh3 {\n    text-align: center;\n  }\n  .photograph_header > .photographer_card {\n    display: none;\n  }\n}\n/** IMPORT SELECT FILTER COMPONENT **/\n.select_button {\n  display: flex;\n  align-content: flex-end;\n  align-items: center;\n  justify-content: space-between;\n  text-align: left;\n  padding-left: 20px;\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 18px;\n  background: #901C1C;\n  color: white;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n  border: none;\n  border-color: none;\n  width: 170px;\n  height: 70px;\n  cursor: pointer;\n}\n\n.select_button::after {\n  transition: transform 0.25s ease-in;\n  content: \">\";\n  transform: rotate(90deg);\n  font-size: 25px;\n  text-align: right;\n  float: right;\n  margin-right: 20px;\n}\n\n.select_filter {\n  position: relative;\n  display: inline-block;\n}\n\n.select_content {\n  display: none;\n  position: absolute;\n  background: #901C1C;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  min-width: 160px;\n  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n}\n.select_content .whiteline {\n  width: 90%;\n  height: 1px;\n  background-color: white;\n  margin-left: 5%;\n}\n.select_content a {\n  transition: all 0.5s ease-in;\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-size: 18px;\n  color: white;\n  padding: 20px;\n  width: 170px;\n  height: 60px;\n  text-decoration: none;\n  display: block;\n}\n.select_content a:hover {\n  cursor: pointer;\n  transition: all 0.5s ease-in;\n  color: #000000;\n}\n\n.select_filter:hover .select_content {\n  display: block;\n}\n\n.select_filter:hover .select_button::after {\n  transform: rotate(-90deg);\n  transition: transform 0.25s ease-in;\n}\n\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\n.photographer_statistic {\n  display: flex;\n  flex-direction: row;\n  align-content: flex-start;\n  justify-content: space-around;\n  align-items: baseline;\n  position: fixed;\n  background-color: #DB8876;\n  min-width: 376px;\n  min-height: 89px;\n  bottom: 0;\n  right: 38px;\n  z-index: 2;\n  margin-bottom: -22px;\n  border-radius: 5px;\n}\n.photographer_statistic .total_likes,\n.photographer_statistic .price_rate_daily {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 23.2258064516px;\n  line-height: 31px;\n  color: #000000;\n  padding-top: 18px;\n}\n.photographer_statistic .total_likes:after {\n  padding-left: 5px;\n  content: \"♥\";\n  font-size: 30.8903225806px;\n}\n\n@media (max-width: 700px) {\n  .photographer_statistic {\n    display: none;\n  }\n}\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\n.media_card {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  max-width: 350px;\n}\n.media_card img,\n.media_card video {\n  transition: box-shadow 1s;\n  width: 100%;\n  max-height: 300px;\n  min-height: 300px;\n  object-fit: cover;\n  border-radius: 5px;\n}\n.media_card img:hover,\n.media_card video:hover {\n  transition: box-shadow 1s;\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.media_card .details {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: baseline;\n  margin-top: 5px;\n}\n.media_card h6 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n  font-size: 24px;\n  color: #901C1C;\n}\n.media_card h6:last-child::after {\n  font-size: 30px;\n  padding-left: 10px;\n  content: \"♥\";\n}\n\n@media (max-width: 600px) {\n  .media_card img,\n.media_card {\n    max-width: 100%;\n  }\n}\n/** IMPORT PAGES (other) Styles **/\n.photographer_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 70px;\n  margin-top: 75px;\n  margin-bottom: 75px;\n}\n\n.margin_left_right {\n  margin: 0 100px;\n}\n\n.filter_section {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline;\n  margin-left: 0;\n}\n.filter_section h5:first-child {\n  margin-top: 20px;\n  margin-right: 28px;\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-style: normal;\n  font-size: 18px;\n  color: #000000;\n}\n.filter_section .select_filter {\n  margin-top: 10px;\n}\n\n.media_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  row-gap: 30px;\n  column-gap: 95px;\n  margin-top: 20px;\n  margin-bottom: 75px;\n}\n\n/** IMPORT FOOTER STYLES **/\nfooter {\n  height: 2px;\n  width: 100%;\n  background-color: white;\n  margin-top: 75px;\n}\n\n/** IMPORT RESPONSIVE STYLES for Non Components Elements\n (components Elements got their own Responsive Rules in their Stylesheet) **/\n@media (max-width: 1100px) {\n  .photographer_section,\n.media_section {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media (max-width: 800px) {\n  header {\n    flex-direction: column;\n    margin-top: 40px;\n    height: 100px;\n  }\n  header .logo_photographer {\n    margin-left: 0;\n  }\n  header .logo,\nheader h1 {\n    margin-left: 20px;\n    margin-right: 20px;\n    font-size: 30px;\n  }\n  .margin_left_right {\n    margin: 0 20px;\n  }\n  .filter_section {\n    justify-content: space-between;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_section {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 600px) {\n  .media_section {\n    grid-template-columns: 1fr;\n  }\n}", "",{"version":3,"sources":["webpack://./src/scss/main.scss","webpack://./src/scss/_variables.scss","webpack://./src/scss/_global.scss","webpack://./src/scss/pages/_header.scss","webpack://./src/scss/_mixin.scss","webpack://./src/scss/components/_photographer_cards.scss","webpack://./src/scss/components/_modal.scss","webpack://./src/scss/components/_fisheye_button.scss","webpack://./src/scss/components/_photograph_header.scss","webpack://./src/scss/components/_select_filter.scss","webpack://./src/scss/components/_photographer_statistic.scss","webpack://./src/scss/components/_media_cards.scss","webpack://./src/scss/pages/_pages.scss","webpack://./src/scss/pages/_footer.scss","webpack://./src/scss/_responsive.scss"],"names":[],"mappings":"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","sourcesContent":["/** Used to load all variables for this project about SCSS **/\r\n@import \"_variables.scss\";\r\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\r\n@import \"_global.scss\";\r\n/** IMPORT MIXIN **/\r\n@import \"_mixin.scss\";\r\n/** IMPORT HEADER STYLES **/\r\n@import \"pages/header.scss\";\r\n/** IMPORT PHOTOGRAPHERS CARDS **/\r\n@import \"components/photographer_cards.scss\";\r\n/** IMPORT MODAL COMPONENT **/\r\n@import \"components/modal.scss\";\r\n/** IMPORT CONTACT BUTTON COMPONENT **/\r\n@import \"components/fisheye_button.scss\";\r\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\r\n@import \"components/photograph_header.scss\";\r\n/** IMPORT SELECT FILTER COMPONENT **/\r\n@import \"components/select_filter.scss\";\r\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\r\n@import \"components/photographer_statistic.scss\";\r\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\r\n@import \"components/media_cards.scss\";\r\n/** IMPORT PAGES (other) Styles **/\r\n@import \"pages/pages.scss\";\r\n/** IMPORT FOOTER STYLES **/\r\n@import \"pages/footer.scss\";\r\n/** IMPORT RESPONSIVE STYLES for Non Components Elements\r\n (components Elements got their own Responsive Rules in their Stylesheet) **/\r\n@import \"_responsive.scss\";","/** FONT **/\r\n$font_global: \"DM Sans\", sans-serif;\r\n$font_weight_small: 400;\r\n$font_weight_big: 700;\r\n\r\n$font_size: 36px;\r\n/** END FONT **/\r\n\r\n/** COLOR VARIABLES **/\r\n$default_color: white;\r\n$default_font_color: #000000;\r\n$color_gray: #757575;\r\n$color_primary1: #901C1C;\r\n$color_primary2: #D3573C;\r\n$color_secondary2: #525252;\r\n$color_secondary2_bg: #FAFAFA;\r\n$color_background: #DB8876;\r\n/** END COLOR VARIABLES **/","/********************** GENERAL **********************/\r\nhtml,\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n\r\n}\r\n\r\nbody {\r\n  font-family: $font_global;\r\n  animation: 1s ease-in forwards fade-in;\r\n\r\n  @keyframes fade-in {\r\n    0% {\r\n      opacity: 0;\r\n    }\r\n\r\n    100% {\r\n      opacity: 1.0;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n/********************** END GENERAL **********************/","header {\r\n    @include flex-basic(row, null, null, space-between, center);\r\n    height: 120px;\r\n\r\n\r\n    h1 {\r\n        color: $color_primary1;\r\n        top: 44px;\r\n        margin-right: 100px;\r\n        font-weight: $font_weight_small;\r\n        font-size: $font_size;\r\n        line-height: 47px;\r\n    }\r\n\r\n    .logo,\r\n    .logo_photographer {\r\n        height: 50px;\r\n    }\r\n\r\n    .logo {\r\n        margin-left: 115px;\r\n    }\r\n\r\n    .logo_photographer {\r\n        margin-left: 100px;\r\n        margin-top: 10px;\r\n    }\r\n}","@mixin flex-basic($flex-direction,\r\n  $flex-wrap,\r\n  $align-content,\r\n  $justify-content,\r\n  $align-items) {\r\n  display: flex;\r\n  flex-direction: $flex-direction;\r\n\r\n  @if ($flex-wrap) {\r\n    flex-wrap: $flex-wrap;\r\n  }\r\n\r\n  @if ($align-content) {\r\n    align-content: $align-content;\r\n  }\r\n\r\n  @if ($justify-content) {\r\n    justify-content: $justify-content;\r\n  }\r\n\r\n  @if ($align-items) {\r\n    align-items: $align-items;\r\n  }\r\n}\r\n\r\n// @mixin mask-crossbrowser($value) {\r\n//   -webkit-mask: $value;\r\n//   mask: $value;\r\n// }\r\n\r\n// @mixin margin-left-and-right($value) {\r\n//   margin-left: $value;\r\n//   margin-right: $value;\r\n// }\r\n\r\n@mixin padding-left-and-right($value) {\r\n  padding-left: $value;\r\n  padding-right: $value;\r\n}",".photographer_card {\r\n    @include flex-basic(column, null, null, center, center);\r\n    justify-self: center;\r\n\r\n    img {\r\n        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n        transition: box-shadow 1s;\r\n        height: 200px;\r\n        width: 200px;\r\n        border-radius: 50%;\r\n        object-fit: cover;\r\n\r\n        &:hover {\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n\r\n    h2,\r\n    h3,\r\n    h4,\r\n    h5 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 20px;\r\n        color: $color_primary2;\r\n        font-size: $font_size;\r\n    }\r\n\r\n    h3 {\r\n        font-size: calc($font_size / 2.769);\r\n        line-height: 17px;\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h4 {\r\n        margin-top: 2px;\r\n        font-size: calc($font_size / 3.6);\r\n        line-height: 13px;\r\n        color: $default_font_color;\r\n    }\r\n\r\n    h5 {\r\n        margin-top: 2px;\r\n        font-size: calc($font_size / 4);\r\n        line-height: 12px;\r\n        text-align: center;\r\n        color: $color_gray;\r\n    }\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: calc($font_size / 2.769 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h4 {\r\n            font-size: calc($font_size / 3.6 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h5 {\r\n            font-size: calc($font_size / 4 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n    }\r\n\r\n}\r\n\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: calc($font_size / 2.769 * 1.5);\r\n        }\r\n\r\n        h4 {\r\n            font-size: calc($font_size / 3.6 * 1.5);\r\n        }\r\n\r\n        h5 {\r\n            font-size: calc($font_size / 4 * 1.5);\r\n        }\r\n\r\n        img {\r\n            width: 230px;\r\n            height: 230px;\r\n        }\r\n    }\r\n\r\n}",".modal {\r\n    display: none;\r\n    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n    position: absolute;\r\n    left: 25%;\r\n    right: 25%;\r\n    border-radius: 5px;\r\n    background-color: $color_background;\r\n    align-items: baseline;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    padding: 35px;\r\n    margin: auto;\r\n\r\n\r\n    .modal_header {\r\n        justify-content: space-between;\r\n        width: 100%;\r\n        margin-top: -20px;\r\n        margin-bottom: 10px;\r\n        display: flex;\r\n        align-items: baseline;\r\n\r\n        img {\r\n            cursor: pointer;\r\n        }\r\n\r\n        h2 {\r\n            font-size: calc($font_size * 1.77);\r\n            font-weight: normal;\r\n        }\r\n    }\r\n\r\n    form input {\r\n        font-size: calc($font_size / 1.2);\r\n        margin-bottom: 5px;\r\n        padding: 10px;\r\n    }\r\n\r\n    form textarea {\r\n        margin-top: 15px;\r\n        font-size: calc($font_size /1.5);\r\n        margin-bottom: 20px;\r\n        resize: vertical;\r\n    }\r\n\r\n    form input,\r\n    form textarea {\r\n\r\n        width: 100%;\r\n        height: 68px;\r\n        border: none;\r\n        border-radius: 5px;\r\n\r\n    }\r\n\r\n\r\n    form label {\r\n        color: $default_font_color;\r\n        font-size: $font_size;\r\n    }\r\n\r\n    form label:last-child {\r\n        margin-top: 15px;\r\n    }\r\n\r\n\r\n}\r\n\r\n\r\n.hide_content {\r\n    animation: 0.5s ease-in forwards fade-off;\r\n\r\n    @keyframes fade-off {\r\n        0% {\r\n            opacity: 1.0;\r\n        }\r\n\r\n        100% {\r\n            opacity: 0.4;\r\n        }\r\n    }\r\n}\r\n\r\n\r\n\r\n.show_content {\r\n    animation: 0.5s ease-in forwards fade-in;\r\n\r\n    @keyframes fade-in {\r\n        0% {\r\n            opacity: 0.4;\r\n        }\r\n\r\n        100% {\r\n            opacity: 1.0;\r\n        }\r\n    }\r\n\r\n}",".fisheye_button {\r\n    font-size: calc($font_size / 1.8);\r\n    font-weight: $font_weight_big;\r\n    font-family: $font_global;\r\n    color: $default_color;\r\n    padding: 11px;\r\n    min-width: 170px;\r\n    min-height: 70px;\r\n    border: none;\r\n    background-color: $color_primary1;\r\n    border-radius: 5px;\r\n    cursor: pointer;\r\n    transition: color 0.5s ease-in, background-color 0.5s ease-in;\r\n\r\n    &:hover {\r\n        color: $default_font_color;\r\n        background-color: $color_background;\r\n    }\r\n}",".photograph_header {\r\n    @include flex-basic(row, no-wrap, fled-end, space-between, null);\r\n    background-color: $color_secondary2_bg;\r\n    height: 313px;\r\n    margin-top: 10px;\r\n    @include padding-left-and-right(30px);\r\n\r\n    div:nth-child(3) {\r\n        margin-right: 20px;\r\n    }\r\n\r\n\r\n    h1,\r\n    h2,\r\n    h3 {\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h1 {\r\n        font-size: calc($font_size * 1.77);\r\n        margin-bottom: -15px;\r\n        color: $color_primary2;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 15px;\r\n        margin-bottom: 20px;\r\n        font-size: calc($font_size / 1.55);\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h3 {\r\n        font-size: calc($font-size / 2);\r\n        color: $color_secondary2;\r\n    }\r\n\r\n    .photograph_about,\r\n    .photograph_button {\r\n        @include flex-basic(column, null, null, center, flex-start);\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-top: 30px;\r\n        margin-right: 80px;\r\n    }\r\n\r\n    .photograph_about {\r\n        margin-left: 20px;\r\n        margin-bottom: 10px;\r\n    }\r\n}\r\n\r\n\r\n@media (max-width: 1100px) {\r\n    .photograph_header {\r\n        background-color: $default_color;\r\n        @include flex-basic(column, wrap, fled-end, space-between, center);\r\n        padding-top: 15px;\r\n    }\r\n\r\n    .photograph_header h1 {\r\n        font-size: calc($font_size * 1.15);\r\n    }\r\n\r\n    .photograph_header h2 {\r\n        font-size: calc($font_size / 1.8);\r\n\r\n    }\r\n\r\n    .photograph_header h3 {\r\n        font-size: calc($font-size / 2.2);\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-bottom: 30px;\r\n\r\n\r\n    }\r\n\r\n\r\n}\r\n\r\n@media (max-width: 800px) {\r\n    .photograph_header {\r\n        @include flex-basic(column, null, fled-end, space-between, center);\r\n\r\n        .photograph_button {\r\n            align-items: inherit;\r\n            margin-right: 0px;\r\n            position: absolute;\r\n            margin-top: 200px;\r\n        }\r\n\r\n    }\r\n\r\n    .photograph_header>.photograph_about {\r\n        margin-left: 0;\r\n        align-items: center;\r\n    }\r\n\r\n    .photograph_header h1,\r\n    h2,\r\n    h3 {\r\n        text-align: center;\r\n    }\r\n\r\n    .photograph_header>.photographer_card {\r\n        display: none;\r\n    }\r\n\r\n\r\n}",".select_button {\r\n    display: flex;\r\n    align-content: flex-end;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n\r\n    text-align: left;\r\n    padding-left: 20px;\r\n    font-family: $font_global;\r\n    font-style: normal;\r\n    font-weight: $font_weight_big;\r\n    font-size: calc($font_size / 2);\r\n    background: $color_primary1;\r\n    color: $default_color;\r\n    border-top-left-radius: 5px;\r\n    border-top-right-radius: 5px;\r\n    border: none;\r\n    border-color: none;\r\n    width: 170px;\r\n    height: 70px;\r\n    cursor: pointer;\r\n}\r\n\r\n.select_button::after {\r\n    transition: transform 0.25s ease-in;\r\n    content: \">\";\r\n    transform: rotate(90deg);\r\n    font-size: calc($font_size / 1.44);\r\n    text-align: right;\r\n    float: right;\r\n    margin-right: 20px;\r\n\r\n}\r\n\r\n.select_filter {\r\n\r\n    position: relative;\r\n    display: inline-block;\r\n}\r\n\r\n\r\n.select_content {\r\n    display: none;\r\n    position: absolute;\r\n    background: $color_primary1;\r\n    border-bottom-left-radius: 5px;\r\n    border-bottom-right-radius: 5px;\r\n    min-width: 160px;\r\n    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\r\n    z-index: 1;\r\n\r\n\r\n    .whiteline {\r\n        width: 90%;\r\n        height: 1px;\r\n        background-color: $default_color;\r\n        margin-left: 5%;\r\n    }\r\n\r\n    a {\r\n        transition: all 0.5s ease-in;\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-size: calc($font_size / 2);\r\n        color: $default_color;\r\n        padding: 20px;\r\n        width: 170px;\r\n        height: 60px;\r\n        text-decoration: none;\r\n        display: block;\r\n    }\r\n\r\n    a:hover {\r\n        cursor: pointer;\r\n        transition: all 0.5s ease-in;\r\n        color: $default_font_color;\r\n    }\r\n\r\n\r\n\r\n}\r\n\r\n\r\n.select_filter:hover .select_content {\r\n\r\n    display: block;\r\n}\r\n\r\n.select_filter:hover .select_button::after {\r\n    transform: rotate(-90deg);\r\n    transition: transform 0.25s ease-in;\r\n}",".photographer_statistic {\r\n    @include flex-basic(row, null, flex-start, space-around, baseline);\r\n    position: fixed;\r\n    background-color: $color_background;\r\n    min-width: 376px;\r\n    min-height: 89px;\r\n    bottom: 0;\r\n    right: 38px;\r\n    z-index: 2;\r\n    margin-bottom: -22px;\r\n    border-radius: 5px;\r\n\r\n\r\n\r\n    .total_likes,\r\n    .price_rate_daily {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_big;\r\n        font-size: calc($font_size / 1.55);\r\n        line-height: 31px;\r\n        color: $default_font_color;\r\n        padding-top: 18px;\r\n\r\n    }\r\n\r\n    .total_likes:after {\r\n        padding-left: 5px;\r\n        content: \"♥\";\r\n        font-size: calc($font_size / 1.55 * 1.33);\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_statistic {\r\n        display: none;\r\n    }\r\n\r\n}",".media_card {\r\n    @include flex-basic(column, null, null, null, null);\r\n    flex-wrap: wrap;\r\n    max-width: 350px;\r\n\r\n    img,\r\n    video {\r\n        transition: box-shadow 1s;\r\n        width: 100%;\r\n        max-height: 300px;\r\n        min-height: 300px;\r\n        object-fit: cover;\r\n        border-radius: 5px;\r\n\r\n        &:hover {\r\n            transition: box-shadow 1s;\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n\r\n\r\n\r\n    .details {\r\n        @include flex-basic(row, null, null, space-between, baseline);\r\n        margin-top: 5px;\r\n    }\r\n\r\n    h6 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n        font-size: calc($font_size / 1.5);\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h6:last-child::after {\r\n        font-size: calc($font_size / 1.5 * 1.25);\r\n        padding-left: 10px;\r\n        content: \"♥\";\r\n    }\r\n\r\n}\r\n\r\n\r\n\r\n@media (max-width: 600px) {\r\n\r\n    .media_card img,\r\n    .media_card {\r\n        max-width: 100%;\r\n    }\r\n}","//// MAIN PAGE /// \r\n.photographer_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    gap: 70px;\r\n    margin-top: 75px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n///// END MAIN PAGE // \r\n\r\n//////////////// PHOTOGRAPHER PAGE /////// \r\n.margin_left_right {\r\n    margin: 0 100px;\r\n}\r\n\r\n.filter_section {\r\n    @include flex-basic(row, null, null, null, baseline);\r\n    margin-left: 0;\r\n\r\n    h5:first-child {\r\n        margin-top: 20px;\r\n        margin-right: 28px;\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-style: normal;\r\n        font-size: calc($font-size / 2);\r\n        color: $default_font_color;\r\n    }\r\n\r\n    .select_filter {\r\n        margin-top: 10px;\r\n    }\r\n}\r\n\r\n.media_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    row-gap: 30px;\r\n    column-gap: 95px;\r\n    margin-top: 20px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n////////////// END PHOTOGRAPHER PAGE ////////\r\n\r\n","footer {\r\n    height: 2px;\r\n    width: 100%;\r\n    background-color: $default_color;\r\n    margin-top: 75px;\r\n}","@media (max-width: 1100px) {\r\n\r\n    .photographer_section,\r\n    .media_section {\r\n        grid-template-columns: 1fr 1fr;\r\n    }\r\n\r\n}\r\n\r\n\r\n@media (max-width: 800px) {\r\n\r\n    header {\r\n        flex-direction: column;\r\n        margin-top: 40px;\r\n        height: 100px;\r\n\r\n        .logo_photographer {\r\n            margin-left: 0;\r\n        }\r\n\r\n        .logo,\r\n        h1 {\r\n            margin-left: 20px;\r\n            margin-right: 20px;\r\n            font-size: calc($font_size / 1.20);\r\n        }\r\n    }\r\n\r\n    .margin_left_right {\r\n        margin: 0 20px;\r\n    }\r\n\r\n\r\n    .filter_section {\r\n        justify-content: space-between;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 700px) {\r\n\r\n    .photographer_section {\r\n        grid-template-columns: 1fr;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 600px) {\r\n\r\n    .media_section {\r\n        grid-template-columns: 1fr;\r\n    }\r\n\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/scss/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************************!*\
  !*** ./src/scripts/pages/photographer.js ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/main.scss */ "./src/scss/main.scss");
/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/fetch */ "./src/scripts/utils/fetch.js");
/* harmony import */ var _data_displayData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data/displayData */ "./src/scripts/data/displayData.js");
/* harmony import */ var _data_displayMedia__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data/displayMedia */ "./src/scripts/data/displayMedia.js");
/* harmony import */ var _utils_getUrlParameter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getUrlParameter */ "./src/scripts/utils/getUrlParameter.js");
/* harmony import */ var _utils_sortBy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/sortBy */ "./src/scripts/utils/sortBy.js");
/* harmony import */ var _utils_selectFilter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/selectFilter */ "./src/scripts/utils/selectFilter.js");
/* harmony import */ var _utils_modalForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/modalForm */ "./src/scripts/utils/modalForm.js");









async function initProfile(idURL) {
  // Try to get data from photographers if error then redirect to 404 page
  try {
    // SET Photographer Profile DATA
    const photographers = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_1__.getPhotographers)(); // Return the photographer Display

    const photographerSelected = await (0,_data_displayData__WEBPACK_IMPORTED_MODULE_2__.displayData)(photographers, idURL); // END SET Photographer Profile Data

    console.log("Section profile initié avec succès depuis initProfile()");
    initContactForm(photographerSelected);
  } catch (e) {
    console.error(e); // If it's a fail then we redirect to 404 Error Page since  it's the minimal functionality
    // Atm 404 error page doesn't exists must be write later

    console.log("Rediriger vers la page 404");
  }
}

async function initContactForm(photographerSelected) {
  try {
    const contactFormModal = (0,_utils_modalForm__WEBPACK_IMPORTED_MODULE_7__.modalMaster)("body", "header", "main", "contact_modal"); // Create a Model Master

    const modalPage = contactFormModal.modalPage; // Get modelPage Object

    contactFormModal.addContactFormListener(modalPage); // Add listener for Contact Form Modal

    const titleModal = "Contactez-moi " + photographerSelected.name; // Build the title Modal

    contactFormModal.setTitleModal(modalPage, "h2", titleModal); // Set the title Modal

    console.log("Formulaire contact initié avec succès depuis initContactForm()");
  } catch (e) {
    console.error(e); // If it's a fail then we redirect to 404 Error Page since  it's the minimal functionality
    // Atm 404 error page doesn't exists must be write later

    console.log("Rediriger vers la page 404");
  }
}

async function initMedia(idURL) {
  // Try to get data from media if error then redirect to 404 page
  try {
    // Build Medias Data
    const medias = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_1__.getMedias)();
    (0,_data_displayMedia__WEBPACK_IMPORTED_MODULE_3__.displayMedia)(medias.sort(_utils_sortBy__WEBPACK_IMPORTED_MODULE_5__.sortByLikes), ".media_section", idURL); // Sort by default by likes
    // End build Medias Data
    // Init selectFilter Component and his behavior, need to provide the Data to filter

    (0,_utils_selectFilter__WEBPACK_IMPORTED_MODULE_6__.selectFilterComponent)(medias, idURL);
    console.log("Section média initié avec succès depuis initMain()");
  } catch (e) {
    console.error(e);
  }
}

async function initMain() {
  // We Wait for getUrlParameter() to be complete then we run tasks for generate page
  const idURL = await (0,_utils_getUrlParameter__WEBPACK_IMPORTED_MODULE_4__.getUrlParameter)("id");
  initProfile(idURL);
  initMedia(idURL);
}

initMain();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WSxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsVUFBVSxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxPQUFPLE1BQU0sS0FBSyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sS0FBSyxNQUFNLEtBQUssV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLEtBQUssVUFBVSxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsVUFBVSxXQUFXLFdBQVcsTUFBTSxPQUFPLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsWUFBWSxNQUFNLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxNQUFNLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sWUFBWSxLQUFLLFVBQVUsV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsT0FBTyxZQUFZLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxlQUFlLGFBQWEsV0FBVyxXQUFXLGNBQWMsZUFBZSxPQUFPLE1BQU0sV0FBVyxNQUFNLFFBQVEsV0FBVyxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsVUFBVSxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxXQUFXLE9BQU8sT0FBTyxXQUFXLGFBQWEsZUFBZSxlQUFlLE9BQU8sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxPQUFPLE1BQU0sS0FBSyxZQUFZLFVBQVUsYUFBYSxjQUFjLGVBQWUsZUFBZSxlQUFlLFlBQVksTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxLQUFLLE1BQU0sS0FBSyxXQUFXLGFBQWEsZUFBZSxlQUFlLGVBQWUsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLFFBQVEsV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLEtBQUssWUFBWSxNQUFNLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsVUFBVSxVQUFVLFVBQVUsT0FBTyxNQUFNLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxXQUFXLFlBQVksWUFBWSxXQUFXLFdBQVcsV0FBVyxVQUFVLE1BQU0sTUFBTSxVQUFVLFVBQVUsWUFBWSxXQUFXLE1BQU0sTUFBTSxXQUFXLFlBQVksYUFBYSxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxVQUFVLE1BQU0sTUFBTSxVQUFVLFdBQVcsV0FBVyxRQUFRLE1BQU0sVUFBVSxPQUFPLE1BQU0sV0FBVyxXQUFXLE9BQU8sWUFBWSxNQUFNLFVBQVUsWUFBWSxhQUFhLGVBQWUsZUFBZSxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxNQUFNLE9BQU8sV0FBVyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsT0FBTyxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxNQUFNLFVBQVUsWUFBWSxXQUFXLFdBQVcsTUFB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SUFDQXpKLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDRCQUFaO0VBQ0g7QUFDSjs7QUFHRCxlQUFlMEosU0FBZixDQUF5QmYsS0FBekIsRUFBZ0M7RUFDNUI7RUFDQSxJQUFJO0lBRUE7SUFDQSxNQUFNN0gsTUFBTSxHQUFHLE1BQU15RCx1REFBUyxFQUE5QjtJQUNBMUQsZ0VBQVksQ0FBQ0MsTUFBTSxDQUFDb0ksSUFBUCxDQUFZWCxzREFBWixDQUFELEVBQTJCLGdCQUEzQixFQUE2Q0ksS0FBN0MsQ0FBWixDQUpBLENBSWlFO0lBQ2pFO0lBRUE7O0lBQ0FELDBFQUFxQixDQUFDNUgsTUFBRCxFQUFTNkgsS0FBVCxDQUFyQjtJQUdBNUksT0FBTyxDQUFDQyxHQUFSLENBQVksb0RBQVo7RUFFSCxDQWJELENBYUUsT0FBT3dKLENBQVAsRUFBVTtJQUNSekosT0FBTyxDQUFDdUksS0FBUixDQUFja0IsQ0FBZDtFQUNIO0FBRUo7O0FBR0QsZUFBZUcsUUFBZixHQUEwQjtFQUN0QjtFQUNBLE1BQU1oQixLQUFLLEdBQUcsTUFBTW5FLHVFQUFlLENBQUMsSUFBRCxDQUFuQztFQUNBOEUsV0FBVyxDQUFDWCxLQUFELENBQVg7RUFDQWUsU0FBUyxDQUFDZixLQUFELENBQVQ7QUFDSDs7QUFHRGdCLFFBQVEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvZGF0YS9kaXNwbGF5RGF0YS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL2RhdGEvZGlzcGxheU1lZGlhLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvZmFjdG9yaWVzL21lZGlhRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL2ZhY3Rvcmllcy9waG90b2dyYXBoZXJGYWN0b3J5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvdXRpbHMvZG9tLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvdXRpbHMvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy91dGlscy9nZXRVcmxQYXJhbWV0ZXIuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy91dGlscy9tb2RhbEZvcm0uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy91dGlscy9zZWxlY3RGaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy91dGlscy9zb3J0QnkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2Nzcy9tYWluLnNjc3MiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2Nzcy9tYWluLnNjc3M/YjM3OSIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvcGFnZXMvcGhvdG9ncmFwaGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsImltcG9ydCB7IHBob3RvZ3JhcGhlckZhY3RvcnkgfSBmcm9tIFwiLi4vZmFjdG9yaWVzL3Bob3RvZ3JhcGhlckZhY3RvcnlcIjtcclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlzcGxheURhdGEocGhvdG9ncmFwaGVycywgaWQpIHtcclxuICAgIGxldCBwaG90b2dyYXBoZXJTZWxlY3RlZCA9IFwiXCI7XHJcbiAgICBcclxuICAgIHBob3RvZ3JhcGhlcnMuZm9yRWFjaCgocGhvdG9ncmFwaGVyKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChwaG90b2dyYXBoZXIuaWQgPT0gaWQpIHtcclxuICAgICAgICAgICAgLy8gVGhlbiB3ZSBhcmUgZ29pbmcgdXNlIHRoZSBQaG90b2dyYXBoZXJGYWN0b3J5IHRvIHNldCBET01cclxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7IGNvbnNvbGUubG9nKHBob3RvZ3JhcGhlcik7IH1cclxuICAgICAgICAgICAgY29uc3QgcGhvdG9ncmFwaGVyTW9kZWwgPSBwaG90b2dyYXBoZXJGYWN0b3J5KHBob3RvZ3JhcGhlcik7XHJcbiAgICAgICAgICAgIHBob3RvZ3JhcGhlck1vZGVsLnNldFBob3RvZ3JhcGhlckhlYWRlcigpO1xyXG4gICAgICAgICAgICBwaG90b2dyYXBoZXJNb2RlbC5zZXRTdGlja3lCYXJQcmljZSgpO1xyXG5cclxuICAgICAgICAgICAgcGhvdG9ncmFwaGVyU2VsZWN0ZWQgPSBwaG90b2dyYXBoZXJcclxuICAgICAgICAgICAgLy8gRW5kIG9mIFBob3RvZ3JhcGhlckZhY3RvcnkgV29ya1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIChwaG90b2dyYXBoZXJTZWxlY3RlZCk7IC8vIFJldHVybiB0aGUgcGhvdG9ncmFwaGVyU2hvdyBhdCB0aGUgZW5kXHJcblxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlzcGxheURhdGFBbGwocGhvdG9ncmFwaGVycywgcXVlcnlTZWxlY3Rvcikge1xyXG5cclxuICAgIHBob3RvZ3JhcGhlcnMuZm9yRWFjaCgocGhvdG9ncmFwaGVyKSA9PiB7XHJcblxyXG4gICAgICAgIC8vIFRoZW4gd2UgYXJlIGdvaW5nIHVzZSB0aGUgUGhvdG9ncmFwaGVyRmFjdG9yeSB0byBnZW5lcmF0ZSBET01cclxuICAgICAgICBjb25zdCBwaG90b2dyYXBoZXJzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnlTZWxlY3Rvcik7XHJcbiAgICAgICAgY29uc3QgcGhvdG9ncmFwaGVyTW9kZWwgPSBwaG90b2dyYXBoZXJGYWN0b3J5KHBob3RvZ3JhcGhlcik7XHJcbiAgICAgICAgY29uc3QgdXNlckNhcmRET00gPSBwaG90b2dyYXBoZXJNb2RlbC5nZXRVc2VyQ2FyZERPTSgpO1xyXG5cclxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHsgY29uc29sZS5sb2cocGhvdG9ncmFwaGVyKTsgfVxyXG4gICAgICAgIGlmICh1c2VyQ2FyZERPTSkge1xyXG4gICAgICAgICAgICBwaG90b2dyYXBoZXJzU2VjdGlvbi5hcHBlbmRDaGlsZCh1c2VyQ2FyZERPTSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEVuZCBvZiBQaG90b2dyYXBoZXJGYWN0b3J5IFdvcmtcclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBtZWRpYUZhY3RvcnkgfSBmcm9tIFwiLi4vZmFjdG9yaWVzL21lZGlhRmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBzZXRJbm5lckh0bWwgfSBmcm9tIFwiLi4vdXRpbHMvZG9tXCI7XHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlNZWRpYShtZWRpYXMsIHF1ZXJ5U2VsZWN0b3IsIHBob3RvZ3JhcGhlcklkKSB7XHJcbiAgICBsZXQgdG90YWxMaWtlcyA9IDA7XHJcblxyXG4gICAgbWVkaWFzLmZvckVhY2goKG1lZGlhKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChwaG90b2dyYXBoZXJJZCA9PSBtZWRpYS5waG90b2dyYXBoZXJJZCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7IGNvbnNvbGUubG9nKG1lZGlhKTsgfVxyXG4gICAgICAgICAgICAvLyBUaGVuIHdlIGFyZSBnb2luZyB1c2UgdGhlIE1lZGlhRmFjdG9yeSB0byBnZW5lcmF0ZSBET01cclxuICAgICAgICAgICAgY29uc3QgbWVkaWFzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnlTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lZGlhTW9kZWwgPSBtZWRpYUZhY3RvcnkobWVkaWEpO1xyXG4gICAgICAgICAgICBjb25zdCBtZWRpYURPTSA9IG1lZGlhTW9kZWwuZ2V0TWVkaWFET00oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtZWRpYURPTSkge1xyXG4gICAgICAgICAgICAgICAgbWVkaWFzU2VjdGlvbi5hcHBlbmRDaGlsZChtZWRpYURPTSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRW5kIG9mIE1lZGlhRmFjdG9yeSBXb3JrXHJcblxyXG4gICAgICAgICAgICAvLyBJZiBtZWRpYSBvYmplY3QgZ290IExpa2VzIHByb3ByaWV0eSB0aGVuXHJcbiAgICAgICAgICAgIGlmIChtZWRpYS5saWtlcykge1xyXG4gICAgICAgICAgICAgICAgdG90YWxMaWtlcyArPSBtZWRpYS5saWtlczsgLy8gQ291bnQgYWxsIGxpa2VzXHJcbiAgICAgICAgICAgICAgICBzZXRJbm5lckh0bWwoXCIudG90YWxfbGlrZXNcIiwgdG90YWxMaWtlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJUaGVyZXMgaXMgbm8gbGlrZSBhbmQgdG90YWxMaWtlcywgbG9vayBtZWRpYUZhY3RvcnkgcmV0dXJuZWQgYSBvYmplY3Qgd2l0aG91dCBsaWtlcyBwcm9wcmlldHlcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHsgY29uc29sZS5sb2coXCJUb3RhbCBMaWtlOiBcIiArIHRvdGFsTGlrZXMpOyB9XHJcbn1cclxuXHJcbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tIFwiLi4vdXRpbHMvZG9tXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWVkaWFGYWN0b3J5KGRhdGEpIHtcclxuICAgIGNvbnN0IHsgaWQsIHBob3RvZ3JhcGhlcklkLCB0aXRsZSwgaW1hZ2UsIHZpZGVvLCBsaWtlcyB9ID0gZGF0YTtcclxuXHJcbiAgICBjb25zdCBtb3ZpZSA9IGBhc3NldHMvdmlkZW8vJHt2aWRlb31gO1xyXG4gICAgY29uc3QgcGljdHVyZSA9IGBhc3NldHMvaW1hZ2VzLyR7aW1hZ2V9YDtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRNZWRpYURPTSgpIHtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIERPTSBvbmx5IGlmIHdlIGdvdCBpZHMgYW5kIGEgUGljdHVyZSBvciBhIFZpZGVvXHJcbiAgICAgICAgY29uc3QgaGFzUGhvdG9ncmFwaGVyID0gaWQgJiYgcGhvdG9ncmFwaGVySWQ7XHJcbiAgICAgICAgY29uc3QgaGFzQ29udGVudCA9IGltYWdlIHx8IHZpZGVvXHJcblxyXG4gICAgICAgIGlmIChoYXNQaG90b2dyYXBoZXIgJiYgaGFzQ29udGVudCkge1xyXG4gICAgICAgICAgICAvLyBDUkVBVEUgQSBBUlRJQ0xFXHJcbiAgICAgICAgICAgIGNvbnN0IGFydGljbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXJ0aWNsZVwiKTtcclxuICAgICAgICAgICAgYXJ0aWNsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1lZGlhX2NhcmRcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBCdWlsZCBBIEhSRUYgRUxFTUVOVFxyXG4gICAgICAgICAgICBjb25zdCBsaW5rRWxlbWVudCA9IGFydGljbGUuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBkb20uYnVpbGRFbGVtZW50KFwiYVwiLCBcInBob3RvZ3JhcGhlci5odG1sP2lkPVwiICsgaWQpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGRvbS5zZXRBcmlhbExhYmVsKGxpbmtFbGVtZW50LCBcIkxpbGFjIGJyZWFzdGVkIHJvbGxlciwgY2xvc2V1cCB2aWV3XCIpIC8vIFNldCBBcmllbExhYmVsIHRvIEFIcmVmXHJcblxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgaW1hZ2Ugb3IgdmlkZW8gZXhpc3RzXHJcbiAgICAgICAgICAgIGlmIChpbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgZG9tLmluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50KGxpbmtFbGVtZW50LCBwaWN0dXJlLCB0aXRsZSk7IC8vIEluc2VydCBwaWN0dXJlIHdpdGggQUxUXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZpZGVvKSB7XHJcbiAgICAgICAgICAgICAgICBkb20uaW5zZXJ0VmlkZW9JbnNpZGVFbGVtZW50KGxpbmtFbGVtZW50LCBtb3ZpZSwgXCJNb3ZpZSBcIiArIHZpZGVvKTsgLy8gSW5zZXJ0IFZpZGVvIHdpdGggQXJpZWwgTGFiZWxcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gR2VuZXJhdGUgRGV0YWlscyAodGl0bGUgKyBMaWtlcylcclxuICAgICAgICAgICAgaWYgKHRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGl0bGVfaDYgPSBcIjxoNj5cIiArIHRpdGxlICsgXCI8L2g2PlwiO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpa2VzX2g2ID0gXCI8aDYgYXJpYS1sYWJlbD0nbGlrZXMnPlwiICsgMCArIFwiPC9oNj5cIjtcclxuICAgICAgICAgICAgICAgIGlmIChsaWtlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpa2VzX2g2ID0gXCI8aDYgYXJpYS1sYWJlbD0nbGlrZXMnPlwiICsgbGlrZXMgKyBcIjwvaDY+XCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkb20uaW5zZXJ0SFRNTEFmdGVyRWxlbWVudChsaW5rRWxlbWVudCwgXCI8ZGl2IGNsYXNzPSdkZXRhaWxzJz5cIiArIHRpdGxlX2g2ICsgbGlrZXNfaDYgKyBcIjwvZGl2PlwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUmV0dXJuIEFydGljbGVcclxuICAgICAgICAgICAgcmV0dXJuIGFydGljbGU7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geyBwaG90b2dyYXBoZXJJZCwgcGljdHVyZSwgbW92aWUsIGdldE1lZGlhRE9NIH07XHJcbn1cclxuIiwiXHJcbmltcG9ydCB7IGJ1aWxkRWxlbWVudCwgaW5zZXJ0UGljdHVyZUluc2lkZUVsZW1lbnQsIHNldElubmVySHRtbCwgc2V0QXJpYWxMYWJlbCB9IGZyb20gXCIuLi91dGlscy9kb21cIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwaG90b2dyYXBoZXJGYWN0b3J5KGRhdGEpIHtcclxuICAgIGNvbnN0IHsgbmFtZSwgaWQsIGNpdHksIGNvdW50cnksIHRhZ2xpbmUsIHBvcnRyYWl0LCBwcmljZSB9ID0gZGF0YTtcclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIGNvbnN0IHBpY3R1cmUgPSBgYXNzZXRzL2ltYWdlcy8ke3BvcnRyYWl0fWA7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VXNlckNhcmRET00oKSB7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBET00gb25seSBpZiB3ZSBnb3QgYSBwaWN0dXJlIGEgaWQgYW5kIGEgbmFtZVxyXG4gICAgICAgIGlmIChuYW1lICYmIGlkICYmIHBvcnRyYWl0KSB7XHJcbiAgICAgICAgICAgIC8vIEJVSUxEIEEgQVJUSUNMRSBcclxuICAgICAgICAgICAgY29uc3QgYXJ0aWNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhcnRpY2xlXCIpO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicGhvdG9ncmFwaGVyX2NhcmRcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgRHluYW1pcXVlIExJTksgd2l0aCBQaWN0dXJlXHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtFbGVtZW50ID0gYXJ0aWNsZS5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgIGJ1aWxkRWxlbWVudChcImFcIiwgXCJwaG90b2dyYXBoZXIuaHRtbD9pZD1cIiArIGlkKSAvLyBCdWlsZCBBSHJlZlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBzZXRBcmlhbExhYmVsKGxpbmtFbGVtZW50LCBcIkxpbmsgdG8gXCIgKyBuYW1lKSAvLyBTZXQgQXJpZWxMYWJlbCB0byBBSHJlZlxyXG4gICAgICAgICAgICBpbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudChsaW5rRWxlbWVudCwgcGljdHVyZSwgbmFtZSk7XHJcbiAgICAgICAgICAgIC8vIEVORCBDcmVhdGUgRHluYW1pcXVlIExJTksgd2l0aCBQaWN0dXJlXHJcblxyXG4gICAgICAgICAgICBhcnRpY2xlLmFwcGVuZENoaWxkKGJ1aWxkRWxlbWVudChcImgyXCIsIG5hbWUpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjaXR5ICYmIGNvdW50cnkpIHtcclxuICAgICAgICAgICAgICAgIGFydGljbGUuYXBwZW5kQ2hpbGQoYnVpbGRFbGVtZW50KFwiaDNcIiwgY2l0eSArIFwiLCBcIiArIGNvdW50cnkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGFnbGluZSkge1xyXG4gICAgICAgICAgICAgICAgYXJ0aWNsZS5hcHBlbmRDaGlsZChidWlsZEVsZW1lbnQoXCJoNFwiLCB0YWdsaW5lKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByaWNlKSB7XHJcbiAgICAgICAgICAgICAgICBhcnRpY2xlLmFwcGVuZENoaWxkKGJ1aWxkRWxlbWVudChcImg1XCIsIHByaWNlICsgXCLigqwvam91clwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJFVFVSTiBBIEFSVElDTEUgXHJcbiAgICAgICAgICAgIHJldHVybiBhcnRpY2xlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRQaG90b2dyYXBoZXJIZWFkZXIoKSB7XHJcbiAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnBob3RvZ3JhcGhfaGVhZGVyIGgxXCIsIG5hbWUpO1xyXG4gICAgICAgIGlmIChjaXR5ICYmIGNvdW50cnkpIHtcclxuICAgICAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnBob3RvZ3JhcGhfaGVhZGVyIGgyXCIsIGNpdHkgKyBcIiwgXCIgKyBjb3VudHJ5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNldElubmVySHRtbChcIi5waG90b2dyYXBoX2hlYWRlciBoMlwiLCBcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnBob3RvZ3JhcGhfaGVhZGVyIGgzXCIsIHRhZ2xpbmUpO1xyXG5cclxuICAgICAgICAvKiogV0UgVVNFIGEgZGlmZmVyZW50IG1ldGhvZCB0aGF0IGluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50KCkgc2luY2UgcGljdHVyZSBpcyBhbHJlYWR5IGluIHRoZSBET00gKi9cclxuICAgICAgICBjb25zdCBpbWdQcm9maWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5waG90b2dyYXBoX2hlYWRlciBpbWdcIik7XHJcbiAgICAgICAgaW1nUHJvZmlsZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgcGljdHVyZSk7XHJcbiAgICAgICAgaW1nUHJvZmlsZS5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgbmFtZSk7XHJcbiAgICAgICAgLyoqICovXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0U3RpY2t5QmFyUHJpY2UoKSB7XHJcbiAgICAgICAgaWYgKHByaWNlKSB7XHJcbiAgICAgICAgICAgIHNldElubmVySHRtbChcIi5wcmljZV9yYXRlX2RhaWx5XCIsIHByaWNlICsgXCIg4oKsIC8gam91clwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNldElubmVySHRtbChcIi5wcmljZV9yYXRlX2RhaWx5XCIsIHByaWNlICsgXCJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IG5hbWUsIHBpY3R1cmUsIGdldFVzZXJDYXJkRE9NLCBzZXRQaG90b2dyYXBoZXJIZWFkZXIsIHNldFN0aWNreUJhclByaWNlIH07XHJcbn1cclxuIiwiLy8gRnVuY3Rpb24gZm9yIGJ1aWxkIERPTVxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0UGljdHVyZUluc2lkZUVsZW1lbnQoZWxlbWVudCwgcGljdHVyZSwgYWx0KSB7XHJcbiAgICAvLyA/PyBvcGVyYXRvciBcclxuICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsICc8aW1nIHNyYz1cIicgKyBwaWN0dXJlICsgJ1wiICcgKyAnYWx0PVwiJyArIGFsdCArICdcIj4nKTtcclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0VmlkZW9JbnNpZGVFbGVtZW50KGVsZW1lbnQsIHZpZGVvLCBhcmlhTGFiZWwpIHtcclxuXHJcbiAgICBpZiAoYXJpYUxhYmVsKSB7XHJcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgJzx2aWRlbyBzcmM9XCInICsgdmlkZW8gKyAnXCIgJyArICdhcmlhLWxhYmVsPVwiJyArIGFyaWFMYWJlbCArICdcIj4nKTtcclxuXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCAnPHZpZGVvIHNyYz1cIicgKyB2aWRlbyArICdcIj4nKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRIVE1MQWZ0ZXJFbGVtZW50KGVsZW1lbnQsIGh0bWwpIHtcclxuICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJlbmRcIiwgaHRtbCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBidWlsZEVsZW1lbnQoYmFsaXNlLCB2YWx1ZSkge1xyXG4gICAgLy8gQ3JlYXRlIGJhbGlzZVxyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYmFsaXNlKTtcclxuXHJcbiAgICAvLyBTZXQgQXR0cmlidXRlIG9yIFRleHRDb250ZW5lZCBkZXBlbmQgb2YgYmFsaXNlXHJcbiAgICBzd2l0Y2ggKGJhbGlzZSkge1xyXG4gICAgICAgIGNhc2UgXCJhXCI6XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJpbWdcIjpcclxuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBcmlhbExhYmVsKGVsZW1lbnQsIGFyaWFsYWJlbCkge1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIGFyaWFsYWJlbCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRJbm5lckh0bWwocXVlcnlTZWxlY3RvciwgdGV4dGUpIHtcclxuICAgIGNvbnN0IHRleHRlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnlTZWxlY3Rvcik7XHJcbiAgICB0ZXh0ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGV4dGU7XHJcbn1cclxuLy8gRW5kIEZ1bmN0aW9uIGZvciBidWlsZCBET00iLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hKU09OKHVybCwgdHlwZSkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpOyAvLyBXYWl0IGZvciB0aGUgQXN5bmMgRmVjdGggRnVuY3Rpb25cclxuXHJcbiAgICAvLyBmZXRjaCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIGEgcmVzcG9uc2UgcHJvcGVydHkgd2hpY2ggaWYgc2V0IHRvIGZhbHNlIG1lYW5zIHRoYXQgdGhlIGNvbm5lY3Rpb24gaXMgbm90IGdvb2QgYW5kIHNvIHdlIHN0b3AgdGhlIGZ1bmN0aW9uIFxyXG4gICAgaWYgKCFyZXNwb25zZS5vaykgeyB0aHJvdyBuZXcgRXJyb3IoXCJUaHJvd24gZnJvbSBmZXRjaEpTT04oKVwiKTsgfVxyXG5cclxuICAgIGxldCBqc29uUmVzcG9uc2UgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7IC8vIHBhcnNpbmcgSlNPTlxyXG4gICAgcmV0dXJuIGpzb25SZXNwb25zZVt0eXBlXTsgLy8gR2V0IGRhdGEgZnJvbSB0aGUgQXJyYXkgdGhhdCB3ZSB3YW50XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBob3RvZ3JhcGhlcnMoKSB7XHJcbiAgICBjb25zdCB1cmwgPSBcIi4vZGF0YS9waG90b2dyYXBoZXJzLmpzb25cIjsgLy8gRGF0YSBzb3VyY2UgLkpTT05cclxuICAgIGNvbnN0IHBob3RvZ3JhcGhlcnMgPSBhd2FpdCBmZXRjaEpTT04odXJsLCBcInBob3RvZ3JhcGhlcnNcIik7IC8vIHVzZSBmZXRjaEpTT04gZnVuY3Rpb24gZnJvbSB1dGlscy9mZXRjaC5qc1xyXG4gICAgcmV0dXJuIHBob3RvZ3JhcGhlcnM7IC8vIFJldHVybiBkYXRhIG9mIFBob3RvR3JhcGhlcnNcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldE1lZGlhcygpIHtcclxuICAgIGNvbnN0IHVybCA9IFwiLi9kYXRhL3Bob3RvZ3JhcGhlcnMuanNvblwiOyAvLyBEYXRhIHNvdXJjZSAuSlNPTlxyXG4gICAgY29uc3QgbWVkaWFzID0gYXdhaXQgZmV0Y2hKU09OKHVybCwgXCJtZWRpYVwiKTsgLy8gdXNlIGZldGNoSlNPTiBmdW5jdGlvbiBmcm9tIHV0aWxzL2ZldGNoLmpzXHJcbiAgICByZXR1cm4gbWVkaWFzOyAvLyBSZXR1cm4gZGF0YSBvZiBNZWRpYVxyXG59XHJcbiIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVcmxQYXJhbWV0ZXIocGFyYW1ldGVyKSB7XHJcbiAgICBjb25zdCBmdWxsVXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7IC8vIEdldCBmdWxsIHVybFxyXG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChmdWxsVXJsKTsgLy8gQ3JlYXRlIFVSTCBPYmplY3RcclxuICAgIGNvbnN0IHBhcmFtZXRlclZhbHVlID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQocGFyYW1ldGVyKTsgLy8gZ2V0IHBhcmFtZXRlciB2YWx1ZVxyXG4gICAgcmV0dXJuIHBhcmFtZXRlclZhbHVlO1xyXG59IiwiaW1wb3J0IHsgc2V0SW5uZXJIdG1sIH0gZnJvbSAnLi4vdXRpbHMvZG9tJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtb2RhbE1hc3Rlcihib2R5VGFnLCBoZWFkZXJUYWcsIG1haW5UYWcsIG1vZGFsSUQpIHtcclxuXHJcblxyXG4gICAgLyoqIENSRUFURSBBIE9CSkVDVCBXSVRIIEFMTCBQUk9QUklFVFkgRk9SIE1PREVMIERPTSBORUVEICovXHJcbiAgICBsZXQgbW9kYWxQYWdlID0ge1xyXG4gICAgICAgIGJvZHlIVE1MOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJvZHlUYWcpLFxyXG4gICAgICAgIGhlYWRlckhUTUw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaGVhZGVyVGFnKSxcclxuICAgICAgICBtYWluSFRNTDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluVGFnKSxcclxuICAgICAgICBtb2RhbEhUTUw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG1vZGFsSUQpLFxyXG4gICAgICAgIG1vZGFsSUQ6IG1vZGFsSUQsXHJcbiAgICAgICAgdmlzaWJsZTogMCxcclxuICAgIH1cclxuICAgIC8qKiBFTkQgICovXHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQ29udGFjdEZvcm1MaXN0ZW5lcihtb2RhbFBhZ2UpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW5Nb2RhbFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkaXNwbGF5TW9kYWwobW9kYWxQYWdlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlTW9kYWxcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY2xvc2VNb2RhbChtb2RhbFBhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFjdF9idXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgc2VuZE1lc3NhZ2UobW9kYWxQYWdlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gc2V0VGl0bGVNb2RhbChtb2RhbFBhZ2UsIHRhZ0hUTUwsIHRpdGxlTW9kYWwpIHtcclxuICAgICAgICByZXR1cm4gc2V0SW5uZXJIdG1sKFwiI1wiICsgbW9kYWxQYWdlLm1vZGFsSUQgKyBcIiBcIiArIHRhZ0hUTUwsIHRpdGxlTW9kYWwpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBjZW50ZXJNb2RhbChtb2RhbElEKSB7XHJcbiAgICAgICAgbGV0IE13aWR0aCA9IG1vZGFsSUQub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgbGV0IE1oZWlnaHQgPSBtb2RhbElELm9mZnNldEhlaWdodDtcclxuICAgICAgICBsZXQgV3dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgbGV0IFdoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgICAgIG1vZGFsSUQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgbW9kYWxJRC5zdHlsZS50b3AgPSAoKFdoZWlnaHQgLSBNaGVpZ2h0KSAvIDIgKyB3aW5kb3cucGFnZVlPZmZzZXQpICsgXCJweFwiO1xyXG4gICAgICAgIG1vZGFsSUQuc3R5bGUubGVmdCA9ICgoV3dpZHRoIC0gTXdpZHRoKSAvIDIgKyB3aW5kb3cucGFnZVhPZmZzZXQpICsgXCJweFwiO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVmZmVjdEFuaW1hdGlvbihoaWRlY2xhc3MsIHNob3djbGFzcywgbW9kYWxQYWdlKSB7XHJcbiAgICAgICAgaWYgKG1vZGFsUGFnZS52aXNpYmxlID09PSAwKSB7XHJcbiAgICAgICAgICAgIG1vZGFsUGFnZS5tYWluSFRNTC5jbGFzc0xpc3QucmVtb3ZlKHNob3djbGFzcyk7XHJcbiAgICAgICAgICAgIG1vZGFsUGFnZS5oZWFkZXJIVE1MLmNsYXNzTGlzdC5yZW1vdmUoc2hvd2NsYXNzKTtcclxuICAgICAgICAgICAgbW9kYWxQYWdlLm1vZGFsSFRNTC5jbGFzc0xpc3QucmVtb3ZlKGhpZGVjbGFzcyk7XHJcblxyXG4gICAgICAgICAgICBtb2RhbFBhZ2UubWFpbkhUTUwuY2xhc3NMaXN0LmFkZChoaWRlY2xhc3MpO1xyXG4gICAgICAgICAgICBtb2RhbFBhZ2UuaGVhZGVySFRNTC5jbGFzc0xpc3QuYWRkKGhpZGVjbGFzcyk7XHJcbiAgICAgICAgICAgIG1vZGFsUGFnZS5tb2RhbEhUTUwuY2xhc3NMaXN0LmFkZChzaG93Y2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgbW9kYWxQYWdlLnZpc2libGUgPSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBtb2RhbFBhZ2UubW9kYWxIVE1MLmNsYXNzTGlzdC5yZW1vdmUoc2hvd2NsYXNzKTtcclxuICAgICAgICAgICAgbW9kYWxQYWdlLm1haW5IVE1MLmNsYXNzTGlzdC5yZW1vdmUoaGlkZWNsYXNzKTtcclxuICAgICAgICAgICAgbW9kYWxQYWdlLmhlYWRlckhUTUwuY2xhc3NMaXN0LnJlbW92ZShoaWRlY2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgbW9kYWxQYWdlLm1vZGFsSFRNTC5jbGFzc0xpc3QuYWRkKGhpZGVjbGFzcyk7XHJcbiAgICAgICAgICAgIG1vZGFsUGFnZS5tYWluSFRNTC5jbGFzc0xpc3QuYWRkKHNob3djbGFzcyk7XHJcbiAgICAgICAgICAgIG1vZGFsUGFnZS5oZWFkZXJIVE1MLmNsYXNzTGlzdC5hZGQoc2hvd2NsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsUGFnZS52aXNpYmxlID0gMFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1vZGFsUGFnZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkaXNwbGF5TW9kYWwobW9kYWxQYWdlKSB7XHJcbiAgICAgICAgZWZmZWN0QW5pbWF0aW9uKFwiaGlkZV9jb250ZW50XCIsIFwic2hvd19jb250ZW50XCIsIG1vZGFsUGFnZSk7XHJcbiAgICAgICAgbW9kYWxQYWdlLmJvZHlIVE1MLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjsgLy8gQmxvY2sgU2Nyb2xsXHJcbiAgICAgICAgbW9kYWxQYWdlLm1vZGFsSFRNTC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiOyAvLyBEaXNwbGF5IHRoZSBNb2RhbCBhdCB0aGUgc2NyZWVuXHJcbiAgICAgICAgY2VudGVyTW9kYWwobW9kYWxQYWdlLm1vZGFsSFRNTCk7IC8vIENlbnRlciB0aGUgTW9kYWwgYXQgdGhlIHNjcmVlblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlTW9kYWwobW9kYWxQYWdlKSB7XHJcbiAgICAgICAgZWZmZWN0QW5pbWF0aW9uKFwiaGlkZV9jb250ZW50XCIsIFwic2hvd19jb250ZW50XCIsIG1vZGFsUGFnZSk7XHJcbiAgICAgICAgbW9kYWxQYWdlLmJvZHlIVE1MLnN0eWxlLm92ZXJmbG93ID0gXCJ2aXNpYmxlXCI7IC8vIEFsbG93IHNjcm9sbCBcclxuICAgICAgICBtb2RhbFBhZ2UubW9kYWxIVE1MLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjsgLy8gSGlkZSBhdCB0aGUgc2NyZWVuIG1vZGFsXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VuZE1lc3NhZ2UobW9kYWxQYWdlKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGFsbElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjXCIgKyBtb2RhbFBhZ2UubW9kYWxJRCArIFwiIGlucHV0XCIpO1xyXG4gICAgICAgIGNvbnN0IGFsbFRleHRBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNcIiArIG1vZGFsUGFnZS5tb2RhbElEICsgXCIgdGV4dGFyZWFcIik7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiX19fX1NlbmQgTWVzc2FnZV9fX19fXCIpO1xyXG5cclxuICAgICAgICBsZXQgZnVsbG1lc3NhZ2UgPSBcIlwiO1xyXG5cclxuICAgICAgICBhbGxJbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XHJcbiAgICAgICAgICAgIGZ1bGxtZXNzYWdlICs9ICdcXG4nICsgaW5wdXQuaWQgKyBcIjogXCIgKyBpbnB1dC52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYWxsVGV4dEFyZWEuZm9yRWFjaCh0ZXh0YXJlYSA9PiB7XHJcbiAgICAgICAgICAgIGZ1bGxtZXNzYWdlICs9ICdcXG4nICsgdGV4dGFyZWEuaWQgKyBcIjogXCIgKyB0ZXh0YXJlYS52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGZ1bGxtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGZ1bGxtZXNzYWdlKTsgXHJcbiAgICAgICAgICAgIGFsZXJ0KFwiTWVzc2FnZSBFbnZveWVyICFcIiArIGZ1bGxtZXNzYWdlKTtcclxuICAgICAgICAgICAgY2xvc2VNb2RhbChtb2RhbFBhZ2UpOyAvLyBDbG9zZSBtb2RhbCBhZnRlciBtZXNzYWdlIHNlbmRcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTb21ldGhpbmcgd3JvbmcgbWVzc2FnZSBubyBzZW5kIGJlY2F1c2UgZnVsbG1lc3NhZ2UgaXMgZW1wdHkgb3IgZG9uJ3QgZXhpc3RzIGZyb20gc2VuZE1lc3NhZ2UoKVwiKTtcclxuICAgICAgICAgICAgYWxlcnQoXCJFcnJldXIgbWVzc2FnZSBub24gZW52b3llciA6KFwiKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcmV0dXJuIHsgbW9kYWxQYWdlLCBhZGRDb250YWN0Rm9ybUxpc3RlbmVyLCBkaXNwbGF5TW9kYWwsIGNsb3NlTW9kYWwsIHNldFRpdGxlTW9kYWwsIHNlbmRNZXNzYWdlIH1cclxufSIsImltcG9ydCB7IGRpc3BsYXlNZWRpYSB9IGZyb20gJy4uL2RhdGEvZGlzcGxheU1lZGlhJztcclxuaW1wb3J0IHsgc29ydEJ5TGlrZXMsIHNvcnRCeURhdGUsIHNvcnRCeVRpdGxlIH0gZnJvbSAnLi4vdXRpbHMvc29ydEJ5JztcclxuXHJcblxyXG4vKiogR0VORVJBVEUgRVZFTlQgRk9SIFNFTEVDVCBGSUxURVIgQ09NUE9ORU5UUyBBTkQgQkVIQVZJT1IgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdEZpbHRlckNvbXBvbmVudChkYXRhLCBpZFVSTCkge1xyXG5cclxuICAgIGNvbnN0IHNlbGVjdEZpbHRlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RfZmlsdGVyIC5zZWxlY3RfYnV0dG9uJyk7IC8vIEJ1dHRvbiBTZWxlY3RcclxuICAgIGNvbnN0IHNlbGVjdEZpbHRlclNlbGVjdDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdDFcIik7IC8vIEZpcnN0IFNlbGVjdCAoYnkgZGVmYXVsdCBEYXRlKVxyXG4gICAgY29uc3Qgc2VsZWN0RmlsdGVyU2VsZWN0MiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0MlwiKTsgLy8gMm5kIFNlbGVjdCAoYnkgZGVmYXVsdCBUaXRyZSlcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlRmlsdGVyQWN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IGV2ZW50LnRhcmdldC5pbm5lckhUTUw7IC8vIEdldCBpbm5lckhUTUwgb2Ygc2VsZWN0ZWQgaXRlbVxyXG5cclxuXHJcbiAgICAgICAgc3dpdGNoIChzZWxlY3RlZEl0ZW0pIHtcclxuICAgICAgICAgICAgY2FzZSAnRGF0ZSc6XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJCdXR0b24uaW5uZXJIVE1MID0gXCJEYXRlXCI7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJTZWxlY3QxLmlubmVySFRNTCA9IFwiUG9wdWxhcml0w6lcIjtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEZpbHRlclNlbGVjdDIuaW5uZXJIVE1MID0gXCJUaXRyZVwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZWRpYV9zZWN0aW9uJykuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIC8vIEJ1aWxkIE1lZGlhcyBEYXRhXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5TWVkaWEoZGF0YS5zb3J0KHNvcnRCeURhdGUpLCBcIi5tZWRpYV9zZWN0aW9uXCIsIGlkVVJMKTtcclxuICAgICAgICAgICAgICAgIC8vIEVuZCBidWlsZCBNZWRpYXMgRGF0YVxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdUaXRyZSc6XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJCdXR0b24uaW5uZXJIVE1MID0gXCJUaXRyZVwiO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0RmlsdGVyU2VsZWN0MS5pbm5lckhUTUwgPSBcIkRhdGVcIjtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEZpbHRlclNlbGVjdDIuaW5uZXJIVE1MID0gXCJQb3B1bGFyaXTDqVwiO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVkaWFfc2VjdGlvbicpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAvLyBCdWlsZCBNZWRpYXMgRGF0YVxyXG4gICAgICAgICAgICAgICAgZGlzcGxheU1lZGlhKGRhdGEuc29ydChzb3J0QnlUaXRsZSksIFwiLm1lZGlhX3NlY3Rpb25cIiwgaWRVUkwpO1xyXG4gICAgICAgICAgICAgICAgLy8gRW5kIGJ1aWxkIE1lZGlhcyBEYXRhXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ1BvcHVsYXJpdMOpJzpcclxuICAgICAgICAgICAgICAgIHNlbGVjdEZpbHRlckJ1dHRvbi5pbm5lckhUTUwgPSBcIlBvcHVsYXJpdMOpXCI7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJTZWxlY3QxLmlubmVySFRNTCA9IFwiRGF0ZVwiO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0RmlsdGVyU2VsZWN0Mi5pbm5lckhUTUwgPSBcIlRpdHJlXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lZGlhX3NlY3Rpb24nKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgLy8gQnVpbGQgTWVkaWFzIERhdGFcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlNZWRpYShkYXRhLnNvcnQoc29ydEJ5TGlrZXMpLCBcIi5tZWRpYV9zZWN0aW9uXCIsIGlkVVJMKTtcclxuICAgICAgICAgICAgICAgIC8vIEVuZCBidWlsZCBNZWRpYXMgRGF0YVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic2VsZWN0ZWRJdGVtIG5vdCBmb3VuZCBlcnJvciBhYm91dCBoYW5kbGVGaWx0ZXJBY3Rpb24oKVwiKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICBzZWxlY3RGaWx0ZXJTZWxlY3QxLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVGaWx0ZXJBY3Rpb24pXHJcbiAgICBzZWxlY3RGaWx0ZXJTZWxlY3QyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVGaWx0ZXJBY3Rpb24pXHJcbn1cclxuLyoqIEVORCBHRU5FUkFURSBFVkVOVCBGT1IgU0VMRUNUIEZJTFRFUiBDT01QT05FVE5TIEFORCBCRUhBVklPUiAqL1xyXG4iLCIvKiogRnVuY3Rpb24gdG8gc29ydCBieSBMaWtlcyxEYXRlcyBvciBUaXRsZSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc29ydEJ5TGlrZXMoYSwgYikge1xyXG4gICAgaWYgKGEubGlrZXMgPiBiLmxpa2VzKSB7XHJcbiAgICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICBpZiAoYS5saWtlcyA8IGIubGlrZXMpIHtcclxuICAgICAgICByZXR1cm4gMVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzb3J0QnlEYXRlKGEsIGIpIHtcclxuICAgIGlmIChhLmRhdGUgPiBiLmRhdGUpIHtcclxuICAgICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIGlmIChhLmRhdGUgPCBiLmRhdGUpIHtcclxuICAgICAgICByZXR1cm4gMVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzb3J0QnlUaXRsZShhLCBiKSB7XHJcbiAgICBpZiAoYS50aXRsZSA8IGIudGl0bGUpIHtcclxuICAgICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIGlmIChhLnRpdGxlID4gYi50aXRsZSkge1xyXG4gICAgICAgIHJldHVybiAxXHJcbiAgICB9XHJcbiAgICByZXR1cm4gMDtcclxufVxyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBjaGFyc2V0IFxcXCJVVEYtOFxcXCI7XFxuLyoqIFVzZWQgdG8gbG9hZCBhbGwgdmFyaWFibGVzIGZvciB0aGlzIHByb2plY3QgYWJvdXQgU0NTUyAqKi8gLyoqIEZPTlQgKiovXFxuLyoqIEVORCBGT05UICoqL1xcbi8qKiBDT0xPUiBWQVJJQUJMRVMgKiovXFxuLyoqIEVORCBDT0xPUiBWQVJJQUJMRVMgKiovXFxuLyoqIElNUE9SVCBHTE9CQUwgQ1NTIEZPUiBGT05UUyBIVE1MLCogU0VMRUNUT1IgKiovXFxuLyoqKioqKioqKioqKioqKioqKioqKiogR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1xcbmh0bWwsXFxuKiB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgYW5pbWF0aW9uOiAxcyBlYXNlLWluIGZvcndhcmRzIGZhZGUtaW47XFxufVxcbkBrZXlmcmFtZXMgZmFkZS1pbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG59XFxuXFxuLyoqKioqKioqKioqKioqKioqKioqKiogRU5EIEdFTkVSQUwgKioqKioqKioqKioqKioqKioqKioqKi9cXG4vKiogSU1QT1JUIE1JWElOICoqL1xcbi8qKiBJTVBPUlQgSEVBREVSIFNUWUxFUyAqKi9cXG5oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiAxMjBweDtcXG59XFxuaGVhZGVyIGgxIHtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbiAgdG9wOiA0NHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAxMDBweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXNpemU6IDM2cHg7XFxuICBsaW5lLWhlaWdodDogNDdweDtcXG59XFxuaGVhZGVyIC5sb2dvLFxcbmhlYWRlciAubG9nb19waG90b2dyYXBoZXIge1xcbiAgaGVpZ2h0OiA1MHB4O1xcbn1cXG5oZWFkZXIgLmxvZ28ge1xcbiAgbWFyZ2luLWxlZnQ6IDExNXB4O1xcbn1cXG5oZWFkZXIgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXG4gIG1hcmdpbi1sZWZ0OiAxMDBweDtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcblxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSUyBDQVJEUyAqKi9cXG4ucGhvdG9ncmFwaGVyX2NhcmQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGltZyB7XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxuICBoZWlnaHQ6IDIwMHB4O1xcbiAgd2lkdGg6IDIwMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgb2JqZWN0LWZpdDogY292ZXI7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBpbWc6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGgyLFxcbi5waG90b2dyYXBoZXJfY2FyZCBoMyxcXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDQsXFxuLnBob3RvZ3JhcGhlcl9jYXJkIGg1IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDIge1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIGNvbG9yOiAjRDM1NzNDO1xcbiAgZm9udC1zaXplOiAzNnB4O1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDMge1xcbiAgZm9udC1zaXplOiAxMy4wMDEwODM0MjM2cHg7XFxuICBsaW5lLWhlaWdodDogMTdweDtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDQge1xcbiAgbWFyZ2luLXRvcDogMnB4O1xcbiAgZm9udC1zaXplOiAxMHB4O1xcbiAgbGluZS1oZWlnaHQ6IDEzcHg7XFxuICBjb2xvcjogIzAwMDAwMDtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGg1IHtcXG4gIG1hcmdpbi10b3A6IDJweDtcXG4gIGZvbnQtc2l6ZTogOXB4O1xcbiAgbGluZS1oZWlnaHQ6IDEycHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogIzc1NzU3NTtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGgzIHtcXG4gICAgZm9udC1zaXplOiAxNi45MDE0MDg0NTA3cHg7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICB9XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDQge1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICB9XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDUge1xcbiAgICBmb250LXNpemU6IDExLjdweDtcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDMge1xcbiAgICBmb250LXNpemU6IDE5LjUwMTYyNTEzNTRweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoNCB7XFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoNSB7XFxuICAgIGZvbnQtc2l6ZTogMTMuNXB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGltZyB7XFxuICAgIHdpZHRoOiAyMzBweDtcXG4gICAgaGVpZ2h0OiAyMzBweDtcXG4gIH1cXG59XFxuLyoqIElNUE9SVCBNT0RBTCBDT01QT05FTlQgKiovXFxuLm1vZGFsIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDI1JTtcXG4gIHJpZ2h0OiAyNSU7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjREI4ODc2O1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBwYWRkaW5nOiAzNXB4O1xcbiAgbWFyZ2luOiBhdXRvO1xcbn1cXG4ubW9kYWwgLm1vZGFsX2hlYWRlciB7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbi10b3A6IC0yMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxufVxcbi5tb2RhbCAubW9kYWxfaGVhZGVyIGltZyB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5tb2RhbCAubW9kYWxfaGVhZGVyIGgyIHtcXG4gIGZvbnQtc2l6ZTogNjMuNzJweDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxufVxcbi5tb2RhbCBmb3JtIGlucHV0IHtcXG4gIGZvbnQtc2l6ZTogMzBweDtcXG4gIG1hcmdpbi1ib3R0b206IDVweDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxufVxcbi5tb2RhbCBmb3JtIHRleHRhcmVhIHtcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgcmVzaXplOiB2ZXJ0aWNhbDtcXG59XFxuLm1vZGFsIGZvcm0gaW5wdXQsXFxuLm1vZGFsIGZvcm0gdGV4dGFyZWEge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDY4cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcbi5tb2RhbCBmb3JtIGxhYmVsIHtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbiAgZm9udC1zaXplOiAzNnB4O1xcbn1cXG4ubW9kYWwgZm9ybSBsYWJlbDpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxufVxcblxcbi5oaWRlX2NvbnRlbnQge1xcbiAgYW5pbWF0aW9uOiAwLjVzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1vZmY7XFxufVxcbkBrZXlmcmFtZXMgZmFkZS1vZmYge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDAuNDtcXG4gIH1cXG59XFxuXFxuLnNob3dfY29udGVudCB7XFxuICBhbmltYXRpb246IDAuNXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLWluO1xcbn1cXG5Aa2V5ZnJhbWVzIGZhZGUtaW4ge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjQ7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG59XFxuXFxuLyoqIElNUE9SVCBDT05UQUNUIEJVVFRPTiBDT01QT05FTlQgKiovXFxuLmZpc2hleWVfYnV0dG9uIHtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogMTFweDtcXG4gIG1pbi13aWR0aDogMTcwcHg7XFxuICBtaW4taGVpZ2h0OiA3MHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzkwMUMxQztcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuNXMgZWFzZS1pbiwgYmFja2dyb3VuZC1jb2xvciAwLjVzIGVhc2UtaW47XFxufVxcbi5maXNoZXllX2J1dHRvbjpob3ZlciB7XFxuICBjb2xvcjogIzAwMDAwMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNEQjg4NzY7XFxufVxcblxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSCBIRUFERVIgQ09NUE9ORU5UICoqL1xcbi5waG90b2dyYXBoX2hlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGZsZXgtd3JhcDogbm8td3JhcDtcXG4gIGFsaWduLWNvbnRlbnQ6IGZsZWQtZW5kO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZBRkFGQTtcXG4gIGhlaWdodDogMzEzcHg7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgcGFkZGluZy1sZWZ0OiAzMHB4O1xcbiAgcGFkZGluZy1yaWdodDogMzBweDtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIGRpdjpudGgtY2hpbGQoMykge1xcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDEsXFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgyLFxcbi5waG90b2dyYXBoX2hlYWRlciBoMyB7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgxIHtcXG4gIGZvbnQtc2l6ZTogNjMuNzJweDtcXG4gIG1hcmdpbi1ib3R0b206IC0xNXB4O1xcbiAgY29sb3I6ICNEMzU3M0M7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciBoMiB7XFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIGZvbnQtc2l6ZTogMjMuMjI1ODA2NDUxNnB4O1xcbiAgY29sb3I6ICM5MDFDMUM7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciBoMyB7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBjb2xvcjogIzUyNTI1MjtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIC5waG90b2dyYXBoX2Fib3V0LFxcbi5waG90b2dyYXBoX2hlYWRlciAucGhvdG9ncmFwaF9idXR0b24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXG4gIG1hcmdpbi10b3A6IDMwcHg7XFxuICBtYXJnaW4tcmlnaHQ6IDgwcHg7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciAucGhvdG9ncmFwaF9hYm91dCB7XFxuICBtYXJnaW4tbGVmdDogMjBweDtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5waG90b2dyYXBoX2hlYWRlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgIGFsaWduLWNvbnRlbnQ6IGZsZWQtZW5kO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHBhZGRpbmctdG9wOiAxNXB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIGgxIHtcXG4gICAgZm9udC1zaXplOiA0MS40cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgaDIge1xcbiAgICBmb250LXNpemU6IDIwcHg7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgaDMge1xcbiAgICBmb250LXNpemU6IDE2LjM2MzYzNjM2MzZweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2J1dHRvbiB7XFxuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24tY29udGVudDogZmxlZC1lbmQ7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciAucGhvdG9ncmFwaF9idXR0b24ge1xcbiAgICBhbGlnbi1pdGVtczogaW5oZXJpdDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwcHg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbWFyZ2luLXRvcDogMjAwcHg7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgPiAucGhvdG9ncmFwaF9hYm91dCB7XFxuICAgIG1hcmdpbi1sZWZ0OiAwO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIGgxLFxcbmgyLFxcbmgzIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyID4gLnBob3RvZ3JhcGhlcl9jYXJkIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG59XFxuLyoqIElNUE9SVCBTRUxFQ1QgRklMVEVSIENPTVBPTkVOVCAqKi9cXG4uc2VsZWN0X2J1dHRvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24tY29udGVudDogZmxleC1lbmQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIHBhZGRpbmctbGVmdDogMjBweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgYmFja2dyb3VuZDogIzkwMUMxQztcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDVweDtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItY29sb3I6IG5vbmU7XFxuICB3aWR0aDogMTcwcHg7XFxuICBoZWlnaHQ6IDcwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5zZWxlY3RfYnV0dG9uOjphZnRlciB7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4yNXMgZWFzZS1pbjtcXG4gIGNvbnRlbnQ6IFxcXCI+XFxcIjtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG4gIGZvbnQtc2l6ZTogMjVweDtcXG4gIHRleHQtYWxpZ246IHJpZ2h0O1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcbn1cXG5cXG4uc2VsZWN0X2ZpbHRlciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcblxcbi5zZWxlY3RfY29udGVudCB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYmFja2dyb3VuZDogIzkwMUMxQztcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDVweDtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA1cHg7XFxuICBtaW4td2lkdGg6IDE2MHB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDJweCA4cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4gIHotaW5kZXg6IDE7XFxufVxcbi5zZWxlY3RfY29udGVudCAud2hpdGVsaW5lIHtcXG4gIHdpZHRoOiA5MCU7XFxuICBoZWlnaHQ6IDFweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgbWFyZ2luLWxlZnQ6IDUlO1xcbn1cXG4uc2VsZWN0X2NvbnRlbnQgYSB7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgd2lkdGg6IDE3MHB4O1xcbiAgaGVpZ2h0OiA2MHB4O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5zZWxlY3RfY29udGVudCBhOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW47XFxuICBjb2xvcjogIzAwMDAwMDtcXG59XFxuXFxuLnNlbGVjdF9maWx0ZXI6aG92ZXIgLnNlbGVjdF9jb250ZW50IHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4uc2VsZWN0X2ZpbHRlcjpob3ZlciAuc2VsZWN0X2J1dHRvbjo6YWZ0ZXIge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjI1cyBlYXNlLWluO1xcbn1cXG5cXG4vKiogSU1QT1JUIFBIT1RPR1JBUEhFUiBTVEFUSVNUSUMgQ09NUE9ORU5UICoqL1xcbi5waG90b2dyYXBoZXJfc3RhdGlzdGljIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgYWxpZ24tY29udGVudDogZmxleC1zdGFydDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0RCODg3NjtcXG4gIG1pbi13aWR0aDogMzc2cHg7XFxuICBtaW4taGVpZ2h0OiA4OXB4O1xcbiAgYm90dG9tOiAwO1xcbiAgcmlnaHQ6IDM4cHg7XFxuICB6LWluZGV4OiAyO1xcbiAgbWFyZ2luLWJvdHRvbTogLTIycHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcbi5waG90b2dyYXBoZXJfc3RhdGlzdGljIC50b3RhbF9saWtlcyxcXG4ucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyAucHJpY2VfcmF0ZV9kYWlseSB7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMjMuMjI1ODA2NDUxNnB4O1xcbiAgbGluZS1oZWlnaHQ6IDMxcHg7XFxuICBjb2xvcjogIzAwMDAwMDtcXG4gIHBhZGRpbmctdG9wOiAxOHB4O1xcbn1cXG4ucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyAudG90YWxfbGlrZXM6YWZ0ZXIge1xcbiAgcGFkZGluZy1sZWZ0OiA1cHg7XFxuICBjb250ZW50OiBcXFwi4pmlXFxcIjtcXG4gIGZvbnQtc2l6ZTogMzAuODkwMzIyNTgwNnB4O1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNzAwcHgpIHtcXG4gIC5waG90b2dyYXBoZXJfc3RhdGlzdGljIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG59XFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVIgTUVESUEgQ0FSRFMgQ09NUE9ORU5UICoqL1xcbi5tZWRpYV9jYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgbWF4LXdpZHRoOiAzNTBweDtcXG59XFxuLm1lZGlhX2NhcmQgaW1nLFxcbi5tZWRpYV9jYXJkIHZpZGVvIHtcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1heC1oZWlnaHQ6IDMwMHB4O1xcbiAgbWluLWhlaWdodDogMzAwcHg7XFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuLm1lZGlhX2NhcmQgaW1nOmhvdmVyLFxcbi5tZWRpYV9jYXJkIHZpZGVvOmhvdmVyIHtcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbn1cXG4ubWVkaWFfY2FyZCAuZGV0YWlscyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG4gIG1hcmdpbi10b3A6IDVweDtcXG59XFxuLm1lZGlhX2NhcmQgaDYge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBjb2xvcjogIzkwMUMxQztcXG59XFxuLm1lZGlhX2NhcmQgaDY6bGFzdC1jaGlsZDo6YWZ0ZXIge1xcbiAgZm9udC1zaXplOiAzMHB4O1xcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xcbiAgY29udGVudDogXFxcIuKZpVxcXCI7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgLm1lZGlhX2NhcmQgaW1nLFxcbi5tZWRpYV9jYXJkIHtcXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgfVxcbn1cXG4vKiogSU1QT1JUIFBBR0VTIChvdGhlcikgU3R5bGVzICoqL1xcbi5waG90b2dyYXBoZXJfc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXG4gIGdhcDogNzBweDtcXG4gIG1hcmdpbi10b3A6IDc1cHg7XFxuICBtYXJnaW4tYm90dG9tOiA3NXB4O1xcbn1cXG5cXG4ubWFyZ2luX2xlZnRfcmlnaHQge1xcbiAgbWFyZ2luOiAwIDEwMHB4O1xcbn1cXG5cXG4uZmlsdGVyX3NlY3Rpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuLmZpbHRlcl9zZWN0aW9uIGg1OmZpcnN0LWNoaWxkIHtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICBtYXJnaW4tcmlnaHQ6IDI4cHg7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbn1cXG4uZmlsdGVyX3NlY3Rpb24gLnNlbGVjdF9maWx0ZXIge1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG59XFxuXFxuLm1lZGlhX3NlY3Rpb24ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxuICByb3ctZ2FwOiAzMHB4O1xcbiAgY29sdW1uLWdhcDogOTVweDtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICBtYXJnaW4tYm90dG9tOiA3NXB4O1xcbn1cXG5cXG4vKiogSU1QT1JUIEZPT1RFUiBTVFlMRVMgKiovXFxuZm9vdGVyIHtcXG4gIGhlaWdodDogMnB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIG1hcmdpbi10b3A6IDc1cHg7XFxufVxcblxcbi8qKiBJTVBPUlQgUkVTUE9OU0lWRSBTVFlMRVMgZm9yIE5vbiBDb21wb25lbnRzIEVsZW1lbnRzXFxuIChjb21wb25lbnRzIEVsZW1lbnRzIGdvdCB0aGVpciBvd24gUmVzcG9uc2l2ZSBSdWxlcyBpbiB0aGVpciBTdHlsZXNoZWV0KSAqKi9cXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX3NlY3Rpb24sXFxuLm1lZGlhX3NlY3Rpb24ge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcbiAgaGVhZGVyIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgbWFyZ2luLXRvcDogNDBweDtcXG4gICAgaGVpZ2h0OiAxMDBweDtcXG4gIH1cXG4gIGhlYWRlciAubG9nb19waG90b2dyYXBoZXIge1xcbiAgICBtYXJnaW4tbGVmdDogMDtcXG4gIH1cXG4gIGhlYWRlciAubG9nbyxcXG5oZWFkZXIgaDEge1xcbiAgICBtYXJnaW4tbGVmdDogMjBweDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcbiAgICBmb250LXNpemU6IDMwcHg7XFxuICB9XFxuICAubWFyZ2luX2xlZnRfcmlnaHQge1xcbiAgICBtYXJnaW46IDAgMjBweDtcXG4gIH1cXG4gIC5maWx0ZXJfc2VjdGlvbiB7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX3NlY3Rpb24ge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAubWVkaWFfc2VjdGlvbiB7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcbiAgfVxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9tYWluLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL192YXJpYWJsZXMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX2dsb2JhbC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9wYWdlcy9faGVhZGVyLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19taXhpbi5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19waG90b2dyYXBoZXJfY2FyZHMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fbW9kYWwuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fZmlzaGV5ZV9idXR0b24uc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fcGhvdG9ncmFwaF9oZWFkZXIuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fc2VsZWN0X2ZpbHRlci5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19waG90b2dyYXBoZXJfc3RhdGlzdGljLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX21lZGlhX2NhcmRzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL3BhZ2VzL19wYWdlcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9wYWdlcy9fZm9vdGVyLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19yZXNwb25zaXZlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsZ0JBQWdCO0FBQWhCLDZEQUFBLEVBQUEsV0FBQTtBQ01BLGVBQUE7QUFFQSxzQkFBQTtBQVNBLDBCQUFBO0FEZkEsa0RBQUE7QUVGQSxzREFBQTtBQUNBOztFQUVFLFNBQUE7RUFDQSxVQUFBO0VBQ0Esc0JBQUE7QUZPRjs7QUVIQTtFQUNFLGtDRFRZO0VDVVosc0NBQUE7QUZNRjtBRUpFO0VBQ0U7SUFDRSxVQUFBO0VGTUo7RUVIRTtJQUNFLFVBQUE7RUZLSjtBQUNGOztBRUFBLDBEQUFBO0FGckJBLG1CQUFBO0FBRUEsMkJBQUE7QUdOQTtFQ0tFLGFBQUE7RUFDQSxtQkRMc0I7RUNnQnBCLDhCRGhCcUM7RUNvQnJDLG1CRHBCb0Q7RUFDcEQsYUFBQTtBSGtDSjtB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RUFDQSx1QlpNWTtFWUxaLGdCQUFBO0FieWlCSjs7QUFuaEJBOzRFQUFBO0FjMUJBO0VBRUk7O0lBRUksOEJBQUE7RWRpakJOO0FBQ0Y7QWM1aUJBO0VBRUk7SUFDSSxzQkFBQTtJQUNBLGdCQUFBO0lBQ0EsYUFBQTtFZDZpQk47RWMzaUJNO0lBQ0ksY0FBQTtFZDZpQlY7RWMxaUJNOztJQUVJLGlCQUFBO0lBQ0Esa0JBQUE7SUFDQSxlQUFBO0VkNGlCVjtFY3hpQkU7SUFDSSxjQUFBO0VkMGlCTjtFY3RpQkU7SUFDSSw4QkFBQTtFZHdpQk47QUFDRjtBY3BpQkE7RUFFSTtJQUNJLDBCQUFBO0VkcWlCTjtBQUNGO0FjamlCQTtFQUVJO0lBQ0ksMEJBQUE7RWRraUJOO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqIFVzZWQgdG8gbG9hZCBhbGwgdmFyaWFibGVzIGZvciB0aGlzIHByb2plY3QgYWJvdXQgU0NTUyAqKi9cXHJcXG5AaW1wb3J0IFxcXCJfdmFyaWFibGVzLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgR0xPQkFMIENTUyBGT1IgRk9OVFMgSFRNTCwqIFNFTEVDVE9SICoqL1xcclxcbkBpbXBvcnQgXFxcIl9nbG9iYWwuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBNSVhJTiAqKi9cXHJcXG5AaW1wb3J0IFxcXCJfbWl4aW4uc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBIRUFERVIgU1RZTEVTICoqL1xcclxcbkBpbXBvcnQgXFxcInBhZ2VzL2hlYWRlci5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFBIT1RPR1JBUEhFUlMgQ0FSRFMgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9waG90b2dyYXBoZXJfY2FyZHMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBNT0RBTCBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9tb2RhbC5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIENPTlRBQ1QgQlVUVE9OIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL2Zpc2hleWVfYnV0dG9uLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSCBIRUFERVIgQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvcGhvdG9ncmFwaF9oZWFkZXIuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBTRUxFQ1QgRklMVEVSIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL3NlbGVjdF9maWx0ZXIuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVIgU1RBVElTVElDIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL3Bob3RvZ3JhcGhlcl9zdGF0aXN0aWMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVIgTUVESUEgQ0FSRFMgQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvbWVkaWFfY2FyZHMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQQUdFUyAob3RoZXIpIFN0eWxlcyAqKi9cXHJcXG5AaW1wb3J0IFxcXCJwYWdlcy9wYWdlcy5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIEZPT1RFUiBTVFlMRVMgKiovXFxyXFxuQGltcG9ydCBcXFwicGFnZXMvZm9vdGVyLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUkVTUE9OU0lWRSBTVFlMRVMgZm9yIE5vbiBDb21wb25lbnRzIEVsZW1lbnRzXFxyXFxuIChjb21wb25lbnRzIEVsZW1lbnRzIGdvdCB0aGVpciBvd24gUmVzcG9uc2l2ZSBSdWxlcyBpbiB0aGVpciBTdHlsZXNoZWV0KSAqKi9cXHJcXG5AaW1wb3J0IFxcXCJfcmVzcG9uc2l2ZS5zY3NzXFxcIjtcIixcIi8qKiBGT05UICoqL1xcclxcbiRmb250X2dsb2JhbDogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcclxcbiRmb250X3dlaWdodF9zbWFsbDogNDAwO1xcclxcbiRmb250X3dlaWdodF9iaWc6IDcwMDtcXHJcXG5cXHJcXG4kZm9udF9zaXplOiAzNnB4O1xcclxcbi8qKiBFTkQgRk9OVCAqKi9cXHJcXG5cXHJcXG4vKiogQ09MT1IgVkFSSUFCTEVTICoqL1xcclxcbiRkZWZhdWx0X2NvbG9yOiB3aGl0ZTtcXHJcXG4kZGVmYXVsdF9mb250X2NvbG9yOiAjMDAwMDAwO1xcclxcbiRjb2xvcl9ncmF5OiAjNzU3NTc1O1xcclxcbiRjb2xvcl9wcmltYXJ5MTogIzkwMUMxQztcXHJcXG4kY29sb3JfcHJpbWFyeTI6ICNEMzU3M0M7XFxyXFxuJGNvbG9yX3NlY29uZGFyeTI6ICM1MjUyNTI7XFxyXFxuJGNvbG9yX3NlY29uZGFyeTJfYmc6ICNGQUZBRkE7XFxyXFxuJGNvbG9yX2JhY2tncm91bmQ6ICNEQjg4NzY7XFxyXFxuLyoqIEVORCBDT0xPUiBWQVJJQUJMRVMgKiovXCIsXCIvKioqKioqKioqKioqKioqKioqKioqKiBHRU5FUkFMICoqKioqKioqKioqKioqKioqKioqKiovXFxyXFxuaHRtbCxcXHJcXG4qIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICBhbmltYXRpb246IDFzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1pbjtcXHJcXG5cXHJcXG4gIEBrZXlmcmFtZXMgZmFkZS1pbiB7XFxyXFxuICAgIDAlIHtcXHJcXG4gICAgICBvcGFjaXR5OiAwO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIDEwMCUge1xcclxcbiAgICAgIG9wYWNpdHk6IDEuMDtcXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4vKioqKioqKioqKioqKioqKioqKioqKiBFTkQgR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1wiLFwiaGVhZGVyIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhyb3csIG51bGwsIG51bGwsIHNwYWNlLWJldHdlZW4sIGNlbnRlcik7XFxyXFxuICAgIGhlaWdodDogMTIwcHg7XFxyXFxuXFxyXFxuXFxyXFxuICAgIGgxIHtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgICAgICB0b3A6IDQ0cHg7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwMHB4O1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9zbWFsbDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnRfc2l6ZTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiA0N3B4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5sb2dvLFxcclxcbiAgICAubG9nb19waG90b2dyYXBoZXIge1xcclxcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5sb2dvIHtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxMTVweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAubG9nb19waG90b2dyYXBoZXIge1xcclxcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDEwMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgfVxcclxcbn1cIixcIkBtaXhpbiBmbGV4LWJhc2ljKCRmbGV4LWRpcmVjdGlvbixcXHJcXG4gICRmbGV4LXdyYXAsXFxyXFxuICAkYWxpZ24tY29udGVudCxcXHJcXG4gICRqdXN0aWZ5LWNvbnRlbnQsXFxyXFxuICAkYWxpZ24taXRlbXMpIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogJGZsZXgtZGlyZWN0aW9uO1xcclxcblxcclxcbiAgQGlmICgkZmxleC13cmFwKSB7XFxyXFxuICAgIGZsZXgtd3JhcDogJGZsZXgtd3JhcDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIEBpZiAoJGFsaWduLWNvbnRlbnQpIHtcXHJcXG4gICAgYWxpZ24tY29udGVudDogJGFsaWduLWNvbnRlbnQ7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBAaWYgKCRqdXN0aWZ5LWNvbnRlbnQpIHtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiAkanVzdGlmeS1jb250ZW50O1xcclxcbiAgfVxcclxcblxcclxcbiAgQGlmICgkYWxpZ24taXRlbXMpIHtcXHJcXG4gICAgYWxpZ24taXRlbXM6ICRhbGlnbi1pdGVtcztcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLy8gQG1peGluIG1hc2stY3Jvc3Nicm93c2VyKCR2YWx1ZSkge1xcclxcbi8vICAgLXdlYmtpdC1tYXNrOiAkdmFsdWU7XFxyXFxuLy8gICBtYXNrOiAkdmFsdWU7XFxyXFxuLy8gfVxcclxcblxcclxcbi8vIEBtaXhpbiBtYXJnaW4tbGVmdC1hbmQtcmlnaHQoJHZhbHVlKSB7XFxyXFxuLy8gICBtYXJnaW4tbGVmdDogJHZhbHVlO1xcclxcbi8vICAgbWFyZ2luLXJpZ2h0OiAkdmFsdWU7XFxyXFxuLy8gfVxcclxcblxcclxcbkBtaXhpbiBwYWRkaW5nLWxlZnQtYW5kLXJpZ2h0KCR2YWx1ZSkge1xcclxcbiAgcGFkZGluZy1sZWZ0OiAkdmFsdWU7XFxyXFxuICBwYWRkaW5nLXJpZ2h0OiAkdmFsdWU7XFxyXFxufVwiLFwiLnBob3RvZ3JhcGhlcl9jYXJkIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIG51bGwsIG51bGwsIGNlbnRlciwgY2VudGVyKTtcXHJcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIGltZyB7XFxyXFxuICAgICAgICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxyXFxuICAgICAgICBoZWlnaHQ6IDIwMHB4O1xcclxcbiAgICAgICAgd2lkdGg6IDIwMHB4O1xcclxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICAgICAgb2JqZWN0LWZpdDogY292ZXI7XFxyXFxuXFxyXFxuICAgICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgICAgICAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC41MCk7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG4gICAgaDIsXFxyXFxuICAgIGgzLFxcclxcbiAgICBoNCxcXHJcXG4gICAgaDUge1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfc21hbGw7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDIge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTI7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDMge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAyLjc2OSk7XFxyXFxuICAgICAgICBsaW5lLWhlaWdodDogMTdweDtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDQge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMnB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAzLjYpO1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEzcHg7XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoNSB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAycHg7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDQpO1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEycHg7XFxyXFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX2dyYXk7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaGVyX2NhcmQge1xcclxcbiAgICAgICAgaDMge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMi43NjkgKiAxLjMpO1xcclxcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBoNCB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAzLjYgKiAxLjMpO1xcclxcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBoNSB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyA0ICogMS4zKTtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaGVyX2NhcmQge1xcclxcbiAgICAgICAgaDMge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMi43NjkgKiAxLjUpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaDQge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMy42ICogMS41KTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGg1IHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDQgKiAxLjUpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaW1nIHtcXHJcXG4gICAgICAgICAgICB3aWR0aDogMjMwcHg7XFxyXFxuICAgICAgICAgICAgaGVpZ2h0OiAyMzBweDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbn1cIixcIi5tb2RhbCB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGxlZnQ6IDI1JTtcXHJcXG4gICAgcmlnaHQ6IDI1JTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3JfYmFja2dyb3VuZDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICAgIHBhZGRpbmc6IDM1cHg7XFxyXFxuICAgIG1hcmdpbjogYXV0bztcXHJcXG5cXHJcXG5cXHJcXG4gICAgLm1vZGFsX2hlYWRlciB7XFxyXFxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IC0yMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgICAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxyXFxuXFxyXFxuICAgICAgICBpbWcge1xcclxcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGgyIHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAqIDEuNzcpO1xcclxcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgZm9ybSBpbnB1dCB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuMik7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxyXFxuICAgICAgICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGZvcm0gdGV4dGFyZWEge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMTVweDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8xLjUpO1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcXHJcXG4gICAgICAgIHJlc2l6ZTogdmVydGljYWw7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgZm9ybSBpbnB1dCxcXHJcXG4gICAgZm9ybSB0ZXh0YXJlYSB7XFxyXFxuXFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgIGhlaWdodDogNjhweDtcXHJcXG4gICAgICAgIGJvcmRlcjogbm9uZTtcXHJcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbiAgICBmb3JtIGxhYmVsIHtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9mb250X2NvbG9yO1xcclxcbiAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGZvcm0gbGFiZWw6bGFzdC1jaGlsZCB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxufVxcclxcblxcclxcblxcclxcbi5oaWRlX2NvbnRlbnQge1xcclxcbiAgICBhbmltYXRpb246IDAuNXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLW9mZjtcXHJcXG5cXHJcXG4gICAgQGtleWZyYW1lcyBmYWRlLW9mZiB7XFxyXFxuICAgICAgICAwJSB7XFxyXFxuICAgICAgICAgICAgb3BhY2l0eTogMS4wO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgMTAwJSB7XFxyXFxuICAgICAgICAgICAgb3BhY2l0eTogMC40O1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcblxcclxcblxcclxcbi5zaG93X2NvbnRlbnQge1xcclxcbiAgICBhbmltYXRpb246IDAuNXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLWluO1xcclxcblxcclxcbiAgICBAa2V5ZnJhbWVzIGZhZGUtaW4ge1xcclxcbiAgICAgICAgMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIDEwMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDEuMDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbn1cIixcIi5maXNoZXllX2J1dHRvbiB7XFxyXFxuICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS44KTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgIGNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgcGFkZGluZzogMTFweDtcXHJcXG4gICAgbWluLXdpZHRoOiAxNzBweDtcXHJcXG4gICAgbWluLWhlaWdodDogNzBweDtcXHJcXG4gICAgYm9yZGVyOiBub25lO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjVzIGVhc2UtaW4sIGJhY2tncm91bmQtY29sb3IgMC41cyBlYXNlLWluO1xcclxcblxcclxcbiAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9mb250X2NvbG9yO1xcclxcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX2JhY2tncm91bmQ7XFxyXFxuICAgIH1cXHJcXG59XCIsXCIucGhvdG9ncmFwaF9oZWFkZXIge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKHJvdywgbm8td3JhcCwgZmxlZC1lbmQsIHNwYWNlLWJldHdlZW4sIG51bGwpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Jfc2Vjb25kYXJ5Ml9iZztcXHJcXG4gICAgaGVpZ2h0OiAzMTNweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgQGluY2x1ZGUgcGFkZGluZy1sZWZ0LWFuZC1yaWdodCgzMHB4KTtcXHJcXG5cXHJcXG4gICAgZGl2Om50aC1jaGlsZCgzKSB7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG4gICAgaDEsXFxyXFxuICAgIGgyLFxcclxcbiAgICBoMyB7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9zbWFsbDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoMSB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAqIDEuNzcpO1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogLTE1cHg7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgyIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDE1cHg7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjU1KTtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDMge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250LXNpemUgLyAyKTtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3Jfc2Vjb25kYXJ5MjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9hYm91dCxcXHJcXG4gICAgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCBudWxsLCBudWxsLCBjZW50ZXIsIGZsZXgtc3RhcnQpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2J1dHRvbiB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAzMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA4MHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2Fib3V0IHtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciB7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCB3cmFwLCBmbGVkLWVuZCwgc3BhY2UtYmV0d2VlbiwgY2VudGVyKTtcXHJcXG4gICAgICAgIHBhZGRpbmctdG9wOiAxNXB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciBoMSB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAqIDEuMTUpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciBoMiB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuOCk7XFxyXFxuXFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIGgzIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udC1zaXplIC8gMi4yKTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9idXR0b24ge1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcXHJcXG5cXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIHtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCBudWxsLCBmbGVkLWVuZCwgc3BhY2UtYmV0d2VlbiwgY2VudGVyKTtcXHJcXG5cXHJcXG4gICAgICAgIC5waG90b2dyYXBoX2J1dHRvbiB7XFxyXFxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGluaGVyaXQ7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAwcHg7XFxyXFxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDIwMHB4O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlcj4ucGhvdG9ncmFwaF9hYm91dCB7XFxyXFxuICAgICAgICBtYXJnaW4tbGVmdDogMDtcXHJcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIGgxLFxcclxcbiAgICBoMixcXHJcXG4gICAgaDMge1xcclxcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlcj4ucGhvdG9ncmFwaGVyX2NhcmQge1xcclxcbiAgICAgICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbn1cIixcIi5zZWxlY3RfYnV0dG9uIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgYWxpZ24tY29udGVudDogZmxleC1lbmQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG5cXHJcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xcclxcbiAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDIpO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIGNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNXB4O1xcclxcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNXB4O1xcclxcbiAgICBib3JkZXI6IG5vbmU7XFxyXFxuICAgIGJvcmRlci1jb2xvcjogbm9uZTtcXHJcXG4gICAgd2lkdGg6IDE3MHB4O1xcclxcbiAgICBoZWlnaHQ6IDcwcHg7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdF9idXR0b246OmFmdGVyIHtcXHJcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW47XFxyXFxuICAgIGNvbnRlbnQ6IFxcXCI+XFxcIjtcXHJcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcclxcbiAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNDQpO1xcclxcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXHJcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi5zZWxlY3RfZmlsdGVyIHtcXHJcXG5cXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxufVxcclxcblxcclxcblxcclxcbi5zZWxlY3RfY29udGVudCB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYmFja2dyb3VuZDogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA1cHg7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA1cHg7XFxyXFxuICAgIG1pbi13aWR0aDogMTYwcHg7XFxyXFxuICAgIGJveC1zaGFkb3c6IDBweCAycHggOHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxyXFxuICAgIHotaW5kZXg6IDE7XFxyXFxuXFxyXFxuXFxyXFxuICAgIC53aGl0ZWxpbmUge1xcclxcbiAgICAgICAgd2lkdGg6IDkwJTtcXHJcXG4gICAgICAgIGhlaWdodDogMXB4O1xcclxcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGRlZmF1bHRfY29sb3I7XFxyXFxuICAgICAgICBtYXJnaW4tbGVmdDogNSU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgYSB7XFxyXFxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluO1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAyKTtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgICAgIHBhZGRpbmc6IDIwcHg7XFxyXFxuICAgICAgICB3aWR0aDogMTcwcHg7XFxyXFxuICAgICAgICBoZWlnaHQ6IDYwcHg7XFxyXFxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBhOmhvdmVyIHtcXHJcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW47XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4uc2VsZWN0X2ZpbHRlcjpob3ZlciAuc2VsZWN0X2NvbnRlbnQge1xcclxcblxcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdF9maWx0ZXI6aG92ZXIgLnNlbGVjdF9idXR0b246OmFmdGVyIHtcXHJcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcXHJcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW47XFxyXFxufVwiLFwiLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKHJvdywgbnVsbCwgZmxleC1zdGFydCwgc3BhY2UtYXJvdW5kLCBiYXNlbGluZSk7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX2JhY2tncm91bmQ7XFxyXFxuICAgIG1pbi13aWR0aDogMzc2cHg7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDg5cHg7XFxyXFxuICAgIGJvdHRvbTogMDtcXHJcXG4gICAgcmlnaHQ6IDM4cHg7XFxyXFxuICAgIHotaW5kZXg6IDI7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IC0yMnB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuICAgIC50b3RhbF9saWtlcyxcXHJcXG4gICAgLnByaWNlX3JhdGVfZGFpbHkge1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjU1KTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAzMXB4O1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgICAgICBwYWRkaW5nLXRvcDogMThweDtcXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAudG90YWxfbGlrZXM6YWZ0ZXIge1xcclxcbiAgICAgICAgcGFkZGluZy1sZWZ0OiA1cHg7XFxyXFxuICAgICAgICBjb250ZW50OiBcXFwi4pmlXFxcIjtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS41NSAqIDEuMzMpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVwiLFwiLm1lZGlhX2NhcmQge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKGNvbHVtbiwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCk7XFxyXFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gICAgbWF4LXdpZHRoOiAzNTBweDtcXHJcXG5cXHJcXG4gICAgaW1nLFxcclxcbiAgICB2aWRlbyB7XFxyXFxuICAgICAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcclxcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgICBtYXgtaGVpZ2h0OiAzMDBweDtcXHJcXG4gICAgICAgIG1pbi1oZWlnaHQ6IDMwMHB4O1xcclxcbiAgICAgICAgb2JqZWN0LWZpdDogY292ZXI7XFxyXFxuICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuXFxyXFxuICAgICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcclxcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAgICAgICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjUwKTtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcblxcclxcblxcclxcbiAgICAuZGV0YWlscyB7XFxyXFxuICAgICAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKHJvdywgbnVsbCwgbnVsbCwgc3BhY2UtYmV0d2VlbiwgYmFzZWxpbmUpO1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogNXB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGg2IHtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X3NtYWxsO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjUpO1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoNjpsYXN0LWNoaWxkOjphZnRlciB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNSAqIDEuMjUpO1xcclxcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xcclxcbiAgICAgICAgY29udGVudDogXFxcIuKZpVxcXCI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5tZWRpYV9jYXJkIGltZyxcXHJcXG4gICAgLm1lZGlhX2NhcmQge1xcclxcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xcclxcbiAgICB9XFxyXFxufVwiLFwiLy8vLyBNQUlOIFBBR0UgLy8vIFxcclxcbi5waG90b2dyYXBoZXJfc2VjdGlvbiB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxyXFxuICAgIGdhcDogNzBweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogNzVweDtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogNzVweDtcXHJcXG59XFxyXFxuXFxyXFxuLy8vLy8gRU5EIE1BSU4gUEFHRSAvLyBcXHJcXG5cXHJcXG4vLy8vLy8vLy8vLy8vLy8vIFBIT1RPR1JBUEhFUiBQQUdFIC8vLy8vLy8gXFxyXFxuLm1hcmdpbl9sZWZ0X3JpZ2h0IHtcXHJcXG4gICAgbWFyZ2luOiAwIDEwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZmlsdGVyX3NlY3Rpb24ge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKHJvdywgbnVsbCwgbnVsbCwgbnVsbCwgYmFzZWxpbmUpO1xcclxcbiAgICBtYXJnaW4tbGVmdDogMDtcXHJcXG5cXHJcXG4gICAgaDU6Zmlyc3QtY2hpbGQge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG4gICAgICAgIG1hcmdpbi1yaWdodDogMjhweDtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X2JpZztcXHJcXG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udC1zaXplIC8gMik7XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuc2VsZWN0X2ZpbHRlciB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbi5tZWRpYV9zZWN0aW9uIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXHJcXG4gICAgcm93LWdhcDogMzBweDtcXHJcXG4gICAgY29sdW1uLWdhcDogOTVweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogNzVweDtcXHJcXG59XFxyXFxuXFxyXFxuLy8vLy8vLy8vLy8vLy8gRU5EIFBIT1RPR1JBUEhFUiBQQUdFIC8vLy8vLy8vXFxyXFxuXFxyXFxuXCIsXCJmb290ZXIge1xcclxcbiAgICBoZWlnaHQ6IDJweDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICBtYXJnaW4tdG9wOiA3NXB4O1xcclxcbn1cIixcIkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhlcl9zZWN0aW9uLFxcclxcbiAgICAubWVkaWFfc2VjdGlvbiB7XFxyXFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDgwMHB4KSB7XFxyXFxuXFxyXFxuICAgIGhlYWRlciB7XFxyXFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogNDBweDtcXHJcXG4gICAgICAgIGhlaWdodDogMTAwcHg7XFxyXFxuXFxyXFxuICAgICAgICAubG9nb19waG90b2dyYXBoZXIge1xcclxcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgLmxvZ28sXFxyXFxuICAgICAgICBoMSB7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS4yMCk7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLm1hcmdpbl9sZWZ0X3JpZ2h0IHtcXHJcXG4gICAgICAgIG1hcmdpbjogMCAyMHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuICAgIC5maWx0ZXJfc2VjdGlvbiB7XFxyXFxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoZXJfc2VjdGlvbiB7XFxyXFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXHJcXG4gICAgfVxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXHJcXG5cXHJcXG4gICAgLm1lZGlhX3NlY3Rpb24ge1xcclxcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1sxXS51c2VbM10hLi9tYWluLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzFdLnVzZVszXSEuL21haW4uc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4uLy4uL3Njc3MvbWFpbi5zY3NzJztcclxuaW1wb3J0IHsgZ2V0UGhvdG9ncmFwaGVycywgZ2V0TWVkaWFzIH0gZnJvbSAnLi4vdXRpbHMvZmV0Y2gnO1xyXG5pbXBvcnQgeyBkaXNwbGF5RGF0YSB9IGZyb20gJy4uL2RhdGEvZGlzcGxheURhdGEnO1xyXG5pbXBvcnQgeyBkaXNwbGF5TWVkaWEgfSBmcm9tICcuLi9kYXRhL2Rpc3BsYXlNZWRpYSc7XHJcbmltcG9ydCB7IGdldFVybFBhcmFtZXRlciB9IGZyb20gJy4uL3V0aWxzL2dldFVybFBhcmFtZXRlcic7XHJcbmltcG9ydCB7IHNvcnRCeUxpa2VzIH0gZnJvbSAnLi4vdXRpbHMvc29ydEJ5JztcclxuaW1wb3J0IHsgc2VsZWN0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vdXRpbHMvc2VsZWN0RmlsdGVyJztcclxuaW1wb3J0IHsgbW9kYWxNYXN0ZXIgfSBmcm9tICcuLi91dGlscy9tb2RhbEZvcm0nO1xyXG5cclxuXHJcblxyXG5cclxuYXN5bmMgZnVuY3Rpb24gaW5pdFByb2ZpbGUoaWRVUkwpIHtcclxuICAgIC8vIFRyeSB0byBnZXQgZGF0YSBmcm9tIHBob3RvZ3JhcGhlcnMgaWYgZXJyb3IgdGhlbiByZWRpcmVjdCB0byA0MDQgcGFnZVxyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyBTRVQgUGhvdG9ncmFwaGVyIFByb2ZpbGUgREFUQVxyXG4gICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlcnMgPSBhd2FpdCBnZXRQaG90b2dyYXBoZXJzKCk7XHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBwaG90b2dyYXBoZXIgRGlzcGxheVxyXG4gICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlclNlbGVjdGVkID0gYXdhaXQgZGlzcGxheURhdGEocGhvdG9ncmFwaGVycywgaWRVUkwpO1xyXG4gICAgICAgIC8vIEVORCBTRVQgUGhvdG9ncmFwaGVyIFByb2ZpbGUgRGF0YVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlY3Rpb24gcHJvZmlsZSBpbml0acOpIGF2ZWMgc3VjY8OocyBkZXB1aXMgaW5pdFByb2ZpbGUoKVwiKTtcclxuICAgICAgICBpbml0Q29udGFjdEZvcm0ocGhvdG9ncmFwaGVyU2VsZWN0ZWQpO1xyXG5cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgIC8vIElmIGl0J3MgYSBmYWlsIHRoZW4gd2UgcmVkaXJlY3QgdG8gNDA0IEVycm9yIFBhZ2Ugc2luY2UgIGl0J3MgdGhlIG1pbmltYWwgZnVuY3Rpb25hbGl0eVxyXG4gICAgICAgIC8vIEF0bSA0MDQgZXJyb3IgcGFnZSBkb2Vzbid0IGV4aXN0cyBtdXN0IGJlIHdyaXRlIGxhdGVyXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWRpcmlnZXIgdmVycyBsYSBwYWdlIDQwNFwiKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGluaXRDb250YWN0Rm9ybShwaG90b2dyYXBoZXJTZWxlY3RlZCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBjb250YWN0Rm9ybU1vZGFsID0gbW9kYWxNYXN0ZXIoXCJib2R5XCIsIFwiaGVhZGVyXCIsIFwibWFpblwiLCBcImNvbnRhY3RfbW9kYWxcIik7IC8vIENyZWF0ZSBhIE1vZGVsIE1hc3RlclxyXG4gICAgICAgIGNvbnN0IG1vZGFsUGFnZSA9IGNvbnRhY3RGb3JtTW9kYWwubW9kYWxQYWdlOyAvLyBHZXQgbW9kZWxQYWdlIE9iamVjdFxyXG5cclxuICAgICAgICBjb250YWN0Rm9ybU1vZGFsLmFkZENvbnRhY3RGb3JtTGlzdGVuZXIobW9kYWxQYWdlKTsgLy8gQWRkIGxpc3RlbmVyIGZvciBDb250YWN0IEZvcm0gTW9kYWxcclxuICAgICAgIFxyXG5cclxuICAgICAgICBjb25zdCB0aXRsZU1vZGFsID0gXCJDb250YWN0ZXotbW9pIFwiICsgcGhvdG9ncmFwaGVyU2VsZWN0ZWQubmFtZTsgLy8gQnVpbGQgdGhlIHRpdGxlIE1vZGFsXHJcbiAgICAgICAgY29udGFjdEZvcm1Nb2RhbC5zZXRUaXRsZU1vZGFsKG1vZGFsUGFnZSwgXCJoMlwiLCB0aXRsZU1vZGFsKTsgIC8vIFNldCB0aGUgdGl0bGUgTW9kYWxcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGb3JtdWxhaXJlIGNvbnRhY3QgaW5pdGnDqSBhdmVjIHN1Y2PDqHMgZGVwdWlzIGluaXRDb250YWN0Rm9ybSgpXCIpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgIC8vIElmIGl0J3MgYSBmYWlsIHRoZW4gd2UgcmVkaXJlY3QgdG8gNDA0IEVycm9yIFBhZ2Ugc2luY2UgIGl0J3MgdGhlIG1pbmltYWwgZnVuY3Rpb25hbGl0eVxyXG4gICAgICAgIC8vIEF0bSA0MDQgZXJyb3IgcGFnZSBkb2Vzbid0IGV4aXN0cyBtdXN0IGJlIHdyaXRlIGxhdGVyXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWRpcmlnZXIgdmVycyBsYSBwYWdlIDQwNFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGluaXRNZWRpYShpZFVSTCkge1xyXG4gICAgLy8gVHJ5IHRvIGdldCBkYXRhIGZyb20gbWVkaWEgaWYgZXJyb3IgdGhlbiByZWRpcmVjdCB0byA0MDQgcGFnZVxyXG4gICAgdHJ5IHtcclxuXHJcbiAgICAgICAgLy8gQnVpbGQgTWVkaWFzIERhdGFcclxuICAgICAgICBjb25zdCBtZWRpYXMgPSBhd2FpdCBnZXRNZWRpYXMoKTtcclxuICAgICAgICBkaXNwbGF5TWVkaWEobWVkaWFzLnNvcnQoc29ydEJ5TGlrZXMpLCBcIi5tZWRpYV9zZWN0aW9uXCIsIGlkVVJMKTsgLy8gU29ydCBieSBkZWZhdWx0IGJ5IGxpa2VzXHJcbiAgICAgICAgLy8gRW5kIGJ1aWxkIE1lZGlhcyBEYXRhXHJcblxyXG4gICAgICAgIC8vIEluaXQgc2VsZWN0RmlsdGVyIENvbXBvbmVudCBhbmQgaGlzIGJlaGF2aW9yLCBuZWVkIHRvIHByb3ZpZGUgdGhlIERhdGEgdG8gZmlsdGVyXHJcbiAgICAgICAgc2VsZWN0RmlsdGVyQ29tcG9uZW50KG1lZGlhcywgaWRVUkwpO1xyXG5cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWN0aW9uIG3DqWRpYSBpbml0acOpIGF2ZWMgc3VjY8OocyBkZXB1aXMgaW5pdE1haW4oKVwiKTtcclxuXHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBpbml0TWFpbigpIHtcclxuICAgIC8vIFdlIFdhaXQgZm9yIGdldFVybFBhcmFtZXRlcigpIHRvIGJlIGNvbXBsZXRlIHRoZW4gd2UgcnVuIHRhc2tzIGZvciBnZW5lcmF0ZSBwYWdlXHJcbiAgICBjb25zdCBpZFVSTCA9IGF3YWl0IGdldFVybFBhcmFtZXRlcihcImlkXCIpO1xyXG4gICAgaW5pdFByb2ZpbGUoaWRVUkwpO1xyXG4gICAgaW5pdE1lZGlhKGlkVVJMKTtcclxufVxyXG5cclxuXHJcbmluaXRNYWluKCk7IFxyXG4iXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImNzc1dpdGhNYXBwaW5nVG9TdHJpbmciLCJsaXN0IiwidG9TdHJpbmciLCJtYXAiLCJpdGVtIiwiY29udGVudCIsIm5lZWRMYXllciIsImNvbmNhdCIsImxlbmd0aCIsImpvaW4iLCJpIiwibW9kdWxlcyIsIm1lZGlhIiwiZGVkdXBlIiwic3VwcG9ydHMiLCJsYXllciIsInVuZGVmaW5lZCIsImFscmVhZHlJbXBvcnRlZE1vZHVsZXMiLCJrIiwiaWQiLCJfayIsInB1c2giLCJjc3NNYXBwaW5nIiwiYnRvYSIsImJhc2U2NCIsInVuZXNjYXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiSlNPTiIsInN0cmluZ2lmeSIsImRhdGEiLCJzb3VyY2VNYXBwaW5nIiwic291cmNlVVJMcyIsInNvdXJjZXMiLCJzb3VyY2UiLCJzb3VyY2VSb290IiwicGhvdG9ncmFwaGVyRmFjdG9yeSIsImRpc3BsYXlEYXRhIiwicGhvdG9ncmFwaGVycyIsInBob3RvZ3JhcGhlclNlbGVjdGVkIiwiZm9yRWFjaCIsInBob3RvZ3JhcGhlciIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImNvbnNvbGUiLCJsb2ciLCJwaG90b2dyYXBoZXJNb2RlbCIsInNldFBob3RvZ3JhcGhlckhlYWRlciIsInNldFN0aWNreUJhclByaWNlIiwiZGlzcGxheURhdGFBbGwiLCJxdWVyeVNlbGVjdG9yIiwicGhvdG9ncmFwaGVyc1NlY3Rpb24iLCJkb2N1bWVudCIsInVzZXJDYXJkRE9NIiwiZ2V0VXNlckNhcmRET00iLCJhcHBlbmRDaGlsZCIsIm1lZGlhRmFjdG9yeSIsInNldElubmVySHRtbCIsImRpc3BsYXlNZWRpYSIsIm1lZGlhcyIsInBob3RvZ3JhcGhlcklkIiwidG90YWxMaWtlcyIsIm1lZGlhc1NlY3Rpb24iLCJtZWRpYU1vZGVsIiwibWVkaWFET00iLCJnZXRNZWRpYURPTSIsImxpa2VzIiwid2FybiIsImRvbSIsInRpdGxlIiwiaW1hZ2UiLCJ2aWRlbyIsIm1vdmllIiwicGljdHVyZSIsImhhc1Bob3RvZ3JhcGhlciIsImhhc0NvbnRlbnQiLCJhcnRpY2xlIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImxpbmtFbGVtZW50IiwiYnVpbGRFbGVtZW50Iiwic2V0QXJpYWxMYWJlbCIsImluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50IiwiaW5zZXJ0VmlkZW9JbnNpZGVFbGVtZW50IiwidGl0bGVfaDYiLCJsaWtlc19oNiIsImluc2VydEhUTUxBZnRlckVsZW1lbnQiLCJuYW1lIiwiY2l0eSIsImNvdW50cnkiLCJ0YWdsaW5lIiwicG9ydHJhaXQiLCJwcmljZSIsImltZ1Byb2ZpbGUiLCJlbGVtZW50IiwiYWx0IiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiYXJpYUxhYmVsIiwiaHRtbCIsImJhbGlzZSIsInZhbHVlIiwidGV4dENvbnRlbnQiLCJhcmlhbGFiZWwiLCJ0ZXh0ZSIsInRleHRlRWxlbWVudCIsImlubmVySFRNTCIsImZldGNoSlNPTiIsInVybCIsInR5cGUiLCJyZXNwb25zZSIsImZldGNoIiwib2siLCJFcnJvciIsImpzb25SZXNwb25zZSIsImpzb24iLCJnZXRQaG90b2dyYXBoZXJzIiwiZ2V0TWVkaWFzIiwiZ2V0VXJsUGFyYW1ldGVyIiwicGFyYW1ldGVyIiwiZnVsbFVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsIlVSTCIsInBhcmFtZXRlclZhbHVlIiwic2VhcmNoUGFyYW1zIiwiZ2V0IiwibW9kYWxNYXN0ZXIiLCJib2R5VGFnIiwiaGVhZGVyVGFnIiwibWFpblRhZyIsIm1vZGFsSUQiLCJtb2RhbFBhZ2UiLCJib2R5SFRNTCIsImhlYWRlckhUTUwiLCJtYWluSFRNTCIsIm1vZGFsSFRNTCIsImdldEVsZW1lbnRCeUlkIiwidmlzaWJsZSIsImFkZENvbnRhY3RGb3JtTGlzdGVuZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZGlzcGxheU1vZGFsIiwiY2xvc2VNb2RhbCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzZW5kTWVzc2FnZSIsInNldFRpdGxlTW9kYWwiLCJ0YWdIVE1MIiwidGl0bGVNb2RhbCIsImNlbnRlck1vZGFsIiwiTXdpZHRoIiwib2Zmc2V0V2lkdGgiLCJNaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0IiwiV3dpZHRoIiwiaW5uZXJXaWR0aCIsIldoZWlnaHQiLCJpbm5lckhlaWdodCIsInN0eWxlIiwicG9zaXRpb24iLCJ0b3AiLCJwYWdlWU9mZnNldCIsImxlZnQiLCJwYWdlWE9mZnNldCIsImVmZmVjdEFuaW1hdGlvbiIsImhpZGVjbGFzcyIsInNob3djbGFzcyIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsIm92ZXJmbG93IiwiZGlzcGxheSIsImFsbElucHV0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhbGxUZXh0QXJlYSIsImZ1bGxtZXNzYWdlIiwiaW5wdXQiLCJ0ZXh0YXJlYSIsImFsZXJ0IiwiZXJyb3IiLCJzb3J0QnlMaWtlcyIsInNvcnRCeURhdGUiLCJzb3J0QnlUaXRsZSIsInNlbGVjdEZpbHRlckNvbXBvbmVudCIsImlkVVJMIiwic2VsZWN0RmlsdGVyQnV0dG9uIiwic2VsZWN0RmlsdGVyU2VsZWN0MSIsInNlbGVjdEZpbHRlclNlbGVjdDIiLCJoYW5kbGVGaWx0ZXJBY3Rpb24iLCJzZWxlY3RlZEl0ZW0iLCJ0YXJnZXQiLCJzb3J0IiwiYSIsImIiLCJkYXRlIiwiaW5pdFByb2ZpbGUiLCJpbml0Q29udGFjdEZvcm0iLCJlIiwiY29udGFjdEZvcm1Nb2RhbCIsImluaXRNZWRpYSIsImluaXRNYWluIl0sInNvdXJjZVJvb3QiOiIifQ==
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
    likes,
    date,
    price
  } = data;
  const movie = "assets/video/".concat(video);
  const picture = "assets/images/".concat(image);

  function getMediaDOM() {
    // Create DOM only if we got ids and a Picture or a Video
    if (id && photographerId && (image || video)) {
      // CREATE A ARTICLE
      const article = document.createElement("article");
      article.setAttribute("class", "media_card"); // Build A HREF ELEMENT

      const linkElement = article.appendChild(_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement("a", "photographer.html?id=" + id));
      _utils_dom__WEBPACK_IMPORTED_MODULE_0__.setArielLabel(linkElement, "Lilac breasted roller, closeup view"); // Set ArielLabel to AHref
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
      (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.setArielLabel)(linkElement, "Link to " + name); // Set ArielLabel to AHref

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

/***/ "./src/scripts/pages/displayData.js":
/*!******************************************!*\
  !*** ./src/scripts/pages/displayData.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayData": () => (/* binding */ displayData)
/* harmony export */ });
/* harmony import */ var _factories_photographerFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/photographerFactory */ "./src/scripts/factories/photographerFactory.js");

async function displayData(photographers, querySelector, id) {
  photographers.forEach(photographer => {
    if (id) {
      if (photographer.id == id) {
        // Then we are going use the PhotographerFactory to set DOM
        if (true) {
          console.log(photographer);
        }

        const photographerModel = (0,_factories_photographerFactory__WEBPACK_IMPORTED_MODULE_0__.photographerFactory)(photographer);
        photographerModel.setPhotographerHeader();
        photographerModel.setStickyBarPrice(); // End of PhotographerFactory Work
      }
    } else {
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

    }
  });
}

/***/ }),

/***/ "./src/scripts/pages/displayMedia.js":
/*!*******************************************!*\
  !*** ./src/scripts/pages/displayMedia.js ***!
  \*******************************************/
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
    if (photographerId) {
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
    }
  });

  if (true) {
    console.log("Total Like: " + totalLikes);
  }
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
/* harmony export */   "setArielLabel": () => (/* binding */ setArielLabel),
/* harmony export */   "setInnerHtml": () => (/* binding */ setInnerHtml)
/* harmony export */ });
// Function for build DOM
function insertPictureInsideElement(element, picture, alt) {
  if (alt) {
    element.insertAdjacentHTML("beforeend", '<img src="' + picture + '" ' + 'alt="' + alt + '">');
  } else {
    element.insertAdjacentHTML("beforeend", '<img src="' + picture + '">');
  }
}
function insertVideoInsideElement(element, video, arielLabel) {
  if (arielLabel) {
    element.insertAdjacentHTML("beforeend", '<video src="' + video + '" ' + 'aria-label="' + arielLabel + '">');
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
function setArielLabel(element, arielLabel) {
  element.setAttribute("ariel-label", arielLabel);
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

  jsonResponse = jsonResponse[type]; // Get data from the Array that we want

  return jsonResponse;
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
function modalMaster(bodyTag, mainTag, modalID) {
  /** CREATE A OBJECT WITH ALL PROPRIETY FOR MODEL DOM NEED */
  let modalPage = {
    bodyHTML: bodyTag,
    mainHTML: mainTag,
    modal: modalID,
    visible: 0
  };
  modalPage = getDomPropriety(modalPage);
  /** END  */

  function addContactFormListener() {
    const modal = modelPage.modal;
    document.getElementById("openModal").addEventListener("click", function () {
      modal.displayModal();
    });
    document.getElementById("closeModal").addEventListener("click", function () {
      modal.closeModal();
    });
  }

  function getDomPropriety(object) {
    object.bodyHTML = document.querySelector(modalPage.bodyHTML); // We target the body HTML tag

    object.mainHTML = document.querySelector(modalPage.mainHTML); // We target our main HTML tag

    object.modal = document.getElementById(modalPage.modal); // We target our modal

    return modalPage; // We return new propriety for our object modalPage 
  }

  function centerModal(modal) {
    let Mwidth = modal.offsetWidth;
    let Mheight = modal.offsetHeight;
    let Wwidth = window.innerWidth;
    let Wheight = window.innerHeight;
    modal.style.position = "absolute";
    modal.style.top = (Wheight - Mheight) / 2 + window.pageYOffset + "px";
    modal.style.left = (Wwidth - Mwidth) / 2 + window.pageXOffset + "px";
  }

  function effectAnimation(hideclass, showclass) {
    if (modalPage.visible === 0) {
      modalPage.mainHTML.classList.remove(showclass);
      modalPage.modal.classList.remove(hideclass);
      modalPage.mainHTML.classList.add(hideclass);
      modalPage.modal.classList.add(showclass);
      modalPage.visible = 1;
    } else {
      modalPage.modal.classList.remove(showclass);
      modalPage.mainHTML.classList.remove(hideclass);
      modalPage.modal.classList.add(hideclass);
      modalPage.mainHTML.classList.add(showclass);
      modalPage.visible = 0;
    }

    return modalPage;
  }

  function displayModal() {
    effectAnimation("hide_content", "show_content");
    modalPage.bodyHTML.style.overflow = "hidden"; // Block Scroll

    modalPage.modal.style.display = "block"; // Display the Modal at the screen

    centerModal(modalPage.modal); // Center the Modal at the screen
  }

  function closeModal() {
    effectAnimation("hide_content", "show_content");
    modalPage.bodyHTML.style.overflow = "visible"; // Allow scroll 

    modalPage.modal.style.display = "none"; // Hide at the screen modal
  }

  function sendMessage() {}

  return {
    modalPage,
    addContactFormListener,
    displayModal,
    closeModal,
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
/* harmony import */ var _pages_displayMedia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/displayMedia */ "./src/scripts/pages/displayMedia.js");
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

        (0,_pages_displayMedia__WEBPACK_IMPORTED_MODULE_0__.displayMedia)(data.sort(_utils_sortBy__WEBPACK_IMPORTED_MODULE_1__.sortByDate), ".media_section", idURL); // End build Medias Data

        break;

      case 'Titre':
        selectFilterButton.innerHTML = "Titre";
        selectFilterSelect1.innerHTML = "Date";
        selectFilterSelect2.innerHTML = "Popularité";
        document.querySelector('.media_section').innerHTML = ""; // Build Medias Data

        (0,_pages_displayMedia__WEBPACK_IMPORTED_MODULE_0__.displayMedia)(data.sort(_utils_sortBy__WEBPACK_IMPORTED_MODULE_1__.sortByTitle), ".media_section", idURL); // End build Medias Data

        break;

      case 'Popularité':
        selectFilterButton.innerHTML = "Popularité";
        selectFilterSelect1.innerHTML = "Date";
        selectFilterSelect2.innerHTML = "Titre";
        document.querySelector('.media_section').innerHTML = ""; // Build Medias Data

        (0,_pages_displayMedia__WEBPACK_IMPORTED_MODULE_0__.displayMedia)(data.sort(_utils_sortBy__WEBPACK_IMPORTED_MODULE_1__.sortByLikes), ".media_section", idURL); // End build Medias Data

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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n/** Used to load all variables for this project about SCSS **/ /** FONT **/\n/** END FONT **/\n/** COLOR VARIABLES **/\n/** END COLOR VARIABLES **/\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\n/********************** GENERAL **********************/\nhtml,\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: \"DM Sans\", sans-serif;\n  animation: 1s ease-in forwards fade-in;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n/********************** END GENERAL **********************/\n/** IMPORT MIXIN **/\n/** IMPORT HEADER STYLES **/\nheader {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  height: 120px;\n}\nheader h1 {\n  color: #901C1C;\n  top: 44px;\n  margin-right: 100px;\n  font-weight: 400;\n  font-size: 36px;\n  line-height: 47px;\n}\nheader .logo,\nheader .logo_photographer {\n  height: 50px;\n}\nheader .logo {\n  margin-left: 115px;\n}\nheader .logo_photographer {\n  margin-left: 100px;\n  margin-top: 10px;\n}\n\n/** IMPORT PHOTOGRAPHERS CARDS **/\n.photographer_card {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  justify-self: center;\n}\n.photographer_card img {\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  transition: box-shadow 1s;\n  height: 200px;\n  width: 200px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.photographer_card img:hover {\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.photographer_card h2,\n.photographer_card h3,\n.photographer_card h4,\n.photographer_card h5 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n}\n.photographer_card h2 {\n  margin-top: 20px;\n  color: #D3573C;\n  font-size: 36px;\n}\n.photographer_card h3 {\n  font-size: 13.0010834236px;\n  line-height: 17px;\n  color: #901C1C;\n}\n.photographer_card h4 {\n  margin-top: 2px;\n  font-size: 10px;\n  line-height: 13px;\n  color: #000000;\n}\n.photographer_card h5 {\n  margin-top: 2px;\n  font-size: 9px;\n  line-height: 12px;\n  text-align: center;\n  color: #757575;\n}\n\n@media (max-width: 1100px) {\n  .photographer_card h3 {\n    font-size: 16.9014084507px;\n    margin-top: 10px;\n  }\n  .photographer_card h4 {\n    font-size: 13px;\n    margin-top: 10px;\n  }\n  .photographer_card h5 {\n    font-size: 11.7px;\n    margin-top: 10px;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_card h3 {\n    font-size: 19.5016251354px;\n  }\n  .photographer_card h4 {\n    font-size: 15px;\n  }\n  .photographer_card h5 {\n    font-size: 13.5px;\n  }\n  .photographer_card img {\n    width: 230px;\n    height: 230px;\n  }\n}\n/** IMPORT MODAL COMPONENT **/\n.modal {\n  display: none;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  position: absolute;\n  left: 25%;\n  right: 25%;\n  border-radius: 5px;\n  background-color: #DB8876;\n  align-items: baseline;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n  padding: 35px;\n  margin: auto;\n}\n.modal .modal_header {\n  justify-content: space-between;\n  width: 100%;\n  margin-top: -20px;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: baseline;\n}\n.modal .modal_header img {\n  cursor: pointer;\n}\n.modal .modal_header h2 {\n  font-size: 63.72px;\n  font-weight: normal;\n}\n.modal form input {\n  font-size: 36px;\n  margin-bottom: 5px;\n}\n.modal form textarea {\n  font-size: 18px;\n  margin-bottom: 20px;\n  resize: vertical;\n}\n.modal form input,\n.modal form textarea {\n  width: 100%;\n  height: 68px;\n  border: none;\n  border-radius: 5px;\n}\n.modal form label {\n  color: #000000;\n  font-size: 36px;\n}\n.modal form label:last-child {\n  margin-top: 15px;\n}\n.modal .label_textarea {\n  margin-top: 15px;\n}\n\n.hide_content {\n  animation: 1s ease-in forwards fade-off;\n}\n@keyframes fade-off {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n\n.show_content {\n  animation: 1s ease-in forwards fade-in;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n/** IMPORT CONTACT BUTTON COMPONENT **/\n.contact_button {\n  font-size: 20px;\n  font-weight: 700;\n  font-family: \"DM Sans\", sans-serif;\n  color: white;\n  padding: 11px;\n  min-width: 170px;\n  min-height: 70px;\n  border: none;\n  background-color: #901C1C;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: color 0.5s ease-in, background-color 0.5s ease-in;\n}\n.contact_button:hover {\n  color: #000000;\n  background-color: #DB8876;\n}\n\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\n.photograph_header {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: no-wrap;\n  align-content: fled-end;\n  justify-content: space-between;\n  background-color: #FAFAFA;\n  height: 313px;\n  margin-top: 10px;\n  padding-left: 30px;\n  padding-right: 30px;\n}\n.photograph_header div:nth-child(3) {\n  margin-right: 20px;\n}\n.photograph_header h1,\n.photograph_header h2,\n.photograph_header h3 {\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 400;\n}\n.photograph_header h1 {\n  font-size: 63.72px;\n  margin-bottom: -15px;\n  color: #D3573C;\n}\n.photograph_header h2 {\n  margin-top: 15px;\n  margin-bottom: 20px;\n  font-size: 23.2258064516px;\n  color: #901C1C;\n}\n.photograph_header h3 {\n  font-size: 18px;\n  color: #525252;\n}\n.photograph_header .photograph_about,\n.photograph_header .photograph_button {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n}\n.photograph_header .photograph_button {\n  margin-top: 30px;\n  margin-right: 80px;\n}\n.photograph_header .photograph_about {\n  margin-left: 20px;\n  margin-bottom: 10px;\n}\n\n@media (max-width: 1100px) {\n  .photograph_header {\n    background-color: white;\n    display: flex;\n    flex-direction: column;\n    flex-wrap: wrap;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n    padding-top: 15px;\n  }\n  .photograph_header h1 {\n    font-size: 41.4px;\n  }\n  .photograph_header h2 {\n    font-size: 20px;\n  }\n  .photograph_header h3 {\n    font-size: 16.3636363636px;\n  }\n  .photograph_button {\n    margin-bottom: 30px;\n  }\n}\n@media (max-width: 800px) {\n  .photograph_header {\n    display: flex;\n    flex-direction: column;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n  }\n  .photograph_header .photograph_button {\n    align-items: inherit;\n    margin-right: 0px;\n    position: absolute;\n    margin-top: 200px;\n  }\n  .photograph_header > .photograph_about {\n    margin-left: 0;\n    align-items: center;\n  }\n  .photograph_header h1,\nh2,\nh3 {\n    text-align: center;\n  }\n  .photograph_header > .photographer_card {\n    display: none;\n  }\n}\n/** IMPORT SELECT FILTER COMPONENT **/\n.select_button {\n  display: flex;\n  align-content: flex-end;\n  align-items: center;\n  justify-content: space-between;\n  text-align: left;\n  padding-left: 20px;\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 18px;\n  background: #901C1C;\n  color: white;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n  border: none;\n  border-color: none;\n  width: 170px;\n  height: 70px;\n  cursor: pointer;\n}\n\n.select_button::after {\n  transition: transform 0.25s ease-in;\n  content: \">\";\n  transform: rotate(90deg);\n  font-size: 25px;\n  text-align: right;\n  float: right;\n  margin-right: 20px;\n}\n\n.select_filter {\n  position: relative;\n  display: inline-block;\n}\n\n.select_content {\n  display: none;\n  position: absolute;\n  background: #901C1C;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  min-width: 160px;\n  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n}\n.select_content .whiteline {\n  width: 90%;\n  height: 1px;\n  background-color: white;\n  margin-left: 5%;\n}\n.select_content a {\n  transition: all 0.5s ease-in;\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-size: 18px;\n  color: white;\n  padding: 20px;\n  width: 170px;\n  height: 60px;\n  text-decoration: none;\n  display: block;\n}\n.select_content a:hover {\n  cursor: pointer;\n  transition: all 0.5s ease-in;\n  color: #000000;\n}\n\n.select_filter:hover .select_content {\n  display: block;\n}\n\n.select_filter:hover .select_button::after {\n  transform: rotate(-90deg);\n  transition: transform 0.25s ease-in;\n}\n\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\n.photographer_statistic {\n  display: flex;\n  flex-direction: row;\n  align-content: flex-start;\n  justify-content: space-around;\n  align-items: baseline;\n  position: fixed;\n  background-color: #DB8876;\n  min-width: 376px;\n  min-height: 89px;\n  bottom: 0;\n  right: 38px;\n  z-index: 2;\n  margin-bottom: -22px;\n  border-radius: 5px;\n}\n.photographer_statistic .total_likes,\n.photographer_statistic .price_rate_daily {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 23.2258064516px;\n  line-height: 31px;\n  color: #000000;\n  padding-top: 18px;\n}\n.photographer_statistic .total_likes:after {\n  padding-left: 5px;\n  content: \"♥\";\n  font-size: 30.8903225806px;\n}\n\n@media (max-width: 700px) {\n  .photographer_statistic {\n    display: none;\n  }\n}\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\n.media_card {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  max-width: 350px;\n}\n.media_card img,\n.media_card video {\n  transition: box-shadow 1s;\n  width: 100%;\n  max-height: 300px;\n  min-height: 300px;\n  object-fit: cover;\n  border-radius: 5px;\n}\n.media_card img:hover,\n.media_card video:hover {\n  transition: box-shadow 1s;\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.media_card .details {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: baseline;\n  margin-top: 5px;\n}\n.media_card h6 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n  font-size: 24px;\n  color: #901C1C;\n}\n.media_card h6:last-child::after {\n  font-size: 30px;\n  padding-left: 10px;\n  content: \"♥\";\n}\n\n@media (max-width: 600px) {\n  .media_card img,\n.media_card {\n    max-width: 100%;\n  }\n}\n/** IMPORT PAGES (other) Styles **/\n.photographer_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 70px;\n  margin-top: 75px;\n  margin-bottom: 75px;\n}\n\n.margin_left_right {\n  margin: 0 100px;\n}\n\n.filter_section {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline;\n  margin-left: 0;\n}\n.filter_section h5:first-child {\n  margin-top: 20px;\n  margin-right: 28px;\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-style: normal;\n  font-size: 18px;\n  color: #000000;\n}\n.filter_section .select_filter {\n  margin-top: 10px;\n}\n\n.media_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  row-gap: 30px;\n  column-gap: 95px;\n  margin-top: 20px;\n  margin-bottom: 75px;\n}\n\n/** IMPORT FOOTER STYLES **/\nfooter {\n  height: 2px;\n  width: 100%;\n  background-color: white;\n  margin-top: 75px;\n}\n\n/** IMPORT RESPONSIVE STYLES for Non Components Elements\n (components Elements got their own Responsive Rules in their Stylesheet) **/\n@media (max-width: 1100px) {\n  .photographer_section,\n.media_section {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media (max-width: 800px) {\n  header {\n    flex-direction: column;\n    margin-top: 40px;\n    height: 100px;\n  }\n  header .logo_photographer {\n    margin-left: 0;\n  }\n  header .logo,\nheader h1 {\n    margin-left: 20px;\n    margin-right: 20px;\n    font-size: 30px;\n  }\n  .margin_left_right {\n    margin: 0 20px;\n  }\n  .filter_section {\n    justify-content: space-between;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_section {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 600px) {\n  .media_section {\n    grid-template-columns: 1fr;\n  }\n}", "",{"version":3,"sources":["webpack://./src/scss/main.scss","webpack://./src/scss/_variables.scss","webpack://./src/scss/_global.scss","webpack://./src/scss/pages/_header.scss","webpack://./src/scss/_mixin.scss","webpack://./src/scss/components/_photographer_cards.scss","webpack://./src/scss/components/_modal.scss","webpack://./src/scss/components/_contact_button.scss","webpack://./src/scss/components/_photograph_header.scss","webpack://./src/scss/components/_select_filter.scss","webpack://./src/scss/components/_photographer_statistic.scss","webpack://./src/scss/components/_media_cards.scss","webpack://./src/scss/pages/_pages.scss","webpack://./src/scss/pages/_footer.scss","webpack://./src/scss/_responsive.scss"],"names":[],"mappings":"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","sourcesContent":["/** Used to load all variables for this project about SCSS **/\r\n@import \"_variables.scss\";\r\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\r\n@import \"_global.scss\";\r\n/** IMPORT MIXIN **/\r\n@import \"_mixin.scss\";\r\n/** IMPORT HEADER STYLES **/\r\n@import \"pages/header.scss\";\r\n/** IMPORT PHOTOGRAPHERS CARDS **/\r\n@import \"components/photographer_cards.scss\";\r\n/** IMPORT MODAL COMPONENT **/\r\n@import \"components/modal.scss\";\r\n/** IMPORT CONTACT BUTTON COMPONENT **/\r\n@import \"components/contact_button.scss\";\r\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\r\n@import \"components/photograph_header.scss\";\r\n/** IMPORT SELECT FILTER COMPONENT **/\r\n@import \"components/select_filter.scss\";\r\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\r\n@import \"components/photographer_statistic.scss\";\r\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\r\n@import \"components/media_cards.scss\";\r\n/** IMPORT PAGES (other) Styles **/\r\n@import \"pages/pages.scss\";\r\n/** IMPORT FOOTER STYLES **/\r\n@import \"pages/footer.scss\";\r\n/** IMPORT RESPONSIVE STYLES for Non Components Elements\r\n (components Elements got their own Responsive Rules in their Stylesheet) **/\r\n@import \"_responsive.scss\";","/** FONT **/\r\n$font_global: \"DM Sans\", sans-serif;\r\n$font_weight_small: 400;\r\n$font_weight_big: 700;\r\n\r\n$font_size: 36px;\r\n/** END FONT **/\r\n\r\n/** COLOR VARIABLES **/\r\n$default_color: white;\r\n$default_font_color: #000000;\r\n$color_gray: #757575;\r\n$color_primary1: #901C1C;\r\n$color_primary2: #D3573C;\r\n$color_secondary2: #525252;\r\n$color_secondary2_bg: #FAFAFA;\r\n$color_background: #DB8876;\r\n/** END COLOR VARIABLES **/","/********************** GENERAL **********************/\r\nhtml,\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n\r\n}\r\n\r\nbody {\r\n  font-family: $font_global;\r\n  animation: 1s ease-in forwards fade-in;\r\n\r\n  @keyframes fade-in {\r\n    0% {\r\n      opacity: 0;\r\n    }\r\n\r\n    100% {\r\n      opacity: 1.0;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n/********************** END GENERAL **********************/","header {\r\n    @include flex-basic(row, null, null, space-between, center);\r\n    height: 120px;\r\n\r\n\r\n    h1 {\r\n        color: $color_primary1;\r\n        top: 44px;\r\n        margin-right: 100px;\r\n        font-weight: $font_weight_small;\r\n        font-size: $font_size;\r\n        line-height: 47px;\r\n    }\r\n\r\n    .logo,\r\n    .logo_photographer {\r\n        height: 50px;\r\n    }\r\n\r\n    .logo {\r\n        margin-left: 115px;\r\n    }\r\n\r\n    .logo_photographer {\r\n        margin-left: 100px;\r\n        margin-top: 10px;\r\n    }\r\n}","@mixin flex-basic($flex-direction,\r\n  $flex-wrap,\r\n  $align-content,\r\n  $justify-content,\r\n  $align-items) {\r\n  display: flex;\r\n  flex-direction: $flex-direction;\r\n\r\n  @if ($flex-wrap) {\r\n    flex-wrap: $flex-wrap;\r\n  }\r\n\r\n  @if ($align-content) {\r\n    align-content: $align-content;\r\n  }\r\n\r\n  @if ($justify-content) {\r\n    justify-content: $justify-content;\r\n  }\r\n\r\n  @if ($align-items) {\r\n    align-items: $align-items;\r\n  }\r\n}\r\n\r\n// @mixin mask-crossbrowser($value) {\r\n//   -webkit-mask: $value;\r\n//   mask: $value;\r\n// }\r\n\r\n// @mixin margin-left-and-right($value) {\r\n//   margin-left: $value;\r\n//   margin-right: $value;\r\n// }\r\n\r\n@mixin padding-left-and-right($value) {\r\n  padding-left: $value;\r\n  padding-right: $value;\r\n}",".photographer_card {\r\n    @include flex-basic(column, null, null, center, center);\r\n    justify-self: center;\r\n\r\n    img {\r\n        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n        transition: box-shadow 1s;\r\n        height: 200px;\r\n        width: 200px;\r\n        border-radius: 50%;\r\n        object-fit: cover;\r\n\r\n        &:hover {\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n\r\n    h2,\r\n    h3,\r\n    h4,\r\n    h5 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 20px;\r\n        color: $color_primary2;\r\n        font-size: $font_size;\r\n    }\r\n\r\n    h3 {\r\n        font-size: calc($font_size / 2.769);\r\n        line-height: 17px;\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h4 {\r\n        margin-top: 2px;\r\n        font-size: calc($font_size / 3.6);\r\n        line-height: 13px;\r\n        color: $default_font_color;\r\n    }\r\n\r\n    h5 {\r\n        margin-top: 2px;\r\n        font-size: calc($font_size / 4);\r\n        line-height: 12px;\r\n        text-align: center;\r\n        color: $color_gray;\r\n    }\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: calc($font_size / 2.769 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h4 {\r\n            font-size: calc($font_size / 3.6 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h5 {\r\n            font-size: calc($font_size / 4 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n    }\r\n\r\n}\r\n\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: calc($font_size / 2.769 * 1.5);\r\n        }\r\n\r\n        h4 {\r\n            font-size: calc($font_size / 3.6 * 1.5);\r\n        }\r\n\r\n        h5 {\r\n            font-size: calc($font_size / 4 * 1.5);\r\n        }\r\n\r\n        img {\r\n            width: 230px;\r\n            height: 230px;\r\n        }\r\n    }\r\n\r\n}",".modal {\r\n    display: none;\r\n    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n    position: absolute;\r\n    left: 25%;\r\n    right: 25%;\r\n    border-radius: 5px;\r\n    background-color: $color_background;\r\n    align-items: baseline;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    padding: 35px;\r\n    margin: auto;\r\n\r\n\r\n    .modal_header {\r\n        justify-content: space-between;\r\n        width: 100%;\r\n        margin-top: -20px;\r\n        margin-bottom: 10px;\r\n        display: flex;\r\n        align-items: baseline;\r\n\r\n        img {\r\n            cursor: pointer;\r\n        }\r\n\r\n        h2 {\r\n            font-size: calc($font_size * 1.77);\r\n            font-weight: normal;\r\n        }\r\n    }\r\n\r\n    form input {\r\n        font-size: calc($font_size);\r\n        margin-bottom: 5px;\r\n    }\r\n\r\n    form textarea {\r\n        font-size: calc($font_size /2);\r\n        margin-bottom: 20px;\r\n        resize: vertical;\r\n    }\r\n\r\n    form input,\r\n    form textarea {\r\n\r\n        width: 100%;\r\n        height: 68px;\r\n        border: none;\r\n        border-radius: 5px;\r\n\r\n    }\r\n\r\n\r\n    form label {\r\n        color: $default_font_color;\r\n        font-size: $font_size;\r\n    }\r\n\r\n    form label:last-child {\r\n        margin-top: 15px;\r\n    }\r\n\r\n    .label_textarea {\r\n        margin-top: 15px;\r\n    }\r\n}\r\n\r\n\r\n.hide_content {\r\n    animation: 1s ease-in forwards fade-off;\r\n\r\n    @keyframes fade-off {\r\n        0% {\r\n            opacity: 1.0;\r\n        }\r\n\r\n        100% {\r\n            opacity: 0;\r\n        }\r\n    }\r\n}\r\n\r\n\r\n\r\n.show_content {\r\n    animation: 1s ease-in forwards fade-in;\r\n\r\n    @keyframes fade-in {\r\n        0% {\r\n            opacity: 0;\r\n        }\r\n\r\n        100% {\r\n            opacity: 1.0;\r\n        }\r\n    }\r\n\r\n}",".contact_button {\r\n    font-size: calc($font_size / 1.8);\r\n    font-weight: $font_weight_big;\r\n    font-family: $font_global;\r\n    color: $default_color;\r\n    padding: 11px;\r\n    min-width: 170px;\r\n    min-height: 70px;\r\n    border: none;\r\n    background-color: $color_primary1;\r\n    border-radius: 5px;\r\n    cursor: pointer;\r\n    transition: color 0.5s ease-in, background-color 0.5s ease-in;\r\n\r\n    &:hover {\r\n        color: $default_font_color;\r\n        background-color: $color_background;\r\n    }\r\n}",".photograph_header {\r\n    @include flex-basic(row, no-wrap, fled-end, space-between, null);\r\n    background-color: $color_secondary2_bg;\r\n    height: 313px;\r\n    margin-top: 10px;\r\n    @include padding-left-and-right(30px);\r\n\r\n    div:nth-child(3) {\r\n        margin-right: 20px;\r\n    }\r\n\r\n\r\n    h1,\r\n    h2,\r\n    h3 {\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h1 {\r\n        font-size: calc($font_size * 1.77);\r\n        margin-bottom: -15px;\r\n        color: $color_primary2;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 15px;\r\n        margin-bottom: 20px;\r\n        font-size: calc($font_size / 1.55);\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h3 {\r\n        font-size: calc($font-size / 2);\r\n        color: $color_secondary2;\r\n    }\r\n\r\n    .photograph_about,\r\n    .photograph_button {\r\n        @include flex-basic(column, null, null, center, flex-start);\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-top: 30px;\r\n        margin-right: 80px;\r\n    }\r\n\r\n    .photograph_about {\r\n        margin-left: 20px;\r\n        margin-bottom: 10px;\r\n    }\r\n}\r\n\r\n\r\n@media (max-width: 1100px) {\r\n    .photograph_header {\r\n        background-color: $default_color;\r\n        @include flex-basic(column, wrap, fled-end, space-between, center);\r\n        padding-top: 15px;\r\n    }\r\n\r\n    .photograph_header h1 {\r\n        font-size: calc($font_size * 1.15);\r\n    }\r\n\r\n    .photograph_header h2 {\r\n        font-size: calc($font_size / 1.8);\r\n\r\n    }\r\n\r\n    .photograph_header h3 {\r\n        font-size: calc($font-size / 2.2);\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-bottom: 30px;\r\n\r\n\r\n    }\r\n\r\n\r\n}\r\n\r\n@media (max-width: 800px) {\r\n    .photograph_header {\r\n        @include flex-basic(column, null, fled-end, space-between, center);\r\n\r\n        .photograph_button {\r\n            align-items: inherit;\r\n            margin-right: 0px;\r\n            position: absolute;\r\n            margin-top: 200px;\r\n        }\r\n\r\n    }\r\n\r\n    .photograph_header>.photograph_about {\r\n        margin-left: 0;\r\n        align-items: center;\r\n    }\r\n\r\n    .photograph_header h1,\r\n    h2,\r\n    h3 {\r\n        text-align: center;\r\n    }\r\n\r\n    .photograph_header>.photographer_card {\r\n        display: none;\r\n    }\r\n\r\n\r\n}",".select_button {\r\n    display: flex;\r\n    align-content: flex-end;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n\r\n    text-align: left;\r\n    padding-left: 20px;\r\n    font-family: $font_global;\r\n    font-style: normal;\r\n    font-weight: $font_weight_big;\r\n    font-size: calc($font_size / 2);\r\n    background: $color_primary1;\r\n    color: $default_color;\r\n    border-top-left-radius: 5px;\r\n    border-top-right-radius: 5px;\r\n    border: none;\r\n    border-color: none;\r\n    width: 170px;\r\n    height: 70px;\r\n    cursor: pointer;\r\n}\r\n\r\n.select_button::after {\r\n    transition: transform 0.25s ease-in;\r\n    content: \">\";\r\n    transform: rotate(90deg);\r\n    font-size: calc($font_size / 1.44);\r\n    text-align: right;\r\n    float: right;\r\n    margin-right: 20px;\r\n\r\n}\r\n\r\n.select_filter {\r\n\r\n    position: relative;\r\n    display: inline-block;\r\n}\r\n\r\n\r\n.select_content {\r\n    display: none;\r\n    position: absolute;\r\n    background: $color_primary1;\r\n    border-bottom-left-radius: 5px;\r\n    border-bottom-right-radius: 5px;\r\n    min-width: 160px;\r\n    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\r\n    z-index: 1;\r\n\r\n\r\n    .whiteline {\r\n        width: 90%;\r\n        height: 1px;\r\n        background-color: $default_color;\r\n        margin-left: 5%;\r\n    }\r\n\r\n    a {\r\n        transition: all 0.5s ease-in;\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-size: calc($font_size / 2);\r\n        color: $default_color;\r\n        padding: 20px;\r\n        width: 170px;\r\n        height: 60px;\r\n        text-decoration: none;\r\n        display: block;\r\n    }\r\n\r\n    a:hover {\r\n        cursor: pointer;\r\n        transition: all 0.5s ease-in;\r\n        color: $default_font_color;\r\n    }\r\n\r\n\r\n\r\n}\r\n\r\n\r\n.select_filter:hover .select_content {\r\n\r\n    display: block;\r\n}\r\n\r\n.select_filter:hover .select_button::after {\r\n    transform: rotate(-90deg);\r\n    transition: transform 0.25s ease-in;\r\n}",".photographer_statistic {\r\n    @include flex-basic(row, null, flex-start, space-around, baseline);\r\n    position: fixed;\r\n    background-color: $color_background;\r\n    min-width: 376px;\r\n    min-height: 89px;\r\n    bottom: 0;\r\n    right: 38px;\r\n    z-index: 2;\r\n    margin-bottom: -22px;\r\n    border-radius: 5px;\r\n\r\n\r\n\r\n    .total_likes,\r\n    .price_rate_daily {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_big;\r\n        font-size: calc($font_size / 1.55);\r\n        line-height: 31px;\r\n        color: $default_font_color;\r\n        padding-top: 18px;\r\n\r\n    }\r\n\r\n    .total_likes:after {\r\n        padding-left: 5px;\r\n        content: \"♥\";\r\n        font-size: calc($font_size / 1.55 * 1.33);\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_statistic {\r\n        display: none;\r\n    }\r\n\r\n}",".media_card {\r\n    @include flex-basic(column, null, null, null, null);\r\n    flex-wrap: wrap;\r\n    max-width: 350px;\r\n\r\n    img,\r\n    video {\r\n        transition: box-shadow 1s;\r\n        width: 100%;\r\n        max-height: 300px;\r\n        min-height: 300px;\r\n        object-fit: cover;\r\n        border-radius: 5px;\r\n\r\n        &:hover {\r\n            transition: box-shadow 1s;\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n\r\n\r\n\r\n    .details {\r\n        @include flex-basic(row, null, null, space-between, baseline);\r\n        margin-top: 5px;\r\n    }\r\n\r\n    h6 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n        font-size: calc($font_size / 1.5);\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h6:last-child::after {\r\n        font-size: calc($font_size / 1.5 * 1.25);\r\n        padding-left: 10px;\r\n        content: \"♥\";\r\n    }\r\n\r\n}\r\n\r\n\r\n\r\n@media (max-width: 600px) {\r\n\r\n    .media_card img,\r\n    .media_card {\r\n        max-width: 100%;\r\n    }\r\n}","//// MAIN PAGE /// \r\n.photographer_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    gap: 70px;\r\n    margin-top: 75px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n///// END MAIN PAGE // \r\n\r\n//////////////// PHOTOGRAPHER PAGE /////// \r\n.margin_left_right {\r\n    margin: 0 100px;\r\n}\r\n\r\n.filter_section {\r\n    @include flex-basic(row, null, null, null, baseline);\r\n    margin-left: 0;\r\n\r\n    h5:first-child {\r\n        margin-top: 20px;\r\n        margin-right: 28px;\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-style: normal;\r\n        font-size: calc($font-size / 2);\r\n        color: $default_font_color;\r\n    }\r\n\r\n    .select_filter {\r\n        margin-top: 10px;\r\n    }\r\n}\r\n\r\n.media_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    row-gap: 30px;\r\n    column-gap: 95px;\r\n    margin-top: 20px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n////////////// END PHOTOGRAPHER PAGE ////////\r\n\r\n","footer {\r\n    height: 2px;\r\n    width: 100%;\r\n    background-color: $default_color;\r\n    margin-top: 75px;\r\n}","@media (max-width: 1100px) {\r\n\r\n    .photographer_section,\r\n    .media_section {\r\n        grid-template-columns: 1fr 1fr;\r\n    }\r\n\r\n}\r\n\r\n\r\n@media (max-width: 800px) {\r\n\r\n    header {\r\n        flex-direction: column;\r\n        margin-top: 40px;\r\n        height: 100px;\r\n\r\n        .logo_photographer {\r\n            margin-left: 0;\r\n        }\r\n\r\n        .logo,\r\n        h1 {\r\n            margin-left: 20px;\r\n            margin-right: 20px;\r\n            font-size: calc($font_size / 1.20);\r\n        }\r\n    }\r\n\r\n    .margin_left_right {\r\n        margin: 0 20px;\r\n    }\r\n\r\n\r\n    .filter_section {\r\n        justify-content: space-between;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 700px) {\r\n\r\n    .photographer_section {\r\n        grid-template-columns: 1fr;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 600px) {\r\n\r\n    .media_section {\r\n        grid-template-columns: 1fr;\r\n    }\r\n\r\n}"],"sourceRoot":""}]);
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
/* harmony import */ var _pages_displayData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/displayData */ "./src/scripts/pages/displayData.js");
/* harmony import */ var _pages_displayMedia__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pages/displayMedia */ "./src/scripts/pages/displayMedia.js");
/* harmony import */ var _utils_getUrlParameter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getUrlParameter */ "./src/scripts/utils/getUrlParameter.js");
/* harmony import */ var _utils_sortBy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/sortBy */ "./src/scripts/utils/sortBy.js");
/* harmony import */ var _utils_selectFilter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/selectFilter */ "./src/scripts/utils/selectFilter.js");
/* harmony import */ var _utils_modalForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/modalForm */ "./src/scripts/utils/modalForm.js");









async function initMain() {
  // Try to get data from photographers & media if error then redirect to 404 page
  try {
    // SET Photographer Profile DATA
    const idURL = await (0,_utils_getUrlParameter__WEBPACK_IMPORTED_MODULE_4__.getUrlParameter)("id");
    const photographers = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_1__.getPhotographers)();
    (0,_pages_displayData__WEBPACK_IMPORTED_MODULE_2__.displayData)(photographers, ".photograph_header", idURL); // END SET Photographer Profile Data
    // Build Medias Data

    const medias = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_1__.getMedias)();
    (0,_pages_displayMedia__WEBPACK_IMPORTED_MODULE_3__.displayMedia)(medias.sort(_utils_sortBy__WEBPACK_IMPORTED_MODULE_5__.sortByLikes), ".media_section", idURL); // Sort by default by likes
    // End build Medias Data
    // Init selectFilter Component and his behavior, need to provide the Data to filter

    (0,_utils_selectFilter__WEBPACK_IMPORTED_MODULE_6__.selectFilterComponent)(medias, idURL);
    console.log("Page principal initié avec succès depuis initMain()");
  } catch (e) {
    console.error(e); // If it's a fail then we redirect to 404 Error Page since initMain() it's the minimal functionality
    // Atm 404 error page doesn't exists must be write later

    console.log("Rediriger vers la page 404");
  }
}

async function initContactForm() {
  try {
    const contactFormModal = (0,_utils_modalForm__WEBPACK_IMPORTED_MODULE_7__.modalMaster)("body", "main", "contact_modal"); // Create a Model Page Object

    contactFormModal.addContactFormListener(); // Add listener for Contact Form Modal

    console.log("Formulaire contact initié avec succès depuis initContactForm()");
  } catch (e) {
    console.error(e);
  }
} // We init main page and contactForm in parallel so we don't use await there for fast response


initMain();
initContactForm();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SyxZQUFZLEtBQUssVUFBVSxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsV0FBVyxNQUFNLE9BQU8sVUFBVSxVQUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxZQUFZLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLE1BQU0sTUFBTSxLQUFLLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxZQUFZLEtBQUssVUFBVSxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxPQUFPLFlBQVksS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGVBQWUsYUFBYSxXQUFXLFdBQVcsY0FBYyxlQUFlLE9BQU8sTUFBTSxXQUFXLE1BQU0sUUFBUSxXQUFXLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsT0FBTyxPQUFPLFdBQVcsYUFBYSxlQUFlLGVBQWUsT0FBTyxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE9BQU8sTUFBTSxLQUFLLFlBQVksVUFBVSxhQUFhLGNBQWMsZUFBZSxlQUFlLGVBQWUsWUFBWSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLEtBQUssTUFBTSxLQUFLLFdBQVcsYUFBYSxlQUFlLGVBQWUsZUFBZSxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLE1BQU0sUUFBUSxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sS0FBSyxZQUFZLE1BQU0sVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxVQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsWUFBWSxZQUFZLFdBQVcsV0FBVyxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsVUFBVSxZQUFZLFdBQVcsTUFBTSxNQUFNLFdBQVcsWUFBWSxhQUFhLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsV0FBVyxXQUFXLFFBQVEsTUFBTSxVQUFVLE9BQU8sTUFBTSxXQUFXLFdBQVcsT0FBTyxZQUFZLE1BQU0sVUFBVSxZQUFZLGFBQWEsZUFBZSxlQUFlLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLE1BQU0sT0FBTyxXQUFXLFlBQVksV0FBVyxZQUFZLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsV0FBVyxPQUFPLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLE1BQU0sVUFBVSxZQUFZLFdBQVcsV0FBVyxNQUFNLE9BQU8sV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsTUFBTSxPQUFPLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLGFBQWEsYUFBYSxhQUFhLFdBQVcsTUFBTSxNQUFNLFlBQVksWUFBWSxZQUFZLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxXQUFXLFVBQVUsT0FBTyxNQUFNLE1BQU0sVUFBVSxNQUFNLEtBQUssWUFBWSxNQUFNLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxRQUFRLE1BQU0sVUFB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QUFHLE1BQU0yQix1REFBUyxFQUE5QjtJQUNBNUIsaUVBQVksQ0FBQ0MsTUFBTSxDQUFDMkYsSUFBUCxDQUFZWixzREFBWixDQUFELEVBQTJCLGdCQUEzQixFQUE2Q0ksS0FBN0MsQ0FBWixDQVRBLENBU2lFO0lBQ2pFO0lBRUE7O0lBQ0FELDBFQUFxQixDQUFDbEYsTUFBRCxFQUFTbUYsS0FBVCxDQUFyQjtJQUVBekYsT0FBTyxDQUFDQyxHQUFSLENBQVkscURBQVo7RUFDSCxDQWhCRCxDQWdCRSxPQUFPcUcsQ0FBUCxFQUFVO0lBQ1J0RyxPQUFPLENBQUNrRyxLQUFSLENBQWNJLENBQWQsRUFEUSxDQUVSO0lBQ0E7O0lBQ0F0RyxPQUFPLENBQUNDLEdBQVIsQ0FBWSw0QkFBWjtFQUNIO0FBQ0o7O0FBRUQsZUFBZXNHLGVBQWYsR0FBaUM7RUFDN0IsSUFBSTtJQUNBLE1BQU1DLGdCQUFnQixHQUFHNUQsNkRBQVcsQ0FBQyxNQUFELEVBQVEsTUFBUixFQUFlLGVBQWYsQ0FBcEMsQ0FEQSxDQUNxRTs7SUFDckU0RCxnQkFBZ0IsQ0FBQ2xELHNCQUFqQixHQUZBLENBRTJDOztJQUMzQ3RELE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdFQUFaO0VBQ0gsQ0FKRCxDQUtBLE9BQU9xRyxDQUFQLEVBQVU7SUFDTnRHLE9BQU8sQ0FBQ2tHLEtBQVIsQ0FBY0ksQ0FBZDtFQUNIO0FBQ0osRUFJRDs7O0FBQ0FELFFBQVE7QUFDUkUsZUFBZSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy9mYWN0b3JpZXMvbWVkaWFGYWN0b3J5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvZmFjdG9yaWVzL3Bob3RvZ3JhcGhlckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy9wYWdlcy9kaXNwbGF5RGF0YS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL2Rpc3BsYXlNZWRpYS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3V0aWxzL2RvbS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3V0aWxzL2ZldGNoLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvdXRpbHMvZ2V0VXJsUGFyYW1ldGVyLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvdXRpbHMvbW9kYWxGb3JtLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvdXRpbHMvc2VsZWN0RmlsdGVyLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvdXRpbHMvc29ydEJ5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3Njc3MvbWFpbi5zY3NzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3Njc3MvbWFpbi5zY3NzP2IzNzkiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL3Bob3RvZ3JhcGhlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJpbXBvcnQgKiBhcyBkb20gZnJvbSBcIi4uL3V0aWxzL2RvbVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1lZGlhRmFjdG9yeShkYXRhKSB7XHJcbiAgICBjb25zdCB7IGlkLCBwaG90b2dyYXBoZXJJZCwgdGl0bGUsIGltYWdlLCB2aWRlbywgbGlrZXMsIGRhdGUsIHByaWNlIH0gPSBkYXRhO1xyXG5cclxuICAgIGNvbnN0IG1vdmllID0gYGFzc2V0cy92aWRlby8ke3ZpZGVvfWA7XHJcbiAgICBjb25zdCBwaWN0dXJlID0gYGFzc2V0cy9pbWFnZXMvJHtpbWFnZX1gO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldE1lZGlhRE9NKCkge1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgRE9NIG9ubHkgaWYgd2UgZ290IGlkcyBhbmQgYSBQaWN0dXJlIG9yIGEgVmlkZW9cclxuICAgICAgICBpZiAoKGlkICYmIHBob3RvZ3JhcGhlcklkKSAmJiAoaW1hZ2UgfHwgdmlkZW8pKSB7XHJcbiAgICAgICAgICAgIC8vIENSRUFURSBBIEFSVElDTEVcclxuICAgICAgICAgICAgY29uc3QgYXJ0aWNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhcnRpY2xlXCIpO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWVkaWFfY2FyZFwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJ1aWxkIEEgSFJFRiBFTEVNRU5UXHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtFbGVtZW50ID0gYXJ0aWNsZS5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgIGRvbS5idWlsZEVsZW1lbnQoXCJhXCIsIFwicGhvdG9ncmFwaGVyLmh0bWw/aWQ9XCIgKyBpZClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgZG9tLnNldEFyaWVsTGFiZWwobGlua0VsZW1lbnQsIFwiTGlsYWMgYnJlYXN0ZWQgcm9sbGVyLCBjbG9zZXVwIHZpZXdcIikgLy8gU2V0IEFyaWVsTGFiZWwgdG8gQUhyZWZcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBpbWFnZSBvciB2aWRlbyBleGlzdHNcclxuICAgICAgICAgICAgaWYgKGltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICBkb20uaW5zZXJ0UGljdHVyZUluc2lkZUVsZW1lbnQobGlua0VsZW1lbnQsIHBpY3R1cmUsIHRpdGxlKTsgLy8gSW5zZXJ0IHBpY3R1cmUgd2l0aCBBTFRcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmlkZW8pIHtcclxuICAgICAgICAgICAgICAgIGRvbS5pbnNlcnRWaWRlb0luc2lkZUVsZW1lbnQobGlua0VsZW1lbnQsIG1vdmllLCBcIk1vdmllIFwiICsgdmlkZW8pOyAvLyBJbnNlcnQgVmlkZW8gd2l0aCBBcmllbCBMYWJlbFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBHZW5lcmF0ZSBEZXRhaWxzICh0aXRsZSArIExpa2VzKVxyXG4gICAgICAgICAgICBpZiAodGl0bGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aXRsZV9oNiA9IFwiPGg2PlwiICsgdGl0bGUgKyBcIjwvaDY+XCI7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGlrZXNfaDYgPSBcIjxoNiBhcmlhLWxhYmVsPSdsaWtlcyc+XCIgKyAwICsgXCI8L2g2PlwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpa2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlrZXNfaDYgPSBcIjxoNiBhcmlhLWxhYmVsPSdsaWtlcyc+XCIgKyBsaWtlcyArIFwiPC9oNj5cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRvbS5pbnNlcnRIVE1MQWZ0ZXJFbGVtZW50KGxpbmtFbGVtZW50LCBcIjxkaXYgY2xhc3M9J2RldGFpbHMnPlwiICsgdGl0bGVfaDYgKyBsaWtlc19oNiArIFwiPC9kaXY+XCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBSZXR1cm4gQXJ0aWNsZVxyXG4gICAgICAgICAgICByZXR1cm4gYXJ0aWNsZTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IHBob3RvZ3JhcGhlcklkLCBwaWN0dXJlLCBtb3ZpZSwgZ2V0TWVkaWFET00gfTtcclxufVxyXG4iLCJcclxuaW1wb3J0IHsgYnVpbGRFbGVtZW50LCBpbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudCwgc2V0SW5uZXJIdG1sLCBzZXRBcmllbExhYmVsIH0gZnJvbSBcIi4uL3V0aWxzL2RvbVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBob3RvZ3JhcGhlckZhY3RvcnkoZGF0YSkge1xyXG4gICAgY29uc3QgeyBuYW1lLCBpZCwgY2l0eSwgY291bnRyeSwgdGFnbGluZSwgcG9ydHJhaXQsIHByaWNlIH0gPSBkYXRhO1xyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgY29uc3QgcGljdHVyZSA9IGBhc3NldHMvaW1hZ2VzLyR7cG9ydHJhaXR9YDtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRVc2VyQ2FyZERPTSgpIHtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIERPTSBvbmx5IGlmIHdlIGdvdCBhIHBpY3R1cmUgYSBpZCBhbmQgYSBuYW1lXHJcbiAgICAgICAgaWYgKG5hbWUgJiYgaWQgJiYgcG9ydHJhaXQpIHtcclxuICAgICAgICAgICAgLy8gQlVJTEQgQSBBUlRJQ0xFIFxyXG4gICAgICAgICAgICBjb25zdCBhcnRpY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFydGljbGVcIik7XHJcbiAgICAgICAgICAgIGFydGljbGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwaG90b2dyYXBoZXJfY2FyZFwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBEeW5hbWlxdWUgTElOSyB3aXRoIFBpY3R1cmVcclxuICAgICAgICAgICAgY29uc3QgbGlua0VsZW1lbnQgPSBhcnRpY2xlLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgYnVpbGRFbGVtZW50KFwiYVwiLCBcInBob3RvZ3JhcGhlci5odG1sP2lkPVwiICsgaWQpIC8vIEJ1aWxkIEFIcmVmXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHNldEFyaWVsTGFiZWwobGlua0VsZW1lbnQsIFwiTGluayB0byBcIiArIG5hbWUpIC8vIFNldCBBcmllbExhYmVsIHRvIEFIcmVmXHJcbiAgICAgICAgICAgIGluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50KGxpbmtFbGVtZW50LCBwaWN0dXJlLCBuYW1lKTtcclxuICAgICAgICAgICAgLy8gRU5EIENyZWF0ZSBEeW5hbWlxdWUgTElOSyB3aXRoIFBpY3R1cmVcclxuXHJcbiAgICAgICAgICAgIGFydGljbGUuYXBwZW5kQ2hpbGQoYnVpbGRFbGVtZW50KFwiaDJcIiwgbmFtZSkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNpdHkgJiYgY291bnRyeSkge1xyXG4gICAgICAgICAgICAgICAgYXJ0aWNsZS5hcHBlbmRDaGlsZChidWlsZEVsZW1lbnQoXCJoM1wiLCBjaXR5ICsgXCIsIFwiICsgY291bnRyeSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YWdsaW5lKSB7XHJcbiAgICAgICAgICAgICAgICBhcnRpY2xlLmFwcGVuZENoaWxkKGJ1aWxkRWxlbWVudChcImg0XCIsIHRhZ2xpbmUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJpY2UpIHtcclxuICAgICAgICAgICAgICAgIGFydGljbGUuYXBwZW5kQ2hpbGQoYnVpbGRFbGVtZW50KFwiaDVcIiwgcHJpY2UgKyBcIuKCrC9qb3VyXCIpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUkVUVVJOIEEgQVJUSUNMRSBcclxuICAgICAgICAgICAgcmV0dXJuIGFydGljbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFBob3RvZ3JhcGhlckhlYWRlcigpIHtcclxuICAgICAgICBzZXRJbm5lckh0bWwoXCIucGhvdG9ncmFwaF9oZWFkZXIgaDFcIiwgbmFtZSk7XHJcbiAgICAgICAgaWYgKGNpdHkgJiYgY291bnRyeSkge1xyXG4gICAgICAgICAgICBzZXRJbm5lckh0bWwoXCIucGhvdG9ncmFwaF9oZWFkZXIgaDJcIiwgY2l0eSArIFwiLCBcIiArIGNvdW50cnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnBob3RvZ3JhcGhfaGVhZGVyIGgyXCIsIFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRJbm5lckh0bWwoXCIucGhvdG9ncmFwaF9oZWFkZXIgaDNcIiwgdGFnbGluZSk7XHJcblxyXG4gICAgICAgIC8qKiBXRSBVU0UgYSBkaWZmZXJlbnQgbWV0aG9kIHRoYXQgaW5zZXJ0UGljdHVyZUluc2lkZUVsZW1lbnQoKSBzaW5jZSBwaWN0dXJlIGlzIGFscmVhZHkgaW4gdGhlIERPTSAqL1xyXG4gICAgICAgIGNvbnN0IGltZ1Byb2ZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBob3RvZ3JhcGhfaGVhZGVyIGltZ1wiKTtcclxuICAgICAgICBpbWdQcm9maWxlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBwaWN0dXJlKTtcclxuICAgICAgICBpbWdQcm9maWxlLnNldEF0dHJpYnV0ZShcImFsdFwiLCBuYW1lKTtcclxuICAgICAgICAvKiogKi9cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRTdGlja3lCYXJQcmljZSgpIHtcclxuICAgICAgICBpZiAocHJpY2UpIHtcclxuICAgICAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnByaWNlX3JhdGVfZGFpbHlcIiwgcHJpY2UgKyBcIiDigqwgLyBqb3VyXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnByaWNlX3JhdGVfZGFpbHlcIiwgcHJpY2UgKyBcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHsgbmFtZSwgcGljdHVyZSwgZ2V0VXNlckNhcmRET00sIHNldFBob3RvZ3JhcGhlckhlYWRlciwgc2V0U3RpY2t5QmFyUHJpY2UgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBwaG90b2dyYXBoZXJGYWN0b3J5IH0gZnJvbSBcIi4uL2ZhY3Rvcmllcy9waG90b2dyYXBoZXJGYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlzcGxheURhdGEocGhvdG9ncmFwaGVycywgcXVlcnlTZWxlY3RvciwgaWQpIHtcclxuXHJcbiAgICBwaG90b2dyYXBoZXJzLmZvckVhY2goKHBob3RvZ3JhcGhlcikgPT4ge1xyXG4gICAgICAgIGlmIChpZCkge1xyXG4gICAgICAgICAgICBpZiAocGhvdG9ncmFwaGVyLmlkID09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGVuIHdlIGFyZSBnb2luZyB1c2UgdGhlIFBob3RvZ3JhcGhlckZhY3RvcnkgdG8gc2V0IERPTVxyXG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7IGNvbnNvbGUubG9nKHBob3RvZ3JhcGhlcik7IH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlck1vZGVsID0gcGhvdG9ncmFwaGVyRmFjdG9yeShwaG90b2dyYXBoZXIpO1xyXG4gICAgICAgICAgICAgICAgcGhvdG9ncmFwaGVyTW9kZWwuc2V0UGhvdG9ncmFwaGVySGVhZGVyKCk7XHJcbiAgICAgICAgICAgICAgICBwaG90b2dyYXBoZXJNb2RlbC5zZXRTdGlja3lCYXJQcmljZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gRW5kIG9mIFBob3RvZ3JhcGhlckZhY3RvcnkgV29ya1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVGhlbiB3ZSBhcmUgZ29pbmcgdXNlIHRoZSBQaG90b2dyYXBoZXJGYWN0b3J5IHRvIGdlbmVyYXRlIERPTVxyXG4gICAgICAgICAgICBjb25zdCBwaG90b2dyYXBoZXJzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnlTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlck1vZGVsID0gcGhvdG9ncmFwaGVyRmFjdG9yeShwaG90b2dyYXBoZXIpO1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyQ2FyZERPTSA9IHBob3RvZ3JhcGhlck1vZGVsLmdldFVzZXJDYXJkRE9NKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHsgY29uc29sZS5sb2cocGhvdG9ncmFwaGVyKTsgfVxyXG4gICAgICAgICAgICBpZiAodXNlckNhcmRET00pIHtcclxuICAgICAgICAgICAgICAgIHBob3RvZ3JhcGhlcnNTZWN0aW9uLmFwcGVuZENoaWxkKHVzZXJDYXJkRE9NKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFbmQgb2YgUGhvdG9ncmFwaGVyRmFjdG9yeSBXb3JrXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IG1lZGlhRmFjdG9yeSB9IGZyb20gXCIuLi9mYWN0b3JpZXMvbWVkaWFGYWN0b3J5XCI7XHJcbmltcG9ydCB7IHNldElubmVySHRtbCB9IGZyb20gXCIuLi91dGlscy9kb21cIjtcclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlzcGxheU1lZGlhKG1lZGlhcywgcXVlcnlTZWxlY3RvciwgcGhvdG9ncmFwaGVySWQpIHtcclxuICAgIGxldCB0b3RhbExpa2VzID0gMDtcclxuXHJcbiAgICBtZWRpYXMuZm9yRWFjaCgobWVkaWEpID0+IHtcclxuICAgICAgICBpZiAocGhvdG9ncmFwaGVySWQpIHtcclxuICAgICAgICAgICAgaWYgKHBob3RvZ3JhcGhlcklkID09IG1lZGlhLnBob3RvZ3JhcGhlcklkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7IGNvbnNvbGUubG9nKG1lZGlhKTsgfVxyXG4gICAgICAgICAgICAgICAgLy8gVGhlbiB3ZSBhcmUgZ29pbmcgdXNlIHRoZSBNZWRpYUZhY3RvcnkgdG8gZ2VuZXJhdGUgRE9NXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZWRpYXNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihxdWVyeVNlbGVjdG9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lZGlhTW9kZWwgPSBtZWRpYUZhY3RvcnkobWVkaWEpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWVkaWFET00gPSBtZWRpYU1vZGVsLmdldE1lZGlhRE9NKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lZGlhRE9NKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVkaWFzU2VjdGlvbi5hcHBlbmRDaGlsZChtZWRpYURPTSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBFbmQgb2YgTWVkaWFGYWN0b3J5IFdvcmtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBtZWRpYSBvYmplY3QgZ290IExpa2VzIHByb3ByaWV0eSB0aGVuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVkaWEubGlrZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbExpa2VzICs9IG1lZGlhLmxpa2VzOyAvLyBDb3VudCBhbGwgbGlrZXNcclxuICAgICAgICAgICAgICAgICAgICBzZXRJbm5lckh0bWwoXCIudG90YWxfbGlrZXNcIiwgdG90YWxMaWtlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJUaGVyZXMgaXMgbm8gbGlrZSBhbmQgdG90YWxMaWtlcywgbG9vayBtZWRpYUZhY3RvcnkgcmV0dXJuZWQgYSBvYmplY3Qgd2l0aG91dCBsaWtlcyBwcm9wcmlldHlcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JykgeyBjb25zb2xlLmxvZyhcIlRvdGFsIExpa2U6IFwiICsgdG90YWxMaWtlcyk7IH1cclxufVxyXG5cclxuIiwiLy8gRnVuY3Rpb24gZm9yIGJ1aWxkIERPTVxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0UGljdHVyZUluc2lkZUVsZW1lbnQoZWxlbWVudCwgcGljdHVyZSwgYWx0KSB7XHJcbiAgICBpZiAoYWx0KSB7XHJcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgJzxpbWcgc3JjPVwiJyArIHBpY3R1cmUgKyAnXCIgJyArICdhbHQ9XCInICsgYWx0ICsgJ1wiPicpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgJzxpbWcgc3JjPVwiJyArIHBpY3R1cmUgKyAnXCI+Jyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRWaWRlb0luc2lkZUVsZW1lbnQoZWxlbWVudCwgdmlkZW8sIGFyaWVsTGFiZWwpIHtcclxuXHJcbiAgICBpZiAoYXJpZWxMYWJlbCkge1xyXG4gICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsICc8dmlkZW8gc3JjPVwiJyArIHZpZGVvICsgJ1wiICcgKyAnYXJpYS1sYWJlbD1cIicgKyBhcmllbExhYmVsICsgJ1wiPicpO1xyXG5cclxuICAgIH1cclxuICAgIGVsc2UgXHJcbiAgICB7XHJcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgJzx2aWRlbyBzcmM9XCInICsgdmlkZW8gKyAnXCI+Jyk7XHJcbiAgICB9XHJcbiAgIFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0SFRNTEFmdGVyRWxlbWVudChlbGVtZW50LCBodG1sKSB7XHJcbiAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyZW5kXCIsIGh0bWwpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRFbGVtZW50KGJhbGlzZSwgdmFsdWUpIHtcclxuICAgIC8vIENyZWF0ZSBiYWxpc2VcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGJhbGlzZSk7XHJcblxyXG4gICAgLy8gU2V0IEF0dHJpYnV0ZSBvciBUZXh0Q29udGVuZWQgZGVwZW5kIG9mIGJhbGlzZVxyXG4gICAgc3dpdGNoIChiYWxpc2UpIHtcclxuICAgICAgICBjYXNlIFwiYVwiOlxyXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImhyZWZcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiaW1nXCI6XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3JjXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0QXJpZWxMYWJlbChlbGVtZW50LCBhcmllbExhYmVsKSB7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWVsLWxhYmVsXCIsIGFyaWVsTGFiZWwpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0SW5uZXJIdG1sKHF1ZXJ5U2VsZWN0b3IsIHRleHRlKSB7XHJcbiAgICBjb25zdCB0ZXh0ZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5U2VsZWN0b3IpO1xyXG4gICAgdGV4dGVFbGVtZW50LmlubmVySFRNTCA9IHRleHRlO1xyXG59XHJcbi8vIEVuZCBGdW5jdGlvbiBmb3IgYnVpbGQgRE9NIiwiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoSlNPTih1cmwsIHR5cGUpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTsgLy8gV2FpdCBmb3IgdGhlIEFzeW5jIEZlY3RoIEZ1bmN0aW9uXHJcblxyXG4gICAgLy8gZmV0Y2ggcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBhIHJlc3BvbnNlIHByb3BlcnR5IHdoaWNoIGlmIHNldCB0byBmYWxzZSBtZWFucyB0aGF0IHRoZSBjb25uZWN0aW9uIGlzIG5vdCBnb29kIGFuZCBzbyB3ZSBzdG9wIHRoZSBmdW5jdGlvbiBcclxuICAgIGlmICghcmVzcG9uc2Uub2spIHsgdGhyb3cgbmV3IEVycm9yKFwiVGhyb3duIGZyb20gZmV0Y2hKU09OKClcIik7IH1cclxuXHJcbiAgICBsZXQganNvblJlc3BvbnNlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpOyAvLyBwYXJzaW5nIEpTT05cclxuICAgIGpzb25SZXNwb25zZSA9IGpzb25SZXNwb25zZVt0eXBlXTsgLy8gR2V0IGRhdGEgZnJvbSB0aGUgQXJyYXkgdGhhdCB3ZSB3YW50XHJcbiAgICByZXR1cm4ganNvblJlc3BvbnNlO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBob3RvZ3JhcGhlcnMoKSB7XHJcbiAgICBjb25zdCB1cmwgPSBcIi4vZGF0YS9waG90b2dyYXBoZXJzLmpzb25cIjsgLy8gRGF0YSBzb3VyY2UgLkpTT05cclxuICAgIGNvbnN0IHBob3RvZ3JhcGhlcnMgPSBhd2FpdCBmZXRjaEpTT04odXJsLCBcInBob3RvZ3JhcGhlcnNcIik7IC8vIHVzZSBmZXRjaEpTT04gZnVuY3Rpb24gZnJvbSB1dGlscy9mZXRjaC5qc1xyXG4gICAgcmV0dXJuIHBob3RvZ3JhcGhlcnM7IC8vIFJldHVybiBkYXRhIG9mIFBob3RvR3JhcGhlcnNcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldE1lZGlhcygpIHtcclxuICAgIGNvbnN0IHVybCA9IFwiLi9kYXRhL3Bob3RvZ3JhcGhlcnMuanNvblwiOyAvLyBEYXRhIHNvdXJjZSAuSlNPTlxyXG4gICAgY29uc3QgbWVkaWFzID0gYXdhaXQgZmV0Y2hKU09OKHVybCwgXCJtZWRpYVwiKTsgLy8gdXNlIGZldGNoSlNPTiBmdW5jdGlvbiBmcm9tIHV0aWxzL2ZldGNoLmpzXHJcbiAgICByZXR1cm4gbWVkaWFzOyAvLyBSZXR1cm4gZGF0YSBvZiBNZWRpYVxyXG59XHJcbiIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVcmxQYXJhbWV0ZXIocGFyYW1ldGVyKSB7XHJcbiAgICBjb25zdCBmdWxsVXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7IC8vIEdldCBmdWxsIHVybFxyXG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChmdWxsVXJsKTsgLy8gQ3JlYXRlIFVSTCBPYmplY3RcclxuICAgIGNvbnN0IHBhcmFtZXRlclZhbHVlID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQocGFyYW1ldGVyKTsgLy8gZ2V0IHBhcmFtZXRlciB2YWx1ZVxyXG4gICAgcmV0dXJuIHBhcmFtZXRlclZhbHVlO1xyXG59IiwiXHJcbmV4cG9ydCBmdW5jdGlvbiBtb2RhbE1hc3Rlcihib2R5VGFnLCBtYWluVGFnLCBtb2RhbElEKSB7XHJcblxyXG5cclxuICAgIC8qKiBDUkVBVEUgQSBPQkpFQ1QgV0lUSCBBTEwgUFJPUFJJRVRZIEZPUiBNT0RFTCBET00gTkVFRCAqL1xyXG4gICAgbGV0IG1vZGFsUGFnZSA9IHtcclxuICAgICAgICBib2R5SFRNTDogYm9keVRhZyxcclxuICAgICAgICBtYWluSFRNTDogbWFpblRhZyxcclxuICAgICAgICBtb2RhbDogbW9kYWxJRCxcclxuICAgICAgICB2aXNpYmxlOiAwLFxyXG4gICAgfVxyXG5cclxuICAgIG1vZGFsUGFnZSA9IGdldERvbVByb3ByaWV0eShtb2RhbFBhZ2UpO1xyXG4gICAgLyoqIEVORCAgKi9cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRDb250YWN0Rm9ybUxpc3RlbmVyKCkge1xyXG4gICAgICAgIGNvbnN0IG1vZGFsID0gbW9kZWxQYWdlLm1vZGFsO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3Blbk1vZGFsXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG1vZGFsLmRpc3BsYXlNb2RhbCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VNb2RhbFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBtb2RhbC5jbG9zZU1vZGFsKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0RG9tUHJvcHJpZXR5KG9iamVjdCkge1xyXG4gICAgICAgIG9iamVjdC5ib2R5SFRNTCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW9kYWxQYWdlLmJvZHlIVE1MKTsgLy8gV2UgdGFyZ2V0IHRoZSBib2R5IEhUTUwgdGFnXHJcbiAgICAgICAgb2JqZWN0Lm1haW5IVE1MID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb2RhbFBhZ2UubWFpbkhUTUwpOyAvLyBXZSB0YXJnZXQgb3VyIG1haW4gSFRNTCB0YWdcclxuICAgICAgICBvYmplY3QubW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtb2RhbFBhZ2UubW9kYWwpOyAvLyBXZSB0YXJnZXQgb3VyIG1vZGFsXHJcblxyXG4gICAgICAgIHJldHVybiBtb2RhbFBhZ2U7IC8vIFdlIHJldHVybiBuZXcgcHJvcHJpZXR5IGZvciBvdXIgb2JqZWN0IG1vZGFsUGFnZSBcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjZW50ZXJNb2RhbChtb2RhbCkge1xyXG4gICAgICAgIGxldCBNd2lkdGggPSBtb2RhbC5vZmZzZXRXaWR0aDtcclxuICAgICAgICBsZXQgTWhlaWdodCA9IG1vZGFsLm9mZnNldEhlaWdodDtcclxuICAgICAgICBsZXQgV3dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgbGV0IFdoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgICAgIG1vZGFsLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgICAgIG1vZGFsLnN0eWxlLnRvcCA9ICgoV2hlaWdodCAtIE1oZWlnaHQpIC8gMiArIHdpbmRvdy5wYWdlWU9mZnNldCkgKyBcInB4XCI7XHJcbiAgICAgICAgbW9kYWwuc3R5bGUubGVmdCA9ICgoV3dpZHRoIC0gTXdpZHRoKSAvIDIgKyB3aW5kb3cucGFnZVhPZmZzZXQpICsgXCJweFwiO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVmZmVjdEFuaW1hdGlvbihoaWRlY2xhc3MsIHNob3djbGFzcykge1xyXG4gICAgICAgIGlmIChtb2RhbFBhZ2UudmlzaWJsZSA9PT0gMCkge1xyXG4gICAgICAgICAgICBtb2RhbFBhZ2UubWFpbkhUTUwuY2xhc3NMaXN0LnJlbW92ZShzaG93Y2xhc3MpO1xyXG4gICAgICAgICAgICBtb2RhbFBhZ2UubW9kYWwuY2xhc3NMaXN0LnJlbW92ZShoaWRlY2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgbW9kYWxQYWdlLm1haW5IVE1MLmNsYXNzTGlzdC5hZGQoaGlkZWNsYXNzKTtcclxuICAgICAgICAgICAgbW9kYWxQYWdlLm1vZGFsLmNsYXNzTGlzdC5hZGQoc2hvd2NsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsUGFnZS52aXNpYmxlID0gMVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbW9kYWxQYWdlLm1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoc2hvd2NsYXNzKTtcclxuICAgICAgICAgICAgbW9kYWxQYWdlLm1haW5IVE1MLmNsYXNzTGlzdC5yZW1vdmUoaGlkZWNsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsUGFnZS5tb2RhbC5jbGFzc0xpc3QuYWRkKGhpZGVjbGFzcyk7XHJcbiAgICAgICAgICAgIG1vZGFsUGFnZS5tYWluSFRNTC5jbGFzc0xpc3QuYWRkKHNob3djbGFzcyk7XHJcblxyXG4gICAgICAgICAgICBtb2RhbFBhZ2UudmlzaWJsZSA9IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1vZGFsUGFnZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkaXNwbGF5TW9kYWwoKSB7XHJcbiAgICAgICAgZWZmZWN0QW5pbWF0aW9uKFwiaGlkZV9jb250ZW50XCIsIFwic2hvd19jb250ZW50XCIpO1xyXG4gICAgICAgIG1vZGFsUGFnZS5ib2R5SFRNTC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7IC8vIEJsb2NrIFNjcm9sbFxyXG4gICAgICAgIG1vZGFsUGFnZS5tb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiOyAvLyBEaXNwbGF5IHRoZSBNb2RhbCBhdCB0aGUgc2NyZWVuXHJcbiAgICAgICAgY2VudGVyTW9kYWwobW9kYWxQYWdlLm1vZGFsKTsgLy8gQ2VudGVyIHRoZSBNb2RhbCBhdCB0aGUgc2NyZWVuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VNb2RhbCgpIHtcclxuICAgICAgICBlZmZlY3RBbmltYXRpb24oXCJoaWRlX2NvbnRlbnRcIiwgXCJzaG93X2NvbnRlbnRcIik7XHJcbiAgICAgICAgbW9kYWxQYWdlLmJvZHlIVE1MLnN0eWxlLm92ZXJmbG93ID0gXCJ2aXNpYmxlXCI7IC8vIEFsbG93IHNjcm9sbCBcclxuICAgICAgICBtb2RhbFBhZ2UubW9kYWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiOyAvLyBIaWRlIGF0IHRoZSBzY3JlZW4gbW9kYWxcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZW5kTWVzc2FnZSgpIHtcclxuXHJcbiAgICB9XHJcbiAgICByZXR1cm4geyBtb2RhbFBhZ2UsIGFkZENvbnRhY3RGb3JtTGlzdGVuZXIsIGRpc3BsYXlNb2RhbCwgY2xvc2VNb2RhbCwgc2VuZE1lc3NhZ2UgfVxyXG59IiwiaW1wb3J0IHsgZGlzcGxheU1lZGlhIH0gZnJvbSAnLi4vcGFnZXMvZGlzcGxheU1lZGlhJztcclxuaW1wb3J0IHsgc29ydEJ5TGlrZXMsIHNvcnRCeURhdGUsIHNvcnRCeVRpdGxlIH0gZnJvbSAnLi4vdXRpbHMvc29ydEJ5JztcclxuXHJcblxyXG4vKiogR0VORVJBVEUgRVZFTlQgRk9SIFNFTEVDVCBGSUxURVIgQ09NUE9ORU5UUyBBTkQgQkVIQVZJT1IgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdEZpbHRlckNvbXBvbmVudChkYXRhLCBpZFVSTCkge1xyXG5cclxuICAgIGNvbnN0IHNlbGVjdEZpbHRlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RfZmlsdGVyIC5zZWxlY3RfYnV0dG9uJyk7IC8vIEJ1dHRvbiBTZWxlY3RcclxuICAgIGNvbnN0IHNlbGVjdEZpbHRlclNlbGVjdDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdDFcIik7IC8vIEZpcnN0IFNlbGVjdCAoYnkgZGVmYXVsdCBEYXRlKVxyXG4gICAgY29uc3Qgc2VsZWN0RmlsdGVyU2VsZWN0MiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0MlwiKTsgLy8gMm5kIFNlbGVjdCAoYnkgZGVmYXVsdCBUaXRyZSlcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlRmlsdGVyQWN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IGV2ZW50LnRhcmdldC5pbm5lckhUTUw7IC8vIEdldCBpbm5lckhUTUwgb2Ygc2VsZWN0ZWQgaXRlbVxyXG5cclxuXHJcbiAgICAgICAgc3dpdGNoIChzZWxlY3RlZEl0ZW0pIHtcclxuICAgICAgICAgICAgY2FzZSAnRGF0ZSc6XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJCdXR0b24uaW5uZXJIVE1MID0gXCJEYXRlXCI7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJTZWxlY3QxLmlubmVySFRNTCA9IFwiUG9wdWxhcml0w6lcIjtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEZpbHRlclNlbGVjdDIuaW5uZXJIVE1MID0gXCJUaXRyZVwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZWRpYV9zZWN0aW9uJykuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIC8vIEJ1aWxkIE1lZGlhcyBEYXRhXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5TWVkaWEoZGF0YS5zb3J0KHNvcnRCeURhdGUpLCBcIi5tZWRpYV9zZWN0aW9uXCIsIGlkVVJMKTtcclxuICAgICAgICAgICAgICAgIC8vIEVuZCBidWlsZCBNZWRpYXMgRGF0YVxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdUaXRyZSc6XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJCdXR0b24uaW5uZXJIVE1MID0gXCJUaXRyZVwiO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0RmlsdGVyU2VsZWN0MS5pbm5lckhUTUwgPSBcIkRhdGVcIjtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEZpbHRlclNlbGVjdDIuaW5uZXJIVE1MID0gXCJQb3B1bGFyaXTDqVwiO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVkaWFfc2VjdGlvbicpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAvLyBCdWlsZCBNZWRpYXMgRGF0YVxyXG4gICAgICAgICAgICAgICAgZGlzcGxheU1lZGlhKGRhdGEuc29ydChzb3J0QnlUaXRsZSksIFwiLm1lZGlhX3NlY3Rpb25cIiwgaWRVUkwpO1xyXG4gICAgICAgICAgICAgICAgLy8gRW5kIGJ1aWxkIE1lZGlhcyBEYXRhXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ1BvcHVsYXJpdMOpJzpcclxuICAgICAgICAgICAgICAgIHNlbGVjdEZpbHRlckJ1dHRvbi5pbm5lckhUTUwgPSBcIlBvcHVsYXJpdMOpXCI7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJTZWxlY3QxLmlubmVySFRNTCA9IFwiRGF0ZVwiO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0RmlsdGVyU2VsZWN0Mi5pbm5lckhUTUwgPSBcIlRpdHJlXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lZGlhX3NlY3Rpb24nKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgLy8gQnVpbGQgTWVkaWFzIERhdGFcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlNZWRpYShkYXRhLnNvcnQoc29ydEJ5TGlrZXMpLCBcIi5tZWRpYV9zZWN0aW9uXCIsIGlkVVJMKTtcclxuICAgICAgICAgICAgICAgIC8vIEVuZCBidWlsZCBNZWRpYXMgRGF0YVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic2VsZWN0ZWRJdGVtIG5vdCBmb3VuZCBlcnJvciBhYm91dCBoYW5kbGVGaWx0ZXJBY3Rpb24oKVwiKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICBzZWxlY3RGaWx0ZXJTZWxlY3QxLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVGaWx0ZXJBY3Rpb24pXHJcbiAgICBzZWxlY3RGaWx0ZXJTZWxlY3QyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVGaWx0ZXJBY3Rpb24pXHJcbn1cclxuLyoqIEVORCBHRU5FUkFURSBFVkVOVCBGT1IgU0VMRUNUIEZJTFRFUiBDT01QT05FVE5TIEFORCBCRUhBVklPUiAqL1xyXG4iLCIvKiogRnVuY3Rpb24gdG8gc29ydCBieSBMaWtlcyxEYXRlcyBvciBUaXRsZSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc29ydEJ5TGlrZXMoYSwgYikge1xyXG4gICAgaWYgKGEubGlrZXMgPiBiLmxpa2VzKSB7XHJcbiAgICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICBpZiAoYS5saWtlcyA8IGIubGlrZXMpIHtcclxuICAgICAgICByZXR1cm4gMVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzb3J0QnlEYXRlKGEsIGIpIHtcclxuICAgIGlmIChhLmRhdGUgPiBiLmRhdGUpIHtcclxuICAgICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIGlmIChhLmRhdGUgPCBiLmRhdGUpIHtcclxuICAgICAgICByZXR1cm4gMVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzb3J0QnlUaXRsZShhLCBiKSB7XHJcbiAgICBpZiAoYS50aXRsZSA8IGIudGl0bGUpIHtcclxuICAgICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIGlmIChhLnRpdGxlID4gYi50aXRsZSkge1xyXG4gICAgICAgIHJldHVybiAxXHJcbiAgICB9XHJcbiAgICByZXR1cm4gMDtcclxufVxyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBjaGFyc2V0IFxcXCJVVEYtOFxcXCI7XFxuLyoqIFVzZWQgdG8gbG9hZCBhbGwgdmFyaWFibGVzIGZvciB0aGlzIHByb2plY3QgYWJvdXQgU0NTUyAqKi8gLyoqIEZPTlQgKiovXFxuLyoqIEVORCBGT05UICoqL1xcbi8qKiBDT0xPUiBWQVJJQUJMRVMgKiovXFxuLyoqIEVORCBDT0xPUiBWQVJJQUJMRVMgKiovXFxuLyoqIElNUE9SVCBHTE9CQUwgQ1NTIEZPUiBGT05UUyBIVE1MLCogU0VMRUNUT1IgKiovXFxuLyoqKioqKioqKioqKioqKioqKioqKiogR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1xcbmh0bWwsXFxuKiB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgYW5pbWF0aW9uOiAxcyBlYXNlLWluIGZvcndhcmRzIGZhZGUtaW47XFxufVxcbkBrZXlmcmFtZXMgZmFkZS1pbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG59XFxuXFxuLyoqKioqKioqKioqKioqKioqKioqKiogRU5EIEdFTkVSQUwgKioqKioqKioqKioqKioqKioqKioqKi9cXG4vKiogSU1QT1JUIE1JWElOICoqL1xcbi8qKiBJTVBPUlQgSEVBREVSIFNUWUxFUyAqKi9cXG5oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiAxMjBweDtcXG59XFxuaGVhZGVyIGgxIHtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbiAgdG9wOiA0NHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAxMDBweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXNpemU6IDM2cHg7XFxuICBsaW5lLWhlaWdodDogNDdweDtcXG59XFxuaGVhZGVyIC5sb2dvLFxcbmhlYWRlciAubG9nb19waG90b2dyYXBoZXIge1xcbiAgaGVpZ2h0OiA1MHB4O1xcbn1cXG5oZWFkZXIgLmxvZ28ge1xcbiAgbWFyZ2luLWxlZnQ6IDExNXB4O1xcbn1cXG5oZWFkZXIgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXG4gIG1hcmdpbi1sZWZ0OiAxMDBweDtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcblxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSUyBDQVJEUyAqKi9cXG4ucGhvdG9ncmFwaGVyX2NhcmQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGltZyB7XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxuICBoZWlnaHQ6IDIwMHB4O1xcbiAgd2lkdGg6IDIwMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgb2JqZWN0LWZpdDogY292ZXI7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBpbWc6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGgyLFxcbi5waG90b2dyYXBoZXJfY2FyZCBoMyxcXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDQsXFxuLnBob3RvZ3JhcGhlcl9jYXJkIGg1IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDIge1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIGNvbG9yOiAjRDM1NzNDO1xcbiAgZm9udC1zaXplOiAzNnB4O1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDMge1xcbiAgZm9udC1zaXplOiAxMy4wMDEwODM0MjM2cHg7XFxuICBsaW5lLWhlaWdodDogMTdweDtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDQge1xcbiAgbWFyZ2luLXRvcDogMnB4O1xcbiAgZm9udC1zaXplOiAxMHB4O1xcbiAgbGluZS1oZWlnaHQ6IDEzcHg7XFxuICBjb2xvcjogIzAwMDAwMDtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGg1IHtcXG4gIG1hcmdpbi10b3A6IDJweDtcXG4gIGZvbnQtc2l6ZTogOXB4O1xcbiAgbGluZS1oZWlnaHQ6IDEycHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogIzc1NzU3NTtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGgzIHtcXG4gICAgZm9udC1zaXplOiAxNi45MDE0MDg0NTA3cHg7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICB9XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDQge1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICB9XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDUge1xcbiAgICBmb250LXNpemU6IDExLjdweDtcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDMge1xcbiAgICBmb250LXNpemU6IDE5LjUwMTYyNTEzNTRweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoNCB7XFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoNSB7XFxuICAgIGZvbnQtc2l6ZTogMTMuNXB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGltZyB7XFxuICAgIHdpZHRoOiAyMzBweDtcXG4gICAgaGVpZ2h0OiAyMzBweDtcXG4gIH1cXG59XFxuLyoqIElNUE9SVCBNT0RBTCBDT01QT05FTlQgKiovXFxuLm1vZGFsIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDI1JTtcXG4gIHJpZ2h0OiAyNSU7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjREI4ODc2O1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBwYWRkaW5nOiAzNXB4O1xcbiAgbWFyZ2luOiBhdXRvO1xcbn1cXG4ubW9kYWwgLm1vZGFsX2hlYWRlciB7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbi10b3A6IC0yMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxufVxcbi5tb2RhbCAubW9kYWxfaGVhZGVyIGltZyB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5tb2RhbCAubW9kYWxfaGVhZGVyIGgyIHtcXG4gIGZvbnQtc2l6ZTogNjMuNzJweDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxufVxcbi5tb2RhbCBmb3JtIGlucHV0IHtcXG4gIGZvbnQtc2l6ZTogMzZweDtcXG4gIG1hcmdpbi1ib3R0b206IDVweDtcXG59XFxuLm1vZGFsIGZvcm0gdGV4dGFyZWEge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIHJlc2l6ZTogdmVydGljYWw7XFxufVxcbi5tb2RhbCBmb3JtIGlucHV0LFxcbi5tb2RhbCBmb3JtIHRleHRhcmVhIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA2OHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG4ubW9kYWwgZm9ybSBsYWJlbCB7XFxuICBjb2xvcjogIzAwMDAwMDtcXG4gIGZvbnQtc2l6ZTogMzZweDtcXG59XFxuLm1vZGFsIGZvcm0gbGFiZWw6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcbn1cXG4ubW9kYWwgLmxhYmVsX3RleHRhcmVhIHtcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxufVxcblxcbi5oaWRlX2NvbnRlbnQge1xcbiAgYW5pbWF0aW9uOiAxcyBlYXNlLWluIGZvcndhcmRzIGZhZGUtb2ZmO1xcbn1cXG5Aa2V5ZnJhbWVzIGZhZGUtb2ZmIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgfVxcbn1cXG5cXG4uc2hvd19jb250ZW50IHtcXG4gIGFuaW1hdGlvbjogMXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLWluO1xcbn1cXG5Aa2V5ZnJhbWVzIGZhZGUtaW4ge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxufVxcblxcbi8qKiBJTVBPUlQgQ09OVEFDVCBCVVRUT04gQ09NUE9ORU5UICoqL1xcbi5jb250YWN0X2J1dHRvbiB7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDExcHg7XFxuICBtaW4td2lkdGg6IDE3MHB4O1xcbiAgbWluLWhlaWdodDogNzBweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM5MDFDMUM7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0cmFuc2l0aW9uOiBjb2xvciAwLjVzIGVhc2UtaW4sIGJhY2tncm91bmQtY29sb3IgMC41cyBlYXNlLWluO1xcbn1cXG4uY29udGFjdF9idXR0b246aG92ZXIge1xcbiAgY29sb3I6ICMwMDAwMDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjREI4ODc2O1xcbn1cXG5cXG4vKiogSU1QT1JUIFBIT1RPR1JBUEggSEVBREVSIENPTVBPTkVOVCAqKi9cXG4ucGhvdG9ncmFwaF9oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBmbGV4LXdyYXA6IG5vLXdyYXA7XFxuICBhbGlnbi1jb250ZW50OiBmbGVkLWVuZDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNGQUZBRkE7XFxuICBoZWlnaHQ6IDMxM3B4O1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG4gIHBhZGRpbmctbGVmdDogMzBweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDMwcHg7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciBkaXY6bnRoLWNoaWxkKDMpIHtcXG4gIG1hcmdpbi1yaWdodDogMjBweDtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgxLFxcbi5waG90b2dyYXBoX2hlYWRlciBoMixcXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDMge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciBoMSB7XFxuICBmb250LXNpemU6IDYzLjcycHg7XFxuICBtYXJnaW4tYm90dG9tOiAtMTVweDtcXG4gIGNvbG9yOiAjRDM1NzNDO1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDIge1xcbiAgbWFyZ2luLXRvcDogMTVweDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBmb250LXNpemU6IDIzLjIyNTgwNjQ1MTZweDtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDMge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgY29sb3I6ICM1MjUyNTI7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciAucGhvdG9ncmFwaF9hYm91dCxcXG4ucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIC5waG90b2dyYXBoX2J1dHRvbiB7XFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiA4MHB4O1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYWJvdXQge1xcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxuICAucGhvdG9ncmFwaF9oZWFkZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICBhbGlnbi1jb250ZW50OiBmbGVkLWVuZDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nLXRvcDogMTVweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciBoMSB7XFxuICAgIGZvbnQtc2l6ZTogNDEuNHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIGgyIHtcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIGgzIHtcXG4gICAgZm9udC1zaXplOiAxNi4zNjM2MzYzNjM2cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaF9idXR0b24ge1xcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXG4gIC5waG90b2dyYXBoX2hlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWNvbnRlbnQ6IGZsZWQtZW5kO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXG4gICAgYWxpZ24taXRlbXM6IGluaGVyaXQ7XFxuICAgIG1hcmdpbi1yaWdodDogMHB4O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIG1hcmdpbi10b3A6IDIwMHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyID4gLnBob3RvZ3JhcGhfYWJvdXQge1xcbiAgICBtYXJnaW4tbGVmdDogMDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciBoMSxcXG5oMixcXG5oMyB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciA+IC5waG90b2dyYXBoZXJfY2FyZCB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxufVxcbi8qKiBJTVBPUlQgU0VMRUNUIEZJTFRFUiBDT01QT05FTlQgKiovXFxuLnNlbGVjdF9idXR0b24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGJhY2tncm91bmQ6ICM5MDFDMUM7XFxuICBjb2xvcjogd2hpdGU7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA1cHg7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNXB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLWNvbG9yOiBub25lO1xcbiAgd2lkdGg6IDE3MHB4O1xcbiAgaGVpZ2h0OiA3MHB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uc2VsZWN0X2J1dHRvbjo6YWZ0ZXIge1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW47XFxuICBjb250ZW50OiBcXFwiPlxcXCI7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxuICBmb250LXNpemU6IDI1cHg7XFxuICB0ZXh0LWFsaWduOiByaWdodDtcXG4gIGZsb2F0OiByaWdodDtcXG4gIG1hcmdpbi1yaWdodDogMjBweDtcXG59XFxuXFxuLnNlbGVjdF9maWx0ZXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbn1cXG5cXG4uc2VsZWN0X2NvbnRlbnQge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJhY2tncm91bmQ6ICM5MDFDMUM7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA1cHg7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNXB4O1xcbiAgbWluLXdpZHRoOiAxNjBweDtcXG4gIGJveC1zaGFkb3c6IDBweCAycHggOHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICB6LWluZGV4OiAxO1xcbn1cXG4uc2VsZWN0X2NvbnRlbnQgLndoaXRlbGluZSB7XFxuICB3aWR0aDogOTAlO1xcbiAgaGVpZ2h0OiAxcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIG1hcmdpbi1sZWZ0OiA1JTtcXG59XFxuLnNlbGVjdF9jb250ZW50IGEge1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbjtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogMjBweDtcXG4gIHdpZHRoOiAxNzBweDtcXG4gIGhlaWdodDogNjBweDtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG4uc2VsZWN0X2NvbnRlbnQgYTpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluO1xcbiAgY29sb3I6ICMwMDAwMDA7XFxufVxcblxcbi5zZWxlY3RfZmlsdGVyOmhvdmVyIC5zZWxlY3RfY29udGVudCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLnNlbGVjdF9maWx0ZXI6aG92ZXIgLnNlbGVjdF9idXR0b246OmFmdGVyIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKC05MGRlZyk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4yNXMgZWFzZS1pbjtcXG59XFxuXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVIgU1RBVElTVElDIENPTVBPTkVOVCAqKi9cXG4ucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNEQjg4NzY7XFxuICBtaW4td2lkdGg6IDM3NnB4O1xcbiAgbWluLWhlaWdodDogODlweDtcXG4gIGJvdHRvbTogMDtcXG4gIHJpZ2h0OiAzOHB4O1xcbiAgei1pbmRleDogMjtcXG4gIG1hcmdpbi1ib3R0b206IC0yMnB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG4ucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyAudG90YWxfbGlrZXMsXFxuLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMgLnByaWNlX3JhdGVfZGFpbHkge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDIzLjIyNTgwNjQ1MTZweDtcXG4gIGxpbmUtaGVpZ2h0OiAzMXB4O1xcbiAgY29sb3I6ICMwMDAwMDA7XFxuICBwYWRkaW5nLXRvcDogMThweDtcXG59XFxuLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMgLnRvdGFsX2xpa2VzOmFmdGVyIHtcXG4gIHBhZGRpbmctbGVmdDogNXB4O1xcbiAgY29udGVudDogXFxcIuKZpVxcXCI7XFxuICBmb250LXNpemU6IDMwLjg5MDMyMjU4MDZweDtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxufVxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSIE1FRElBIENBUkRTIENPTVBPTkVOVCAqKi9cXG4ubWVkaWFfY2FyZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIG1heC13aWR0aDogMzUwcHg7XFxufVxcbi5tZWRpYV9jYXJkIGltZyxcXG4ubWVkaWFfY2FyZCB2aWRlbyB7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXgtaGVpZ2h0OiAzMDBweDtcXG4gIG1pbi1oZWlnaHQ6IDMwMHB4O1xcbiAgb2JqZWN0LWZpdDogY292ZXI7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcbi5tZWRpYV9jYXJkIGltZzpob3ZlcixcXG4ubWVkaWFfY2FyZCB2aWRlbzpob3ZlciB7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG59XFxuLm1lZGlhX2NhcmQgLmRldGFpbHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxuICBtYXJnaW4tdG9wOiA1cHg7XFxufVxcbi5tZWRpYV9jYXJkIGg2IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgY29sb3I6ICM5MDFDMUM7XFxufVxcbi5tZWRpYV9jYXJkIGg2Omxhc3QtY2hpbGQ6OmFmdGVyIHtcXG4gIGZvbnQtc2l6ZTogMzBweDtcXG4gIHBhZGRpbmctbGVmdDogMTBweDtcXG4gIGNvbnRlbnQ6IFxcXCLimaVcXFwiO1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gIC5tZWRpYV9jYXJkIGltZyxcXG4ubWVkaWFfY2FyZCB7XFxuICAgIG1heC13aWR0aDogMTAwJTtcXG4gIH1cXG59XFxuLyoqIElNUE9SVCBQQUdFUyAob3RoZXIpIFN0eWxlcyAqKi9cXG4ucGhvdG9ncmFwaGVyX3NlY3Rpb24ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxuICBnYXA6IDcwcHg7XFxuICBtYXJnaW4tdG9wOiA3NXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNzVweDtcXG59XFxuXFxuLm1hcmdpbl9sZWZ0X3JpZ2h0IHtcXG4gIG1hcmdpbjogMCAxMDBweDtcXG59XFxuXFxuLmZpbHRlcl9zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcbi5maWx0ZXJfc2VjdGlvbiBoNTpmaXJzdC1jaGlsZCB7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAyOHB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBjb2xvcjogIzAwMDAwMDtcXG59XFxuLmZpbHRlcl9zZWN0aW9uIC5zZWxlY3RfZmlsdGVyIHtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcblxcbi5tZWRpYV9zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcbiAgcm93LWdhcDogMzBweDtcXG4gIGNvbHVtbi1nYXA6IDk1cHg7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNzVweDtcXG59XFxuXFxuLyoqIElNUE9SVCBGT09URVIgU1RZTEVTICoqL1xcbmZvb3RlciB7XFxuICBoZWlnaHQ6IDJweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBtYXJnaW4tdG9wOiA3NXB4O1xcbn1cXG5cXG4vKiogSU1QT1JUIFJFU1BPTlNJVkUgU1RZTEVTIGZvciBOb24gQ29tcG9uZW50cyBFbGVtZW50c1xcbiAoY29tcG9uZW50cyBFbGVtZW50cyBnb3QgdGhlaXIgb3duIFJlc3BvbnNpdmUgUnVsZXMgaW4gdGhlaXIgU3R5bGVzaGVldCkgKiovXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgLnBob3RvZ3JhcGhlcl9zZWN0aW9uLFxcbi5tZWRpYV9zZWN0aW9uIHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXG4gIGhlYWRlciB7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIG1hcmdpbi10b3A6IDQwcHg7XFxuICAgIGhlaWdodDogMTAwcHg7XFxuICB9XFxuICBoZWFkZXIgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDA7XFxuICB9XFxuICBoZWFkZXIgLmxvZ28sXFxuaGVhZGVyIGgxIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxuICAgIG1hcmdpbi1yaWdodDogMjBweDtcXG4gICAgZm9udC1zaXplOiAzMHB4O1xcbiAgfVxcbiAgLm1hcmdpbl9sZWZ0X3JpZ2h0IHtcXG4gICAgbWFyZ2luOiAwIDIwcHg7XFxuICB9XFxuICAuZmlsdGVyX3NlY3Rpb24ge1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcbiAgLnBob3RvZ3JhcGhlcl9zZWN0aW9uIHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgLm1lZGlhX3NlY3Rpb24ge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXG4gIH1cXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3Njc3MvbWFpbi5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fdmFyaWFibGVzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19nbG9iYWwuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvcGFnZXMvX2hlYWRlci5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fbWl4aW4uc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fcGhvdG9ncmFwaGVyX2NhcmRzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX21vZGFsLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX2NvbnRhY3RfYnV0dG9uLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX3Bob3RvZ3JhcGhfaGVhZGVyLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX3NlbGVjdF9maWx0ZXIuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fcGhvdG9ncmFwaGVyX3N0YXRpc3RpYy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19tZWRpYV9jYXJkcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9wYWdlcy9fcGFnZXMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvcGFnZXMvX2Zvb3Rlci5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nz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RUFDSSxzQ0FBQTtBTjBISjtBTXhISTtFQUNJO0lBQ0ksVUFBQTtFTjBIVjtFTXZITTtJQUNJLFVBQUE7RU55SFY7QUFDRjs7QUE5TUEsc0NBQUE7QU9aQTtFQUNJLGVBQUE7RUFDQSxnQk5DYztFTUFkLGtDTkZVO0VNR1YsWU5LWTtFTUpaLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLHlCTkdhO0VNRmIsa0JBQUE7RUFDQSxlQUFBO0VBQ0EsNkRBQUE7QVA4Tko7QU81Tkk7RUFDSSxjTkxhO0VNTWIseUJBQUE7QVA4TlI7O0FBaE9BLHlDQUFBO0FRZEE7RUpLRSxhQUFBO0VBQ0EsbUJJTHNCO0VKUXBCLGtCSVJ5QjtFSll6Qix1Qklaa0M7RUpnQmxDLDhCSWhCNEM7RUFDNUMseUJQYWtCO0VPWmxCLGFBQUE7RUFDQSxnQkFBQTtFSmdDRixrQkkvQmtDO0VKZ0NsQyxtQkloQ2tDO0FSdVBwQztBUXJQSTtFQUNJLGtCQUFBO0FSdVBSO0FRblBJOzs7RUFHSSxrQ1BkTTtFT2VOLGdCUGRZO0FEbVFwQjtBUWxQSTtFQUNJLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxjUFRTO0FENlBqQjtBUWpQSTtFQUNJLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQkFBQTtFQUNBLGNQakJTO0FEb1FqQjtBUWhQSTtFQUNJLGVBQUE7RUFDQSxjUHBCVztBRHNRbkI7QVEvT0k7O0VKaENGLGFBQUE7RUFDQSxzQklpQzBCO0VKdEJ4Qix1QklzQjRDO0VKbEI1Qyx1QklrQm9EO0FSb1B4RDtBUWpQSTtFQUNJLGdCQUFBO0VBQ0Esa0JBQUE7QVJtUFI7QVFoUEk7RUFDSSxpQkFBQTtFQUNBLG1CQUFBO0FSa1BSOztBUTdPQTtFQUNJO0lBQ0ksdUJQL0NRO0lHSmQsYUFBQTtJQUNBLHNCSW1EMEI7SUpoRHhCLGVJZ0RnQztJSjVDaEMsdUJJNENzQztJSnhDdEMsOEJJd0NnRDtJSnBDaEQsbUJJb0MrRDtJQUMzRCxpQkFBQTtFUnFQTjtFUWxQRTtJQUNJLGlCQUFBO0VSb1BOO0VRalBFO0lBQ0ksZUFB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RUFDSSxhQUFBO0VBQ0Esa0NBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBWmdnQko7O0FZMWZBO0VBQ0ksZUFBQTtBWjZmSjs7QVkxZkE7RVJYRSxhQUFBO0VBQ0EsbUJRV3NCO0VSSXBCLHFCUUoyQztFQUMzQyxjQUFBO0FaK2ZKO0FZN2ZJO0VBQ0ksZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGtDWHRCTTtFV3VCTixnQlhyQlU7RVdzQlYsa0JBQUE7RUFDQSxlQUFBO0VBQ0EsY1hqQmE7QURnaEJyQjtBWTVmSTtFQUNJLGdCQUFBO0FaOGZSOztBWTFmQTtFQUNJLGFBQUE7RUFDQSxrQ0FBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QVo2Zko7O0FBOWdCQSwyQkFBQTtBYXhCQTtFQUNJLFdBQUE7RUFDQSxXQUFBO0VBQ0EsdUJaTVk7RVlMWixnQkFBQTtBYjBpQko7O0FBcGhCQTs0RUFBQTtBYzFCQTtFQUVJOztJQUVJLDhCQUFBO0Vka2pCTjtBQUNGO0FjN2lCQTtFQUVJO0lBQ0ksc0JBQUE7SUFDQSxnQkFBQTtJQUNBLGFBQUE7RWQ4aUJOO0VjNWlCTTtJQUNJLGNBQUE7RWQ4aUJWO0VjM2lCTTs7SUFFSSxpQkFBQTtJQUNBLGtCQUFBO0lBQ0EsZUFBQTtFZDZpQlY7RWN6aUJFO0lBQ0ksY0FBQTtFZDJpQk47RWN2aUJFO0lBQ0ksOEJBQUE7RWR5aUJOO0FBQ0Y7QWNyaUJBO0VBRUk7SUFDSSwwQkFBQTtFZHNpQk47QUFDRjtBY2xpQkE7RUFFSTtJQUNJLDBCQUFBO0VkbWlCTjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qKiBVc2VkIHRvIGxvYWQgYWxsIHZhcmlhYmxlcyBmb3IgdGhpcyBwcm9qZWN0IGFib3V0IFNDU1MgKiovXFxyXFxuQGltcG9ydCBcXFwiX3ZhcmlhYmxlcy5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIEdMT0JBTCBDU1MgRk9SIEZPTlRTIEhUTUwsKiBTRUxFQ1RPUiAqKi9cXHJcXG5AaW1wb3J0IFxcXCJfZ2xvYmFsLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgTUlYSU4gKiovXFxyXFxuQGltcG9ydCBcXFwiX21peGluLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgSEVBREVSIFNUWUxFUyAqKi9cXHJcXG5AaW1wb3J0IFxcXCJwYWdlcy9oZWFkZXIuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVJTIENBUkRTICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvcGhvdG9ncmFwaGVyX2NhcmRzLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgTU9EQUwgQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvbW9kYWwuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBDT05UQUNUIEJVVFRPTiBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9jb250YWN0X2J1dHRvbi5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFBIT1RPR1JBUEggSEVBREVSIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL3Bob3RvZ3JhcGhfaGVhZGVyLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgU0VMRUNUIEZJTFRFUiBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9zZWxlY3RfZmlsdGVyLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSIFNUQVRJU1RJQyBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9waG90b2dyYXBoZXJfc3RhdGlzdGljLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSIE1FRElBIENBUkRTIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL21lZGlhX2NhcmRzLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUEFHRVMgKG90aGVyKSBTdHlsZXMgKiovXFxyXFxuQGltcG9ydCBcXFwicGFnZXMvcGFnZXMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBGT09URVIgU1RZTEVTICoqL1xcclxcbkBpbXBvcnQgXFxcInBhZ2VzL2Zvb3Rlci5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFJFU1BPTlNJVkUgU1RZTEVTIGZvciBOb24gQ29tcG9uZW50cyBFbGVtZW50c1xcclxcbiAoY29tcG9uZW50cyBFbGVtZW50cyBnb3QgdGhlaXIgb3duIFJlc3BvbnNpdmUgUnVsZXMgaW4gdGhlaXIgU3R5bGVzaGVldCkgKiovXFxyXFxuQGltcG9ydCBcXFwiX3Jlc3BvbnNpdmUuc2Nzc1xcXCI7XCIsXCIvKiogRk9OVCAqKi9cXHJcXG4kZm9udF9nbG9iYWw6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXHJcXG4kZm9udF93ZWlnaHRfc21hbGw6IDQwMDtcXHJcXG4kZm9udF93ZWlnaHRfYmlnOiA3MDA7XFxyXFxuXFxyXFxuJGZvbnRfc2l6ZTogMzZweDtcXHJcXG4vKiogRU5EIEZPTlQgKiovXFxyXFxuXFxyXFxuLyoqIENPTE9SIFZBUklBQkxFUyAqKi9cXHJcXG4kZGVmYXVsdF9jb2xvcjogd2hpdGU7XFxyXFxuJGRlZmF1bHRfZm9udF9jb2xvcjogIzAwMDAwMDtcXHJcXG4kY29sb3JfZ3JheTogIzc1NzU3NTtcXHJcXG4kY29sb3JfcHJpbWFyeTE6ICM5MDFDMUM7XFxyXFxuJGNvbG9yX3ByaW1hcnkyOiAjRDM1NzNDO1xcclxcbiRjb2xvcl9zZWNvbmRhcnkyOiAjNTI1MjUyO1xcclxcbiRjb2xvcl9zZWNvbmRhcnkyX2JnOiAjRkFGQUZBO1xcclxcbiRjb2xvcl9iYWNrZ3JvdW5kOiAjREI4ODc2O1xcclxcbi8qKiBFTkQgQ09MT1IgVkFSSUFCTEVTICoqL1wiLFwiLyoqKioqKioqKioqKioqKioqKioqKiogR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1xcclxcbmh0bWwsXFxyXFxuKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgYW5pbWF0aW9uOiAxcyBlYXNlLWluIGZvcndhcmRzIGZhZGUtaW47XFxyXFxuXFxyXFxuICBAa2V5ZnJhbWVzIGZhZGUtaW4ge1xcclxcbiAgICAwJSB7XFxyXFxuICAgICAgb3BhY2l0eTogMDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAxMDAlIHtcXHJcXG4gICAgICBvcGFjaXR5OiAxLjA7XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuLyoqKioqKioqKioqKioqKioqKioqKiogRU5EIEdFTkVSQUwgKioqKioqKioqKioqKioqKioqKioqKi9cIixcImhlYWRlciB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMocm93LCBudWxsLCBudWxsLCBzcGFjZS1iZXR3ZWVuLCBjZW50ZXIpO1xcclxcbiAgICBoZWlnaHQ6IDEyMHB4O1xcclxcblxcclxcblxcclxcbiAgICBoMSB7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICAgICAgdG9wOiA0NHB4O1xcclxcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMDBweDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfc21hbGw7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemU7XFxyXFxuICAgICAgICBsaW5lLWhlaWdodDogNDdweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAubG9nbyxcXHJcXG4gICAgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXHJcXG4gICAgICAgIGhlaWdodDogNTBweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAubG9nbyB7XFxyXFxuICAgICAgICBtYXJnaW4tbGVmdDogMTE1cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxMDBweDtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgIH1cXHJcXG59XCIsXCJAbWl4aW4gZmxleC1iYXNpYygkZmxleC1kaXJlY3Rpb24sXFxyXFxuICAkZmxleC13cmFwLFxcclxcbiAgJGFsaWduLWNvbnRlbnQsXFxyXFxuICAkanVzdGlmeS1jb250ZW50LFxcclxcbiAgJGFsaWduLWl0ZW1zKSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246ICRmbGV4LWRpcmVjdGlvbjtcXHJcXG5cXHJcXG4gIEBpZiAoJGZsZXgtd3JhcCkge1xcclxcbiAgICBmbGV4LXdyYXA6ICRmbGV4LXdyYXA7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBAaWYgKCRhbGlnbi1jb250ZW50KSB7XFxyXFxuICAgIGFsaWduLWNvbnRlbnQ6ICRhbGlnbi1jb250ZW50O1xcclxcbiAgfVxcclxcblxcclxcbiAgQGlmICgkanVzdGlmeS1jb250ZW50KSB7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogJGp1c3RpZnktY29udGVudDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIEBpZiAoJGFsaWduLWl0ZW1zKSB7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiAkYWxpZ24taXRlbXM7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi8vIEBtaXhpbiBtYXNrLWNyb3NzYnJvd3NlcigkdmFsdWUpIHtcXHJcXG4vLyAgIC13ZWJraXQtbWFzazogJHZhbHVlO1xcclxcbi8vICAgbWFzazogJHZhbHVlO1xcclxcbi8vIH1cXHJcXG5cXHJcXG4vLyBAbWl4aW4gbWFyZ2luLWxlZnQtYW5kLXJpZ2h0KCR2YWx1ZSkge1xcclxcbi8vICAgbWFyZ2luLWxlZnQ6ICR2YWx1ZTtcXHJcXG4vLyAgIG1hcmdpbi1yaWdodDogJHZhbHVlO1xcclxcbi8vIH1cXHJcXG5cXHJcXG5AbWl4aW4gcGFkZGluZy1sZWZ0LWFuZC1yaWdodCgkdmFsdWUpIHtcXHJcXG4gIHBhZGRpbmctbGVmdDogJHZhbHVlO1xcclxcbiAgcGFkZGluZy1yaWdodDogJHZhbHVlO1xcclxcbn1cIixcIi5waG90b2dyYXBoZXJfY2FyZCB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCBudWxsLCBudWxsLCBjZW50ZXIsIGNlbnRlcik7XFxyXFxuICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xcclxcblxcclxcbiAgICBpbWcge1xcclxcbiAgICAgICAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxuICAgICAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcclxcbiAgICAgICAgaGVpZ2h0OiAyMDBweDtcXHJcXG4gICAgICAgIHdpZHRoOiAyMDBweDtcXHJcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgICAgIG9iamVjdC1maXQ6IGNvdmVyO1xcclxcblxcclxcbiAgICAgICAgJjpob3ZlciB7XFxyXFxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuNTApO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuICAgIGgyLFxcclxcbiAgICBoMyxcXHJcXG4gICAgaDQsXFxyXFxuICAgIGg1IHtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X3NtYWxsO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgyIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDIwcHg7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkyO1xcclxcbiAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgzIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMi43NjkpO1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDE3cHg7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGg0IHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDJweDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMy42KTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxM3B4O1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDUge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMnB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyA0KTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxMnB4O1xcclxcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9ncmF5O1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXHJcXG4gICAgLnBob3RvZ3JhcGhlcl9jYXJkIHtcXHJcXG4gICAgICAgIGgzIHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDIuNzY5ICogMS4zKTtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaDQge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMy42ICogMS4zKTtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaDUge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gNCAqIDEuMyk7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogNzAwcHgpIHtcXHJcXG4gICAgLnBob3RvZ3JhcGhlcl9jYXJkIHtcXHJcXG4gICAgICAgIGgzIHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDIuNzY5ICogMS41KTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGg0IHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDMuNiAqIDEuNSk7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBoNSB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyA0ICogMS41KTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGltZyB7XFxyXFxuICAgICAgICAgICAgd2lkdGg6IDIzMHB4O1xcclxcbiAgICAgICAgICAgIGhlaWdodDogMjMwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XCIsXCIubW9kYWwge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBsZWZ0OiAyNSU7XFxyXFxuICAgIHJpZ2h0OiAyNSU7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX2JhY2tncm91bmQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICBwYWRkaW5nOiAzNXB4O1xcclxcbiAgICBtYXJnaW46IGF1dG87XFxyXFxuXFxyXFxuXFxyXFxuICAgIC5tb2RhbF9oZWFkZXIge1xcclxcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAtMjBweDtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxyXFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICAgICAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcclxcblxcclxcbiAgICAgICAgaW1nIHtcXHJcXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBoMiB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgKiAxLjc3KTtcXHJcXG4gICAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGZvcm0gaW5wdXQge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUpO1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGZvcm0gdGV4dGFyZWEge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLzIpO1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcXHJcXG4gICAgICAgIHJlc2l6ZTogdmVydGljYWw7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgZm9ybSBpbnB1dCxcXHJcXG4gICAgZm9ybSB0ZXh0YXJlYSB7XFxyXFxuXFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgIGhlaWdodDogNjhweDtcXHJcXG4gICAgICAgIGJvcmRlcjogbm9uZTtcXHJcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbiAgICBmb3JtIGxhYmVsIHtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9mb250X2NvbG9yO1xcclxcbiAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGZvcm0gbGFiZWw6bGFzdC1jaGlsZCB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5sYWJlbF90ZXh0YXJlYSB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcblxcclxcbi5oaWRlX2NvbnRlbnQge1xcclxcbiAgICBhbmltYXRpb246IDFzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1vZmY7XFxyXFxuXFxyXFxuICAgIEBrZXlmcmFtZXMgZmFkZS1vZmYge1xcclxcbiAgICAgICAgMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDEuMDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIDEwMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDA7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuLnNob3dfY29udGVudCB7XFxyXFxuICAgIGFuaW1hdGlvbjogMXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLWluO1xcclxcblxcclxcbiAgICBAa2V5ZnJhbWVzIGZhZGUtaW4ge1xcclxcbiAgICAgICAgMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDA7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICAxMDAlIHtcXHJcXG4gICAgICAgICAgICBvcGFjaXR5OiAxLjA7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XCIsXCIuY29udGFjdF9idXR0b24ge1xcclxcbiAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuOCk7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICBjb2xvcjogJGRlZmF1bHRfY29sb3I7XFxyXFxuICAgIHBhZGRpbmc6IDExcHg7XFxyXFxuICAgIG1pbi13aWR0aDogMTcwcHg7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDcwcHg7XFxyXFxuICAgIGJvcmRlcjogbm9uZTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgdHJhbnNpdGlvbjogY29sb3IgMC41cyBlYXNlLWluLCBiYWNrZ3JvdW5kLWNvbG9yIDAuNXMgZWFzZS1pbjtcXHJcXG5cXHJcXG4gICAgJjpob3ZlciB7XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl9iYWNrZ3JvdW5kO1xcclxcbiAgICB9XFxyXFxufVwiLFwiLnBob3RvZ3JhcGhfaGVhZGVyIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhyb3csIG5vLXdyYXAsIGZsZWQtZW5kLCBzcGFjZS1iZXR3ZWVuLCBudWxsKTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX3NlY29uZGFyeTJfYmc7XFxyXFxuICAgIGhlaWdodDogMzEzcHg7XFxyXFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgIEBpbmNsdWRlIHBhZGRpbmctbGVmdC1hbmQtcmlnaHQoMzBweCk7XFxyXFxuXFxyXFxuICAgIGRpdjpudGgtY2hpbGQoMykge1xcclxcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuICAgIGgxLFxcclxcbiAgICBoMixcXHJcXG4gICAgaDMge1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfc21hbGw7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDEge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgKiAxLjc3KTtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IC0xNXB4O1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9wcmltYXJ5MjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoMiB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS41NSk7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgzIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udC1zaXplIC8gMik7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3NlY29uZGFyeTI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfYWJvdXQsXFxyXFxuICAgIC5waG90b2dyYXBoX2J1dHRvbiB7XFxyXFxuICAgICAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKGNvbHVtbiwgbnVsbCwgbnVsbCwgY2VudGVyLCBmbGV4LXN0YXJ0KTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9idXR0b24ge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMzBweDtcXHJcXG4gICAgICAgIG1hcmdpbi1yaWdodDogODBweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9hYm91dCB7XFxyXFxuICAgICAgICBtYXJnaW4tbGVmdDogMjBweDtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXIge1xcclxcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGRlZmF1bHRfY29sb3I7XFxyXFxuICAgICAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKGNvbHVtbiwgd3JhcCwgZmxlZC1lbmQsIHNwYWNlLWJldHdlZW4sIGNlbnRlcik7XFxyXFxuICAgICAgICBwYWRkaW5nLXRvcDogMTVweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXIgaDEge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgKiAxLjE1KTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXIgaDIge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjgpO1xcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciBoMyB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnQtc2l6ZSAvIDIuMik7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XFxyXFxuXFxyXFxuXFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDgwMHB4KSB7XFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciB7XFxyXFxuICAgICAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKGNvbHVtbiwgbnVsbCwgZmxlZC1lbmQsIHNwYWNlLWJldHdlZW4sIGNlbnRlcik7XFxyXFxuXFxyXFxuICAgICAgICAucGhvdG9ncmFwaF9idXR0b24ge1xcclxcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBpbmhlcml0O1xcclxcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMHB4O1xcclxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAyMDBweDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXI+LnBob3RvZ3JhcGhfYWJvdXQge1xcclxcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XFxyXFxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciBoMSxcXHJcXG4gICAgaDIsXFxyXFxuICAgIGgzIHtcXHJcXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXI+LnBob3RvZ3JhcGhlcl9jYXJkIHtcXHJcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG59XCIsXCIuc2VsZWN0X2J1dHRvbiB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGFsaWduLWNvbnRlbnQ6IGZsZXgtZW5kO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuXFxyXFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxyXFxuICAgIHBhZGRpbmctbGVmdDogMjBweDtcXHJcXG4gICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X2JpZztcXHJcXG4gICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAyKTtcXHJcXG4gICAgYmFja2dyb3VuZDogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICBjb2xvcjogJGRlZmF1bHRfY29sb3I7XFxyXFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDVweDtcXHJcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDVweDtcXHJcXG4gICAgYm9yZGVyOiBub25lO1xcclxcbiAgICBib3JkZXItY29sb3I6IG5vbmU7XFxyXFxuICAgIHdpZHRoOiAxNzBweDtcXHJcXG4gICAgaGVpZ2h0OiA3MHB4O1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5zZWxlY3RfYnV0dG9uOjphZnRlciB7XFxyXFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjI1cyBlYXNlLWluO1xcclxcbiAgICBjb250ZW50OiBcXFwiPlxcXCI7XFxyXFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXHJcXG4gICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjQ0KTtcXHJcXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxyXFxuICAgIGZsb2F0OiByaWdodDtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4uc2VsZWN0X2ZpbHRlciB7XFxyXFxuXFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4uc2VsZWN0X2NvbnRlbnQge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGJhY2tncm91bmQ6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNXB4O1xcclxcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNXB4O1xcclxcbiAgICBtaW4td2lkdGg6IDE2MHB4O1xcclxcbiAgICBib3gtc2hhZG93OiAwcHggMnB4IDhweCAwcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcclxcbiAgICB6LWluZGV4OiAxO1xcclxcblxcclxcblxcclxcbiAgICAud2hpdGVsaW5lIHtcXHJcXG4gICAgICAgIHdpZHRoOiA5MCU7XFxyXFxuICAgICAgICBoZWlnaHQ6IDFweDtcXHJcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDUlO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGEge1xcclxcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbjtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X2JpZztcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMik7XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfY29sb3I7XFxyXFxuICAgICAgICBwYWRkaW5nOiAyMHB4O1xcclxcbiAgICAgICAgd2lkdGg6IDE3MHB4O1xcclxcbiAgICAgICAgaGVpZ2h0OiA2MHB4O1xcclxcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgYTpob3ZlciB7XFxyXFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluO1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuLnNlbGVjdF9maWx0ZXI6aG92ZXIgLnNlbGVjdF9jb250ZW50IHtcXHJcXG5cXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcblxcclxcbi5zZWxlY3RfZmlsdGVyOmhvdmVyIC5zZWxlY3RfYnV0dG9uOjphZnRlciB7XFxyXFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC05MGRlZyk7XFxyXFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjI1cyBlYXNlLWluO1xcclxcbn1cIixcIi5waG90b2dyYXBoZXJfc3RhdGlzdGljIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhyb3csIG51bGwsIGZsZXgtc3RhcnQsIHNwYWNlLWFyb3VuZCwgYmFzZWxpbmUpO1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl9iYWNrZ3JvdW5kO1xcclxcbiAgICBtaW4td2lkdGg6IDM3NnB4O1xcclxcbiAgICBtaW4taGVpZ2h0OiA4OXB4O1xcclxcbiAgICBib3R0b206IDA7XFxyXFxuICAgIHJpZ2h0OiAzOHB4O1xcclxcbiAgICB6LWluZGV4OiAyO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAtMjJweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcblxcclxcblxcclxcblxcclxcbiAgICAudG90YWxfbGlrZXMsXFxyXFxuICAgIC5wcmljZV9yYXRlX2RhaWx5IHtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X2JpZztcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS41NSk7XFxyXFxuICAgICAgICBsaW5lLWhlaWdodDogMzFweDtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9mb250X2NvbG9yO1xcclxcbiAgICAgICAgcGFkZGluZy10b3A6IDE4cHg7XFxyXFxuXFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnRvdGFsX2xpa2VzOmFmdGVyIHtcXHJcXG4gICAgICAgIHBhZGRpbmctbGVmdDogNXB4O1xcclxcbiAgICAgICAgY29udGVudDogXFxcIuKZpVxcXCI7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNTUgKiAxLjMzKTtcXHJcXG4gICAgfVxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogNzAwcHgpIHtcXHJcXG4gICAgLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMge1xcclxcbiAgICAgICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgfVxcclxcblxcclxcbn1cIixcIi5tZWRpYV9jYXJkIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIG51bGwsIG51bGwsIG51bGwsIG51bGwpO1xcclxcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxuICAgIG1heC13aWR0aDogMzUwcHg7XFxyXFxuXFxyXFxuICAgIGltZyxcXHJcXG4gICAgdmlkZW8ge1xcclxcbiAgICAgICAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAxcztcXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgICAgbWF4LWhlaWdodDogMzAwcHg7XFxyXFxuICAgICAgICBtaW4taGVpZ2h0OiAzMDBweDtcXHJcXG4gICAgICAgIG9iamVjdC1maXQ6IGNvdmVyO1xcclxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcblxcclxcbiAgICAgICAgJjpob3ZlciB7XFxyXFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAxcztcXHJcXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgICAgICAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC41MCk7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG4gICAgLmRldGFpbHMge1xcclxcbiAgICAgICAgQGluY2x1ZGUgZmxleC1iYXNpYyhyb3csIG51bGwsIG51bGwsIHNwYWNlLWJldHdlZW4sIGJhc2VsaW5lKTtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDVweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoNiB7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9zbWFsbDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS41KTtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDY6bGFzdC1jaGlsZDo6YWZ0ZXIge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjUgKiAxLjI1KTtcXHJcXG4gICAgICAgIHBhZGRpbmctbGVmdDogMTBweDtcXHJcXG4gICAgICAgIGNvbnRlbnQ6IFxcXCLimaVcXFwiO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcblxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcclxcblxcclxcbiAgICAubWVkaWFfY2FyZCBpbWcsXFxyXFxuICAgIC5tZWRpYV9jYXJkIHtcXHJcXG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcXHJcXG4gICAgfVxcclxcbn1cIixcIi8vLy8gTUFJTiBQQUdFIC8vLyBcXHJcXG4ucGhvdG9ncmFwaGVyX3NlY3Rpb24ge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcclxcbiAgICBnYXA6IDcwcHg7XFxyXFxuICAgIG1hcmdpbi10b3A6IDc1cHg7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDc1cHg7XFxyXFxufVxcclxcblxcclxcbi8vLy8vIEVORCBNQUlOIFBBR0UgLy8gXFxyXFxuXFxyXFxuLy8vLy8vLy8vLy8vLy8vLyBQSE9UT0dSQVBIRVIgUEFHRSAvLy8vLy8vIFxcclxcbi5tYXJnaW5fbGVmdF9yaWdodCB7XFxyXFxuICAgIG1hcmdpbjogMCAxMDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZpbHRlcl9zZWN0aW9uIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhyb3csIG51bGwsIG51bGwsIG51bGwsIGJhc2VsaW5lKTtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDA7XFxyXFxuXFxyXFxuICAgIGg1OmZpcnN0LWNoaWxkIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDIwcHg7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDI4cHg7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnQtc2l6ZSAvIDIpO1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnNlbGVjdF9maWx0ZXIge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG4ubWVkaWFfc2VjdGlvbiB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxyXFxuICAgIHJvdy1nYXA6IDMwcHg7XFxyXFxuICAgIGNvbHVtbi1nYXA6IDk1cHg7XFxyXFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDc1cHg7XFxyXFxufVxcclxcblxcclxcbi8vLy8vLy8vLy8vLy8vIEVORCBQSE9UT0dSQVBIRVIgUEFHRSAvLy8vLy8vL1xcclxcblxcclxcblwiLFwiZm9vdGVyIHtcXHJcXG4gICAgaGVpZ2h0OiAycHg7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgbWFyZ2luLXRvcDogNzVweDtcXHJcXG59XCIsXCJAbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoZXJfc2VjdGlvbixcXHJcXG4gICAgLm1lZGlhX3NlY3Rpb24ge1xcclxcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcclxcblxcclxcbiAgICBoZWFkZXIge1xcclxcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDQwcHg7XFxyXFxuICAgICAgICBoZWlnaHQ6IDEwMHB4O1xcclxcblxcclxcbiAgICAgICAgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIC5sb2dvLFxcclxcbiAgICAgICAgaDEge1xcclxcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcclxcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuMjApO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5tYXJnaW5fbGVmdF9yaWdodCB7XFxyXFxuICAgICAgICBtYXJnaW46IDAgMjBweDtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbiAgICAuZmlsdGVyX3NlY3Rpb24ge1xcclxcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcclxcblxcclxcbiAgICAucGhvdG9ncmFwaGVyX3NlY3Rpb24ge1xcclxcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5tZWRpYV9zZWN0aW9uIHtcXHJcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMV0udXNlWzNdIS4vbWFpbi5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1sxXS51c2VbM10hLi9tYWluLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuLi8uLi9zY3NzL21haW4uc2Nzcyc7XHJcbmltcG9ydCB7IGdldFBob3RvZ3JhcGhlcnMsIGdldE1lZGlhcyB9IGZyb20gJy4uL3V0aWxzL2ZldGNoJztcclxuaW1wb3J0IHsgZGlzcGxheURhdGEgfSBmcm9tICcuLi9wYWdlcy9kaXNwbGF5RGF0YSc7XHJcbmltcG9ydCB7IGRpc3BsYXlNZWRpYSB9IGZyb20gJy4uL3BhZ2VzL2Rpc3BsYXlNZWRpYSc7XHJcbmltcG9ydCB7IGdldFVybFBhcmFtZXRlciB9IGZyb20gJy4uL3V0aWxzL2dldFVybFBhcmFtZXRlcic7XHJcbmltcG9ydCB7IHNvcnRCeUxpa2VzIH0gZnJvbSAnLi4vdXRpbHMvc29ydEJ5JztcclxuaW1wb3J0IHsgc2VsZWN0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vdXRpbHMvc2VsZWN0RmlsdGVyJztcclxuaW1wb3J0IHsgbW9kYWxNYXN0ZXIgfSBmcm9tICcuLi91dGlscy9tb2RhbEZvcm0nO1xyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGluaXRNYWluKCkge1xyXG4gICAgLy8gVHJ5IHRvIGdldCBkYXRhIGZyb20gcGhvdG9ncmFwaGVycyAmIG1lZGlhIGlmIGVycm9yIHRoZW4gcmVkaXJlY3QgdG8gNDA0IHBhZ2VcclxuICAgIHRyeSB7XHJcbiAgICAgICAgLy8gU0VUIFBob3RvZ3JhcGhlciBQcm9maWxlIERBVEFcclxuICAgICAgICBjb25zdCBpZFVSTCA9IGF3YWl0IGdldFVybFBhcmFtZXRlcihcImlkXCIpO1xyXG4gICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlcnMgPSBhd2FpdCBnZXRQaG90b2dyYXBoZXJzKCk7XHJcbiAgICAgICAgZGlzcGxheURhdGEocGhvdG9ncmFwaGVycywgXCIucGhvdG9ncmFwaF9oZWFkZXJcIiwgaWRVUkwpO1xyXG4gICAgICAgIC8vIEVORCBTRVQgUGhvdG9ncmFwaGVyIFByb2ZpbGUgRGF0YVxyXG5cclxuICAgICAgICAvLyBCdWlsZCBNZWRpYXMgRGF0YVxyXG4gICAgICAgIGNvbnN0IG1lZGlhcyA9IGF3YWl0IGdldE1lZGlhcygpO1xyXG4gICAgICAgIGRpc3BsYXlNZWRpYShtZWRpYXMuc29ydChzb3J0QnlMaWtlcyksIFwiLm1lZGlhX3NlY3Rpb25cIiwgaWRVUkwpOyAvLyBTb3J0IGJ5IGRlZmF1bHQgYnkgbGlrZXNcclxuICAgICAgICAvLyBFbmQgYnVpbGQgTWVkaWFzIERhdGFcclxuXHJcbiAgICAgICAgLy8gSW5pdCBzZWxlY3RGaWx0ZXIgQ29tcG9uZW50IGFuZCBoaXMgYmVoYXZpb3IsIG5lZWQgdG8gcHJvdmlkZSB0aGUgRGF0YSB0byBmaWx0ZXJcclxuICAgICAgICBzZWxlY3RGaWx0ZXJDb21wb25lbnQobWVkaWFzLCBpZFVSTCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGFnZSBwcmluY2lwYWwgaW5pdGnDqSBhdmVjIHN1Y2PDqHMgZGVwdWlzIGluaXRNYWluKClcIik7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICAvLyBJZiBpdCdzIGEgZmFpbCB0aGVuIHdlIHJlZGlyZWN0IHRvIDQwNCBFcnJvciBQYWdlIHNpbmNlIGluaXRNYWluKCkgaXQncyB0aGUgbWluaW1hbCBmdW5jdGlvbmFsaXR5XHJcbiAgICAgICAgLy8gQXRtIDQwNCBlcnJvciBwYWdlIGRvZXNuJ3QgZXhpc3RzIG11c3QgYmUgd3JpdGUgbGF0ZXJcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlZGlyaWdlciB2ZXJzIGxhIHBhZ2UgNDA0XCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBpbml0Q29udGFjdEZvcm0oKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RGb3JtTW9kYWwgPSBtb2RhbE1hc3RlcihcImJvZHlcIixcIm1haW5cIixcImNvbnRhY3RfbW9kYWxcIik7IC8vIENyZWF0ZSBhIE1vZGVsIFBhZ2UgT2JqZWN0XHJcbiAgICAgICAgY29udGFjdEZvcm1Nb2RhbC5hZGRDb250YWN0Rm9ybUxpc3RlbmVyKCk7IC8vIEFkZCBsaXN0ZW5lciBmb3IgQ29udGFjdCBGb3JtIE1vZGFsXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGb3JtdWxhaXJlIGNvbnRhY3QgaW5pdGnDqSBhdmVjIHN1Y2PDqHMgZGVwdWlzIGluaXRDb250YWN0Rm9ybSgpXCIpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbi8vIFdlIGluaXQgbWFpbiBwYWdlIGFuZCBjb250YWN0Rm9ybSBpbiBwYXJhbGxlbCBzbyB3ZSBkb24ndCB1c2UgYXdhaXQgdGhlcmUgZm9yIGZhc3QgcmVzcG9uc2VcclxuaW5pdE1haW4oKTtcclxuaW5pdENvbnRhY3RGb3JtKCk7XHJcblxyXG5cclxuIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJjc3NXaXRoTWFwcGluZ1RvU3RyaW5nIiwibGlzdCIsInRvU3RyaW5nIiwibWFwIiwiaXRlbSIsImNvbnRlbnQiLCJuZWVkTGF5ZXIiLCJjb25jYXQiLCJsZW5ndGgiLCJqb2luIiwiaSIsIm1vZHVsZXMiLCJtZWRpYSIsImRlZHVwZSIsInN1cHBvcnRzIiwibGF5ZXIiLCJ1bmRlZmluZWQiLCJhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzIiwiayIsImlkIiwiX2siLCJwdXNoIiwiY3NzTWFwcGluZyIsImJ0b2EiLCJiYXNlNjQiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJkYXRhIiwic291cmNlTWFwcGluZyIsInNvdXJjZVVSTHMiLCJzb3VyY2VzIiwic291cmNlIiwic291cmNlUm9vdCIsImRvbSIsIm1lZGlhRmFjdG9yeSIsInBob3RvZ3JhcGhlcklkIiwidGl0bGUiLCJpbWFnZSIsInZpZGVvIiwibGlrZXMiLCJkYXRlIiwicHJpY2UiLCJtb3ZpZSIsInBpY3R1cmUiLCJnZXRNZWRpYURPTSIsImFydGljbGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJsaW5rRWxlbWVudCIsImFwcGVuZENoaWxkIiwiYnVpbGRFbGVtZW50Iiwic2V0QXJpZWxMYWJlbCIsImluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50IiwiaW5zZXJ0VmlkZW9JbnNpZGVFbGVtZW50IiwidGl0bGVfaDYiLCJsaWtlc19oNiIsImluc2VydEhUTUxBZnRlckVsZW1lbnQiLCJzZXRJbm5lckh0bWwiLCJwaG90b2dyYXBoZXJGYWN0b3J5IiwibmFtZSIsImNpdHkiLCJjb3VudHJ5IiwidGFnbGluZSIsInBvcnRyYWl0IiwiZ2V0VXNlckNhcmRET00iLCJzZXRQaG90b2dyYXBoZXJIZWFkZXIiLCJpbWdQcm9maWxlIiwicXVlcnlTZWxlY3RvciIsInNldFN0aWNreUJhclByaWNlIiwiZGlzcGxheURhdGEiLCJwaG90b2dyYXBoZXJzIiwiZm9yRWFjaCIsInBob3RvZ3JhcGhlciIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImNvbnNvbGUiLCJsb2ciLCJwaG90b2dyYXBoZXJNb2RlbCIsInBob3RvZ3JhcGhlcnNTZWN0aW9uIiwidXNlckNhcmRET00iLCJkaXNwbGF5TWVkaWEiLCJtZWRpYXMiLCJ0b3RhbExpa2VzIiwibWVkaWFzU2VjdGlvbiIsIm1lZGlhTW9kZWwiLCJtZWRpYURPTSIsIndhcm4iLCJlbGVtZW50IiwiYWx0IiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiYXJpZWxMYWJlbCIsImh0bWwiLCJiYWxpc2UiLCJ2YWx1ZSIsInRleHRDb250ZW50IiwidGV4dGUiLCJ0ZXh0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJmZXRjaEpTT04iLCJ1cmwiLCJ0eXBlIiwicmVzcG9uc2UiLCJmZXRjaCIsIm9rIiwiRXJyb3IiLCJqc29uUmVzcG9uc2UiLCJqc29uIiwiZ2V0UGhvdG9ncmFwaGVycyIsImdldE1lZGlhcyIsImdldFVybFBhcmFtZXRlciIsInBhcmFtZXRlciIsImZ1bGxVcmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJVUkwiLCJwYXJhbWV0ZXJWYWx1ZSIsInNlYXJjaFBhcmFtcyIsImdldCIsIm1vZGFsTWFzdGVyIiwiYm9keVRhZyIsIm1haW5UYWciLCJtb2RhbElEIiwibW9kYWxQYWdlIiwiYm9keUhUTUwiLCJtYWluSFRNTCIsIm1vZGFsIiwidmlzaWJsZSIsImdldERvbVByb3ByaWV0eSIsImFkZENvbnRhY3RGb3JtTGlzdGVuZXIiLCJtb2RlbFBhZ2UiLCJnZXRFbGVtZW50QnlJZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJkaXNwbGF5TW9kYWwiLCJjbG9zZU1vZGFsIiwib2JqZWN0IiwiY2VudGVyTW9kYWwiLCJNd2lkdGgiLCJvZmZzZXRXaWR0aCIsIk1oZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJXd2lkdGgiLCJpbm5lcldpZHRoIiwiV2hlaWdodCIsImlubmVySGVpZ2h0Iiwic3R5bGUiLCJwb3NpdGlvbiIsInRvcCIsInBhZ2VZT2Zmc2V0IiwibGVmdCIsInBhZ2VYT2Zmc2V0IiwiZWZmZWN0QW5pbWF0aW9uIiwiaGlkZWNsYXNzIiwic2hvd2NsYXNzIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwib3ZlcmZsb3ciLCJkaXNwbGF5Iiwic2VuZE1lc3NhZ2UiLCJzb3J0QnlMaWtlcyIsInNvcnRCeURhdGUiLCJzb3J0QnlUaXRsZSIsInNlbGVjdEZpbHRlckNvbXBvbmVudCIsImlkVVJMIiwic2VsZWN0RmlsdGVyQnV0dG9uIiwic2VsZWN0RmlsdGVyU2VsZWN0MSIsInNlbGVjdEZpbHRlclNlbGVjdDIiLCJoYW5kbGVGaWx0ZXJBY3Rpb24iLCJldmVudCIsInNlbGVjdGVkSXRlbSIsInRhcmdldCIsInNvcnQiLCJlcnJvciIsImEiLCJiIiwiaW5pdE1haW4iLCJlIiwiaW5pdENvbnRhY3RGb3JtIiwiY29udGFjdEZvcm1Nb2RhbCJdLCJzb3VyY2VSb290IjoiIn0=
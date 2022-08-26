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
      const article = document.createElement("article");
      article.setAttribute("class", "media_card");
      const linkElement = article.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement)("a", "photographer.html?id=" + id)); // Check if image or video exists

      if (image) {
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.insertPictureInsideElement)(linkElement, picture);
      } else if (video) {
        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.insertVideoInsideElement)(linkElement, movie);
      }

      if (title) {
        let title_h6 = "<h6>" + title + "</h6>";
        let likes_h6 = "<h6>" + 0 + "</h6>";

        if (likes) {
          likes_h6 = "<h6>" + likes + "</h6>";
        }

        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.insertHTMLAfterElement)(linkElement, "<div class='details'>" + title_h6 + likes_h6 + "</div>");
      }

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
      const article = document.createElement("article");
      article.setAttribute("class", "photographer_card"); // Create Dynamique LINK with Picture

      const linkElement = article.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement)("a", "photographer.html?id=" + id));
      (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.insertPictureInsideElement)(linkElement, picture); // END Create Dynamique LINK with Picture

      article.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement)("h2", name));

      if (city && country) {
        article.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement)("h3", city + ", " + country));
      }

      if (tagline) {
        article.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement)("h4", tagline));
      }

      if (price) {
        article.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement)("h5", price + "€/jour"));
      }

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
    const imgProfile = document.querySelector(".photograph_header img");
    imgProfile.setAttribute("src", picture);
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
        console.log(photographer);
        const photographerModel = (0,_factories_photographerFactory__WEBPACK_IMPORTED_MODULE_0__.photographerFactory)(photographer);
        photographerModel.setPhotographerHeader();
        photographerModel.setStickyBarPrice(); // End of PhotographerFactory Work
      }
    } else {
      // Then we are going use the PhotographerFactory to generate DOM
      const photographersSection = document.querySelector(querySelector);
      const photographerModel = (0,_factories_photographerFactory__WEBPACK_IMPORTED_MODULE_0__.photographerFactory)(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();

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
        console.log(media); // Then we are going use the MediaFactory to generate DOM

        const mediasSection = document.querySelector(querySelector);
        const mediaModel = (0,_factories_mediaFactory__WEBPACK_IMPORTED_MODULE_0__.mediaFactory)(media);
        const mediaDOM = mediaModel.getMediaDOM();

        if (mediaDOM) {
          mediasSection.appendChild(mediaDOM);
        } // End of MediaFactory Work


        totalLikes += media.likes; // Count all likes

        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_1__.setInnerHtml)(".total_likes", totalLikes);
      }
    }
  });
  console.log("Total Like: " + totalLikes);
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
/* harmony export */   "setInnerHtml": () => (/* binding */ setInnerHtml)
/* harmony export */ });
// Function for build DOM
function insertPictureInsideElement(element, picture) {
  element.insertAdjacentHTML("beforeend", '<img src="' + picture + '">');
}
function insertVideoInsideElement(element, video) {
  element.insertAdjacentHTML("beforeend", '<video src="' + video + '">');
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

  return {
    photographers
  }; // Return data of PhotoGraphers
}
async function getMedias() {
  const url = "./data/photographers.json"; // Data source .JSON

  const medias = await fetchJSON(url, "media"); // use fetchJSON function from utils/fetch.js

  return {
    medias
  }; // Return data of Media
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n/** Used to load all variables for this project about SCSS **/ /** FONT **/\n/** END FONT **/\n/** COLOR VARIABLES **/\n/** END COLOR VARIABLES **/\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\n/********************** GENERAL **********************/\nhtml,\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: \"DM Sans\", sans-serif;\n  animation: 1s ease-in forwards fade-in;\n}\n\n@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n/********************** END GENERAL **********************/\n/** IMPORT MIXIN **/\n/** IMPORT HEADER STYLES **/\nheader {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  height: 120px;\n}\nheader h1 {\n  color: #901C1C;\n  top: 44px;\n  margin-right: 100px;\n  font-weight: 400;\n  font-size: 36px;\n  line-height: 47px;\n}\nheader .logo,\nheader .logo_photographer {\n  height: 50px;\n}\nheader .logo {\n  margin-left: 115px;\n}\nheader .logo_photographer {\n  margin-left: 100px;\n  margin-top: 10px;\n}\n\n/** IMPORT PHOTOGRAPHERS CARDS **/\n.photographer_card {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  justify-self: center;\n}\n.photographer_card img {\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  transition: box-shadow 1s;\n  height: 200px;\n  width: 200px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.photographer_card img:hover {\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.photographer_card h2,\n.photographer_card h3,\n.photographer_card h4,\n.photographer_card h5 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n}\n.photographer_card h2 {\n  margin-top: 20px;\n  color: #D3573C;\n  font-size: 36px;\n}\n.photographer_card h3 {\n  font-size: 13.0010834236px;\n  line-height: 17px;\n  color: #901C1C;\n}\n.photographer_card h4 {\n  margin-top: 2px;\n  font-size: 10px;\n  line-height: 13px;\n  color: #000000;\n}\n.photographer_card h5 {\n  margin-top: 2px;\n  font-size: 9px;\n  line-height: 12px;\n  text-align: center;\n  color: #757575;\n}\n\n@media (max-width: 1100px) {\n  .photographer_card h3 {\n    font-size: 16.9014084507px;\n    margin-top: 10px;\n  }\n  .photographer_card h4 {\n    font-size: 13px;\n    margin-top: 10px;\n  }\n  .photographer_card h5 {\n    font-size: 11.7px;\n    margin-top: 10px;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_card h3 {\n    font-size: 19.5016251354px;\n  }\n  .photographer_card h4 {\n    font-size: 15px;\n  }\n  .photographer_card h5 {\n    font-size: 13.5px;\n  }\n  .photographer_card img {\n    width: 230px;\n    height: 230px;\n  }\n}\n/** IMPORT MODAL COMPONENT **/\n.modal {\n  border-radius: 5px;\n  background-color: #DB8876;\n  width: 50%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n  padding: 35px;\n  margin: auto;\n}\n\n.modal header {\n  justify-content: space-between;\n  width: 100%;\n}\n\n.modal header img {\n  cursor: pointer;\n}\n\n.modal header h2 {\n  font-size: 63.72px;\n  font-weight: normal;\n  text-align: center;\n}\n\nform {\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  align-items: flex-start;\n}\n\nform label {\n  color: #525252;\n  font-size: 36px;\n}\n\nform div {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  align-items: self-start;\n  margin-bottom: 26px;\n}\n\nform input {\n  width: 100%;\n  height: 68px;\n  border: none;\n  border-radius: 5px;\n}\n\n/** IMPORT CONTACT BUTTON COMPONENT **/\n.contact_button {\n  font-size: 20px;\n  font-weight: 700;\n  font-family: \"DM Sans\", sans-serif;\n  color: white;\n  padding: 11px;\n  min-width: 170px;\n  min-height: 70px;\n  border: none;\n  background-color: #901C1C;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: color 0.5s ease-in, background-color 0.5s ease-in;\n}\n.contact_button:hover {\n  color: #000000;\n  background-color: #DB8876;\n}\n\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\n.photograph_header {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: no-wrap;\n  align-content: fled-end;\n  justify-content: space-between;\n  background-color: #FAFAFA;\n  height: 313px;\n  margin-top: 10px;\n  padding-left: 30px;\n  padding-right: 30px;\n}\n.photograph_header div:nth-child(3) {\n  margin-right: 20px;\n}\n.photograph_header h1,\n.photograph_header h2,\n.photograph_header h3 {\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 400;\n}\n.photograph_header h1 {\n  font-size: 63.72px;\n  margin-bottom: -15px;\n  color: #D3573C;\n}\n.photograph_header h2 {\n  margin-top: 15px;\n  margin-bottom: 20px;\n  font-size: 23.2258064516px;\n  color: #901C1C;\n}\n.photograph_header h3 {\n  font-size: 18px;\n  color: #525252;\n}\n.photograph_header .photograph_about,\n.photograph_header .photograph_button {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n}\n.photograph_header .photograph_button {\n  margin-top: 30px;\n  margin-right: 80px;\n}\n.photograph_header .photograph_about {\n  margin-left: 20px;\n  margin-bottom: 10px;\n}\n\n@media (max-width: 1100px) {\n  .photograph_header {\n    background-color: white;\n    display: flex;\n    flex-direction: column;\n    flex-wrap: wrap;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n    padding-top: 15px;\n  }\n  .photograph_header h1 {\n    font-size: 41.4px;\n  }\n  .photograph_header h2 {\n    font-size: 20px;\n  }\n  .photograph_header h3 {\n    font-size: 16.3636363636px;\n  }\n  .photograph_button {\n    margin-bottom: 30px;\n  }\n}\n@media (max-width: 800px) {\n  .photograph_header {\n    display: flex;\n    flex-direction: column;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n  }\n  .photograph_header .photograph_button {\n    align-items: inherit;\n    margin-right: 0px;\n    position: absolute;\n    margin-top: 200px;\n  }\n  .photograph_header > .photograph_about {\n    margin-left: 0;\n    align-items: center;\n  }\n  .photograph_header h1,\nh2,\nh3 {\n    text-align: center;\n  }\n  .photograph_header > .photographer_card {\n    display: none;\n  }\n}\n/** IMPORT SELECT FILTER COMPONENT **/\n.select_button {\n  display: flex;\n  align-content: flex-end;\n  align-items: center;\n  justify-content: space-between;\n  text-align: left;\n  padding-left: 20px;\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 18px;\n  background: #901C1C;\n  color: white;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n  border: none;\n  border-color: none;\n  width: 170px;\n  height: 70px;\n  cursor: pointer;\n}\n\n.select_button::after {\n  transition: transform 0.25s ease-in;\n  content: \">\";\n  transform: rotate(90deg);\n  font-size: 25px;\n  text-align: right;\n  float: right;\n  margin-right: 20px;\n}\n\n.select_filter {\n  position: relative;\n  display: inline-block;\n}\n\n.select_content {\n  display: none;\n  position: absolute;\n  background: #901C1C;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  min-width: 160px;\n  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n}\n.select_content .whiteline {\n  width: 90%;\n  height: 1px;\n  background-color: white;\n  margin-left: 5%;\n}\n.select_content a {\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-size: 18px;\n  color: white;\n  padding: 20px;\n  width: 170px;\n  height: 60px;\n  text-decoration: none;\n  display: block;\n}\n.select_content a:hover {\n  transition: all 0.5s ease-in;\n  color: #000000;\n}\n\n.select_filter:hover .select_content {\n  display: block;\n}\n\n.select_filter:hover .select_button::after {\n  transform: rotate(-90deg);\n  transition: transform 0.25s ease-in;\n}\n\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\n.photographer_statistic {\n  display: flex;\n  flex-direction: row;\n  align-content: flex-start;\n  justify-content: space-around;\n  align-items: baseline;\n  position: fixed;\n  background-color: #DB8876;\n  min-width: 376px;\n  min-height: 89px;\n  bottom: 0;\n  right: 38px;\n  z-index: 2;\n  margin-bottom: -22px;\n  border-radius: 5px;\n}\n.photographer_statistic .total_likes,\n.photographer_statistic .price_rate_daily {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 23.2258064516px;\n  line-height: 31px;\n  color: #000000;\n  padding-top: 18px;\n}\n.photographer_statistic .total_likes:after {\n  padding-left: 5px;\n  content: \"♥\";\n  font-size: 30.8903225806px;\n}\n\n@media (max-width: 700px) {\n  .photographer_statistic {\n    display: none;\n  }\n}\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\n.media_card {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  max-width: 350px;\n}\n.media_card img,\n.media_card video {\n  transition: box-shadow 1s;\n  width: 100%;\n  max-height: 300px;\n  min-height: 300px;\n  object-fit: cover;\n  border-radius: 5px;\n}\n.media_card img:hover,\n.media_card video:hover {\n  transition: box-shadow 1s;\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.media_card .details {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: baseline;\n  margin-top: 5px;\n}\n.media_card h6 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n  font-size: 24px;\n  color: #901C1C;\n}\n.media_card h6:last-child::after {\n  font-size: 30px;\n  padding-left: 10px;\n  content: \"♥\";\n}\n\n.media_card:has(video) {\n  content: \"V\";\n  border: 2px red solid;\n}\n\n@media (max-width: 600px) {\n  .media_card img,\n.media_card {\n    max-width: 100%;\n  }\n}\n/** IMPORT PAGES (other) Styles **/\n.photographer_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 70px;\n  margin-top: 75px;\n  margin-bottom: 75px;\n}\n\n.margin_left_right {\n  margin: 0 100px;\n}\n\n.filter_section {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline;\n  margin-left: 0;\n}\n.filter_section h5:first-child {\n  margin-top: 20px;\n  margin-right: 28px;\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-style: normal;\n  font-size: 18px;\n  color: #000000;\n}\n.filter_section .select_filter {\n  margin-top: 10px;\n}\n\n.media_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  row-gap: 30px;\n  column-gap: 95px;\n  margin-top: 20px;\n  margin-bottom: 75px;\n}\n\n#contact_modal {\n  display: none;\n}\n\n/** IMPORT FOOTER STYLES **/\nfooter {\n  height: 2px;\n  width: 100%;\n  background-color: white;\n  margin-top: 75px;\n}\n\n/** IMPORT RESPONSIVE STYLES for Non Components Elements **/\n@media (max-width: 1100px) {\n  .photographer_section,\n.media_section {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media (max-width: 800px) {\n  header {\n    flex-direction: column;\n    margin-top: 40px;\n    height: 100px;\n  }\n  header .logo_photographer {\n    margin-left: 0;\n  }\n  header .logo,\nheader h1 {\n    margin-left: 20px;\n    margin-right: 20px;\n    font-size: 30px;\n  }\n  .margin_left_right {\n    margin: 0 20px;\n  }\n  .filter_section {\n    justify-content: space-between;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_section {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 600px) {\n  .media_section {\n    grid-template-columns: 1fr;\n  }\n}", "",{"version":3,"sources":["webpack://./src/scss/main.scss","webpack://./src/scss/_variables.scss","webpack://./src/scss/_global.scss","webpack://./src/scss/pages/_header.scss","webpack://./src/scss/_mixin.scss","webpack://./src/scss/components/_photographer_cards.scss","webpack://./src/scss/components/_modal.scss","webpack://./src/scss/components/_contact_button.scss","webpack://./src/scss/components/_photograph_header.scss","webpack://./src/scss/components/_select_filter.scss","webpack://./src/scss/components/_photographer_statistic.scss","webpack://./src/scss/components/_media_cards.scss","webpack://./src/scss/pages/_pages.scss","webpack://./src/scss/pages/_footer.scss","webpack://./src/scss/_responsive.scss"],"names":[],"mappings":"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","sourcesContent":["/** Used to load all variables for this project about SCSS **/\r\n@import \"_variables.scss\";\r\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\r\n@import \"_global.scss\";\r\n/** IMPORT MIXIN **/\r\n@import \"_mixin.scss\";\r\n/** IMPORT HEADER STYLES **/\r\n@import \"pages/header.scss\";\r\n/** IMPORT PHOTOGRAPHERS CARDS **/\r\n@import \"components/photographer_cards.scss\";\r\n/** IMPORT MODAL COMPONENT **/\r\n@import \"components/modal.scss\";\r\n/** IMPORT CONTACT BUTTON COMPONENT **/\r\n@import \"components/contact_button.scss\";\r\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\r\n@import \"components/photograph_header.scss\";\r\n/** IMPORT SELECT FILTER COMPONENT **/\r\n@import \"components/select_filter.scss\";\r\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\r\n@import \"components/photographer_statistic.scss\";\r\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\r\n@import \"components/media_cards.scss\";\r\n/** IMPORT PAGES (other) Styles **/\r\n@import \"pages/pages.scss\";\r\n/** IMPORT FOOTER STYLES **/\r\n@import \"pages/footer.scss\";\r\n/** IMPORT RESPONSIVE STYLES for Non Components Elements **/\r\n@import \"_responsive.scss\";","/** FONT **/\r\n$font_global: \"DM Sans\", sans-serif;\r\n$font_weight_small: 400;\r\n$font_weight_big: 700;\r\n\r\n$font_size: 36px;\r\n/** END FONT **/\r\n\r\n/** COLOR VARIABLES **/\r\n$default_color: white;\r\n$default_font_color: #000000;\r\n$color_gray: #757575;\r\n$color_primary1: #901C1C;\r\n$color_primary2: #D3573C;\r\n$color_secondary2: #525252;\r\n$color_secondary2_bg: #FAFAFA;\r\n$color_background: #DB8876;\r\n/** END COLOR VARIABLES **/","/********************** GENERAL **********************/\r\nhtml,\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n\r\n}\r\n\r\nbody {\r\n  font-family: $font_global;\r\n  animation: 1s ease-in forwards fade-in;\r\n}\r\n\r\n\r\n@keyframes fade-in {\r\n  0% {\r\n    opacity: 0;\r\n  }\r\n\r\n  100% {\r\n    opacity: 1.0;\r\n  }\r\n}\r\n\r\n/********************** END GENERAL **********************/","header {\r\n    @include flex-basic(row, null, null, space-between, center);\r\n    height: 120px;\r\n\r\n\r\n    h1 {\r\n        color: $color_primary1;\r\n        top: 44px;\r\n        margin-right: 100px;\r\n        font-weight: $font_weight_small;\r\n        font-size: $font_size;\r\n        line-height: 47px;\r\n    }\r\n\r\n    .logo,\r\n    .logo_photographer {\r\n        height: 50px;\r\n    }\r\n\r\n    .logo {\r\n        margin-left: 115px;\r\n    }\r\n\r\n    .logo_photographer {\r\n        margin-left: 100px;\r\n        margin-top: 10px;\r\n    }\r\n}","@mixin flex-basic($flex-direction,\r\n  $flex-wrap,\r\n  $align-content,\r\n  $justify-content,\r\n  $align-items) {\r\n  display: flex;\r\n  flex-direction: $flex-direction;\r\n\r\n  @if ($flex-wrap) {\r\n    flex-wrap: $flex-wrap;\r\n  }\r\n\r\n  @if ($align-content) {\r\n    align-content: $align-content;\r\n  }\r\n\r\n  @if ($justify-content) {\r\n    justify-content: $justify-content;\r\n  }\r\n\r\n  @if ($align-items) {\r\n    align-items: $align-items;\r\n  }\r\n}\r\n\r\n// @mixin mask-crossbrowser($value) {\r\n//   -webkit-mask: $value;\r\n//   mask: $value;\r\n// }\r\n\r\n// @mixin margin-left-and-right($value) {\r\n//   margin-left: $value;\r\n//   margin-right: $value;\r\n// }\r\n\r\n@mixin padding-left-and-right($value) {\r\n  padding-left: $value;\r\n  padding-right: $value;\r\n}",".photographer_card {\r\n    @include flex-basic(column, null, null, center, center);\r\n    justify-self: center;\r\n\r\n    img {\r\n        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n        transition: box-shadow 1s;\r\n        height: 200px;\r\n        width: 200px;\r\n        border-radius: 50%;\r\n        object-fit: cover;\r\n\r\n        &:hover {\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n    \r\n    h2,\r\n    h3,\r\n    h4,\r\n    h5 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 20px;\r\n        color: $color_primary2;\r\n        font-size: $font_size;\r\n    }\r\n\r\n    h3 {\r\n        font-size: $font_size / 2.769;\r\n        line-height: 17px;\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h4 {\r\n        margin-top: 2px;\r\n        font-size: $font_size / 3.6;\r\n        line-height: 13px;\r\n        color: $default_font_color;\r\n    }\r\n\r\n    h5 {\r\n        margin-top: 2px;\r\n        font-size: $font_size / 4;;\r\n        line-height: 12px;\r\n        text-align: center;\r\n        color: $color_gray;\r\n    }\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: $font_size / 2.769 * 1.3;\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h4 {\r\n            font-size: $font_size / 3.6 * 1.3;\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h5 {\r\n            font-size: $font_size / 4 * 1.3;\r\n            margin-top: 10px;\r\n        }\r\n    }\r\n\r\n}\r\n\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: $font_size / 2.769 * 1.5;\r\n        }\r\n\r\n        h4 {\r\n            font-size: $font_size / 3.6 * 1.5;\r\n        }\r\n\r\n        h5 {\r\n            font-size: $font_size / 4 * 1.5;\r\n        }\r\n\r\n        img {\r\n            width: 230px;\r\n            height: 230px;\r\n        }\r\n    }\r\n\r\n}",".modal {\r\n    border-radius: 5px;\r\n    background-color: $color_background;\r\n    width: 50%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    padding: 35px;\r\n    margin: auto;\r\n}\r\n\r\n.modal header {\r\n    justify-content: space-between;\r\n    width: 100%;\r\n}\r\n\r\n.modal header img {\r\n    cursor: pointer;\r\n}\r\n\r\n.modal header h2 {\r\n    font-size: $font_size * 1.77;\r\n    font-weight: normal;\r\n    text-align: center;\r\n}\r\n\r\nform {\r\n    display: flex;\r\n    width: 100%;\r\n    flex-direction: column;\r\n    align-items: flex-start;\r\n}\r\n\r\nform label {\r\n    color: $color_secondary2;\r\n    font-size: $font_size;\r\n}\r\n\r\nform div {\r\n    display: flex;\r\n    flex-direction: column;\r\n    width: 100%;\r\n    align-items: self-start;\r\n    margin-bottom: 26px;\r\n}\r\n\r\nform input {\r\n    width: 100%;\r\n    height: 68px;\r\n    border: none;\r\n    border-radius: 5px;\r\n}",".contact_button {\r\n    font-size: $font_size / 1.8;\r\n    font-weight: $font_weight_big;\r\n    font-family: $font_global;\r\n    color: $default_color;\r\n    padding: 11px;\r\n    min-width: 170px;\r\n    min-height: 70px;\r\n    border: none;\r\n    background-color: $color_primary1;\r\n    border-radius: 5px;\r\n    cursor: pointer;\r\n    transition: color 0.5s ease-in, background-color 0.5s ease-in;\r\n\r\n    &:hover {\r\n        color: $default_font_color;\r\n        background-color: $color_background;\r\n    }\r\n}\r\n\r\n",".photograph_header {\r\n    @include flex-basic(row, no-wrap, fled-end, space-between, null);\r\n    background-color: $color_secondary2_bg;\r\n    height: 313px;\r\n    margin-top: 10px;\r\n    @include padding-left-and-right(30px);\r\n\r\n    div:nth-child(3) {\r\n        margin-right: 20px;\r\n    }\r\n\r\n\r\n    h1,\r\n    h2,\r\n    h3 {\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h1 {\r\n        font-size: $font_size * 1.77;\r\n        margin-bottom: -15px;\r\n        color: $color_primary2;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 15px;\r\n        margin-bottom: 20px;\r\n        font-size: $font_size / 1.55;\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h3 {\r\n        font-size: $font-size / 2;\r\n        color: $color_secondary2;\r\n    }\r\n\r\n    .photograph_about,\r\n    .photograph_button {\r\n        @include flex-basic(column, null, null, center, flex-start);\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-top: 30px;\r\n        margin-right: 80px;\r\n    }\r\n\r\n    .photograph_about {\r\n        margin-left: 20px;\r\n        margin-bottom: 10px;\r\n    }\r\n}\r\n\r\n\r\n@media (max-width: 1100px) {\r\n    .photograph_header {\r\n        background-color: $default_color;\r\n        @include flex-basic(column, wrap, fled-end, space-between, center);\r\n        padding-top: 15px;\r\n    }\r\n\r\n    .photograph_header h1 {\r\n        font-size: $font_size * 1.15;\r\n    }\r\n\r\n    .photograph_header h2 {\r\n        font-size: $font_size / 1.8;\r\n\r\n    }\r\n\r\n    .photograph_header h3 {\r\n        font-size: $font-size / 2.2;\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-bottom: 30px;\r\n\r\n\r\n    }\r\n\r\n\r\n}\r\n\r\n@media (max-width: 800px) {\r\n    .photograph_header {\r\n        @include flex-basic(column, null, fled-end, space-between, center);\r\n\r\n        .photograph_button {\r\n            align-items: inherit;\r\n            margin-right: 0px;\r\n            position: absolute;\r\n            margin-top: 200px;\r\n        }\r\n\r\n    }\r\n\r\n    .photograph_header>.photograph_about {\r\n        margin-left: 0;\r\n        align-items: center;\r\n    }\r\n\r\n    .photograph_header h1,\r\n    h2,\r\n    h3 {\r\n        text-align: center;\r\n    }\r\n\r\n    .photograph_header>.photographer_card {\r\n        display: none;\r\n    }\r\n\r\n\r\n}",".select_button {\r\n    display: flex;\r\n    align-content: flex-end;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n\r\n    text-align: left;\r\n    padding-left: 20px;\r\n    font-family: $font_global;\r\n    font-style: normal;\r\n    font-weight: $font_weight_big;\r\n    font-size: $font_size / 2;\r\n    background: $color_primary1;\r\n    color: $default_color;\r\n    border-top-left-radius: 5px;\r\n    border-top-right-radius: 5px;\r\n    border: none;\r\n    border-color: none;\r\n    width: 170px;\r\n    height: 70px;\r\n    cursor: pointer;\r\n}\r\n\r\n.select_button::after {\r\n    transition: transform 0.25s ease-in;\r\n    content: \">\";\r\n    transform: rotate(90deg);\r\n    font-size: $font_size / 1.44;\r\n    text-align: right;\r\n    float: right;\r\n    margin-right: 20px;\r\n\r\n}\r\n\r\n.select_filter {\r\n\r\n    position: relative;\r\n    display: inline-block;\r\n}\r\n\r\n\r\n.select_content {\r\n    display: none;\r\n    position: absolute;\r\n    background: $color_primary1;\r\n    border-bottom-left-radius: 5px;\r\n    border-bottom-right-radius: 5px;\r\n    min-width: 160px;\r\n    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\r\n    z-index: 1;\r\n\r\n\r\n    .whiteline {\r\n        width: 90%;\r\n        height: 1px;\r\n        background-color: $default_color;\r\n        margin-left: 5%;\r\n    }\r\n\r\n    a {\r\n\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-size: $font_size / 2;\r\n        color: $default_color;\r\n        padding: 20px;\r\n        width: 170px;\r\n        height: 60px;\r\n        text-decoration: none;\r\n        display: block;\r\n    }\r\n\r\n    a:hover {\r\n        transition: all 0.5s ease-in;\r\n        color: $default_font_color;\r\n    }\r\n}\r\n\r\n\r\n.select_filter:hover .select_content {\r\n\r\n    display: block;\r\n}\r\n\r\n.select_filter:hover .select_button::after {\r\n    transform: rotate(-90deg);\r\n    transition: transform 0.25s ease-in;\r\n}\r\n\r\n// .select_filter:hover .select_button {\r\n//     background: $color_background;\r\n\r\n// }",".photographer_statistic {\r\n    @include flex-basic(row, null, flex-start, space-around, baseline);\r\n    position: fixed;\r\n    background-color: $color_background;\r\n    min-width: 376px;\r\n    min-height: 89px;\r\n    bottom: 0;\r\n    right: 38px;\r\n    z-index: 2;\r\n    margin-bottom: -22px;\r\n    border-radius: 5px;\r\n\r\n\r\n\r\n    .total_likes,\r\n    .price_rate_daily {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_big;\r\n        font-size: $font_size / 1.55;\r\n        line-height: 31px;\r\n        color: $default_font_color;\r\n        padding-top: 18px;\r\n\r\n    }\r\n\r\n    .total_likes:after {\r\n        padding-left: 5px;\r\n        content: \"♥\";\r\n        font-size: $font_size / 1.55 * 1.33;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_statistic {\r\n        display: none;\r\n    }\r\n\r\n}",".media_card {\r\n    @include flex-basic(column, null, null, null, null);\r\n    flex-wrap: wrap;\r\n    max-width: 350px;\r\n\r\n    img,\r\n    video {\r\n        transition: box-shadow 1s;\r\n        width: 100%;\r\n        max-height: 300px;\r\n        min-height: 300px;\r\n        object-fit: cover;\r\n        border-radius: 5px;\r\n\r\n        &:hover {\r\n            transition: box-shadow 1s;\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n\r\n\r\n    .details {\r\n        @include flex-basic(row, null, null, space-between, baseline);\r\n        margin-top: 5px;\r\n    }\r\n\r\n    h6 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n        font-size: $font_size / 1.5;\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h6:last-child::after {\r\n        font-size: $font_size / 1.5 * 1.25;\r\n        padding-left: 10px;\r\n        content: \"♥\";\r\n    }\r\n\r\n}\r\n\r\n\r\n.media_card:has(video)\r\n{ \r\n    content: \"V\";\r\n    border: 2px red solid;\r\n}\r\n@media (max-width: 600px) {\r\n    .media_card img,\r\n    .media_card {\r\n        max-width: 100%;\r\n    }\r\n}","//// MAIN PAGE /// \r\n.photographer_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    gap: 70px;\r\n    margin-top: 75px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n///// END MAIN PAGE // \r\n\r\n//////////////// PHOTOGRAPHER PAGE /////// \r\n.margin_left_right {\r\n    margin: 0 100px;\r\n}\r\n\r\n.filter_section {\r\n    @include flex-basic(row, null, null, null, baseline);\r\n    margin-left: 0;\r\n\r\n    h5:first-child {\r\n        margin-top: 20px;\r\n        margin-right: 28px;\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-style: normal;\r\n        font-size: $font-size / 2;\r\n        color: $default_font_color;\r\n    }\r\n\r\n    .select_filter {\r\n        margin-top: 10px;\r\n    }\r\n}\r\n\r\n.media_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    row-gap: 30px;\r\n    column-gap: 95px;\r\n    margin-top: 20px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n////////////// END PHOTOGRAPHER PAGE ////////\r\n\r\n\r\n\r\n#contact_modal {\r\n    display: none;\r\n}","footer {\r\n    height: 2px;\r\n    width: 100%;\r\n    background-color: $default_color;\r\n    margin-top: 75px;\r\n}","@media (max-width: 1100px) {\r\n\r\n    .photographer_section,\r\n    .media_section {\r\n        grid-template-columns: 1fr 1fr;\r\n    }\r\n}\r\n\r\n\r\n@media (max-width: 800px) {\r\n    header {\r\n        flex-direction: column;\r\n        margin-top: 40px;\r\n        height:100px;\r\n\r\n        .logo_photographer {\r\n            margin-left: 0;\r\n        }\r\n\r\n        .logo,\r\n       h1 {\r\n            margin-left: 20px;\r\n            margin-right: 20px;\r\n            font-size: $font_size / 1.20;\r\n        }\r\n    }\r\n\r\n\r\n\r\n\r\n\r\n    .margin_left_right {\r\n        margin: 0 20px;\r\n    }\r\n\r\n\r\n    .filter_section {\r\n        justify-content: space-between;\r\n    }\r\n}\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_section {\r\n\r\n        grid-template-columns: 1fr;\r\n    }\r\n}\r\n\r\n@media (max-width: 600px) {\r\n    .media_section {\r\n\r\n        grid-template-columns: 1fr;\r\n    }\r\n}"],"sourceRoot":""}]);
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
/* harmony import */ var _displayData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./displayData */ "./src/scripts/pages/displayData.js");
/* harmony import */ var _displayMedia__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./displayMedia */ "./src/scripts/pages/displayMedia.js");
/* harmony import */ var _utils_getUrlParameter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getUrlParameter */ "./src/scripts/utils/getUrlParameter.js");






async function init() {
  // Try to get data from photographers & media if error then redirect to 404 page
  try {
    const idValue = await (0,_utils_getUrlParameter__WEBPACK_IMPORTED_MODULE_4__.getUrlParameter)("id");
    const {
      photographers
    } = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_1__.getPhotographers)();
    (0,_displayData__WEBPACK_IMPORTED_MODULE_2__.displayData)(photographers, ".photograph_header", idValue);
    const {
      medias
    } = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_1__.getMedias)();
    (0,_displayMedia__WEBPACK_IMPORTED_MODULE_3__.displayMedia)(medias, ".media_section", idValue);
    console.log("Page initialiser avec succès depuis init()");
  } catch (e) {
    console.error(e);
    console.log("Rediriger vers la page 404");
  }
}

init();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU0sV0FBVyxXQUFXLFlBQVksTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsT0FBTyxNQUFNLEtBQUssV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLEtBQUssTUFBTSxLQUFLLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxLQUFLLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsT0FBTyxNQUFNLFVBQVUsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsV0FBVyxXQUFXLE9BQU8sTUFBTSxXQUFXLFlBQVksT0FBTyxNQUFNLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxVQUFVLFVBQVUsV0FBVyxPQUFPLFlBQVksS0FBSyxVQUFVLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLE9BQU8sWUFBWSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsZUFBZSxhQUFhLFdBQVcsV0FBVyxjQUFjLGVBQWUsT0FBTyxNQUFNLFdBQVcsTUFBTSxRQUFRLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLFVBQVUsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsV0FBVyxPQUFPLE9BQU8sV0FBVyxhQUFhLGVBQWUsZUFBZSxPQUFPLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsT0FBTyxNQUFNLEtBQUssWUFBWSxVQUFVLGFBQWEsY0FBYyxlQUFlLGVBQWUsZUFBZSxZQUFZLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sS0FBSyxNQUFNLEtBQUssV0FBVyxhQUFhLGVBQWUsZUFBZSxlQUFlLE9BQU8sTUFBTSxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsTUFBTSxRQUFRLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxLQUFLLFlBQVksTUFBTSxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsV0FBVyxZQUFZLFlBQVksV0FBVyxXQUFXLFdBQVcsVUFBVSxNQUFNLE1BQU0sVUFBVSxVQUFVLFlBQVksV0FBVyxNQUFNLE1BQU0sWUFBWSxhQUFhLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsV0FBVyxRQUFRLE1BQU0sVUFBVSxPQUFPLE1BQU0sV0FBVyxXQUFXLE9BQU8sWUFBWSxNQUFNLFVBQVUsWUFBWSxhQUFhLGVBQWUsZUFBZSxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxNQUFNLE9BQU8sV0FBVyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsT0FBTyxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxNQUFNLFVBQVUsWUFBWSxXQUFXLFdBQVcsTUFBTSxPQUFPLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sT0FBTyxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxhQUFhLGFBQWEsYUFBYSxXQUFXLE1BQU0sTUFBTSxZQUFZLFlBQVksWUFBWSxXQUFXLFdBQVcsT0FBTyxNQUFN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QUEyQm9DLE9BQTNCLENBQVo7SUFFQTFDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDRDQUFaO0VBQ0gsQ0FURCxDQVNFLE9BQU8wQyxDQUFQLEVBQVU7SUFDUjNDLE9BQU8sQ0FBQzRDLEtBQVIsQ0FBY0QsQ0FBZDtJQUNBM0MsT0FBTyxDQUFDQyxHQUFSLENBQVksNEJBQVo7RUFDSDtBQUNKOztBQUVEd0MsSUFBSSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy9mYWN0b3JpZXMvbWVkaWFGYWN0b3J5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvZmFjdG9yaWVzL3Bob3RvZ3JhcGhlckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy9wYWdlcy9kaXNwbGF5RGF0YS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL2Rpc3BsYXlNZWRpYS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3V0aWxzL2RvbS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3V0aWxzL2ZldGNoLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvdXRpbHMvZ2V0VXJsUGFyYW1ldGVyLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3Njc3MvbWFpbi5zY3NzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3Njc3MvbWFpbi5zY3NzP2IzNzkiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL3Bob3RvZ3JhcGhlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJpbXBvcnQge1xyXG4gICAgaW5zZXJ0SFRNTEFmdGVyRWxlbWVudCxcclxuICAgIGluc2VydFZpZGVvSW5zaWRlRWxlbWVudCxcclxuICAgIGluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50LFxyXG4gICAgYnVpbGRFbGVtZW50XHJcbn0gZnJvbSBcIi4uL3V0aWxzL2RvbVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1lZGlhRmFjdG9yeShkYXRhKSB7XHJcbiAgICBjb25zdCB7IGlkLCBwaG90b2dyYXBoZXJJZCwgdGl0bGUsIGltYWdlLCB2aWRlbywgbGlrZXMsIGRhdGUsIHByaWNlIH0gPSBkYXRhO1xyXG5cclxuICAgIGNvbnN0IG1vdmllID0gYGFzc2V0cy92aWRlby8ke3ZpZGVvfWA7XHJcbiAgICBjb25zdCBwaWN0dXJlID0gYGFzc2V0cy9pbWFnZXMvJHtpbWFnZX1gO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldE1lZGlhRE9NKCkge1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgRE9NIG9ubHkgaWYgd2UgZ290IGlkcyBhbmQgYSBQaWN0dXJlIG9yIGEgVmlkZW9cclxuICAgICAgICBpZiAoKGlkICYmIHBob3RvZ3JhcGhlcklkKSAmJiAoaW1hZ2UgfHwgdmlkZW8pKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFydGljbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXJ0aWNsZVwiKTtcclxuICAgICAgICAgICAgYXJ0aWNsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1lZGlhX2NhcmRcIik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBsaW5rRWxlbWVudCA9IGFydGljbGUuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBidWlsZEVsZW1lbnQoXCJhXCIsIFwicGhvdG9ncmFwaGVyLmh0bWw/aWQ9XCIgKyBpZClcclxuICAgICAgICAgICAgKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBpbWFnZSBvciB2aWRlbyBleGlzdHNcclxuICAgICAgICAgICAgaWYgKGltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICBpbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudChsaW5rRWxlbWVudCwgcGljdHVyZSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZpZGVvKSB7XHJcbiAgICAgICAgICAgICAgICBpbnNlcnRWaWRlb0luc2lkZUVsZW1lbnQobGlua0VsZW1lbnQsIG1vdmllKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh0aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpdGxlX2g2ID0gXCI8aDY+XCIgKyB0aXRsZSArIFwiPC9oNj5cIjtcclxuICAgICAgICAgICAgICAgIGxldCBsaWtlc19oNiA9IFwiPGg2PlwiICsgMCArIFwiPC9oNj5cIjtcclxuICAgICAgICAgICAgICAgIGlmIChsaWtlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpa2VzX2g2ID0gXCI8aDY+XCIgKyBsaWtlcyArIFwiPC9oNj5cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGluc2VydEhUTUxBZnRlckVsZW1lbnQobGlua0VsZW1lbnQsIFwiPGRpdiBjbGFzcz0nZGV0YWlscyc+XCIgKyB0aXRsZV9oNiArIGxpa2VzX2g2ICsgXCI8L2Rpdj5cIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhcnRpY2xlO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHsgcGhvdG9ncmFwaGVySWQsIHBpY3R1cmUsIG1vdmllLCBnZXRNZWRpYURPTSB9O1xyXG59XHJcbiIsIlxyXG5pbXBvcnQgeyBidWlsZEVsZW1lbnQsIGluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50LCBzZXRJbm5lckh0bWwgfSBmcm9tIFwiLi4vdXRpbHMvZG9tXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGhvdG9ncmFwaGVyRmFjdG9yeShkYXRhKSB7XHJcbiAgICBjb25zdCB7IG5hbWUsIGlkLCBjaXR5LCBjb3VudHJ5LCB0YWdsaW5lLCBwb3J0cmFpdCwgcHJpY2UgfSA9IGRhdGE7XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICBjb25zdCBwaWN0dXJlID0gYGFzc2V0cy9pbWFnZXMvJHtwb3J0cmFpdH1gO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFVzZXJDYXJkRE9NKCkge1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgRE9NIG9ubHkgaWYgd2UgZ290IGEgcGljdHVyZSBhIGlkIGFuZCBhIG5hbWVcclxuICAgICAgICBpZiAobmFtZSAmJiBpZCAmJiBwb3J0cmFpdCkge1xyXG4gICAgICAgICAgICBjb25zdCBhcnRpY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFydGljbGVcIik7XHJcbiAgICAgICAgICAgIGFydGljbGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwaG90b2dyYXBoZXJfY2FyZFwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBEeW5hbWlxdWUgTElOSyB3aXRoIFBpY3R1cmVcclxuICAgICAgICAgICAgY29uc3QgbGlua0VsZW1lbnQgPSBhcnRpY2xlLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgYnVpbGRFbGVtZW50KFwiYVwiLCBcInBob3RvZ3JhcGhlci5odG1sP2lkPVwiICsgaWQpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50KGxpbmtFbGVtZW50LCBwaWN0dXJlKTtcclxuICAgICAgICAgICAgLy8gRU5EIENyZWF0ZSBEeW5hbWlxdWUgTElOSyB3aXRoIFBpY3R1cmVcclxuXHJcbiAgICAgICAgICAgIGFydGljbGUuYXBwZW5kQ2hpbGQoYnVpbGRFbGVtZW50KFwiaDJcIiwgbmFtZSkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNpdHkgJiYgY291bnRyeSkge1xyXG4gICAgICAgICAgICAgICAgYXJ0aWNsZS5hcHBlbmRDaGlsZChidWlsZEVsZW1lbnQoXCJoM1wiLCBjaXR5ICsgXCIsIFwiICsgY291bnRyeSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YWdsaW5lKSB7XHJcbiAgICAgICAgICAgICAgICBhcnRpY2xlLmFwcGVuZENoaWxkKGJ1aWxkRWxlbWVudChcImg0XCIsIHRhZ2xpbmUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJpY2UpIHtcclxuICAgICAgICAgICAgICAgIGFydGljbGUuYXBwZW5kQ2hpbGQoYnVpbGRFbGVtZW50KFwiaDVcIiwgcHJpY2UgKyBcIuKCrC9qb3VyXCIpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGFydGljbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFBob3RvZ3JhcGhlckhlYWRlcigpIHtcclxuICAgICAgICBzZXRJbm5lckh0bWwoXCIucGhvdG9ncmFwaF9oZWFkZXIgaDFcIiwgbmFtZSk7XHJcbiAgICAgICAgaWYgKGNpdHkgJiYgY291bnRyeSkge1xyXG4gICAgICAgICAgICBzZXRJbm5lckh0bWwoXCIucGhvdG9ncmFwaF9oZWFkZXIgaDJcIiwgY2l0eSArIFwiLCBcIiArIGNvdW50cnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnBob3RvZ3JhcGhfaGVhZGVyIGgyXCIsIFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRJbm5lckh0bWwoXCIucGhvdG9ncmFwaF9oZWFkZXIgaDNcIiwgdGFnbGluZSk7XHJcbiAgICAgICAgY29uc3QgaW1nUHJvZmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGhvdG9ncmFwaF9oZWFkZXIgaW1nXCIpO1xyXG4gICAgICAgIGltZ1Byb2ZpbGUuc2V0QXR0cmlidXRlKFwic3JjXCIsIHBpY3R1cmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFN0aWNreUJhclByaWNlKCkge1xyXG4gICAgICAgIGlmIChwcmljZSkge1xyXG4gICAgICAgICAgICBzZXRJbm5lckh0bWwoXCIucHJpY2VfcmF0ZV9kYWlseVwiLCBwcmljZSArIFwiIOKCrCAvIGpvdXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRJbm5lckh0bWwoXCIucHJpY2VfcmF0ZV9kYWlseVwiLCBwcmljZSArIFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geyBuYW1lLCBwaWN0dXJlLCBnZXRVc2VyQ2FyZERPTSwgc2V0UGhvdG9ncmFwaGVySGVhZGVyLCBzZXRTdGlja3lCYXJQcmljZSB9O1xyXG59XHJcbiIsIlxyXG5pbXBvcnQgeyBwaG90b2dyYXBoZXJGYWN0b3J5IH0gZnJvbSBcIi4uL2ZhY3Rvcmllcy9waG90b2dyYXBoZXJGYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlzcGxheURhdGEocGhvdG9ncmFwaGVycywgcXVlcnlTZWxlY3RvciwgaWQpIHtcclxuXHJcbiAgICBwaG90b2dyYXBoZXJzLmZvckVhY2goKHBob3RvZ3JhcGhlcikgPT4ge1xyXG4gICAgICAgIGlmIChpZCkge1xyXG4gICAgICAgICAgICBpZiAocGhvdG9ncmFwaGVyLmlkID09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGVuIHdlIGFyZSBnb2luZyB1c2UgdGhlIFBob3RvZ3JhcGhlckZhY3RvcnkgdG8gc2V0IERPTVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGhvdG9ncmFwaGVyKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlck1vZGVsID0gcGhvdG9ncmFwaGVyRmFjdG9yeShwaG90b2dyYXBoZXIpO1xyXG4gICAgICAgICAgICAgICAgcGhvdG9ncmFwaGVyTW9kZWwuc2V0UGhvdG9ncmFwaGVySGVhZGVyKCk7XHJcbiAgICAgICAgICAgICAgICBwaG90b2dyYXBoZXJNb2RlbC5zZXRTdGlja3lCYXJQcmljZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gRW5kIG9mIFBob3RvZ3JhcGhlckZhY3RvcnkgV29ya1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVGhlbiB3ZSBhcmUgZ29pbmcgdXNlIHRoZSBQaG90b2dyYXBoZXJGYWN0b3J5IHRvIGdlbmVyYXRlIERPTVxyXG4gICAgICAgICAgICBjb25zdCBwaG90b2dyYXBoZXJzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnlTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlck1vZGVsID0gcGhvdG9ncmFwaGVyRmFjdG9yeShwaG90b2dyYXBoZXIpO1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyQ2FyZERPTSA9IHBob3RvZ3JhcGhlck1vZGVsLmdldFVzZXJDYXJkRE9NKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodXNlckNhcmRET00pIHtcclxuICAgICAgICAgICAgICAgIHBob3RvZ3JhcGhlcnNTZWN0aW9uLmFwcGVuZENoaWxkKHVzZXJDYXJkRE9NKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFbmQgb2YgUGhvdG9ncmFwaGVyRmFjdG9yeSBXb3JrXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IG1lZGlhRmFjdG9yeSB9IGZyb20gXCIuLi9mYWN0b3JpZXMvbWVkaWFGYWN0b3J5XCI7XHJcbmltcG9ydCB7IHNldElubmVySHRtbCB9IGZyb20gXCIuLi91dGlscy9kb21cIjtcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlNZWRpYShtZWRpYXMsIHF1ZXJ5U2VsZWN0b3IsIHBob3RvZ3JhcGhlcklkKSB7XHJcbiAgICBsZXQgdG90YWxMaWtlcyA9IDA7XHJcblxyXG4gICAgbWVkaWFzLmZvckVhY2goKG1lZGlhKSA9PiB7XHJcbiAgICAgICAgaWYgKHBob3RvZ3JhcGhlcklkKSB7XHJcbiAgICAgICAgICAgIGlmIChwaG90b2dyYXBoZXJJZCA9PSBtZWRpYS5waG90b2dyYXBoZXJJZCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lZGlhKTtcclxuICAgICAgICAgICAgICAgIC8vIFRoZW4gd2UgYXJlIGdvaW5nIHVzZSB0aGUgTWVkaWFGYWN0b3J5IHRvIGdlbmVyYXRlIERPTVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbWVkaWFzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnlTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZWRpYU1vZGVsID0gbWVkaWFGYWN0b3J5KG1lZGlhKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lZGlhRE9NID0gbWVkaWFNb2RlbC5nZXRNZWRpYURPTSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZWRpYURPTSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lZGlhc1NlY3Rpb24uYXBwZW5kQ2hpbGQobWVkaWFET00pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gRW5kIG9mIE1lZGlhRmFjdG9yeSBXb3JrXHJcblxyXG4gICAgICAgICAgICAgICAgdG90YWxMaWtlcyArPSBtZWRpYS5saWtlczsgLy8gQ291bnQgYWxsIGxpa2VzXHJcbiAgICAgICAgICAgICAgICBzZXRJbm5lckh0bWwoXCIudG90YWxfbGlrZXNcIiwgdG90YWxMaWtlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIlRvdGFsIExpa2U6IFwiICsgdG90YWxMaWtlcyk7XHJcbn1cclxuXHJcbiIsIi8vIEZ1bmN0aW9uIGZvciBidWlsZCBET01cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50KGVsZW1lbnQsIHBpY3R1cmUpIHtcclxuICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsICc8aW1nIHNyYz1cIicgKyBwaWN0dXJlICsgJ1wiPicpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0VmlkZW9JbnNpZGVFbGVtZW50KGVsZW1lbnQsIHZpZGVvKSB7XHJcbiAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCAnPHZpZGVvIHNyYz1cIicgKyB2aWRlbyArICdcIj4nKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEhUTUxBZnRlckVsZW1lbnQoZWxlbWVudCwgaHRtbCkge1xyXG4gICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmVuZFwiLCBodG1sKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRWxlbWVudChiYWxpc2UsIHZhbHVlKSB7XHJcbiAgICAvLyBDcmVhdGUgYmFsaXNlXHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChiYWxpc2UpO1xyXG5cclxuICAgIC8vIFNldCBBdHRyaWJ1dGUgb3IgVGV4dENvbnRlbmVkIGRlcGVuZCBvZiBiYWxpc2VcclxuICAgIHN3aXRjaCAoYmFsaXNlKSB7XHJcbiAgICAgICAgY2FzZSBcImFcIjpcclxuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImltZ1wiOlxyXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcInNyY1wiLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBlbGVtZW50O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0SW5uZXJIdG1sKHF1ZXJ5U2VsZWN0b3IsIHRleHRlKSB7XHJcbiAgICBjb25zdCB0ZXh0ZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5U2VsZWN0b3IpO1xyXG4gICAgdGV4dGVFbGVtZW50LmlubmVySFRNTCA9IHRleHRlO1xyXG59XHJcbi8vIEVuZCBGdW5jdGlvbiBmb3IgYnVpbGQgRE9NIiwiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoSlNPTih1cmwsIHR5cGUpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTsgLy8gV2FpdCBmb3IgdGhlIEFzeW5jIEZlY3RoIEZ1bmN0aW9uXHJcblxyXG4gICAgLy8gZmV0Y2ggcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBhIHJlc3BvbnNlIHByb3BlcnR5IHdoaWNoIGlmIHNldCB0byBmYWxzZSBtZWFucyB0aGF0IHRoZSBjb25uZWN0aW9uIGlzIG5vdCBnb29kIGFuZCBzbyB3ZSBzdG9wIHRoZSBmdW5jdGlvbiBcclxuICAgIGlmICghcmVzcG9uc2Uub2spIHsgdGhyb3cgbmV3IEVycm9yKFwiVGhyb3duIGZyb20gZmV0Y2hKU09OKClcIik7IH1cclxuXHJcbiAgICBsZXQganNvblJlc3BvbnNlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpOyAvLyBwYXJzaW5nIEpTT05cclxuICAgIGpzb25SZXNwb25zZSA9IGpzb25SZXNwb25zZVt0eXBlXTsgLy8gR2V0IGRhdGEgZnJvbSB0aGUgQXJyYXkgdGhhdCB3ZSB3YW50XHJcblxyXG4gICAgcmV0dXJuIGpzb25SZXNwb25zZTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQaG90b2dyYXBoZXJzKCkge1xyXG4gICAgY29uc3QgdXJsID0gXCIuL2RhdGEvcGhvdG9ncmFwaGVycy5qc29uXCI7IC8vIERhdGEgc291cmNlIC5KU09OXHJcbiAgICBjb25zdCBwaG90b2dyYXBoZXJzID0gYXdhaXQgZmV0Y2hKU09OKHVybCwgXCJwaG90b2dyYXBoZXJzXCIpOyAvLyB1c2UgZmV0Y2hKU09OIGZ1bmN0aW9uIGZyb20gdXRpbHMvZmV0Y2guanNcclxuICAgIHJldHVybiB7IHBob3RvZ3JhcGhlcnMgfTsgLy8gUmV0dXJuIGRhdGEgb2YgUGhvdG9HcmFwaGVyc1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TWVkaWFzKCkge1xyXG4gICAgY29uc3QgdXJsID0gXCIuL2RhdGEvcGhvdG9ncmFwaGVycy5qc29uXCI7IC8vIERhdGEgc291cmNlIC5KU09OXHJcbiAgICBjb25zdCBtZWRpYXMgPSBhd2FpdCBmZXRjaEpTT04odXJsLCBcIm1lZGlhXCIpOyAvLyB1c2UgZmV0Y2hKU09OIGZ1bmN0aW9uIGZyb20gdXRpbHMvZmV0Y2guanNcclxuICAgIHJldHVybiB7IG1lZGlhcyB9OyAvLyBSZXR1cm4gZGF0YSBvZiBNZWRpYVxyXG59XHJcblxyXG4iLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXJsUGFyYW1ldGVyKHBhcmFtZXRlcikge1xyXG4gICAgY29uc3QgZnVsbFVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmOyAvLyBHZXQgZnVsbCB1cmxcclxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoZnVsbFVybCk7IC8vIENyZWF0ZSBVUkwgT2JqZWN0XHJcbiAgICBjb25zdCBwYXJhbWV0ZXJWYWx1ZSA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KHBhcmFtZXRlcik7IC8vIGdldCBwYXJhbWV0ZXIgdmFsdWVcclxuICAgIHJldHVybiBwYXJhbWV0ZXJWYWx1ZTtcclxufSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGNoYXJzZXQgXFxcIlVURi04XFxcIjtcXG4vKiogVXNlZCB0byBsb2FkIGFsbCB2YXJpYWJsZXMgZm9yIHRoaXMgcHJvamVjdCBhYm91dCBTQ1NTICoqLyAvKiogRk9OVCAqKi9cXG4vKiogRU5EIEZPTlQgKiovXFxuLyoqIENPTE9SIFZBUklBQkxFUyAqKi9cXG4vKiogRU5EIENPTE9SIFZBUklBQkxFUyAqKi9cXG4vKiogSU1QT1JUIEdMT0JBTCBDU1MgRk9SIEZPTlRTIEhUTUwsKiBTRUxFQ1RPUiAqKi9cXG4vKioqKioqKioqKioqKioqKioqKioqKiBHRU5FUkFMICoqKioqKioqKioqKioqKioqKioqKiovXFxuaHRtbCxcXG4qIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBhbmltYXRpb246IDFzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1pbjtcXG59XFxuXFxuQGtleWZyYW1lcyBmYWRlLWluIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbn1cXG4vKioqKioqKioqKioqKioqKioqKioqKiBFTkQgR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1xcbi8qKiBJTVBPUlQgTUlYSU4gKiovXFxuLyoqIElNUE9SVCBIRUFERVIgU1RZTEVTICoqL1xcbmhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IDEyMHB4O1xcbn1cXG5oZWFkZXIgaDEge1xcbiAgY29sb3I6ICM5MDFDMUM7XFxuICB0b3A6IDQ0cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDEwMHB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc2l6ZTogMzZweDtcXG4gIGxpbmUtaGVpZ2h0OiA0N3B4O1xcbn1cXG5oZWFkZXIgLmxvZ28sXFxuaGVhZGVyIC5sb2dvX3Bob3RvZ3JhcGhlciB7XFxuICBoZWlnaHQ6IDUwcHg7XFxufVxcbmhlYWRlciAubG9nbyB7XFxuICBtYXJnaW4tbGVmdDogMTE1cHg7XFxufVxcbmhlYWRlciAubG9nb19waG90b2dyYXBoZXIge1xcbiAgbWFyZ2luLWxlZnQ6IDEwMHB4O1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG59XFxuXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVJTIENBUkRTICoqL1xcbi5waG90b2dyYXBoZXJfY2FyZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaW1nIHtcXG4gIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAxcztcXG4gIGhlaWdodDogMjAwcHg7XFxuICB3aWR0aDogMjAwcHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGltZzpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDIsXFxuLnBob3RvZ3JhcGhlcl9jYXJkIGgzLFxcbi5waG90b2dyYXBoZXJfY2FyZCBoNCxcXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDUge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBoMiB7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgY29sb3I6ICNEMzU3M0M7XFxuICBmb250LXNpemU6IDM2cHg7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBoMyB7XFxuICBmb250LXNpemU6IDEzLjAwMTA4MzQyMzZweDtcXG4gIGxpbmUtaGVpZ2h0OiAxN3B4O1xcbiAgY29sb3I6ICM5MDFDMUM7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBoNCB7XFxuICBtYXJnaW4tdG9wOiAycHg7XFxuICBmb250LXNpemU6IDEwcHg7XFxuICBsaW5lLWhlaWdodDogMTNweDtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDUge1xcbiAgbWFyZ2luLXRvcDogMnB4O1xcbiAgZm9udC1zaXplOiA5cHg7XFxuICBsaW5lLWhlaWdodDogMTJweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiAjNzU3NTc1O1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDMge1xcbiAgICBmb250LXNpemU6IDE2LjkwMTQwODQ1MDdweDtcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoNCB7XFxuICAgIGZvbnQtc2l6ZTogMTNweDtcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoNSB7XFxuICAgIGZvbnQtc2l6ZTogMTEuN3B4O1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNzAwcHgpIHtcXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoMyB7XFxuICAgIGZvbnQtc2l6ZTogMTkuNTAxNjI1MTM1NHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGg0IHtcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGg1IHtcXG4gICAgZm9udC1zaXplOiAxMy41cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaW1nIHtcXG4gICAgd2lkdGg6IDIzMHB4O1xcbiAgICBoZWlnaHQ6IDIzMHB4O1xcbiAgfVxcbn1cXG4vKiogSU1QT1JUIE1PREFMIENPTVBPTkVOVCAqKi9cXG4ubW9kYWwge1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0RCODg3NjtcXG4gIHdpZHRoOiA1MCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBwYWRkaW5nOiAzNXB4O1xcbiAgbWFyZ2luOiBhdXRvO1xcbn1cXG5cXG4ubW9kYWwgaGVhZGVyIHtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4ubW9kYWwgaGVhZGVyIGltZyB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5tb2RhbCBoZWFkZXIgaDIge1xcbiAgZm9udC1zaXplOiA2My43MnB4O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuZm9ybSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxufVxcblxcbmZvcm0gbGFiZWwge1xcbiAgY29sb3I6ICM1MjUyNTI7XFxuICBmb250LXNpemU6IDM2cHg7XFxufVxcblxcbmZvcm0gZGl2IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBhbGlnbi1pdGVtczogc2VsZi1zdGFydDtcXG4gIG1hcmdpbi1ib3R0b206IDI2cHg7XFxufVxcblxcbmZvcm0gaW5wdXQge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDY4cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbi8qKiBJTVBPUlQgQ09OVEFDVCBCVVRUT04gQ09NUE9ORU5UICoqL1xcbi5jb250YWN0X2J1dHRvbiB7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDExcHg7XFxuICBtaW4td2lkdGg6IDE3MHB4O1xcbiAgbWluLWhlaWdodDogNzBweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM5MDFDMUM7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0cmFuc2l0aW9uOiBjb2xvciAwLjVzIGVhc2UtaW4sIGJhY2tncm91bmQtY29sb3IgMC41cyBlYXNlLWluO1xcbn1cXG4uY29udGFjdF9idXR0b246aG92ZXIge1xcbiAgY29sb3I6ICMwMDAwMDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjREI4ODc2O1xcbn1cXG5cXG4vKiogSU1QT1JUIFBIT1RPR1JBUEggSEVBREVSIENPTVBPTkVOVCAqKi9cXG4ucGhvdG9ncmFwaF9oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBmbGV4LXdyYXA6IG5vLXdyYXA7XFxuICBhbGlnbi1jb250ZW50OiBmbGVkLWVuZDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNGQUZBRkE7XFxuICBoZWlnaHQ6IDMxM3B4O1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG4gIHBhZGRpbmctbGVmdDogMzBweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDMwcHg7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciBkaXY6bnRoLWNoaWxkKDMpIHtcXG4gIG1hcmdpbi1yaWdodDogMjBweDtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgxLFxcbi5waG90b2dyYXBoX2hlYWRlciBoMixcXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDMge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciBoMSB7XFxuICBmb250LXNpemU6IDYzLjcycHg7XFxuICBtYXJnaW4tYm90dG9tOiAtMTVweDtcXG4gIGNvbG9yOiAjRDM1NzNDO1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDIge1xcbiAgbWFyZ2luLXRvcDogMTVweDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBmb250LXNpemU6IDIzLjIyNTgwNjQ1MTZweDtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDMge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgY29sb3I6ICM1MjUyNTI7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciAucGhvdG9ncmFwaF9hYm91dCxcXG4ucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIC5waG90b2dyYXBoX2J1dHRvbiB7XFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiA4MHB4O1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYWJvdXQge1xcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxuICAucGhvdG9ncmFwaF9oZWFkZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICBhbGlnbi1jb250ZW50OiBmbGVkLWVuZDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nLXRvcDogMTVweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciBoMSB7XFxuICAgIGZvbnQtc2l6ZTogNDEuNHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIGgyIHtcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIGgzIHtcXG4gICAgZm9udC1zaXplOiAxNi4zNjM2MzYzNjM2cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaF9idXR0b24ge1xcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXG4gIC5waG90b2dyYXBoX2hlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWNvbnRlbnQ6IGZsZWQtZW5kO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXG4gICAgYWxpZ24taXRlbXM6IGluaGVyaXQ7XFxuICAgIG1hcmdpbi1yaWdodDogMHB4O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIG1hcmdpbi10b3A6IDIwMHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyID4gLnBob3RvZ3JhcGhfYWJvdXQge1xcbiAgICBtYXJnaW4tbGVmdDogMDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciBoMSxcXG5oMixcXG5oMyB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciA+IC5waG90b2dyYXBoZXJfY2FyZCB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxufVxcbi8qKiBJTVBPUlQgU0VMRUNUIEZJTFRFUiBDT01QT05FTlQgKiovXFxuLnNlbGVjdF9idXR0b24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGJhY2tncm91bmQ6ICM5MDFDMUM7XFxuICBjb2xvcjogd2hpdGU7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA1cHg7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNXB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLWNvbG9yOiBub25lO1xcbiAgd2lkdGg6IDE3MHB4O1xcbiAgaGVpZ2h0OiA3MHB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uc2VsZWN0X2J1dHRvbjo6YWZ0ZXIge1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW47XFxuICBjb250ZW50OiBcXFwiPlxcXCI7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxuICBmb250LXNpemU6IDI1cHg7XFxuICB0ZXh0LWFsaWduOiByaWdodDtcXG4gIGZsb2F0OiByaWdodDtcXG4gIG1hcmdpbi1yaWdodDogMjBweDtcXG59XFxuXFxuLnNlbGVjdF9maWx0ZXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbn1cXG5cXG4uc2VsZWN0X2NvbnRlbnQge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJhY2tncm91bmQ6ICM5MDFDMUM7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA1cHg7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNXB4O1xcbiAgbWluLXdpZHRoOiAxNjBweDtcXG4gIGJveC1zaGFkb3c6IDBweCAycHggOHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICB6LWluZGV4OiAxO1xcbn1cXG4uc2VsZWN0X2NvbnRlbnQgLndoaXRlbGluZSB7XFxuICB3aWR0aDogOTAlO1xcbiAgaGVpZ2h0OiAxcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIG1hcmdpbi1sZWZ0OiA1JTtcXG59XFxuLnNlbGVjdF9jb250ZW50IGEge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgd2lkdGg6IDE3MHB4O1xcbiAgaGVpZ2h0OiA2MHB4O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5zZWxlY3RfY29udGVudCBhOmhvdmVyIHtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW47XFxuICBjb2xvcjogIzAwMDAwMDtcXG59XFxuXFxuLnNlbGVjdF9maWx0ZXI6aG92ZXIgLnNlbGVjdF9jb250ZW50IHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4uc2VsZWN0X2ZpbHRlcjpob3ZlciAuc2VsZWN0X2J1dHRvbjo6YWZ0ZXIge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjI1cyBlYXNlLWluO1xcbn1cXG5cXG4vKiogSU1QT1JUIFBIT1RPR1JBUEhFUiBTVEFUSVNUSUMgQ09NUE9ORU5UICoqL1xcbi5waG90b2dyYXBoZXJfc3RhdGlzdGljIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgYWxpZ24tY29udGVudDogZmxleC1zdGFydDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0RCODg3NjtcXG4gIG1pbi13aWR0aDogMzc2cHg7XFxuICBtaW4taGVpZ2h0OiA4OXB4O1xcbiAgYm90dG9tOiAwO1xcbiAgcmlnaHQ6IDM4cHg7XFxuICB6LWluZGV4OiAyO1xcbiAgbWFyZ2luLWJvdHRvbTogLTIycHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcbi5waG90b2dyYXBoZXJfc3RhdGlzdGljIC50b3RhbF9saWtlcyxcXG4ucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyAucHJpY2VfcmF0ZV9kYWlseSB7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMjMuMjI1ODA2NDUxNnB4O1xcbiAgbGluZS1oZWlnaHQ6IDMxcHg7XFxuICBjb2xvcjogIzAwMDAwMDtcXG4gIHBhZGRpbmctdG9wOiAxOHB4O1xcbn1cXG4ucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyAudG90YWxfbGlrZXM6YWZ0ZXIge1xcbiAgcGFkZGluZy1sZWZ0OiA1cHg7XFxuICBjb250ZW50OiBcXFwi4pmlXFxcIjtcXG4gIGZvbnQtc2l6ZTogMzAuODkwMzIyNTgwNnB4O1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNzAwcHgpIHtcXG4gIC5waG90b2dyYXBoZXJfc3RhdGlzdGljIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG59XFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVIgTUVESUEgQ0FSRFMgQ09NUE9ORU5UICoqL1xcbi5tZWRpYV9jYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgbWF4LXdpZHRoOiAzNTBweDtcXG59XFxuLm1lZGlhX2NhcmQgaW1nLFxcbi5tZWRpYV9jYXJkIHZpZGVvIHtcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1heC1oZWlnaHQ6IDMwMHB4O1xcbiAgbWluLWhlaWdodDogMzAwcHg7XFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuLm1lZGlhX2NhcmQgaW1nOmhvdmVyLFxcbi5tZWRpYV9jYXJkIHZpZGVvOmhvdmVyIHtcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbn1cXG4ubWVkaWFfY2FyZCAuZGV0YWlscyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG4gIG1hcmdpbi10b3A6IDVweDtcXG59XFxuLm1lZGlhX2NhcmQgaDYge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBjb2xvcjogIzkwMUMxQztcXG59XFxuLm1lZGlhX2NhcmQgaDY6bGFzdC1jaGlsZDo6YWZ0ZXIge1xcbiAgZm9udC1zaXplOiAzMHB4O1xcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xcbiAgY29udGVudDogXFxcIuKZpVxcXCI7XFxufVxcblxcbi5tZWRpYV9jYXJkOmhhcyh2aWRlbykge1xcbiAgY29udGVudDogXFxcIlZcXFwiO1xcbiAgYm9yZGVyOiAycHggcmVkIHNvbGlkO1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gIC5tZWRpYV9jYXJkIGltZyxcXG4ubWVkaWFfY2FyZCB7XFxuICAgIG1heC13aWR0aDogMTAwJTtcXG4gIH1cXG59XFxuLyoqIElNUE9SVCBQQUdFUyAob3RoZXIpIFN0eWxlcyAqKi9cXG4ucGhvdG9ncmFwaGVyX3NlY3Rpb24ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxuICBnYXA6IDcwcHg7XFxuICBtYXJnaW4tdG9wOiA3NXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNzVweDtcXG59XFxuXFxuLm1hcmdpbl9sZWZ0X3JpZ2h0IHtcXG4gIG1hcmdpbjogMCAxMDBweDtcXG59XFxuXFxuLmZpbHRlcl9zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcbi5maWx0ZXJfc2VjdGlvbiBoNTpmaXJzdC1jaGlsZCB7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAyOHB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBjb2xvcjogIzAwMDAwMDtcXG59XFxuLmZpbHRlcl9zZWN0aW9uIC5zZWxlY3RfZmlsdGVyIHtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcblxcbi5tZWRpYV9zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcbiAgcm93LWdhcDogMzBweDtcXG4gIGNvbHVtbi1nYXA6IDk1cHg7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNzVweDtcXG59XFxuXFxuI2NvbnRhY3RfbW9kYWwge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLyoqIElNUE9SVCBGT09URVIgU1RZTEVTICoqL1xcbmZvb3RlciB7XFxuICBoZWlnaHQ6IDJweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBtYXJnaW4tdG9wOiA3NXB4O1xcbn1cXG5cXG4vKiogSU1QT1JUIFJFU1BPTlNJVkUgU1RZTEVTIGZvciBOb24gQ29tcG9uZW50cyBFbGVtZW50cyAqKi9cXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX3NlY3Rpb24sXFxuLm1lZGlhX3NlY3Rpb24ge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcbiAgaGVhZGVyIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgbWFyZ2luLXRvcDogNDBweDtcXG4gICAgaGVpZ2h0OiAxMDBweDtcXG4gIH1cXG4gIGhlYWRlciAubG9nb19waG90b2dyYXBoZXIge1xcbiAgICBtYXJnaW4tbGVmdDogMDtcXG4gIH1cXG4gIGhlYWRlciAubG9nbyxcXG5oZWFkZXIgaDEge1xcbiAgICBtYXJnaW4tbGVmdDogMjBweDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcbiAgICBmb250LXNpemU6IDMwcHg7XFxuICB9XFxuICAubWFyZ2luX2xlZnRfcmlnaHQge1xcbiAgICBtYXJnaW46IDAgMjBweDtcXG4gIH1cXG4gIC5maWx0ZXJfc2VjdGlvbiB7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX3NlY3Rpb24ge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAubWVkaWFfc2VjdGlvbiB7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcbiAgfVxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9tYWluLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL192YXJpYWJsZXMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX2dsb2JhbC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9wYWdlcy9faGVhZGVyLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19taXhpbi5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19waG90b2dyYXBoZXJfY2FyZHMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fbW9kYWwuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fY29udGFjdF9idXR0b24uc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fcGhvdG9ncmFwaF9oZWFkZXIuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fc2VsZWN0X2ZpbHRlci5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19waG90b2dyYXBoZXJfc3RhdGlzdGljLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX21lZGlhX2NhcmRzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL3BhZ2VzL19wYWdlcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9wYWdlcy9fZm9vdGVyLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19yZXNwb25zaXZlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsZ0JBQWdCO0FBQWhCLDZEQUFBLEVBQUEsV0FBQTtBQ01BLGVBQUE7QUFFQSxzQkFBQTtBQVNBLDBCQUFBO0FEZkEsa0RBQUE7QUVGQSxzREFBQTtBQUNBOztFQUVFLFNBQUE7RUFDQSxVQUFBO0VBQ0Esc0JBQUE7QUZPRjs7QUVIQTtFQUNFLGtDRFRZO0VDVVosc0NBQUE7QUZNRjs7QUVGQTtFQUNFO0lBQ0UsVUFBQTtFRktGO0VFRkE7SUFDRSxVQUFBO0VGSUY7QUFDRjtBRURBLDBEQUFBO0FGckJBLG1CQUFBO0FBRUEsMkJBQUE7QUdOQTtFQ0tFLGFBQUE7RUFDQSxtQkRMc0I7RUNnQnBCLDhCRGhCcUM7RUNvQnJDLG1CRHBCb0Q7RUFDcEQsYUFBQTtBSGtDSjtBRy9C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aEJWO0VjbGhCRTtJQUNJLGNBQUE7RWRvaEJOO0VjaGhCRTtJQUNJLDhCQUFBO0Vka2hCTjtBQUNGO0FjL2dCQTtFQUNJO0lBRUksMEJBQUE7RWRnaEJOO0FBQ0Y7QWM3Z0JBO0VBQ0k7SUFFSSwwQkFBQTtFZDhnQk47QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiogVXNlZCB0byBsb2FkIGFsbCB2YXJpYWJsZXMgZm9yIHRoaXMgcHJvamVjdCBhYm91dCBTQ1NTICoqL1xcclxcbkBpbXBvcnQgXFxcIl92YXJpYWJsZXMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBHTE9CQUwgQ1NTIEZPUiBGT05UUyBIVE1MLCogU0VMRUNUT1IgKiovXFxyXFxuQGltcG9ydCBcXFwiX2dsb2JhbC5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIE1JWElOICoqL1xcclxcbkBpbXBvcnQgXFxcIl9taXhpbi5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIEhFQURFUiBTVFlMRVMgKiovXFxyXFxuQGltcG9ydCBcXFwicGFnZXMvaGVhZGVyLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSUyBDQVJEUyAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL3Bob3RvZ3JhcGhlcl9jYXJkcy5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIE1PREFMIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL21vZGFsLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgQ09OVEFDVCBCVVRUT04gQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvY29udGFjdF9idXR0b24uc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIIEhFQURFUiBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9waG90b2dyYXBoX2hlYWRlci5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFNFTEVDVCBGSUxURVIgQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvc2VsZWN0X2ZpbHRlci5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFBIT1RPR1JBUEhFUiBTVEFUSVNUSUMgQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvcGhvdG9ncmFwaGVyX3N0YXRpc3RpYy5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFBIT1RPR1JBUEhFUiBNRURJQSBDQVJEUyBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9tZWRpYV9jYXJkcy5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFBBR0VTIChvdGhlcikgU3R5bGVzICoqL1xcclxcbkBpbXBvcnQgXFxcInBhZ2VzL3BhZ2VzLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgRk9PVEVSIFNUWUxFUyAqKi9cXHJcXG5AaW1wb3J0IFxcXCJwYWdlcy9mb290ZXIuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBSRVNQT05TSVZFIFNUWUxFUyBmb3IgTm9uIENvbXBvbmVudHMgRWxlbWVudHMgKiovXFxyXFxuQGltcG9ydCBcXFwiX3Jlc3BvbnNpdmUuc2Nzc1xcXCI7XCIsXCIvKiogRk9OVCAqKi9cXHJcXG4kZm9udF9nbG9iYWw6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXHJcXG4kZm9udF93ZWlnaHRfc21hbGw6IDQwMDtcXHJcXG4kZm9udF93ZWlnaHRfYmlnOiA3MDA7XFxyXFxuXFxyXFxuJGZvbnRfc2l6ZTogMzZweDtcXHJcXG4vKiogRU5EIEZPTlQgKiovXFxyXFxuXFxyXFxuLyoqIENPTE9SIFZBUklBQkxFUyAqKi9cXHJcXG4kZGVmYXVsdF9jb2xvcjogd2hpdGU7XFxyXFxuJGRlZmF1bHRfZm9udF9jb2xvcjogIzAwMDAwMDtcXHJcXG4kY29sb3JfZ3JheTogIzc1NzU3NTtcXHJcXG4kY29sb3JfcHJpbWFyeTE6ICM5MDFDMUM7XFxyXFxuJGNvbG9yX3ByaW1hcnkyOiAjRDM1NzNDO1xcclxcbiRjb2xvcl9zZWNvbmRhcnkyOiAjNTI1MjUyO1xcclxcbiRjb2xvcl9zZWNvbmRhcnkyX2JnOiAjRkFGQUZBO1xcclxcbiRjb2xvcl9iYWNrZ3JvdW5kOiAjREI4ODc2O1xcclxcbi8qKiBFTkQgQ09MT1IgVkFSSUFCTEVTICoqL1wiLFwiLyoqKioqKioqKioqKioqKioqKioqKiogR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1xcclxcbmh0bWwsXFxyXFxuKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgYW5pbWF0aW9uOiAxcyBlYXNlLWluIGZvcndhcmRzIGZhZGUtaW47XFxyXFxufVxcclxcblxcclxcblxcclxcbkBrZXlmcmFtZXMgZmFkZS1pbiB7XFxyXFxuICAwJSB7XFxyXFxuICAgIG9wYWNpdHk6IDA7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAxMDAlIHtcXHJcXG4gICAgb3BhY2l0eTogMS4wO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG4vKioqKioqKioqKioqKioqKioqKioqKiBFTkQgR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1wiLFwiaGVhZGVyIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhyb3csIG51bGwsIG51bGwsIHNwYWNlLWJldHdlZW4sIGNlbnRlcik7XFxyXFxuICAgIGhlaWdodDogMTIwcHg7XFxyXFxuXFxyXFxuXFxyXFxuICAgIGgxIHtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgICAgICB0b3A6IDQ0cHg7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwMHB4O1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9zbWFsbDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnRfc2l6ZTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiA0N3B4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5sb2dvLFxcclxcbiAgICAubG9nb19waG90b2dyYXBoZXIge1xcclxcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5sb2dvIHtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxMTVweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAubG9nb19waG90b2dyYXBoZXIge1xcclxcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDEwMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgfVxcclxcbn1cIixcIkBtaXhpbiBmbGV4LWJhc2ljKCRmbGV4LWRpcmVjdGlvbixcXHJcXG4gICRmbGV4LXdyYXAsXFxyXFxuICAkYWxpZ24tY29udGVudCxcXHJcXG4gICRqdXN0aWZ5LWNvbnRlbnQsXFxyXFxuICAkYWxpZ24taXRlbXMpIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogJGZsZXgtZGlyZWN0aW9uO1xcclxcblxcclxcbiAgQGlmICgkZmxleC13cmFwKSB7XFxyXFxuICAgIGZsZXgtd3JhcDogJGZsZXgtd3JhcDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIEBpZiAoJGFsaWduLWNvbnRlbnQpIHtcXHJcXG4gICAgYWxpZ24tY29udGVudDogJGFsaWduLWNvbnRlbnQ7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBAaWYgKCRqdXN0aWZ5LWNvbnRlbnQpIHtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiAkanVzdGlmeS1jb250ZW50O1xcclxcbiAgfVxcclxcblxcclxcbiAgQGlmICgkYWxpZ24taXRlbXMpIHtcXHJcXG4gICAgYWxpZ24taXRlbXM6ICRhbGlnbi1pdGVtcztcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLy8gQG1peGluIG1hc2stY3Jvc3Nicm93c2VyKCR2YWx1ZSkge1xcclxcbi8vICAgLXdlYmtpdC1tYXNrOiAkdmFsdWU7XFxyXFxuLy8gICBtYXNrOiAkdmFsdWU7XFxyXFxuLy8gfVxcclxcblxcclxcbi8vIEBtaXhpbiBtYXJnaW4tbGVmdC1hbmQtcmlnaHQoJHZhbHVlKSB7XFxyXFxuLy8gICBtYXJnaW4tbGVmdDogJHZhbHVlO1xcclxcbi8vICAgbWFyZ2luLXJpZ2h0OiAkdmFsdWU7XFxyXFxuLy8gfVxcclxcblxcclxcbkBtaXhpbiBwYWRkaW5nLWxlZnQtYW5kLXJpZ2h0KCR2YWx1ZSkge1xcclxcbiAgcGFkZGluZy1sZWZ0OiAkdmFsdWU7XFxyXFxuICBwYWRkaW5nLXJpZ2h0OiAkdmFsdWU7XFxyXFxufVwiLFwiLnBob3RvZ3JhcGhlcl9jYXJkIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIG51bGwsIG51bGwsIGNlbnRlciwgY2VudGVyKTtcXHJcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIGltZyB7XFxyXFxuICAgICAgICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxyXFxuICAgICAgICBoZWlnaHQ6IDIwMHB4O1xcclxcbiAgICAgICAgd2lkdGg6IDIwMHB4O1xcclxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICAgICAgb2JqZWN0LWZpdDogY292ZXI7XFxyXFxuXFxyXFxuICAgICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgICAgICAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC41MCk7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgXFxyXFxuICAgIGgyLFxcclxcbiAgICBoMyxcXHJcXG4gICAgaDQsXFxyXFxuICAgIGg1IHtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X3NtYWxsO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgyIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDIwcHg7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkyO1xcclxcbiAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgzIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnRfc2l6ZSAvIDIuNzY5O1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDE3cHg7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGg0IHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDJweDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnRfc2l6ZSAvIDMuNjtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxM3B4O1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDUge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMnB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplIC8gNDs7XFxyXFxuICAgICAgICBsaW5lLWhlaWdodDogMTJweDtcXHJcXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfZ3JheTtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxyXFxuICAgIC5waG90b2dyYXBoZXJfY2FyZCB7XFxyXFxuICAgICAgICBoMyB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplIC8gMi43NjkgKiAxLjM7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGg0IHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6ICRmb250X3NpemUgLyAzLjYgKiAxLjM7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGg1IHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6ICRmb250X3NpemUgLyA0ICogMS4zO1xcclxcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxyXFxuICAgIC5waG90b2dyYXBoZXJfY2FyZCB7XFxyXFxuICAgICAgICBoMyB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplIC8gMi43NjkgKiAxLjU7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBoNCB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplIC8gMy42ICogMS41O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaDUge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogJGZvbnRfc2l6ZSAvIDQgKiAxLjU7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBpbWcge1xcclxcbiAgICAgICAgICAgIHdpZHRoOiAyMzBweDtcXHJcXG4gICAgICAgICAgICBoZWlnaHQ6IDIzMHB4O1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxufVwiLFwiLm1vZGFsIHtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3JfYmFja2dyb3VuZDtcXHJcXG4gICAgd2lkdGg6IDUwJTtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICBwYWRkaW5nOiAzNXB4O1xcclxcbiAgICBtYXJnaW46IGF1dG87XFxyXFxufVxcclxcblxcclxcbi5tb2RhbCBoZWFkZXIge1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwgaGVhZGVyIGltZyB7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsIGhlYWRlciBoMiB7XFxyXFxuICAgIGZvbnQtc2l6ZTogJGZvbnRfc2l6ZSAqIDEuNzc7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuZm9ybSB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXHJcXG59XFxyXFxuXFxyXFxuZm9ybSBsYWJlbCB7XFxyXFxuICAgIGNvbG9yOiAkY29sb3Jfc2Vjb25kYXJ5MjtcXHJcXG4gICAgZm9udC1zaXplOiAkZm9udF9zaXplO1xcclxcbn1cXHJcXG5cXHJcXG5mb3JtIGRpdiB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBhbGlnbi1pdGVtczogc2VsZi1zdGFydDtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogMjZweDtcXHJcXG59XFxyXFxuXFxyXFxuZm9ybSBpbnB1dCB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IDY4cHg7XFxyXFxuICAgIGJvcmRlcjogbm9uZTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbn1cIixcIi5jb250YWN0X2J1dHRvbiB7XFxyXFxuICAgIGZvbnQtc2l6ZTogJGZvbnRfc2l6ZSAvIDEuODtcXHJcXG4gICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgIGNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgcGFkZGluZzogMTFweDtcXHJcXG4gICAgbWluLXdpZHRoOiAxNzBweDtcXHJcXG4gICAgbWluLWhlaWdodDogNzBweDtcXHJcXG4gICAgYm9yZGVyOiBub25lO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjVzIGVhc2UtaW4sIGJhY2tncm91bmQtY29sb3IgMC41cyBlYXNlLWluO1xcclxcblxcclxcbiAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9mb250X2NvbG9yO1xcclxcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX2JhY2tncm91bmQ7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuXCIsXCIucGhvdG9ncmFwaF9oZWFkZXIge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKHJvdywgbm8td3JhcCwgZmxlZC1lbmQsIHNwYWNlLWJldHdlZW4sIG51bGwpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Jfc2Vjb25kYXJ5Ml9iZztcXHJcXG4gICAgaGVpZ2h0OiAzMTNweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgQGluY2x1ZGUgcGFkZGluZy1sZWZ0LWFuZC1yaWdodCgzMHB4KTtcXHJcXG5cXHJcXG4gICAgZGl2Om50aC1jaGlsZCgzKSB7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG4gICAgaDEsXFxyXFxuICAgIGgyLFxcclxcbiAgICBoMyB7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9zbWFsbDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoMSB7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemUgKiAxLjc3O1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogLTE1cHg7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgyIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDE1cHg7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplIC8gMS41NTtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDMge1xcclxcbiAgICAgICAgZm9udC1zaXplOiAkZm9udC1zaXplIC8gMjtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3Jfc2Vjb25kYXJ5MjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9hYm91dCxcXHJcXG4gICAgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCBudWxsLCBudWxsLCBjZW50ZXIsIGZsZXgtc3RhcnQpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2J1dHRvbiB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAzMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA4MHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2Fib3V0IHtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciB7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCB3cmFwLCBmbGVkLWVuZCwgc3BhY2UtYmV0d2VlbiwgY2VudGVyKTtcXHJcXG4gICAgICAgIHBhZGRpbmctdG9wOiAxNXB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciBoMSB7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemUgKiAxLjE1O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciBoMiB7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemUgLyAxLjg7XFxyXFxuXFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIGgzIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZSAvIDIuMjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9idXR0b24ge1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcXHJcXG5cXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIHtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCBudWxsLCBmbGVkLWVuZCwgc3BhY2UtYmV0d2VlbiwgY2VudGVyKTtcXHJcXG5cXHJcXG4gICAgICAgIC5waG90b2dyYXBoX2J1dHRvbiB7XFxyXFxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGluaGVyaXQ7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAwcHg7XFxyXFxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDIwMHB4O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlcj4ucGhvdG9ncmFwaF9hYm91dCB7XFxyXFxuICAgICAgICBtYXJnaW4tbGVmdDogMDtcXHJcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIGgxLFxcclxcbiAgICBoMixcXHJcXG4gICAgaDMge1xcclxcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlcj4ucGhvdG9ncmFwaGVyX2NhcmQge1xcclxcbiAgICAgICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbn1cIixcIi5zZWxlY3RfYnV0dG9uIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgYWxpZ24tY29udGVudDogZmxleC1lbmQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG5cXHJcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xcclxcbiAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICBmb250LXNpemU6ICRmb250X3NpemUgLyAyO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIGNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNXB4O1xcclxcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNXB4O1xcclxcbiAgICBib3JkZXI6IG5vbmU7XFxyXFxuICAgIGJvcmRlci1jb2xvcjogbm9uZTtcXHJcXG4gICAgd2lkdGg6IDE3MHB4O1xcclxcbiAgICBoZWlnaHQ6IDcwcHg7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdF9idXR0b246OmFmdGVyIHtcXHJcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW47XFxyXFxuICAgIGNvbnRlbnQ6IFxcXCI+XFxcIjtcXHJcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcclxcbiAgICBmb250LXNpemU6ICRmb250X3NpemUgLyAxLjQ0O1xcclxcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXHJcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi5zZWxlY3RfZmlsdGVyIHtcXHJcXG5cXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxufVxcclxcblxcclxcblxcclxcbi5zZWxlY3RfY29udGVudCB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYmFja2dyb3VuZDogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA1cHg7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA1cHg7XFxyXFxuICAgIG1pbi13aWR0aDogMTYwcHg7XFxyXFxuICAgIGJveC1zaGFkb3c6IDBweCAycHggOHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxyXFxuICAgIHotaW5kZXg6IDE7XFxyXFxuXFxyXFxuXFxyXFxuICAgIC53aGl0ZWxpbmUge1xcclxcbiAgICAgICAgd2lkdGg6IDkwJTtcXHJcXG4gICAgICAgIGhlaWdodDogMXB4O1xcclxcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGRlZmF1bHRfY29sb3I7XFxyXFxuICAgICAgICBtYXJnaW4tbGVmdDogNSU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgYSB7XFxyXFxuXFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemUgLyAyO1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICAgICAgcGFkZGluZzogMjBweDtcXHJcXG4gICAgICAgIHdpZHRoOiAxNzBweDtcXHJcXG4gICAgICAgIGhlaWdodDogNjBweDtcXHJcXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGE6aG92ZXIge1xcclxcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbjtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9mb250X2NvbG9yO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcblxcclxcbi5zZWxlY3RfZmlsdGVyOmhvdmVyIC5zZWxlY3RfY29udGVudCB7XFxyXFxuXFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4uc2VsZWN0X2ZpbHRlcjpob3ZlciAuc2VsZWN0X2J1dHRvbjo6YWZ0ZXIge1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xcclxcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4yNXMgZWFzZS1pbjtcXHJcXG59XFxyXFxuXFxyXFxuLy8gLnNlbGVjdF9maWx0ZXI6aG92ZXIgLnNlbGVjdF9idXR0b24ge1xcclxcbi8vICAgICBiYWNrZ3JvdW5kOiAkY29sb3JfYmFja2dyb3VuZDtcXHJcXG5cXHJcXG4vLyB9XCIsXCIucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMocm93LCBudWxsLCBmbGV4LXN0YXJ0LCBzcGFjZS1hcm91bmQsIGJhc2VsaW5lKTtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3JfYmFja2dyb3VuZDtcXHJcXG4gICAgbWluLXdpZHRoOiAzNzZweDtcXHJcXG4gICAgbWluLWhlaWdodDogODlweDtcXHJcXG4gICAgYm90dG9tOiAwO1xcclxcbiAgICByaWdodDogMzhweDtcXHJcXG4gICAgei1pbmRleDogMjtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogLTIycHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG4gICAgLnRvdGFsX2xpa2VzLFxcclxcbiAgICAucHJpY2VfcmF0ZV9kYWlseSB7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemUgLyAxLjU1O1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDMxcHg7XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgICAgIHBhZGRpbmctdG9wOiAxOHB4O1xcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC50b3RhbF9saWtlczphZnRlciB7XFxyXFxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDVweDtcXHJcXG4gICAgICAgIGNvbnRlbnQ6IFxcXCLimaVcXFwiO1xcclxcbiAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplIC8gMS41NSAqIDEuMzM7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxyXFxuICAgIC5waG90b2dyYXBoZXJfc3RhdGlzdGljIHtcXHJcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XCIsXCIubWVkaWFfY2FyZCB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCBudWxsLCBudWxsLCBudWxsLCBudWxsKTtcXHJcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcclxcbiAgICBtYXgtd2lkdGg6IDM1MHB4O1xcclxcblxcclxcbiAgICBpbWcsXFxyXFxuICAgIHZpZGVvIHtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgIG1heC1oZWlnaHQ6IDMwMHB4O1xcclxcbiAgICAgICAgbWluLWhlaWdodDogMzAwcHg7XFxyXFxuICAgICAgICBvYmplY3QtZml0OiBjb3ZlcjtcXHJcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG5cXHJcXG4gICAgICAgICY6aG92ZXIge1xcclxcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxyXFxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuNTApO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuICAgIC5kZXRhaWxzIHtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMocm93LCBudWxsLCBudWxsLCBzcGFjZS1iZXR3ZWVuLCBiYXNlbGluZSk7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiA1cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDYge1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfc21hbGw7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemUgLyAxLjU7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGg2Omxhc3QtY2hpbGQ6OmFmdGVyIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnRfc2l6ZSAvIDEuNSAqIDEuMjU7XFxyXFxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxyXFxuICAgICAgICBjb250ZW50OiBcXFwi4pmlXFxcIjtcXHJcXG4gICAgfVxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4ubWVkaWFfY2FyZDpoYXModmlkZW8pXFxyXFxueyBcXHJcXG4gICAgY29udGVudDogXFxcIlZcXFwiO1xcclxcbiAgICBib3JkZXI6IDJweCByZWQgc29saWQ7XFxyXFxufVxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcclxcbiAgICAubWVkaWFfY2FyZCBpbWcsXFxyXFxuICAgIC5tZWRpYV9jYXJkIHtcXHJcXG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcXHJcXG4gICAgfVxcclxcbn1cIixcIi8vLy8gTUFJTiBQQUdFIC8vLyBcXHJcXG4ucGhvdG9ncmFwaGVyX3NlY3Rpb24ge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcclxcbiAgICBnYXA6IDcwcHg7XFxyXFxuICAgIG1hcmdpbi10b3A6IDc1cHg7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDc1cHg7XFxyXFxufVxcclxcblxcclxcbi8vLy8vIEVORCBNQUlOIFBBR0UgLy8gXFxyXFxuXFxyXFxuLy8vLy8vLy8vLy8vLy8vLyBQSE9UT0dSQVBIRVIgUEFHRSAvLy8vLy8vIFxcclxcbi5tYXJnaW5fbGVmdF9yaWdodCB7XFxyXFxuICAgIG1hcmdpbjogMCAxMDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZpbHRlcl9zZWN0aW9uIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhyb3csIG51bGwsIG51bGwsIG51bGwsIGJhc2VsaW5lKTtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDA7XFxyXFxuXFxyXFxuICAgIGg1OmZpcnN0LWNoaWxkIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDIwcHg7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDI4cHg7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250LXNpemUgLyAyO1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnNlbGVjdF9maWx0ZXIge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG4ubWVkaWFfc2VjdGlvbiB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxyXFxuICAgIHJvdy1nYXA6IDMwcHg7XFxyXFxuICAgIGNvbHVtbi1nYXA6IDk1cHg7XFxyXFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDc1cHg7XFxyXFxufVxcclxcblxcclxcbi8vLy8vLy8vLy8vLy8vIEVORCBQSE9UT0dSQVBIRVIgUEFHRSAvLy8vLy8vL1xcclxcblxcclxcblxcclxcblxcclxcbiNjb250YWN0X21vZGFsIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG59XCIsXCJmb290ZXIge1xcclxcbiAgICBoZWlnaHQ6IDJweDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICBtYXJnaW4tdG9wOiA3NXB4O1xcclxcbn1cIixcIkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhlcl9zZWN0aW9uLFxcclxcbiAgICAubWVkaWFfc2VjdGlvbiB7XFxyXFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDgwMHB4KSB7XFxyXFxuICAgIGhlYWRlciB7XFxyXFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogNDBweDtcXHJcXG4gICAgICAgIGhlaWdodDoxMDBweDtcXHJcXG5cXHJcXG4gICAgICAgIC5sb2dvX3Bob3RvZ3JhcGhlciB7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICAubG9nbyxcXHJcXG4gICAgICAgaDEge1xcclxcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcclxcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6ICRmb250X3NpemUgLyAxLjIwO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuICAgIC5tYXJnaW5fbGVmdF9yaWdodCB7XFxyXFxuICAgICAgICBtYXJnaW46IDAgMjBweDtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbiAgICAuZmlsdGVyX3NlY3Rpb24ge1xcclxcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaGVyX3NlY3Rpb24ge1xcclxcblxcclxcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxyXFxuICAgIC5tZWRpYV9zZWN0aW9uIHtcXHJcXG5cXHJcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcclxcbiAgICB9XFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMV0udXNlWzNdIS4vbWFpbi5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1sxXS51c2VbM10hLi9tYWluLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuLi8uLi9zY3NzL21haW4uc2Nzcyc7XHJcbmltcG9ydCB7IGdldFBob3RvZ3JhcGhlcnMsZ2V0TWVkaWFzIH0gZnJvbSAnLi4vdXRpbHMvZmV0Y2gnO1xyXG5pbXBvcnQgeyBkaXNwbGF5RGF0YSB9IGZyb20gJy4vZGlzcGxheURhdGEnO1xyXG5pbXBvcnQgeyBkaXNwbGF5TWVkaWEgfSBmcm9tICcuL2Rpc3BsYXlNZWRpYSc7XHJcbmltcG9ydCB7IGdldFVybFBhcmFtZXRlciB9IGZyb20gJy4uL3V0aWxzL2dldFVybFBhcmFtZXRlcic7IFxyXG5cclxuYXN5bmMgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIC8vIFRyeSB0byBnZXQgZGF0YSBmcm9tIHBob3RvZ3JhcGhlcnMgJiBtZWRpYSBpZiBlcnJvciB0aGVuIHJlZGlyZWN0IHRvIDQwNCBwYWdlXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGlkVmFsdWUgPSBhd2FpdCBnZXRVcmxQYXJhbWV0ZXIoXCJpZFwiKTtcclxuICAgICAgICBjb25zdCB7IHBob3RvZ3JhcGhlcnMgfSA9IGF3YWl0IGdldFBob3RvZ3JhcGhlcnMoKTtcclxuICAgICAgICBkaXNwbGF5RGF0YShwaG90b2dyYXBoZXJzLCBcIi5waG90b2dyYXBoX2hlYWRlclwiLCBpZFZhbHVlKTtcclxuXHJcbiAgICAgICAgY29uc3QgeyBtZWRpYXMgfSA9IGF3YWl0IGdldE1lZGlhcygpO1xyXG4gICAgICAgIGRpc3BsYXlNZWRpYShtZWRpYXMsIFwiLm1lZGlhX3NlY3Rpb25cIiwgaWRWYWx1ZSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGFnZSBpbml0aWFsaXNlciBhdmVjIHN1Y2PDqHMgZGVwdWlzIGluaXQoKVwiKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVkaXJpZ2VyIHZlcnMgbGEgcGFnZSA0MDRcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmluaXQoKTtcclxuIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJjc3NXaXRoTWFwcGluZ1RvU3RyaW5nIiwibGlzdCIsInRvU3RyaW5nIiwibWFwIiwiaXRlbSIsImNvbnRlbnQiLCJuZWVkTGF5ZXIiLCJjb25jYXQiLCJsZW5ndGgiLCJqb2luIiwiaSIsIm1vZHVsZXMiLCJtZWRpYSIsImRlZHVwZSIsInN1cHBvcnRzIiwibGF5ZXIiLCJ1bmRlZmluZWQiLCJhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzIiwiayIsImlkIiwiX2siLCJwdXNoIiwiY3NzTWFwcGluZyIsImJ0b2EiLCJiYXNlNjQiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJkYXRhIiwic291cmNlTWFwcGluZyIsInNvdXJjZVVSTHMiLCJzb3VyY2VzIiwic291cmNlIiwic291cmNlUm9vdCIsImluc2VydEhUTUxBZnRlckVsZW1lbnQiLCJpbnNlcnRWaWRlb0luc2lkZUVsZW1lbnQiLCJpbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudCIsImJ1aWxkRWxlbWVudCIsIm1lZGlhRmFjdG9yeSIsInBob3RvZ3JhcGhlcklkIiwidGl0bGUiLCJpbWFnZSIsInZpZGVvIiwibGlrZXMiLCJkYXRlIiwicHJpY2UiLCJtb3ZpZSIsInBpY3R1cmUiLCJnZXRNZWRpYURPTSIsImFydGljbGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJsaW5rRWxlbWVudCIsImFwcGVuZENoaWxkIiwidGl0bGVfaDYiLCJsaWtlc19oNiIsInNldElubmVySHRtbCIsInBob3RvZ3JhcGhlckZhY3RvcnkiLCJuYW1lIiwiY2l0eSIsImNvdW50cnkiLCJ0YWdsaW5lIiwicG9ydHJhaXQiLCJnZXRVc2VyQ2FyZERPTSIsInNldFBob3RvZ3JhcGhlckhlYWRlciIsImltZ1Byb2ZpbGUiLCJxdWVyeVNlbGVjdG9yIiwic2V0U3RpY2t5QmFyUHJpY2UiLCJkaXNwbGF5RGF0YSIsInBob3RvZ3JhcGhlcnMiLCJmb3JFYWNoIiwicGhvdG9ncmFwaGVyIiwiY29uc29sZSIsImxvZyIsInBob3RvZ3JhcGhlck1vZGVsIiwicGhvdG9ncmFwaGVyc1NlY3Rpb24iLCJ1c2VyQ2FyZERPTSIsImRpc3BsYXlNZWRpYSIsIm1lZGlhcyIsInRvdGFsTGlrZXMiLCJtZWRpYXNTZWN0aW9uIiwibWVkaWFNb2RlbCIsIm1lZGlhRE9NIiwiZWxlbWVudCIsImluc2VydEFkamFjZW50SFRNTCIsImh0bWwiLCJiYWxpc2UiLCJ2YWx1ZSIsInRleHRDb250ZW50IiwidGV4dGUiLCJ0ZXh0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJmZXRjaEpTT04iLCJ1cmwiLCJ0eXBlIiwicmVzcG9uc2UiLCJmZXRjaCIsIm9rIiwiRXJyb3IiLCJqc29uUmVzcG9uc2UiLCJqc29uIiwiZ2V0UGhvdG9ncmFwaGVycyIsImdldE1lZGlhcyIsImdldFVybFBhcmFtZXRlciIsInBhcmFtZXRlciIsImZ1bGxVcmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJVUkwiLCJwYXJhbWV0ZXJWYWx1ZSIsInNlYXJjaFBhcmFtcyIsImdldCIsImluaXQiLCJpZFZhbHVlIiwiZSIsImVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==
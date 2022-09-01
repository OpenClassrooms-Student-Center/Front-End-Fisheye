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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n/** Used to load all variables for this project about SCSS **/ /** FONT **/\n/** END FONT **/\n/** COLOR VARIABLES **/\n/** END COLOR VARIABLES **/\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\n/********************** GENERAL **********************/\nhtml,\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: \"DM Sans\", sans-serif;\n  animation: 1s ease-in forwards fade-in;\n}\n\n@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n/********************** END GENERAL **********************/\n/** IMPORT MIXIN **/\n/** IMPORT HEADER STYLES **/\nheader {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  height: 120px;\n}\nheader h1 {\n  color: #901C1C;\n  top: 44px;\n  margin-right: 100px;\n  font-weight: 400;\n  font-size: 36px;\n  line-height: 47px;\n}\nheader .logo,\nheader .logo_photographer {\n  height: 50px;\n}\nheader .logo {\n  margin-left: 115px;\n}\nheader .logo_photographer {\n  margin-left: 100px;\n  margin-top: 10px;\n}\n\n/** IMPORT PHOTOGRAPHERS CARDS **/\n.photographer_card {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  justify-self: center;\n}\n.photographer_card img {\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  transition: box-shadow 1s;\n  height: 200px;\n  width: 200px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.photographer_card img:hover {\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.photographer_card h2,\n.photographer_card h3,\n.photographer_card h4,\n.photographer_card h5 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n}\n.photographer_card h2 {\n  margin-top: 20px;\n  color: #D3573C;\n  font-size: 36px;\n}\n.photographer_card h3 {\n  font-size: 13.0010834236px;\n  line-height: 17px;\n  color: #901C1C;\n}\n.photographer_card h4 {\n  margin-top: 2px;\n  font-size: 10px;\n  line-height: 13px;\n  color: #000000;\n}\n.photographer_card h5 {\n  margin-top: 2px;\n  font-size: 9px;\n  line-height: 12px;\n  text-align: center;\n  color: #757575;\n}\n\n@media (max-width: 1100px) {\n  .photographer_card h3 {\n    font-size: 16.9014084507px;\n    margin-top: 10px;\n  }\n  .photographer_card h4 {\n    font-size: 13px;\n    margin-top: 10px;\n  }\n  .photographer_card h5 {\n    font-size: 11.7px;\n    margin-top: 10px;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_card h3 {\n    font-size: 19.5016251354px;\n  }\n  .photographer_card h4 {\n    font-size: 15px;\n  }\n  .photographer_card h5 {\n    font-size: 13.5px;\n  }\n  .photographer_card img {\n    width: 230px;\n    height: 230px;\n  }\n}\n/** IMPORT MODAL COMPONENT **/\n#contact_modal {\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  display: flex;\n  position: absolute;\n  top: 30px;\n  left: 27%;\n  right: 27%;\n  border-radius: 5px;\n  background-color: #DB8876;\n  align-items: baseline;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n  padding: 35px;\n  margin: auto;\n}\n#contact_modal .modal_header {\n  justify-content: space-between;\n  width: 100%;\n  margin-top: -20px;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: baseline;\n}\n#contact_modal .modal_header img {\n  cursor: pointer;\n}\n#contact_modal .modal_header h2 {\n  font-size: 63.72px;\n  font-weight: normal;\n}\n#contact_modal form input {\n  font-size: 36px;\n  margin-bottom: 5px;\n}\n#contact_modal form textarea {\n  font-size: 18px;\n  margin-bottom: 20px;\n}\n#contact_modal form input,\n#contact_modal form textarea {\n  width: 100%;\n  height: 68px;\n  border: none;\n  border-radius: 5px;\n}\n#contact_modal form label {\n  color: #000000;\n  font-size: 36px;\n}\n#contact_modal form label:last-child {\n  margin-top: 15px;\n}\n\n.label_textarea {\n  margin-top: 15px;\n}\n\n/** IMPORT CONTACT BUTTON COMPONENT **/\n.contact_button {\n  font-size: 20px;\n  font-weight: 700;\n  font-family: \"DM Sans\", sans-serif;\n  color: white;\n  padding: 11px;\n  min-width: 170px;\n  min-height: 70px;\n  border: none;\n  background-color: #901C1C;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: color 0.5s ease-in, background-color 0.5s ease-in;\n}\n.contact_button:hover {\n  color: #000000;\n  background-color: #DB8876;\n}\n\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\n.photograph_header {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: no-wrap;\n  align-content: fled-end;\n  justify-content: space-between;\n  background-color: #FAFAFA;\n  height: 313px;\n  margin-top: 10px;\n  padding-left: 30px;\n  padding-right: 30px;\n}\n.photograph_header div:nth-child(3) {\n  margin-right: 20px;\n}\n.photograph_header h1,\n.photograph_header h2,\n.photograph_header h3 {\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 400;\n}\n.photograph_header h1 {\n  font-size: 63.72px;\n  margin-bottom: -15px;\n  color: #D3573C;\n}\n.photograph_header h2 {\n  margin-top: 15px;\n  margin-bottom: 20px;\n  font-size: 23.2258064516px;\n  color: #901C1C;\n}\n.photograph_header h3 {\n  font-size: 18px;\n  color: #525252;\n}\n.photograph_header .photograph_about,\n.photograph_header .photograph_button {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n}\n.photograph_header .photograph_button {\n  margin-top: 30px;\n  margin-right: 80px;\n}\n.photograph_header .photograph_about {\n  margin-left: 20px;\n  margin-bottom: 10px;\n}\n\n@media (max-width: 1100px) {\n  .photograph_header {\n    background-color: white;\n    display: flex;\n    flex-direction: column;\n    flex-wrap: wrap;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n    padding-top: 15px;\n  }\n  .photograph_header h1 {\n    font-size: 41.4px;\n  }\n  .photograph_header h2 {\n    font-size: 20px;\n  }\n  .photograph_header h3 {\n    font-size: 16.3636363636px;\n  }\n  .photograph_button {\n    margin-bottom: 30px;\n  }\n}\n@media (max-width: 800px) {\n  .photograph_header {\n    display: flex;\n    flex-direction: column;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n  }\n  .photograph_header .photograph_button {\n    align-items: inherit;\n    margin-right: 0px;\n    position: absolute;\n    margin-top: 200px;\n  }\n  .photograph_header > .photograph_about {\n    margin-left: 0;\n    align-items: center;\n  }\n  .photograph_header h1,\nh2,\nh3 {\n    text-align: center;\n  }\n  .photograph_header > .photographer_card {\n    display: none;\n  }\n}\n/** IMPORT SELECT FILTER COMPONENT **/\n.select_button {\n  display: flex;\n  align-content: flex-end;\n  align-items: center;\n  justify-content: space-between;\n  text-align: left;\n  padding-left: 20px;\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 18px;\n  background: #901C1C;\n  color: white;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n  border: none;\n  border-color: none;\n  width: 170px;\n  height: 70px;\n  cursor: pointer;\n}\n\n.select_button::after {\n  transition: transform 0.25s ease-in;\n  content: \">\";\n  transform: rotate(90deg);\n  font-size: 25px;\n  text-align: right;\n  float: right;\n  margin-right: 20px;\n}\n\n.select_filter {\n  position: relative;\n  display: inline-block;\n}\n\n.select_content {\n  display: none;\n  position: absolute;\n  background: #901C1C;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  min-width: 160px;\n  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n}\n.select_content .whiteline {\n  width: 90%;\n  height: 1px;\n  background-color: white;\n  margin-left: 5%;\n}\n.select_content a {\n  transition: all 0.5s ease-in;\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-size: 18px;\n  color: white;\n  padding: 20px;\n  width: 170px;\n  height: 60px;\n  text-decoration: none;\n  display: block;\n}\n.select_content a:hover {\n  cursor: pointer;\n  transition: all 0.5s ease-in;\n  color: #000000;\n}\n\n.select_filter:hover .select_content {\n  display: block;\n}\n\n.select_filter:hover .select_button::after {\n  transform: rotate(-90deg);\n  transition: transform 0.25s ease-in;\n}\n\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\n.photographer_statistic {\n  display: flex;\n  flex-direction: row;\n  align-content: flex-start;\n  justify-content: space-around;\n  align-items: baseline;\n  position: fixed;\n  background-color: #DB8876;\n  min-width: 376px;\n  min-height: 89px;\n  bottom: 0;\n  right: 38px;\n  z-index: 2;\n  margin-bottom: -22px;\n  border-radius: 5px;\n}\n.photographer_statistic .total_likes,\n.photographer_statistic .price_rate_daily {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 23.2258064516px;\n  line-height: 31px;\n  color: #000000;\n  padding-top: 18px;\n}\n.photographer_statistic .total_likes:after {\n  padding-left: 5px;\n  content: \"♥\";\n  font-size: 30.8903225806px;\n}\n\n@media (max-width: 700px) {\n  .photographer_statistic {\n    display: none;\n  }\n}\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\n.media_card {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  max-width: 350px;\n}\n.media_card img,\n.media_card video {\n  transition: box-shadow 1s;\n  width: 100%;\n  max-height: 300px;\n  min-height: 300px;\n  object-fit: cover;\n  border-radius: 5px;\n}\n.media_card img:hover,\n.media_card video:hover {\n  transition: box-shadow 1s;\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.media_card .details {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: baseline;\n  margin-top: 5px;\n}\n.media_card h6 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n  font-size: 24px;\n  color: #901C1C;\n}\n.media_card h6:last-child::after {\n  font-size: 30px;\n  padding-left: 10px;\n  content: \"♥\";\n}\n\n@media (max-width: 600px) {\n  .media_card img,\n.media_card {\n    max-width: 100%;\n  }\n}\n/** IMPORT PAGES (other) Styles **/\n.photographer_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 70px;\n  margin-top: 75px;\n  margin-bottom: 75px;\n}\n\n.margin_left_right {\n  margin: 0 100px;\n}\n\n.filter_section {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline;\n  margin-left: 0;\n}\n.filter_section h5:first-child {\n  margin-top: 20px;\n  margin-right: 28px;\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-style: normal;\n  font-size: 18px;\n  color: #000000;\n}\n.filter_section .select_filter {\n  margin-top: 10px;\n}\n\n.media_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  row-gap: 30px;\n  column-gap: 95px;\n  margin-top: 20px;\n  margin-bottom: 75px;\n}\n\n/** IMPORT FOOTER STYLES **/\nfooter {\n  height: 2px;\n  width: 100%;\n  background-color: white;\n  margin-top: 75px;\n}\n\n/** IMPORT RESPONSIVE STYLES for Non Components Elements\n (components Elements got their own Responsive Rules in their Stylesheet) **/\n@media (max-width: 1100px) {\n  .photographer_section,\n.media_section {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media (max-width: 800px) {\n  header {\n    flex-direction: column;\n    margin-top: 40px;\n    height: 100px;\n  }\n  header .logo_photographer {\n    margin-left: 0;\n  }\n  header .logo,\nheader h1 {\n    margin-left: 20px;\n    margin-right: 20px;\n    font-size: 30px;\n  }\n  .margin_left_right {\n    margin: 0 20px;\n  }\n  .filter_section {\n    justify-content: space-between;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_section {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 600px) {\n  .media_section {\n    grid-template-columns: 1fr;\n  }\n}", "",{"version":3,"sources":["webpack://./src/scss/main.scss","webpack://./src/scss/_variables.scss","webpack://./src/scss/_global.scss","webpack://./src/scss/pages/_header.scss","webpack://./src/scss/_mixin.scss","webpack://./src/scss/components/_photographer_cards.scss","webpack://./src/scss/components/_modal.scss","webpack://./src/scss/components/_contact_button.scss","webpack://./src/scss/components/_photograph_header.scss","webpack://./src/scss/components/_select_filter.scss","webpack://./src/scss/components/_photographer_statistic.scss","webpack://./src/scss/components/_media_cards.scss","webpack://./src/scss/pages/_pages.scss","webpack://./src/scss/pages/_footer.scss","webpack://./src/scss/_responsive.scss"],"names":[],"mappings":"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","sourcesContent":["/** Used to load all variables for this project about SCSS **/\r\n@import \"_variables.scss\";\r\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\r\n@import \"_global.scss\";\r\n/** IMPORT MIXIN **/\r\n@import \"_mixin.scss\";\r\n/** IMPORT HEADER STYLES **/\r\n@import \"pages/header.scss\";\r\n/** IMPORT PHOTOGRAPHERS CARDS **/\r\n@import \"components/photographer_cards.scss\";\r\n/** IMPORT MODAL COMPONENT **/\r\n@import \"components/modal.scss\";\r\n/** IMPORT CONTACT BUTTON COMPONENT **/\r\n@import \"components/contact_button.scss\";\r\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\r\n@import \"components/photograph_header.scss\";\r\n/** IMPORT SELECT FILTER COMPONENT **/\r\n@import \"components/select_filter.scss\";\r\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\r\n@import \"components/photographer_statistic.scss\";\r\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\r\n@import \"components/media_cards.scss\";\r\n/** IMPORT PAGES (other) Styles **/\r\n@import \"pages/pages.scss\";\r\n/** IMPORT FOOTER STYLES **/\r\n@import \"pages/footer.scss\";\r\n/** IMPORT RESPONSIVE STYLES for Non Components Elements\r\n (components Elements got their own Responsive Rules in their Stylesheet) **/\r\n@import \"_responsive.scss\";","/** FONT **/\r\n$font_global: \"DM Sans\", sans-serif;\r\n$font_weight_small: 400;\r\n$font_weight_big: 700;\r\n\r\n$font_size: 36px;\r\n/** END FONT **/\r\n\r\n/** COLOR VARIABLES **/\r\n$default_color: white;\r\n$default_font_color: #000000;\r\n$color_gray: #757575;\r\n$color_primary1: #901C1C;\r\n$color_primary2: #D3573C;\r\n$color_secondary2: #525252;\r\n$color_secondary2_bg: #FAFAFA;\r\n$color_background: #DB8876;\r\n/** END COLOR VARIABLES **/","/********************** GENERAL **********************/\r\nhtml,\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n\r\n}\r\n\r\nbody {\r\n  font-family: $font_global;\r\n  animation: 1s ease-in forwards fade-in;\r\n}\r\n\r\n\r\n@keyframes fade-in {\r\n  0% {\r\n    opacity: 0;\r\n  }\r\n\r\n  100% {\r\n    opacity: 1.0;\r\n  }\r\n}\r\n\r\n/********************** END GENERAL **********************/","header {\r\n    @include flex-basic(row, null, null, space-between, center);\r\n    height: 120px;\r\n\r\n\r\n    h1 {\r\n        color: $color_primary1;\r\n        top: 44px;\r\n        margin-right: 100px;\r\n        font-weight: $font_weight_small;\r\n        font-size: $font_size;\r\n        line-height: 47px;\r\n    }\r\n\r\n    .logo,\r\n    .logo_photographer {\r\n        height: 50px;\r\n    }\r\n\r\n    .logo {\r\n        margin-left: 115px;\r\n    }\r\n\r\n    .logo_photographer {\r\n        margin-left: 100px;\r\n        margin-top: 10px;\r\n    }\r\n}","@mixin flex-basic($flex-direction,\r\n  $flex-wrap,\r\n  $align-content,\r\n  $justify-content,\r\n  $align-items) {\r\n  display: flex;\r\n  flex-direction: $flex-direction;\r\n\r\n  @if ($flex-wrap) {\r\n    flex-wrap: $flex-wrap;\r\n  }\r\n\r\n  @if ($align-content) {\r\n    align-content: $align-content;\r\n  }\r\n\r\n  @if ($justify-content) {\r\n    justify-content: $justify-content;\r\n  }\r\n\r\n  @if ($align-items) {\r\n    align-items: $align-items;\r\n  }\r\n}\r\n\r\n// @mixin mask-crossbrowser($value) {\r\n//   -webkit-mask: $value;\r\n//   mask: $value;\r\n// }\r\n\r\n// @mixin margin-left-and-right($value) {\r\n//   margin-left: $value;\r\n//   margin-right: $value;\r\n// }\r\n\r\n@mixin padding-left-and-right($value) {\r\n  padding-left: $value;\r\n  padding-right: $value;\r\n}",".photographer_card {\r\n    @include flex-basic(column, null, null, center, center);\r\n    justify-self: center;\r\n\r\n    img {\r\n        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n        transition: box-shadow 1s;\r\n        height: 200px;\r\n        width: 200px;\r\n        border-radius: 50%;\r\n        object-fit: cover;\r\n\r\n        &:hover {\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n    \r\n    h2,\r\n    h3,\r\n    h4,\r\n    h5 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 20px;\r\n        color: $color_primary2;\r\n        font-size: $font_size;\r\n    }\r\n\r\n    h3 {\r\n        font-size: calc($font_size / 2.769);\r\n        line-height: 17px;\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h4 {\r\n        margin-top: 2px;\r\n        font-size: calc($font_size / 3.6);\r\n        line-height: 13px;\r\n        color: $default_font_color;\r\n    }\r\n\r\n    h5 {\r\n        margin-top: 2px;\r\n        font-size: calc($font_size / 4);\r\n        line-height: 12px;\r\n        text-align: center;\r\n        color: $color_gray;\r\n    }\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: calc($font_size / 2.769 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h4 {\r\n            font-size: calc($font_size / 3.6 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h5 {\r\n            font-size: calc($font_size / 4 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n    }\r\n\r\n}\r\n\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: calc($font_size / 2.769 * 1.5);\r\n        }\r\n\r\n        h4 {\r\n            font-size: calc($font_size / 3.6 * 1.5);\r\n        }\r\n\r\n        h5 {\r\n            font-size: calc($font_size / 4 * 1.5);\r\n        }\r\n\r\n        img {\r\n            width: 230px;\r\n            height: 230px;\r\n        }\r\n    }\r\n\r\n}","#contact_modal {\r\n    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n    display: flex;\r\n    position: absolute;\r\n    top: 30px;\r\n    left: 27%;\r\n    right: 27%;\r\n    border-radius: 5px;\r\n    background-color: $color_background;\r\n    align-items: baseline;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    padding: 35px;\r\n    margin: auto;\r\n\r\n\r\n    .modal_header {\r\n        justify-content: space-between;\r\n        width: 100%;\r\n        margin-top: -20px;\r\n        margin-bottom: 10px;\r\n        display: flex;\r\n        align-items: baseline;\r\n\r\n        img {\r\n            cursor: pointer;\r\n        }\r\n\r\n        h2 {\r\n            font-size: calc($font_size * 1.77);\r\n            font-weight: normal;\r\n        }\r\n    }\r\n\r\n    form input {\r\n        font-size: calc($font_size);\r\n        margin-bottom: 5px;\r\n    }\r\n\r\n    form textarea {\r\n        font-size: calc($font_size /2);\r\n        margin-bottom: 20px;\r\n    }\r\n\r\n    form input,\r\n    form textarea {\r\n\r\n        width: 100%;\r\n        height: 68px;\r\n        border: none;\r\n        border-radius: 5px;\r\n\r\n    }\r\n\r\n\r\n    form label {\r\n        color: $default_font_color;\r\n        font-size: $font_size;\r\n    }\r\n\r\n    form label:last-child {\r\n        margin-top: 15px;\r\n    }\r\n\r\n}\r\n\r\n.label_textarea {\r\n    margin-top: 15px;\r\n}",".contact_button {\r\n    font-size: calc($font_size / 1.8);\r\n    font-weight: $font_weight_big;\r\n    font-family: $font_global;\r\n    color: $default_color;\r\n    padding: 11px;\r\n    min-width: 170px;\r\n    min-height: 70px;\r\n    border: none;\r\n    background-color: $color_primary1;\r\n    border-radius: 5px;\r\n    cursor: pointer;\r\n    transition: color 0.5s ease-in, background-color 0.5s ease-in;\r\n\r\n    &:hover {\r\n        color: $default_font_color;\r\n        background-color: $color_background;\r\n    }\r\n}\r\n\r\n",".photograph_header {\r\n    @include flex-basic(row, no-wrap, fled-end, space-between, null);\r\n    background-color: $color_secondary2_bg;\r\n    height: 313px;\r\n    margin-top: 10px;\r\n    @include padding-left-and-right(30px);\r\n\r\n    div:nth-child(3) {\r\n        margin-right: 20px;\r\n    }\r\n\r\n\r\n    h1,\r\n    h2,\r\n    h3 {\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h1 {\r\n        font-size: calc($font_size * 1.77);\r\n        margin-bottom: -15px;\r\n        color: $color_primary2;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 15px;\r\n        margin-bottom: 20px;\r\n        font-size: calc($font_size / 1.55);\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h3 {\r\n        font-size: calc($font-size / 2);\r\n        color: $color_secondary2;\r\n    }\r\n\r\n    .photograph_about,\r\n    .photograph_button {\r\n        @include flex-basic(column, null, null, center, flex-start);\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-top: 30px;\r\n        margin-right: 80px;\r\n    }\r\n\r\n    .photograph_about {\r\n        margin-left: 20px;\r\n        margin-bottom: 10px;\r\n    }\r\n}\r\n\r\n\r\n@media (max-width: 1100px) {\r\n    .photograph_header {\r\n        background-color: $default_color;\r\n        @include flex-basic(column, wrap, fled-end, space-between, center);\r\n        padding-top: 15px;\r\n    }\r\n\r\n    .photograph_header h1 {\r\n        font-size: calc($font_size * 1.15);\r\n    }\r\n\r\n    .photograph_header h2 {\r\n        font-size: calc($font_size / 1.8);\r\n\r\n    }\r\n\r\n    .photograph_header h3 {\r\n        font-size: calc($font-size / 2.2);\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-bottom: 30px;\r\n\r\n\r\n    }\r\n\r\n\r\n}\r\n\r\n@media (max-width: 800px) {\r\n    .photograph_header {\r\n        @include flex-basic(column, null, fled-end, space-between, center);\r\n\r\n        .photograph_button {\r\n            align-items: inherit;\r\n            margin-right: 0px;\r\n            position: absolute;\r\n            margin-top: 200px;\r\n        }\r\n\r\n    }\r\n\r\n    .photograph_header>.photograph_about {\r\n        margin-left: 0;\r\n        align-items: center;\r\n    }\r\n\r\n    .photograph_header h1,\r\n    h2,\r\n    h3 {\r\n        text-align: center;\r\n    }\r\n\r\n    .photograph_header>.photographer_card {\r\n        display: none;\r\n    }\r\n\r\n\r\n}",".select_button {\r\n    display: flex;\r\n    align-content: flex-end;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n\r\n    text-align: left;\r\n    padding-left: 20px;\r\n    font-family: $font_global;\r\n    font-style: normal;\r\n    font-weight: $font_weight_big;\r\n    font-size: calc($font_size / 2);\r\n    background: $color_primary1;\r\n    color: $default_color;\r\n    border-top-left-radius: 5px;\r\n    border-top-right-radius: 5px;\r\n    border: none;\r\n    border-color: none;\r\n    width: 170px;\r\n    height: 70px;\r\n    cursor: pointer;\r\n}\r\n\r\n.select_button::after {\r\n    transition: transform 0.25s ease-in;\r\n    content: \">\";\r\n    transform: rotate(90deg);\r\n    font-size: calc($font_size / 1.44);\r\n    text-align: right;\r\n    float: right;\r\n    margin-right: 20px;\r\n\r\n}\r\n\r\n.select_filter {\r\n\r\n    position: relative;\r\n    display: inline-block;\r\n}\r\n\r\n\r\n.select_content {\r\n    display: none;\r\n    position: absolute;\r\n    background: $color_primary1;\r\n    border-bottom-left-radius: 5px;\r\n    border-bottom-right-radius: 5px;\r\n    min-width: 160px;\r\n    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\r\n    z-index: 1;\r\n\r\n\r\n    .whiteline {\r\n        width: 90%;\r\n        height: 1px;\r\n        background-color: $default_color;\r\n        margin-left: 5%;\r\n    }\r\n\r\n    a { \r\n        transition: all 0.5s ease-in;\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-size: calc($font_size / 2);\r\n        color: $default_color;\r\n        padding: 20px;\r\n        width: 170px;\r\n        height: 60px;\r\n        text-decoration: none;\r\n        display: block;\r\n    }\r\n\r\n    a:hover {\r\n        cursor: pointer;\r\n        transition: all 0.5s ease-in;\r\n        color: $default_font_color;\r\n    }\r\n\r\n\r\n\r\n}\r\n\r\n\r\n.select_filter:hover .select_content {\r\n\r\n    display: block;\r\n}\r\n\r\n.select_filter:hover .select_button::after {\r\n    transform: rotate(-90deg);\r\n    transition: transform 0.25s ease-in;\r\n}",".photographer_statistic {\r\n    @include flex-basic(row, null, flex-start, space-around, baseline);\r\n    position: fixed;\r\n    background-color: $color_background;\r\n    min-width: 376px;\r\n    min-height: 89px;\r\n    bottom: 0;\r\n    right: 38px;\r\n    z-index: 2;\r\n    margin-bottom: -22px;\r\n    border-radius: 5px;\r\n\r\n\r\n\r\n    .total_likes,\r\n    .price_rate_daily {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_big;\r\n        font-size: calc($font_size / 1.55);\r\n        line-height: 31px;\r\n        color: $default_font_color;\r\n        padding-top: 18px;\r\n\r\n    }\r\n\r\n    .total_likes:after {\r\n        padding-left: 5px;\r\n        content: \"♥\";\r\n        font-size: calc($font_size / 1.55 * 1.33);\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_statistic {\r\n        display: none;\r\n    }\r\n\r\n}",".media_card {\r\n    @include flex-basic(column, null, null, null, null);\r\n    flex-wrap: wrap;\r\n    max-width: 350px;\r\n\r\n    img,\r\n    video {\r\n        transition: box-shadow 1s;\r\n        width: 100%;\r\n        max-height: 300px;\r\n        min-height: 300px;\r\n        object-fit: cover;\r\n        border-radius: 5px;\r\n\r\n        &:hover {\r\n            transition: box-shadow 1s;\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n    \r\n\r\n\r\n    .details {\r\n        @include flex-basic(row, null, null, space-between, baseline);\r\n        margin-top: 5px;\r\n    }\r\n\r\n    h6 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n        font-size: calc($font_size / 1.5);\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h6:last-child::after {\r\n        font-size: calc($font_size / 1.5 * 1.25);\r\n        padding-left: 10px;\r\n        content: \"♥\";\r\n    }\r\n\r\n}\r\n\r\n\r\n\r\n@media (max-width: 600px) {\r\n\r\n    .media_card img,\r\n    .media_card {\r\n        max-width: 100%;\r\n    }\r\n}","//// MAIN PAGE /// \r\n.photographer_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    gap: 70px;\r\n    margin-top: 75px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n///// END MAIN PAGE // \r\n\r\n//////////////// PHOTOGRAPHER PAGE /////// \r\n.margin_left_right {\r\n    margin: 0 100px;\r\n}\r\n\r\n.filter_section {\r\n    @include flex-basic(row, null, null, null, baseline);\r\n    margin-left: 0;\r\n\r\n    h5:first-child {\r\n        margin-top: 20px;\r\n        margin-right: 28px;\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-style: normal;\r\n        font-size: calc($font-size / 2);\r\n        color: $default_font_color;\r\n    }\r\n\r\n    .select_filter {\r\n        margin-top: 10px;\r\n    }\r\n}\r\n\r\n.media_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    row-gap: 30px;\r\n    column-gap: 95px;\r\n    margin-top: 20px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n////////////// END PHOTOGRAPHER PAGE ////////\r\n\r\n","footer {\r\n    height: 2px;\r\n    width: 100%;\r\n    background-color: $default_color;\r\n    margin-top: 75px;\r\n}","@media (max-width: 1100px) {\r\n\r\n    .photographer_section,\r\n    .media_section {\r\n        grid-template-columns: 1fr 1fr;\r\n    }\r\n\r\n}\r\n\r\n\r\n@media (max-width: 800px) {\r\n\r\n    header {\r\n        flex-direction: column;\r\n        margin-top: 40px;\r\n        height: 100px;\r\n\r\n        .logo_photographer {\r\n            margin-left: 0;\r\n        }\r\n\r\n        .logo,\r\n        h1 {\r\n            margin-left: 20px;\r\n            margin-right: 20px;\r\n            font-size: calc($font_size / 1.20);\r\n        }\r\n    }\r\n\r\n    .margin_left_right {\r\n        margin: 0 20px;\r\n    }\r\n\r\n\r\n    .filter_section {\r\n        justify-content: space-between;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 700px) {\r\n\r\n    .photographer_section {\r\n        grid-template-columns: 1fr;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 600px) {\r\n\r\n    .media_section {\r\n        grid-template-columns: 1fr;\r\n    }\r\n\r\n}"],"sourceRoot":""}]);
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
/*!************************************!*\
  !*** ./src/scripts/pages/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/main.scss */ "./src/scss/main.scss");
/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/fetch */ "./src/scripts/utils/fetch.js");
/* harmony import */ var _pages_displayData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/displayData */ "./src/scripts/pages/displayData.js");




async function initMain() {
  // Try to get data from photographes if error then redirect to 404 page
  try {
    const photographers = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_1__.getPhotographers)();
    (0,_pages_displayData__WEBPACK_IMPORTED_MODULE_2__.displayData)(photographers, ".photographer_section");
    console.log("Page initialiser avec succès depuis init()");
  } catch (e) {
    console.error(e); // If it's a fail then we redirect to 404 Error Page since initMain() it's the minimal functionality
    // Atm 404 error page doesn't exists must be write later

    console.log("Rediriger vers la page 404");
  }
}

initMain();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxLQUFLLEdBQUcsNkJBQTZCLG9CQUFvQixpQ0FBaUMsS0FBSyxHQUFHLE9BQU8sa3ZCQUFrdkIsc0JBQXNCLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxNQUFNLFVBQVUsVUFBVSxXQUFXLE1BQU0sS0FBSyxXQUFXLFdBQVcsTUFBTSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxLQUFLLEtBQUssV0FBVyxZQUFZLFdBQVcsS0FBSyxVQUFVLFlBQVksZUFBZSxlQUFlLFdBQVcsTUFBTSxNQUFNLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLE1BQU0sT0FBTyxVQUFVLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsT0FBTyxZQUFZLEtBQUssVUFBVSxZQUFZLGVBQWUsZUFBZSxZQUFZLE1BQU0sTUFBTSxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLE1BQU0sU0FBUyxZQUFZLFlBQVksWUFBWSxPQUFPLE1BQU0sV0FBVyxXQUFXLFlBQVksTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsT0FBTyxNQUFNLEtBQUssV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLEtBQUssTUFBTSxLQUFLLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxLQUFLLFdBQVcsVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLE1BQU0sTUFBTSxXQUFXLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLE9BQU8sVUFBVSxVQUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxZQUFZLE1BQU0sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLE9BQU8sWUFBWSxLQUFLLFVBQVUsV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsT0FBTyxZQUFZLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxlQUFlLGFBQWEsV0FBVyxXQUFXLGNBQWMsZUFBZSxPQUFPLE1BQU0sV0FBVyxNQUFNLFFBQVEsV0FBVyxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsVUFBVSxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxXQUFXLE9BQU8sT0FBTyxXQUFXLGFBQWEsZUFBZSxlQUFlLE9BQU8sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxPQUFPLE1BQU0sS0FBSyxZQUFZLFVBQVUsYUFBYSxjQUFjLGVBQWUsZUFBZSxlQUFlLFlBQVksTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxLQUFLLE1BQU0sS0FBSyxXQUFXLGFBQWEsZUFBZSxlQUFlLGVBQWUsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLFFBQVEsV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLEtBQUssWUFBWSxNQUFNLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsVUFBVSxVQUFVLFVBQVUsT0FBTyxNQUFNLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxXQUFXLFlBQVksWUFBWSxXQUFXLFdBQVcsV0FBVyxVQUFVLE1BQU0sTUFBTSxVQUFVLFVBQVUsWUFBWSxXQUFXLE1BQU0sTUFBTSxXQUFXLFlBQVksYUFBYSxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxVQUFVLE1BQU0sTUFBTSxVQUFVLFdBQVcsV0FBVyxRQUFRLE1BQU0sVUFBVSxPQUFPLE1BQU0sV0FBVyxXQUFXLE9BQU8sWUFBWSxNQUFNLFVBQVUsWUFBWSxhQUFhLGVBQWUsZUFBZSxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxNQUFNLE9BQU8sV0FBVyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsT0FBTyxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxNQUFNLFVBQVUsWUFBWSxXQUFXLFdBQVcsTUFBTSxPQUFPLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sT0FBTyxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxhQUFhLGFBQWEsYUFBYSxXQUFXLE1BQU0sTUFBTSxZQUFZLFlBQVksWUFBWSxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsV0FBVyxVQUFVLE9BQU8sTUFBTSxNQUFNLFVBQVUsTUFBTSxLQUFLLFlBQVksTUFBTSxVQUFVLFdBQVcsVUFBVSxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsT0FBTyxNQUFNLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxZQUFZLGFBQWEsWUFBWSxVQUFVLFdBQVcsT0FBTyxNQUFNLFdBQVcsT0FBTyxNQUFNLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLE9BQU8sWUFBWSxNQUFNLFVBQVUsVUFBVSxXQUFXLFdBQVcsUUFBUSxNQUFNLE1BQU0sTUFBTSxNQUFNLFdBQVcsT0FBTyxLQUFLLE9BQU8sS0FBSyxXQUFXLFdBQVcsVUFBVSxPQUFPLE9BQU8sVUFBVSxPQUFPLFFBQVEsV0FBVyxXQUFXLFVBQVUsT0FBTyxPQUFPLFVBQVUsT0FBTyxPQUFPLFdBQVcsT0FBTyxL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Q0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBOztBQUVBLGVBQWVDLFFBQWYsR0FBMEI7RUFDdEI7RUFDQSxJQUFJO0lBQ0EsTUFBTXJDLGFBQWEsR0FBRyxNQUFNa0MsOERBQWdCLEVBQTVDO0lBQ0FuQywrREFBVyxDQUFDQyxhQUFELEVBQWdCLHVCQUFoQixDQUFYO0lBQ0FNLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDRDQUFaO0VBQ0gsQ0FKRCxDQUlFLE9BQU8rQixDQUFQLEVBQVU7SUFDUmhDLE9BQU8sQ0FBQ2lDLEtBQVIsQ0FBY0QsQ0FBZCxFQURRLENBRVA7SUFDQTs7SUFDRGhDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDRCQUFaO0VBQ0g7QUFDSjs7QUFFRDhCLFFBQVEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvZmFjdG9yaWVzL3Bob3RvZ3JhcGhlckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy9wYWdlcy9kaXNwbGF5RGF0YS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3V0aWxzL2RvbS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3V0aWxzL2ZldGNoLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3Njc3MvbWFpbi5zY3NzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3Njc3MvbWFpbi5zY3NzP2IzNzkiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxyXG5pbXBvcnQgeyBidWlsZEVsZW1lbnQsIGluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50LCBzZXRJbm5lckh0bWwsIHNldEFyaWVsTGFiZWwgfSBmcm9tIFwiLi4vdXRpbHMvZG9tXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGhvdG9ncmFwaGVyRmFjdG9yeShkYXRhKSB7XHJcbiAgICBjb25zdCB7IG5hbWUsIGlkLCBjaXR5LCBjb3VudHJ5LCB0YWdsaW5lLCBwb3J0cmFpdCwgcHJpY2UgfSA9IGRhdGE7XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICBjb25zdCBwaWN0dXJlID0gYGFzc2V0cy9pbWFnZXMvJHtwb3J0cmFpdH1gO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFVzZXJDYXJkRE9NKCkge1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgRE9NIG9ubHkgaWYgd2UgZ290IGEgcGljdHVyZSBhIGlkIGFuZCBhIG5hbWVcclxuICAgICAgICBpZiAobmFtZSAmJiBpZCAmJiBwb3J0cmFpdCkge1xyXG4gICAgICAgICAgICAvLyBCVUlMRCBBIEFSVElDTEUgXHJcbiAgICAgICAgICAgIGNvbnN0IGFydGljbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXJ0aWNsZVwiKTtcclxuICAgICAgICAgICAgYXJ0aWNsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInBob3RvZ3JhcGhlcl9jYXJkXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIER5bmFtaXF1ZSBMSU5LIHdpdGggUGljdHVyZVxyXG4gICAgICAgICAgICBjb25zdCBsaW5rRWxlbWVudCA9IGFydGljbGUuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBidWlsZEVsZW1lbnQoXCJhXCIsIFwicGhvdG9ncmFwaGVyLmh0bWw/aWQ9XCIgKyBpZCkgLy8gQnVpbGQgQUhyZWZcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgc2V0QXJpZWxMYWJlbChsaW5rRWxlbWVudCwgXCJMaW5rIHRvIFwiICsgbmFtZSkgLy8gU2V0IEFyaWVsTGFiZWwgdG8gQUhyZWZcclxuICAgICAgICAgICAgaW5zZXJ0UGljdHVyZUluc2lkZUVsZW1lbnQobGlua0VsZW1lbnQsIHBpY3R1cmUsIG5hbWUpO1xyXG4gICAgICAgICAgICAvLyBFTkQgQ3JlYXRlIER5bmFtaXF1ZSBMSU5LIHdpdGggUGljdHVyZVxyXG5cclxuICAgICAgICAgICAgYXJ0aWNsZS5hcHBlbmRDaGlsZChidWlsZEVsZW1lbnQoXCJoMlwiLCBuYW1lKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2l0eSAmJiBjb3VudHJ5KSB7XHJcbiAgICAgICAgICAgICAgICBhcnRpY2xlLmFwcGVuZENoaWxkKGJ1aWxkRWxlbWVudChcImgzXCIsIGNpdHkgKyBcIiwgXCIgKyBjb3VudHJ5KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhZ2xpbmUpIHtcclxuICAgICAgICAgICAgICAgIGFydGljbGUuYXBwZW5kQ2hpbGQoYnVpbGRFbGVtZW50KFwiaDRcIiwgdGFnbGluZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcmljZSkge1xyXG4gICAgICAgICAgICAgICAgYXJ0aWNsZS5hcHBlbmRDaGlsZChidWlsZEVsZW1lbnQoXCJoNVwiLCBwcmljZSArIFwi4oKsL2pvdXJcIikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBSRVRVUk4gQSBBUlRJQ0xFIFxyXG4gICAgICAgICAgICByZXR1cm4gYXJ0aWNsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0UGhvdG9ncmFwaGVySGVhZGVyKCkge1xyXG4gICAgICAgIHNldElubmVySHRtbChcIi5waG90b2dyYXBoX2hlYWRlciBoMVwiLCBuYW1lKTtcclxuICAgICAgICBpZiAoY2l0eSAmJiBjb3VudHJ5KSB7XHJcbiAgICAgICAgICAgIHNldElubmVySHRtbChcIi5waG90b2dyYXBoX2hlYWRlciBoMlwiLCBjaXR5ICsgXCIsIFwiICsgY291bnRyeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRJbm5lckh0bWwoXCIucGhvdG9ncmFwaF9oZWFkZXIgaDJcIiwgXCJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldElubmVySHRtbChcIi5waG90b2dyYXBoX2hlYWRlciBoM1wiLCB0YWdsaW5lKTtcclxuXHJcbiAgICAgICAgLyoqIFdFIFVTRSBhIGRpZmZlcmVudCBtZXRob2QgdGhhdCBpbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudCgpIHNpbmNlIHBpY3R1cmUgaXMgYWxyZWFkeSBpbiB0aGUgRE9NICovXHJcbiAgICAgICAgY29uc3QgaW1nUHJvZmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGhvdG9ncmFwaF9oZWFkZXIgaW1nXCIpO1xyXG4gICAgICAgIGltZ1Byb2ZpbGUuc2V0QXR0cmlidXRlKFwic3JjXCIsIHBpY3R1cmUpO1xyXG4gICAgICAgIGltZ1Byb2ZpbGUuc2V0QXR0cmlidXRlKFwiYWx0XCIsIG5hbWUpO1xyXG4gICAgICAgIC8qKiAqL1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFN0aWNreUJhclByaWNlKCkge1xyXG4gICAgICAgIGlmIChwcmljZSkge1xyXG4gICAgICAgICAgICBzZXRJbm5lckh0bWwoXCIucHJpY2VfcmF0ZV9kYWlseVwiLCBwcmljZSArIFwiIOKCrCAvIGpvdXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRJbm5lckh0bWwoXCIucHJpY2VfcmF0ZV9kYWlseVwiLCBwcmljZSArIFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geyBuYW1lLCBwaWN0dXJlLCBnZXRVc2VyQ2FyZERPTSwgc2V0UGhvdG9ncmFwaGVySGVhZGVyLCBzZXRTdGlja3lCYXJQcmljZSB9O1xyXG59XHJcbiIsImltcG9ydCB7IHBob3RvZ3JhcGhlckZhY3RvcnkgfSBmcm9tIFwiLi4vZmFjdG9yaWVzL3Bob3RvZ3JhcGhlckZhY3RvcnlcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXNwbGF5RGF0YShwaG90b2dyYXBoZXJzLCBxdWVyeVNlbGVjdG9yLCBpZCkge1xyXG5cclxuICAgIHBob3RvZ3JhcGhlcnMuZm9yRWFjaCgocGhvdG9ncmFwaGVyKSA9PiB7XHJcbiAgICAgICAgaWYgKGlkKSB7XHJcbiAgICAgICAgICAgIGlmIChwaG90b2dyYXBoZXIuaWQgPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoZW4gd2UgYXJlIGdvaW5nIHVzZSB0aGUgUGhvdG9ncmFwaGVyRmFjdG9yeSB0byBzZXQgRE9NXHJcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHsgY29uc29sZS5sb2cocGhvdG9ncmFwaGVyKTsgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGhvdG9ncmFwaGVyTW9kZWwgPSBwaG90b2dyYXBoZXJGYWN0b3J5KHBob3RvZ3JhcGhlcik7XHJcbiAgICAgICAgICAgICAgICBwaG90b2dyYXBoZXJNb2RlbC5zZXRQaG90b2dyYXBoZXJIZWFkZXIoKTtcclxuICAgICAgICAgICAgICAgIHBob3RvZ3JhcGhlck1vZGVsLnNldFN0aWNreUJhclByaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBFbmQgb2YgUGhvdG9ncmFwaGVyRmFjdG9yeSBXb3JrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUaGVuIHdlIGFyZSBnb2luZyB1c2UgdGhlIFBob3RvZ3JhcGhlckZhY3RvcnkgdG8gZ2VuZXJhdGUgRE9NXHJcbiAgICAgICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlcnNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihxdWVyeVNlbGVjdG9yKTtcclxuICAgICAgICAgICAgY29uc3QgcGhvdG9ncmFwaGVyTW9kZWwgPSBwaG90b2dyYXBoZXJGYWN0b3J5KHBob3RvZ3JhcGhlcik7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJDYXJkRE9NID0gcGhvdG9ncmFwaGVyTW9kZWwuZ2V0VXNlckNhcmRET00oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JykgeyBjb25zb2xlLmxvZyhwaG90b2dyYXBoZXIpOyB9XHJcbiAgICAgICAgICAgIGlmICh1c2VyQ2FyZERPTSkge1xyXG4gICAgICAgICAgICAgICAgcGhvdG9ncmFwaGVyc1NlY3Rpb24uYXBwZW5kQ2hpbGQodXNlckNhcmRET00pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEVuZCBvZiBQaG90b2dyYXBoZXJGYWN0b3J5IFdvcmtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuIiwiLy8gRnVuY3Rpb24gZm9yIGJ1aWxkIERPTVxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0UGljdHVyZUluc2lkZUVsZW1lbnQoZWxlbWVudCwgcGljdHVyZSwgYWx0KSB7XHJcbiAgICBpZiAoYWx0KSB7XHJcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgJzxpbWcgc3JjPVwiJyArIHBpY3R1cmUgKyAnXCIgJyArICdhbHQ9XCInICsgYWx0ICsgJ1wiPicpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgJzxpbWcgc3JjPVwiJyArIHBpY3R1cmUgKyAnXCI+Jyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRWaWRlb0luc2lkZUVsZW1lbnQoZWxlbWVudCwgdmlkZW8sIGFyaWVsTGFiZWwpIHtcclxuXHJcbiAgICBpZiAoYXJpZWxMYWJlbCkge1xyXG4gICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsICc8dmlkZW8gc3JjPVwiJyArIHZpZGVvICsgJ1wiICcgKyAnYXJpYS1sYWJlbD1cIicgKyBhcmllbExhYmVsICsgJ1wiPicpO1xyXG5cclxuICAgIH1cclxuICAgIGVsc2UgXHJcbiAgICB7XHJcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgJzx2aWRlbyBzcmM9XCInICsgdmlkZW8gKyAnXCI+Jyk7XHJcbiAgICB9XHJcbiAgIFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0SFRNTEFmdGVyRWxlbWVudChlbGVtZW50LCBodG1sKSB7XHJcbiAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyZW5kXCIsIGh0bWwpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRFbGVtZW50KGJhbGlzZSwgdmFsdWUpIHtcclxuICAgIC8vIENyZWF0ZSBiYWxpc2VcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGJhbGlzZSk7XHJcblxyXG4gICAgLy8gU2V0IEF0dHJpYnV0ZSBvciBUZXh0Q29udGVuZWQgZGVwZW5kIG9mIGJhbGlzZVxyXG4gICAgc3dpdGNoIChiYWxpc2UpIHtcclxuICAgICAgICBjYXNlIFwiYVwiOlxyXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImhyZWZcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiaW1nXCI6XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3JjXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0QXJpZWxMYWJlbChlbGVtZW50LCBhcmllbExhYmVsKSB7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWVsLWxhYmVsXCIsIGFyaWVsTGFiZWwpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0SW5uZXJIdG1sKHF1ZXJ5U2VsZWN0b3IsIHRleHRlKSB7XHJcbiAgICBjb25zdCB0ZXh0ZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5U2VsZWN0b3IpO1xyXG4gICAgdGV4dGVFbGVtZW50LmlubmVySFRNTCA9IHRleHRlO1xyXG59XHJcbi8vIEVuZCBGdW5jdGlvbiBmb3IgYnVpbGQgRE9NIiwiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoSlNPTih1cmwsIHR5cGUpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTsgLy8gV2FpdCBmb3IgdGhlIEFzeW5jIEZlY3RoIEZ1bmN0aW9uXHJcblxyXG4gICAgLy8gZmV0Y2ggcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBhIHJlc3BvbnNlIHByb3BlcnR5IHdoaWNoIGlmIHNldCB0byBmYWxzZSBtZWFucyB0aGF0IHRoZSBjb25uZWN0aW9uIGlzIG5vdCBnb29kIGFuZCBzbyB3ZSBzdG9wIHRoZSBmdW5jdGlvbiBcclxuICAgIGlmICghcmVzcG9uc2Uub2spIHsgdGhyb3cgbmV3IEVycm9yKFwiVGhyb3duIGZyb20gZmV0Y2hKU09OKClcIik7IH1cclxuXHJcbiAgICBsZXQganNvblJlc3BvbnNlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpOyAvLyBwYXJzaW5nIEpTT05cclxuICAgIGpzb25SZXNwb25zZSA9IGpzb25SZXNwb25zZVt0eXBlXTsgLy8gR2V0IGRhdGEgZnJvbSB0aGUgQXJyYXkgdGhhdCB3ZSB3YW50XHJcbiAgICByZXR1cm4ganNvblJlc3BvbnNlO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBob3RvZ3JhcGhlcnMoKSB7XHJcbiAgICBjb25zdCB1cmwgPSBcIi4vZGF0YS9waG90b2dyYXBoZXJzLmpzb25cIjsgLy8gRGF0YSBzb3VyY2UgLkpTT05cclxuICAgIGNvbnN0IHBob3RvZ3JhcGhlcnMgPSBhd2FpdCBmZXRjaEpTT04odXJsLCBcInBob3RvZ3JhcGhlcnNcIik7IC8vIHVzZSBmZXRjaEpTT04gZnVuY3Rpb24gZnJvbSB1dGlscy9mZXRjaC5qc1xyXG4gICAgcmV0dXJuIHBob3RvZ3JhcGhlcnM7IC8vIFJldHVybiBkYXRhIG9mIFBob3RvR3JhcGhlcnNcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldE1lZGlhcygpIHtcclxuICAgIGNvbnN0IHVybCA9IFwiLi9kYXRhL3Bob3RvZ3JhcGhlcnMuanNvblwiOyAvLyBEYXRhIHNvdXJjZSAuSlNPTlxyXG4gICAgY29uc3QgbWVkaWFzID0gYXdhaXQgZmV0Y2hKU09OKHVybCwgXCJtZWRpYVwiKTsgLy8gdXNlIGZldGNoSlNPTiBmdW5jdGlvbiBmcm9tIHV0aWxzL2ZldGNoLmpzXHJcbiAgICByZXR1cm4gbWVkaWFzOyAvLyBSZXR1cm4gZGF0YSBvZiBNZWRpYVxyXG59XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGNoYXJzZXQgXFxcIlVURi04XFxcIjtcXG4vKiogVXNlZCB0byBsb2FkIGFsbCB2YXJpYWJsZXMgZm9yIHRoaXMgcHJvamVjdCBhYm91dCBTQ1NTICoqLyAvKiogRk9OVCAqKi9cXG4vKiogRU5EIEZPTlQgKiovXFxuLyoqIENPTE9SIFZBUklBQkxFUyAqKi9cXG4vKiogRU5EIENPTE9SIFZBUklBQkxFUyAqKi9cXG4vKiogSU1QT1JUIEdMT0JBTCBDU1MgRk9SIEZPTlRTIEhUTUwsKiBTRUxFQ1RPUiAqKi9cXG4vKioqKioqKioqKioqKioqKioqKioqKiBHRU5FUkFMICoqKioqKioqKioqKioqKioqKioqKiovXFxuaHRtbCxcXG4qIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBhbmltYXRpb246IDFzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1pbjtcXG59XFxuXFxuQGtleWZyYW1lcyBmYWRlLWluIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbn1cXG4vKioqKioqKioqKioqKioqKioqKioqKiBFTkQgR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1xcbi8qKiBJTVBPUlQgTUlYSU4gKiovXFxuLyoqIElNUE9SVCBIRUFERVIgU1RZTEVTICoqL1xcbmhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IDEyMHB4O1xcbn1cXG5oZWFkZXIgaDEge1xcbiAgY29sb3I6ICM5MDFDMUM7XFxuICB0b3A6IDQ0cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDEwMHB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc2l6ZTogMzZweDtcXG4gIGxpbmUtaGVpZ2h0OiA0N3B4O1xcbn1cXG5oZWFkZXIgLmxvZ28sXFxuaGVhZGVyIC5sb2dvX3Bob3RvZ3JhcGhlciB7XFxuICBoZWlnaHQ6IDUwcHg7XFxufVxcbmhlYWRlciAubG9nbyB7XFxuICBtYXJnaW4tbGVmdDogMTE1cHg7XFxufVxcbmhlYWRlciAubG9nb19waG90b2dyYXBoZXIge1xcbiAgbWFyZ2luLWxlZnQ6IDEwMHB4O1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG59XFxuXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVJTIENBUkRTICoqL1xcbi5waG90b2dyYXBoZXJfY2FyZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaW1nIHtcXG4gIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAxcztcXG4gIGhlaWdodDogMjAwcHg7XFxuICB3aWR0aDogMjAwcHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGltZzpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDIsXFxuLnBob3RvZ3JhcGhlcl9jYXJkIGgzLFxcbi5waG90b2dyYXBoZXJfY2FyZCBoNCxcXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDUge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBoMiB7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgY29sb3I6ICNEMzU3M0M7XFxuICBmb250LXNpemU6IDM2cHg7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBoMyB7XFxuICBmb250LXNpemU6IDEzLjAwMTA4MzQyMzZweDtcXG4gIGxpbmUtaGVpZ2h0OiAxN3B4O1xcbiAgY29sb3I6ICM5MDFDMUM7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBoNCB7XFxuICBtYXJnaW4tdG9wOiAycHg7XFxuICBmb250LXNpemU6IDEwcHg7XFxuICBsaW5lLWhlaWdodDogMTNweDtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDUge1xcbiAgbWFyZ2luLXRvcDogMnB4O1xcbiAgZm9udC1zaXplOiA5cHg7XFxuICBsaW5lLWhlaWdodDogMTJweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiAjNzU3NTc1O1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDMge1xcbiAgICBmb250LXNpemU6IDE2LjkwMTQwODQ1MDdweDtcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoNCB7XFxuICAgIGZvbnQtc2l6ZTogMTNweDtcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoNSB7XFxuICAgIGZvbnQtc2l6ZTogMTEuN3B4O1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNzAwcHgpIHtcXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoMyB7XFxuICAgIGZvbnQtc2l6ZTogMTkuNTAxNjI1MTM1NHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGg0IHtcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGg1IHtcXG4gICAgZm9udC1zaXplOiAxMy41cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaW1nIHtcXG4gICAgd2lkdGg6IDIzMHB4O1xcbiAgICBoZWlnaHQ6IDIzMHB4O1xcbiAgfVxcbn1cXG4vKiogSU1QT1JUIE1PREFMIENPTVBPTkVOVCAqKi9cXG4jY29udGFjdF9tb2RhbCB7XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDMwcHg7XFxuICBsZWZ0OiAyNyU7XFxuICByaWdodDogMjclO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0RCODg3NjtcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHBhZGRpbmc6IDM1cHg7XFxuICBtYXJnaW46IGF1dG87XFxufVxcbiNjb250YWN0X21vZGFsIC5tb2RhbF9oZWFkZXIge1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXJnaW4tdG9wOiAtMjBweDtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbn1cXG4jY29udGFjdF9tb2RhbCAubW9kYWxfaGVhZGVyIGltZyB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbiNjb250YWN0X21vZGFsIC5tb2RhbF9oZWFkZXIgaDIge1xcbiAgZm9udC1zaXplOiA2My43MnB4O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG59XFxuI2NvbnRhY3RfbW9kYWwgZm9ybSBpbnB1dCB7XFxuICBmb250LXNpemU6IDM2cHg7XFxuICBtYXJnaW4tYm90dG9tOiA1cHg7XFxufVxcbiNjb250YWN0X21vZGFsIGZvcm0gdGV4dGFyZWEge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG59XFxuI2NvbnRhY3RfbW9kYWwgZm9ybSBpbnB1dCxcXG4jY29udGFjdF9tb2RhbCBmb3JtIHRleHRhcmVhIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA2OHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG4jY29udGFjdF9tb2RhbCBmb3JtIGxhYmVsIHtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbiAgZm9udC1zaXplOiAzNnB4O1xcbn1cXG4jY29udGFjdF9tb2RhbCBmb3JtIGxhYmVsOmxhc3QtY2hpbGQge1xcbiAgbWFyZ2luLXRvcDogMTVweDtcXG59XFxuXFxuLmxhYmVsX3RleHRhcmVhIHtcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxufVxcblxcbi8qKiBJTVBPUlQgQ09OVEFDVCBCVVRUT04gQ09NUE9ORU5UICoqL1xcbi5jb250YWN0X2J1dHRvbiB7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDExcHg7XFxuICBtaW4td2lkdGg6IDE3MHB4O1xcbiAgbWluLWhlaWdodDogNzBweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM5MDFDMUM7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0cmFuc2l0aW9uOiBjb2xvciAwLjVzIGVhc2UtaW4sIGJhY2tncm91bmQtY29sb3IgMC41cyBlYXNlLWluO1xcbn1cXG4uY29udGFjdF9idXR0b246aG92ZXIge1xcbiAgY29sb3I6ICMwMDAwMDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjREI4ODc2O1xcbn1cXG5cXG4vKiogSU1QT1JUIFBIT1RPR1JBUEggSEVBREVSIENPTVBPTkVOVCAqKi9cXG4ucGhvdG9ncmFwaF9oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBmbGV4LXdyYXA6IG5vLXdyYXA7XFxuICBhbGlnbi1jb250ZW50OiBmbGVkLWVuZDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNGQUZBRkE7XFxuICBoZWlnaHQ6IDMxM3B4O1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG4gIHBhZGRpbmctbGVmdDogMzBweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDMwcHg7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciBkaXY6bnRoLWNoaWxkKDMpIHtcXG4gIG1hcmdpbi1yaWdodDogMjBweDtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgxLFxcbi5waG90b2dyYXBoX2hlYWRlciBoMixcXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDMge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciBoMSB7XFxuICBmb250LXNpemU6IDYzLjcycHg7XFxuICBtYXJnaW4tYm90dG9tOiAtMTVweDtcXG4gIGNvbG9yOiAjRDM1NzNDO1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDIge1xcbiAgbWFyZ2luLXRvcDogMTVweDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBmb250LXNpemU6IDIzLjIyNTgwNjQ1MTZweDtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDMge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgY29sb3I6ICM1MjUyNTI7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciAucGhvdG9ncmFwaF9hYm91dCxcXG4ucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIC5waG90b2dyYXBoX2J1dHRvbiB7XFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiA4MHB4O1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYWJvdXQge1xcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxuICAucGhvdG9ncmFwaF9oZWFkZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICBhbGlnbi1jb250ZW50OiBmbGVkLWVuZDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nLXRvcDogMTVweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciBoMSB7XFxuICAgIGZvbnQtc2l6ZTogNDEuNHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIGgyIHtcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIGgzIHtcXG4gICAgZm9udC1zaXplOiAxNi4zNjM2MzYzNjM2cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaF9idXR0b24ge1xcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXG4gIC5waG90b2dyYXBoX2hlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWNvbnRlbnQ6IGZsZWQtZW5kO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXG4gICAgYWxpZ24taXRlbXM6IGluaGVyaXQ7XFxuICAgIG1hcmdpbi1yaWdodDogMHB4O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIG1hcmdpbi10b3A6IDIwMHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyID4gLnBob3RvZ3JhcGhfYWJvdXQge1xcbiAgICBtYXJnaW4tbGVmdDogMDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciBoMSxcXG5oMixcXG5oMyB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciA+IC5waG90b2dyYXBoZXJfY2FyZCB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxufVxcbi8qKiBJTVBPUlQgU0VMRUNUIEZJTFRFUiBDT01QT05FTlQgKiovXFxuLnNlbGVjdF9idXR0b24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGJhY2tncm91bmQ6ICM5MDFDMUM7XFxuICBjb2xvcjogd2hpdGU7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA1cHg7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNXB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLWNvbG9yOiBub25lO1xcbiAgd2lkdGg6IDE3MHB4O1xcbiAgaGVpZ2h0OiA3MHB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uc2VsZWN0X2J1dHRvbjo6YWZ0ZXIge1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW47XFxuICBjb250ZW50OiBcXFwiPlxcXCI7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxuICBmb250LXNpemU6IDI1cHg7XFxuICB0ZXh0LWFsaWduOiByaWdodDtcXG4gIGZsb2F0OiByaWdodDtcXG4gIG1hcmdpbi1yaWdodDogMjBweDtcXG59XFxuXFxuLnNlbGVjdF9maWx0ZXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbn1cXG5cXG4uc2VsZWN0X2NvbnRlbnQge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJhY2tncm91bmQ6ICM5MDFDMUM7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA1cHg7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNXB4O1xcbiAgbWluLXdpZHRoOiAxNjBweDtcXG4gIGJveC1zaGFkb3c6IDBweCAycHggOHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICB6LWluZGV4OiAxO1xcbn1cXG4uc2VsZWN0X2NvbnRlbnQgLndoaXRlbGluZSB7XFxuICB3aWR0aDogOTAlO1xcbiAgaGVpZ2h0OiAxcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIG1hcmdpbi1sZWZ0OiA1JTtcXG59XFxuLnNlbGVjdF9jb250ZW50IGEge1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbjtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogMjBweDtcXG4gIHdpZHRoOiAxNzBweDtcXG4gIGhlaWdodDogNjBweDtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG4uc2VsZWN0X2NvbnRlbnQgYTpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluO1xcbiAgY29sb3I6ICMwMDAwMDA7XFxufVxcblxcbi5zZWxlY3RfZmlsdGVyOmhvdmVyIC5zZWxlY3RfY29udGVudCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLnNlbGVjdF9maWx0ZXI6aG92ZXIgLnNlbGVjdF9idXR0b246OmFmdGVyIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKC05MGRlZyk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4yNXMgZWFzZS1pbjtcXG59XFxuXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVIgU1RBVElTVElDIENPTVBPTkVOVCAqKi9cXG4ucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNEQjg4NzY7XFxuICBtaW4td2lkdGg6IDM3NnB4O1xcbiAgbWluLWhlaWdodDogODlweDtcXG4gIGJvdHRvbTogMDtcXG4gIHJpZ2h0OiAzOHB4O1xcbiAgei1pbmRleDogMjtcXG4gIG1hcmdpbi1ib3R0b206IC0yMnB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG4ucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyAudG90YWxfbGlrZXMsXFxuLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMgLnByaWNlX3JhdGVfZGFpbHkge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDIzLjIyNTgwNjQ1MTZweDtcXG4gIGxpbmUtaGVpZ2h0OiAzMXB4O1xcbiAgY29sb3I6ICMwMDAwMDA7XFxuICBwYWRkaW5nLXRvcDogMThweDtcXG59XFxuLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMgLnRvdGFsX2xpa2VzOmFmdGVyIHtcXG4gIHBhZGRpbmctbGVmdDogNXB4O1xcbiAgY29udGVudDogXFxcIuKZpVxcXCI7XFxuICBmb250LXNpemU6IDMwLjg5MDMyMjU4MDZweDtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxufVxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSIE1FRElBIENBUkRTIENPTVBPTkVOVCAqKi9cXG4ubWVkaWFfY2FyZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIG1heC13aWR0aDogMzUwcHg7XFxufVxcbi5tZWRpYV9jYXJkIGltZyxcXG4ubWVkaWFfY2FyZCB2aWRlbyB7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXgtaGVpZ2h0OiAzMDBweDtcXG4gIG1pbi1oZWlnaHQ6IDMwMHB4O1xcbiAgb2JqZWN0LWZpdDogY292ZXI7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcbi5tZWRpYV9jYXJkIGltZzpob3ZlcixcXG4ubWVkaWFfY2FyZCB2aWRlbzpob3ZlciB7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG59XFxuLm1lZGlhX2NhcmQgLmRldGFpbHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxuICBtYXJnaW4tdG9wOiA1cHg7XFxufVxcbi5tZWRpYV9jYXJkIGg2IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgY29sb3I6ICM5MDFDMUM7XFxufVxcbi5tZWRpYV9jYXJkIGg2Omxhc3QtY2hpbGQ6OmFmdGVyIHtcXG4gIGZvbnQtc2l6ZTogMzBweDtcXG4gIHBhZGRpbmctbGVmdDogMTBweDtcXG4gIGNvbnRlbnQ6IFxcXCLimaVcXFwiO1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gIC5tZWRpYV9jYXJkIGltZyxcXG4ubWVkaWFfY2FyZCB7XFxuICAgIG1heC13aWR0aDogMTAwJTtcXG4gIH1cXG59XFxuLyoqIElNUE9SVCBQQUdFUyAob3RoZXIpIFN0eWxlcyAqKi9cXG4ucGhvdG9ncmFwaGVyX3NlY3Rpb24ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxuICBnYXA6IDcwcHg7XFxuICBtYXJnaW4tdG9wOiA3NXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNzVweDtcXG59XFxuXFxuLm1hcmdpbl9sZWZ0X3JpZ2h0IHtcXG4gIG1hcmdpbjogMCAxMDBweDtcXG59XFxuXFxuLmZpbHRlcl9zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcbi5maWx0ZXJfc2VjdGlvbiBoNTpmaXJzdC1jaGlsZCB7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAyOHB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBjb2xvcjogIzAwMDAwMDtcXG59XFxuLmZpbHRlcl9zZWN0aW9uIC5zZWxlY3RfZmlsdGVyIHtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcblxcbi5tZWRpYV9zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcbiAgcm93LWdhcDogMzBweDtcXG4gIGNvbHVtbi1nYXA6IDk1cHg7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNzVweDtcXG59XFxuXFxuLyoqIElNUE9SVCBGT09URVIgU1RZTEVTICoqL1xcbmZvb3RlciB7XFxuICBoZWlnaHQ6IDJweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBtYXJnaW4tdG9wOiA3NXB4O1xcbn1cXG5cXG4vKiogSU1QT1JUIFJFU1BPTlNJVkUgU1RZTEVTIGZvciBOb24gQ29tcG9uZW50cyBFbGVtZW50c1xcbiAoY29tcG9uZW50cyBFbGVtZW50cyBnb3QgdGhlaXIgb3duIFJlc3BvbnNpdmUgUnVsZXMgaW4gdGhlaXIgU3R5bGVzaGVldCkgKiovXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgLnBob3RvZ3JhcGhlcl9zZWN0aW9uLFxcbi5tZWRpYV9zZWN0aW9uIHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXG4gIGhlYWRlciB7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIG1hcmdpbi10b3A6IDQwcHg7XFxuICAgIGhlaWdodDogMTAwcHg7XFxuICB9XFxuICBoZWFkZXIgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDA7XFxuICB9XFxuICBoZWFkZXIgLmxvZ28sXFxuaGVhZGVyIGgxIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxuICAgIG1hcmdpbi1yaWdodDogMjBweDtcXG4gICAgZm9udC1zaXplOiAzMHB4O1xcbiAgfVxcbiAgLm1hcmdpbl9sZWZ0X3JpZ2h0IHtcXG4gICAgbWFyZ2luOiAwIDIwcHg7XFxuICB9XFxuICAuZmlsdGVyX3NlY3Rpb24ge1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcbiAgLnBob3RvZ3JhcGhlcl9zZWN0aW9uIHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgLm1lZGlhX3NlY3Rpb24ge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXG4gIH1cXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3Njc3MvbWFpbi5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fdmFyaWFibGVzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19nbG9iYWwuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvcGFnZXMvX2hlYWRlci5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fbWl4aW4uc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fcGhvdG9ncmFwaGVyX2NhcmRzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX21vZGFsLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX2NvbnRhY3RfYnV0dG9uLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX3Bob3RvZ3JhcGhfaGVhZGVyLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX3NlbGVjdF9maWx0ZXIuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fcGhvdG9ncmFwaGVyX3N0YXRpc3RpYy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19tZWRpYV9jYXJkcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9wYWdlcy9fcGFnZXMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvcGFnZXMvX2Zvb3Rlci5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fcmVzcG9uc2l2ZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLGdCQUFnQjtBQUFoQiw2REFBQSxFQUFBLFdBQUE7QUNNQSxlQUFBO0FBRUEsc0JBQUE7QUFTQSwwQkFBQTtBRGZBLGtEQUFBO0FFRkEsc0RBQUE7QUFDQTs7RUFFRSxTQUFBO0VBQ0EsVUFBQTtFQUNBLHNCQUFBO0FGT0Y7O0FFSEE7RUFDRSxrQ0RUWTtFQ1VaLHNDQUFB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RUFDSSxXQUFBO0VBQ0EsV0FBQTtFQUNBLHVCWk1ZO0VZTFosZ0JBQUE7QWJvaEJKOztBQTlmQTs0RUFBQTtBYzFCQTtFQUVJOztJQUVJLDhCQUFBO0VkNGhCTjtBQUNGO0FjdmhCQTtFQUVJO0lBQ0ksc0JBQUE7SUFDQSxnQkFBQTtJQUNBLGFBQUE7RWR3aEJOO0VjdGhCTTtJQUNJLGNBQUE7RWR3aEJWO0VjcmhCTTs7SUFFSSxpQkFBQTtJQUNBLGtCQUFBO0lBQ0EsZUFBQTtFZHVoQlY7RWNuaEJFO0lBQ0ksY0FBQTtFZHFoQk47RWNqaEJFO0lBQ0ksOEJBQUE7RWRtaEJOO0FBQ0Y7QWMvZ0JBO0VBRUk7SUFDSSwwQkFBQTtFZGdoQk47QUFDRjtBYzVnQkE7RUFFSTtJQUNJLDBCQUFBO0VkNmdCTjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qKiBVc2VkIHRvIGxvYWQgYWxsIHZhcmlhYmxlcyBmb3IgdGhpcyBwcm9qZWN0IGFib3V0IFNDU1MgKiovXFxyXFxuQGltcG9ydCBcXFwiX3ZhcmlhYmxlcy5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIEdMT0JBTCBDU1MgRk9SIEZPTlRTIEhUTUwsKiBTRUxFQ1RPUiAqKi9cXHJcXG5AaW1wb3J0IFxcXCJfZ2xvYmFsLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgTUlYSU4gKiovXFxyXFxuQGltcG9ydCBcXFwiX21peGluLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgSEVBREVSIFNUWUxFUyAqKi9cXHJcXG5AaW1wb3J0IFxcXCJwYWdlcy9oZWFkZXIuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVJTIENBUkRTICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvcGhvdG9ncmFwaGVyX2NhcmRzLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgTU9EQUwgQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvbW9kYWwuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBDT05UQUNUIEJVVFRPTiBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9jb250YWN0X2J1dHRvbi5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFBIT1RPR1JBUEggSEVBREVSIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL3Bob3RvZ3JhcGhfaGVhZGVyLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgU0VMRUNUIEZJTFRFUiBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9zZWxlY3RfZmlsdGVyLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSIFNUQVRJU1RJQyBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9waG90b2dyYXBoZXJfc3RhdGlzdGljLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSIE1FRElBIENBUkRTIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL21lZGlhX2NhcmRzLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUEFHRVMgKG90aGVyKSBTdHlsZXMgKiovXFxyXFxuQGltcG9ydCBcXFwicGFnZXMvcGFnZXMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBGT09URVIgU1RZTEVTICoqL1xcclxcbkBpbXBvcnQgXFxcInBhZ2VzL2Zvb3Rlci5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFJFU1BPTlNJVkUgU1RZTEVTIGZvciBOb24gQ29tcG9uZW50cyBFbGVtZW50c1xcclxcbiAoY29tcG9uZW50cyBFbGVtZW50cyBnb3QgdGhlaXIgb3duIFJlc3BvbnNpdmUgUnVsZXMgaW4gdGhlaXIgU3R5bGVzaGVldCkgKiovXFxyXFxuQGltcG9ydCBcXFwiX3Jlc3BvbnNpdmUuc2Nzc1xcXCI7XCIsXCIvKiogRk9OVCAqKi9cXHJcXG4kZm9udF9nbG9iYWw6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXHJcXG4kZm9udF93ZWlnaHRfc21hbGw6IDQwMDtcXHJcXG4kZm9udF93ZWlnaHRfYmlnOiA3MDA7XFxyXFxuXFxyXFxuJGZvbnRfc2l6ZTogMzZweDtcXHJcXG4vKiogRU5EIEZPTlQgKiovXFxyXFxuXFxyXFxuLyoqIENPTE9SIFZBUklBQkxFUyAqKi9cXHJcXG4kZGVmYXVsdF9jb2xvcjogd2hpdGU7XFxyXFxuJGRlZmF1bHRfZm9udF9jb2xvcjogIzAwMDAwMDtcXHJcXG4kY29sb3JfZ3JheTogIzc1NzU3NTtcXHJcXG4kY29sb3JfcHJpbWFyeTE6ICM5MDFDMUM7XFxyXFxuJGNvbG9yX3ByaW1hcnkyOiAjRDM1NzNDO1xcclxcbiRjb2xvcl9zZWNvbmRhcnkyOiAjNTI1MjUyO1xcclxcbiRjb2xvcl9zZWNvbmRhcnkyX2JnOiAjRkFGQUZBO1xcclxcbiRjb2xvcl9iYWNrZ3JvdW5kOiAjREI4ODc2O1xcclxcbi8qKiBFTkQgQ09MT1IgVkFSSUFCTEVTICoqL1wiLFwiLyoqKioqKioqKioqKioqKioqKioqKiogR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1xcclxcbmh0bWwsXFxyXFxuKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgYW5pbWF0aW9uOiAxcyBlYXNlLWluIGZvcndhcmRzIGZhZGUtaW47XFxyXFxufVxcclxcblxcclxcblxcclxcbkBrZXlmcmFtZXMgZmFkZS1pbiB7XFxyXFxuICAwJSB7XFxyXFxuICAgIG9wYWNpdHk6IDA7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAxMDAlIHtcXHJcXG4gICAgb3BhY2l0eTogMS4wO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG4vKioqKioqKioqKioqKioqKioqKioqKiBFTkQgR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1wiLFwiaGVhZGVyIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhyb3csIG51bGwsIG51bGwsIHNwYWNlLWJldHdlZW4sIGNlbnRlcik7XFxyXFxuICAgIGhlaWdodDogMTIwcHg7XFxyXFxuXFxyXFxuXFxyXFxuICAgIGgxIHtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgICAgICB0b3A6IDQ0cHg7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwMHB4O1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9zbWFsbDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnRfc2l6ZTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiA0N3B4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5sb2dvLFxcclxcbiAgICAubG9nb19waG90b2dyYXBoZXIge1xcclxcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5sb2dvIHtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxMTVweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAubG9nb19waG90b2dyYXBoZXIge1xcclxcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDEwMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgfVxcclxcbn1cIixcIkBtaXhpbiBmbGV4LWJhc2ljKCRmbGV4LWRpcmVjdGlvbixcXHJcXG4gICRmbGV4LXdyYXAsXFxyXFxuICAkYWxpZ24tY29udGVudCxcXHJcXG4gICRqdXN0aWZ5LWNvbnRlbnQsXFxyXFxuICAkYWxpZ24taXRlbXMpIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogJGZsZXgtZGlyZWN0aW9uO1xcclxcblxcclxcbiAgQGlmICgkZmxleC13cmFwKSB7XFxyXFxuICAgIGZsZXgtd3JhcDogJGZsZXgtd3JhcDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIEBpZiAoJGFsaWduLWNvbnRlbnQpIHtcXHJcXG4gICAgYWxpZ24tY29udGVudDogJGFsaWduLWNvbnRlbnQ7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBAaWYgKCRqdXN0aWZ5LWNvbnRlbnQpIHtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiAkanVzdGlmeS1jb250ZW50O1xcclxcbiAgfVxcclxcblxcclxcbiAgQGlmICgkYWxpZ24taXRlbXMpIHtcXHJcXG4gICAgYWxpZ24taXRlbXM6ICRhbGlnbi1pdGVtcztcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLy8gQG1peGluIG1hc2stY3Jvc3Nicm93c2VyKCR2YWx1ZSkge1xcclxcbi8vICAgLXdlYmtpdC1tYXNrOiAkdmFsdWU7XFxyXFxuLy8gICBtYXNrOiAkdmFsdWU7XFxyXFxuLy8gfVxcclxcblxcclxcbi8vIEBtaXhpbiBtYXJnaW4tbGVmdC1hbmQtcmlnaHQoJHZhbHVlKSB7XFxyXFxuLy8gICBtYXJnaW4tbGVmdDogJHZhbHVlO1xcclxcbi8vICAgbWFyZ2luLXJpZ2h0OiAkdmFsdWU7XFxyXFxuLy8gfVxcclxcblxcclxcbkBtaXhpbiBwYWRkaW5nLWxlZnQtYW5kLXJpZ2h0KCR2YWx1ZSkge1xcclxcbiAgcGFkZGluZy1sZWZ0OiAkdmFsdWU7XFxyXFxuICBwYWRkaW5nLXJpZ2h0OiAkdmFsdWU7XFxyXFxufVwiLFwiLnBob3RvZ3JhcGhlcl9jYXJkIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIG51bGwsIG51bGwsIGNlbnRlciwgY2VudGVyKTtcXHJcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIGltZyB7XFxyXFxuICAgICAgICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxyXFxuICAgICAgICBoZWlnaHQ6IDIwMHB4O1xcclxcbiAgICAgICAgd2lkdGg6IDIwMHB4O1xcclxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICAgICAgb2JqZWN0LWZpdDogY292ZXI7XFxyXFxuXFxyXFxuICAgICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgICAgICAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC41MCk7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgXFxyXFxuICAgIGgyLFxcclxcbiAgICBoMyxcXHJcXG4gICAgaDQsXFxyXFxuICAgIGg1IHtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X3NtYWxsO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgyIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDIwcHg7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkyO1xcclxcbiAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgzIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMi43NjkpO1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDE3cHg7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGg0IHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDJweDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMy42KTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxM3B4O1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDUge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMnB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyA0KTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxMnB4O1xcclxcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9ncmF5O1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXHJcXG4gICAgLnBob3RvZ3JhcGhlcl9jYXJkIHtcXHJcXG4gICAgICAgIGgzIHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDIuNzY5ICogMS4zKTtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaDQge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMy42ICogMS4zKTtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaDUge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gNCAqIDEuMyk7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogNzAwcHgpIHtcXHJcXG4gICAgLnBob3RvZ3JhcGhlcl9jYXJkIHtcXHJcXG4gICAgICAgIGgzIHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDIuNzY5ICogMS41KTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGg0IHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDMuNiAqIDEuNSk7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBoNSB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyA0ICogMS41KTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGltZyB7XFxyXFxuICAgICAgICAgICAgd2lkdGg6IDIzMHB4O1xcclxcbiAgICAgICAgICAgIGhlaWdodDogMjMwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XCIsXCIjY29udGFjdF9tb2RhbCB7XFxyXFxuICAgIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIHRvcDogMzBweDtcXHJcXG4gICAgbGVmdDogMjclO1xcclxcbiAgICByaWdodDogMjclO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl9iYWNrZ3JvdW5kO1xcclxcbiAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgcGFkZGluZzogMzVweDtcXHJcXG4gICAgbWFyZ2luOiBhdXRvO1xcclxcblxcclxcblxcclxcbiAgICAubW9kYWxfaGVhZGVyIHtcXHJcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogLTIwcHg7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbiAgICAgICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXHJcXG5cXHJcXG4gICAgICAgIGltZyB7XFxyXFxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaDIge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplICogMS43Nyk7XFxyXFxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBmb3JtIGlucHV0IHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplKTtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBmb3JtIHRleHRhcmVhIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8yKTtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgZm9ybSBpbnB1dCxcXHJcXG4gICAgZm9ybSB0ZXh0YXJlYSB7XFxyXFxuXFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgIGhlaWdodDogNjhweDtcXHJcXG4gICAgICAgIGJvcmRlcjogbm9uZTtcXHJcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbiAgICBmb3JtIGxhYmVsIHtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9mb250X2NvbG9yO1xcclxcbiAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGZvcm0gbGFiZWw6bGFzdC1jaGlsZCB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi5sYWJlbF90ZXh0YXJlYSB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDE1cHg7XFxyXFxufVwiLFwiLmNvbnRhY3RfYnV0dG9uIHtcXHJcXG4gICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjgpO1xcclxcbiAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X2JpZztcXHJcXG4gICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICBwYWRkaW5nOiAxMXB4O1xcclxcbiAgICBtaW4td2lkdGg6IDE3MHB4O1xcclxcbiAgICBtaW4taGVpZ2h0OiA3MHB4O1xcclxcbiAgICBib3JkZXI6IG5vbmU7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIHRyYW5zaXRpb246IGNvbG9yIDAuNXMgZWFzZS1pbiwgYmFja2dyb3VuZC1jb2xvciAwLjVzIGVhc2UtaW47XFxyXFxuXFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3JfYmFja2dyb3VuZDtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5cIixcIi5waG90b2dyYXBoX2hlYWRlciB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMocm93LCBuby13cmFwLCBmbGVkLWVuZCwgc3BhY2UtYmV0d2VlbiwgbnVsbCk7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl9zZWNvbmRhcnkyX2JnO1xcclxcbiAgICBoZWlnaHQ6IDMxM3B4O1xcclxcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICBAaW5jbHVkZSBwYWRkaW5nLWxlZnQtYW5kLXJpZ2h0KDMwcHgpO1xcclxcblxcclxcbiAgICBkaXY6bnRoLWNoaWxkKDMpIHtcXHJcXG4gICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbiAgICBoMSxcXHJcXG4gICAgaDIsXFxyXFxuICAgIGgzIHtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X3NtYWxsO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgxIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplICogMS43Nyk7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAtMTVweDtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDIge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMTVweDtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNTUpO1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoMyB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnQtc2l6ZSAvIDIpO1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9zZWNvbmRhcnkyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2Fib3V0LFxcclxcbiAgICAucGhvdG9ncmFwaF9idXR0b24ge1xcclxcbiAgICAgICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIG51bGwsIG51bGwsIGNlbnRlciwgZmxleC1zdGFydCk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDMwcHg7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDgwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfYWJvdXQge1xcclxcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIHtcXHJcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICAgICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIHdyYXAsIGZsZWQtZW5kLCBzcGFjZS1iZXR3ZWVuLCBjZW50ZXIpO1xcclxcbiAgICAgICAgcGFkZGluZy10b3A6IDE1cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIGgxIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplICogMS4xNSk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIGgyIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS44KTtcXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXIgaDMge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250LXNpemUgLyAyLjIpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2J1dHRvbiB7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcclxcblxcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXIge1xcclxcbiAgICAgICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIG51bGwsIGZsZWQtZW5kLCBzcGFjZS1iZXR3ZWVuLCBjZW50ZXIpO1xcclxcblxcclxcbiAgICAgICAgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXHJcXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogaW5oZXJpdDtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDBweDtcXHJcXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXRvcDogMjAwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyPi5waG90b2dyYXBoX2Fib3V0IHtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xcclxcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXIgaDEsXFxyXFxuICAgIGgyLFxcclxcbiAgICBoMyB7XFxyXFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyPi5waG90b2dyYXBoZXJfY2FyZCB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxufVwiLFwiLnNlbGVjdF9idXR0b24ge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1jb250ZW50OiBmbGV4LWVuZDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcblxcclxcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMik7XFxyXFxuICAgIGJhY2tncm91bmQ6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA1cHg7XFxyXFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1cHg7XFxyXFxuICAgIGJvcmRlcjogbm9uZTtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiBub25lO1xcclxcbiAgICB3aWR0aDogMTcwcHg7XFxyXFxuICAgIGhlaWdodDogNzBweDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc2VsZWN0X2J1dHRvbjo6YWZ0ZXIge1xcclxcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4yNXMgZWFzZS1pbjtcXHJcXG4gICAgY29udGVudDogXFxcIj5cXFwiO1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxyXFxuICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS40NCk7XFxyXFxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcclxcbiAgICBmbG9hdDogcmlnaHQ7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdF9maWx0ZXIge1xcclxcblxcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuLnNlbGVjdF9jb250ZW50IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDVweDtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDVweDtcXHJcXG4gICAgbWluLXdpZHRoOiAxNjBweDtcXHJcXG4gICAgYm94LXNoYWRvdzogMHB4IDJweCA4cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXHJcXG4gICAgei1pbmRleDogMTtcXHJcXG5cXHJcXG5cXHJcXG4gICAgLndoaXRlbGluZSB7XFxyXFxuICAgICAgICB3aWR0aDogOTAlO1xcclxcbiAgICAgICAgaGVpZ2h0OiAxcHg7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiA1JTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBhIHsgXFxyXFxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluO1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAyKTtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgICAgIHBhZGRpbmc6IDIwcHg7XFxyXFxuICAgICAgICB3aWR0aDogMTcwcHg7XFxyXFxuICAgICAgICBoZWlnaHQ6IDYwcHg7XFxyXFxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBhOmhvdmVyIHtcXHJcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW47XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4uc2VsZWN0X2ZpbHRlcjpob3ZlciAuc2VsZWN0X2NvbnRlbnQge1xcclxcblxcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdF9maWx0ZXI6aG92ZXIgLnNlbGVjdF9idXR0b246OmFmdGVyIHtcXHJcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcXHJcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW47XFxyXFxufVwiLFwiLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKHJvdywgbnVsbCwgZmxleC1zdGFydCwgc3BhY2UtYXJvdW5kLCBiYXNlbGluZSk7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX2JhY2tncm91bmQ7XFxyXFxuICAgIG1pbi13aWR0aDogMzc2cHg7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDg5cHg7XFxyXFxuICAgIGJvdHRvbTogMDtcXHJcXG4gICAgcmlnaHQ6IDM4cHg7XFxyXFxuICAgIHotaW5kZXg6IDI7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IC0yMnB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuICAgIC50b3RhbF9saWtlcyxcXHJcXG4gICAgLnByaWNlX3JhdGVfZGFpbHkge1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjU1KTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAzMXB4O1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgICAgICBwYWRkaW5nLXRvcDogMThweDtcXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAudG90YWxfbGlrZXM6YWZ0ZXIge1xcclxcbiAgICAgICAgcGFkZGluZy1sZWZ0OiA1cHg7XFxyXFxuICAgICAgICBjb250ZW50OiBcXFwi4pmlXFxcIjtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS41NSAqIDEuMzMpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVwiLFwiLm1lZGlhX2NhcmQge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKGNvbHVtbiwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCk7XFxyXFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gICAgbWF4LXdpZHRoOiAzNTBweDtcXHJcXG5cXHJcXG4gICAgaW1nLFxcclxcbiAgICB2aWRlbyB7XFxyXFxuICAgICAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcclxcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgICBtYXgtaGVpZ2h0OiAzMDBweDtcXHJcXG4gICAgICAgIG1pbi1oZWlnaHQ6IDMwMHB4O1xcclxcbiAgICAgICAgb2JqZWN0LWZpdDogY292ZXI7XFxyXFxuICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuXFxyXFxuICAgICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcclxcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAgICAgICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjUwKTtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBcXHJcXG5cXHJcXG5cXHJcXG4gICAgLmRldGFpbHMge1xcclxcbiAgICAgICAgQGluY2x1ZGUgZmxleC1iYXNpYyhyb3csIG51bGwsIG51bGwsIHNwYWNlLWJldHdlZW4sIGJhc2VsaW5lKTtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDVweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoNiB7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9zbWFsbDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS41KTtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDY6bGFzdC1jaGlsZDo6YWZ0ZXIge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjUgKiAxLjI1KTtcXHJcXG4gICAgICAgIHBhZGRpbmctbGVmdDogMTBweDtcXHJcXG4gICAgICAgIGNvbnRlbnQ6IFxcXCLimaVcXFwiO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcblxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcclxcblxcclxcbiAgICAubWVkaWFfY2FyZCBpbWcsXFxyXFxuICAgIC5tZWRpYV9jYXJkIHtcXHJcXG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcXHJcXG4gICAgfVxcclxcbn1cIixcIi8vLy8gTUFJTiBQQUdFIC8vLyBcXHJcXG4ucGhvdG9ncmFwaGVyX3NlY3Rpb24ge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcclxcbiAgICBnYXA6IDcwcHg7XFxyXFxuICAgIG1hcmdpbi10b3A6IDc1cHg7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDc1cHg7XFxyXFxufVxcclxcblxcclxcbi8vLy8vIEVORCBNQUlOIFBBR0UgLy8gXFxyXFxuXFxyXFxuLy8vLy8vLy8vLy8vLy8vLyBQSE9UT0dSQVBIRVIgUEFHRSAvLy8vLy8vIFxcclxcbi5tYXJnaW5fbGVmdF9yaWdodCB7XFxyXFxuICAgIG1hcmdpbjogMCAxMDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZpbHRlcl9zZWN0aW9uIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhyb3csIG51bGwsIG51bGwsIG51bGwsIGJhc2VsaW5lKTtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDA7XFxyXFxuXFxyXFxuICAgIGg1OmZpcnN0LWNoaWxkIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDIwcHg7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDI4cHg7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnQtc2l6ZSAvIDIpO1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnNlbGVjdF9maWx0ZXIge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG4ubWVkaWFfc2VjdGlvbiB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxyXFxuICAgIHJvdy1nYXA6IDMwcHg7XFxyXFxuICAgIGNvbHVtbi1nYXA6IDk1cHg7XFxyXFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDc1cHg7XFxyXFxufVxcclxcblxcclxcbi8vLy8vLy8vLy8vLy8vIEVORCBQSE9UT0dSQVBIRVIgUEFHRSAvLy8vLy8vL1xcclxcblxcclxcblwiLFwiZm9vdGVyIHtcXHJcXG4gICAgaGVpZ2h0OiAycHg7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgbWFyZ2luLXRvcDogNzVweDtcXHJcXG59XCIsXCJAbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoZXJfc2VjdGlvbixcXHJcXG4gICAgLm1lZGlhX3NlY3Rpb24ge1xcclxcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcclxcblxcclxcbiAgICBoZWFkZXIge1xcclxcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDQwcHg7XFxyXFxuICAgICAgICBoZWlnaHQ6IDEwMHB4O1xcclxcblxcclxcbiAgICAgICAgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIC5sb2dvLFxcclxcbiAgICAgICAgaDEge1xcclxcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcclxcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuMjApO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5tYXJnaW5fbGVmdF9yaWdodCB7XFxyXFxuICAgICAgICBtYXJnaW46IDAgMjBweDtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbiAgICAuZmlsdGVyX3NlY3Rpb24ge1xcclxcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcclxcblxcclxcbiAgICAucGhvdG9ncmFwaGVyX3NlY3Rpb24ge1xcclxcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5tZWRpYV9zZWN0aW9uIHtcXHJcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMV0udXNlWzNdIS4vbWFpbi5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1sxXS51c2VbM10hLi9tYWluLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuLi8uLi9zY3NzL21haW4uc2Nzcyc7XHJcbmltcG9ydCB7IGdldFBob3RvZ3JhcGhlcnMgfSBmcm9tICcuLi91dGlscy9mZXRjaCc7XHJcbmltcG9ydCB7IGRpc3BsYXlEYXRhIH0gZnJvbSAnLi4vcGFnZXMvZGlzcGxheURhdGEnO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gaW5pdE1haW4oKSB7XHJcbiAgICAvLyBUcnkgdG8gZ2V0IGRhdGEgZnJvbSBwaG90b2dyYXBoZXMgaWYgZXJyb3IgdGhlbiByZWRpcmVjdCB0byA0MDQgcGFnZVxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBwaG90b2dyYXBoZXJzID0gYXdhaXQgZ2V0UGhvdG9ncmFwaGVycygpO1xyXG4gICAgICAgIGRpc3BsYXlEYXRhKHBob3RvZ3JhcGhlcnMsIFwiLnBob3RvZ3JhcGhlcl9zZWN0aW9uXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGFnZSBpbml0aWFsaXNlciBhdmVjIHN1Y2PDqHMgZGVwdWlzIGluaXQoKVwiKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgICAvLyBJZiBpdCdzIGEgZmFpbCB0aGVuIHdlIHJlZGlyZWN0IHRvIDQwNCBFcnJvciBQYWdlIHNpbmNlIGluaXRNYWluKCkgaXQncyB0aGUgbWluaW1hbCBmdW5jdGlvbmFsaXR5XHJcbiAgICAgICAgIC8vIEF0bSA0MDQgZXJyb3IgcGFnZSBkb2Vzbid0IGV4aXN0cyBtdXN0IGJlIHdyaXRlIGxhdGVyXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWRpcmlnZXIgdmVycyBsYSBwYWdlIDQwNFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuaW5pdE1haW4oKTtcclxuIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJjc3NXaXRoTWFwcGluZ1RvU3RyaW5nIiwibGlzdCIsInRvU3RyaW5nIiwibWFwIiwiaXRlbSIsImNvbnRlbnQiLCJuZWVkTGF5ZXIiLCJjb25jYXQiLCJsZW5ndGgiLCJqb2luIiwiaSIsIm1vZHVsZXMiLCJtZWRpYSIsImRlZHVwZSIsInN1cHBvcnRzIiwibGF5ZXIiLCJ1bmRlZmluZWQiLCJhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzIiwiayIsImlkIiwiX2siLCJwdXNoIiwiY3NzTWFwcGluZyIsImJ0b2EiLCJiYXNlNjQiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJkYXRhIiwic291cmNlTWFwcGluZyIsInNvdXJjZVVSTHMiLCJzb3VyY2VzIiwic291cmNlIiwic291cmNlUm9vdCIsImJ1aWxkRWxlbWVudCIsImluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50Iiwic2V0SW5uZXJIdG1sIiwic2V0QXJpZWxMYWJlbCIsInBob3RvZ3JhcGhlckZhY3RvcnkiLCJuYW1lIiwiY2l0eSIsImNvdW50cnkiLCJ0YWdsaW5lIiwicG9ydHJhaXQiLCJwcmljZSIsInBpY3R1cmUiLCJnZXRVc2VyQ2FyZERPTSIsImFydGljbGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJsaW5rRWxlbWVudCIsImFwcGVuZENoaWxkIiwic2V0UGhvdG9ncmFwaGVySGVhZGVyIiwiaW1nUHJvZmlsZSIsInF1ZXJ5U2VsZWN0b3IiLCJzZXRTdGlja3lCYXJQcmljZSIsImRpc3BsYXlEYXRhIiwicGhvdG9ncmFwaGVycyIsImZvckVhY2giLCJwaG90b2dyYXBoZXIiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJjb25zb2xlIiwibG9nIiwicGhvdG9ncmFwaGVyTW9kZWwiLCJwaG90b2dyYXBoZXJzU2VjdGlvbiIsInVzZXJDYXJkRE9NIiwiZWxlbWVudCIsImFsdCIsImluc2VydEFkamFjZW50SFRNTCIsImluc2VydFZpZGVvSW5zaWRlRWxlbWVudCIsInZpZGVvIiwiYXJpZWxMYWJlbCIsImluc2VydEhUTUxBZnRlckVsZW1lbnQiLCJodG1sIiwiYmFsaXNlIiwidmFsdWUiLCJ0ZXh0Q29udGVudCIsInRleHRlIiwidGV4dGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiZmV0Y2hKU09OIiwidXJsIiwidHlwZSIsInJlc3BvbnNlIiwiZmV0Y2giLCJvayIsIkVycm9yIiwianNvblJlc3BvbnNlIiwianNvbiIsImdldFBob3RvZ3JhcGhlcnMiLCJnZXRNZWRpYXMiLCJtZWRpYXMiLCJpbml0TWFpbiIsImUiLCJlcnJvciJdLCJzb3VyY2VSb290IjoiIn0=
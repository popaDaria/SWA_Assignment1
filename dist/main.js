/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/init.js":
/*!*********************!*\
  !*** ./src/init.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ \"./src/model.js\");\n/* harmony import */ var _presenter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presenter.js */ \"./src/presenter.js\");\n/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view.js */ \"./src/view.js\");\n\r\n\r\n\r\n\r\nfunction display(theView, weather = []) {\r\n    const theModel = (0,_model_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(weather)\r\n    const thePresenter = (0,_presenter_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(theModel, theView)\r\n    theView.listen(thePresenter.onAction)\r\n    theView.update(theModel)\r\n}\r\n\r\nasync function init() {\r\n    getData('');\r\n}\r\n\r\nasync function getData(url){\r\n    const theView = (0,_view_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(window)\r\n    try {\r\n        const response = await fetch('http://localhost:8080/data/'+url)\r\n        if (!response.ok) throw response.statusText\r\n        const weather = await response.json()\r\n        display(theView, weather)\r\n        theView.displayError('')\r\n    } catch (e) {\r\n        theView.displayError(e)\r\n    }\r\n}\r\n\r\nvar radioSelection = document.placeSelection.placeRadio;\r\nvar prev = null;\r\nfor (var i = 0; i < radioSelection.length; i++) {\r\n    radioSelection[i].addEventListener('change', function () {\r\n        if (this !== prev) {\r\n            prev = this;\r\n        }\r\n        getData(this.value)\r\n    });\r\n}\r\n\r\ninit()\r\n\n\n//# sourceURL=webpack://weatherreport/./src/init.js?");

/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"getAverageWindSpeed\": () => (/* binding */ getAverageWindSpeed),\n/* harmony export */   \"getMaxTemperature\": () => (/* binding */ getMaxTemperature),\n/* harmony export */   \"getMinTemperature\": () => (/* binding */ getMinTemperature),\n/* harmony export */   \"getTotalPrecipitation\": () => (/* binding */ getTotalPrecipitation)\n/* harmony export */ });\nconst model = (weather, filter = () => true) => {\r\n    const weatherData = () => weather\r\n        .map(w => WeatherMeasurement(w.type, w.unit, w.time, w.place, w.value, w.precipitation_type, w.direction))\r\n        .filter(filter)\r\n\r\n    const forecastData = () => weather\r\n        .map(w => ForecastMeasurement(w.type, w.unit, w.time, w.place, w.from, w.to, w.precipitation_types, w.directions))\r\n        .filter(filter)\r\n\r\n    const temperatureData = () => weather.map(p => p.value).filter(filter)\r\n    const all = () => model(weather)\r\n\r\n    return { weatherData, all, temperatureData, forecastData }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (model);\r\n\r\n\r\nfunction SimpleMeasurement(type, unit, time, place) {\r\n    function getTime() { return time }\r\n    function getPlace() { return place }\r\n    function getType() { return type }\r\n    function getUnit() { return unit }\r\n\r\n    return { getTime, getPlace, getType, getUnit }\r\n}\r\n\r\nfunction WeatherMeasurement(type, unit, time, place, value, precipitation_type, direction) {\r\n    let baseMeasurement = SimpleMeasurement(type, unit, time, place)\r\n    function getValue() { return value }\r\n    function getPrecipType() { return precipitation_type }\r\n    function getDirection() { return direction }\r\n\r\n    return { ...baseMeasurement, getValue, getPrecipType, getDirection }\r\n}\r\n\r\nfunction ForecastMeasurement(type, unit, time, place, from, to, precipitation_types, directions) {\r\n    let baseMeasurement = SimpleMeasurement(type, unit, time, place)\r\n    function getFromValue() { return from }\r\n    function getToValue() { return to }\r\n    function getPrecipTypes() { return precipitation_types }\r\n    function getDirections() { return directions }\r\n\r\n    return { ...baseMeasurement, getFromValue, getToValue, getPrecipTypes, getDirections }\r\n}\r\n\r\nfunction getMinTemperature(weather){\r\n    let min = weather[0].getValue();\r\n    for (let i = 0; i < weather.length; i++) {\r\n        const newDate = new Date(weather[i].getTime())\r\n\r\n        if(weather[i].getType() === \"temperature\" && isDateYesterday(newDate.getUTCDate()) && weather[i].getValue() < min) {\r\n            min=weather[i].getValue();\r\n        }\r\n    }\r\n    return min;\r\n}\r\n\r\nfunction getMaxTemperature(weather){\r\n    let max = weather[0].getValue();\r\n    for (let i = 0; i < weather.length; i++) {\r\n        const newDate = new Date(weather[i].getTime())\r\n        if(weather[i].getType() === \"temperature\" && isDateYesterday(newDate.getUTCDate()) && weather[i].getValue() > max) {\r\n            max=weather[i].getValue();\r\n        }\r\n    }\r\n    return max;\r\n}\r\n\r\nfunction getTotalPrecipitation(weather) {\r\n    let sum = 0;\r\n    for (let i = 0; i < weather.length; i++) {\r\n        const newDate = new Date(weather[i].getTime())\r\n        if(weather[i].getType() === \"precipitation\" && isDateYesterday(newDate.getUTCDate())) {\r\n            sum+=weather[i].getValue();\r\n        }\r\n    }\r\n    return Math.round((sum + Number.EPSILON) * 100) / 100\r\n}\r\n\r\nfunction getAverageWindSpeed(weather) {\r\n    let sum = 0;\r\n    let count = 0\r\n    for (let i = 0; i < weather.length; i++) {\r\n        const newDate = new Date(weather[i].getTime())\r\n\r\n        if(weather[i].getType() === \"wind speed\" && isDateYesterday(newDate.getUTCDate())) {\r\n            sum+=weather[i].getValue();\r\n            count++;\r\n        }\r\n    }\r\n    return Math.round((sum/count + Number.EPSILON) * 100) / 100\r\n\r\n}\r\n\r\nfunction isDateYesterday(dateToCheck) {\r\n    const today = new Date()\r\n    const yesterday = new Date(today)\r\n    yesterday.setDate(yesterday.getDate() - 1)\r\n    return dateToCheck === yesterday.getUTCDate();\r\n}\r\n\r\n// let x = WeatherMeasurement('precip','m/s','20220922','Horsens',12.5,'rain',undefined)\r\n// let x = ForecastMeasurement('precip','m/s','20220922','Horsens',12.5,15,['rain','hail'],undefined)\r\n// console.log(x.getPrecipTypes())\r\n\n\n//# sourceURL=webpack://weatherreport/./src/model.js?");

/***/ }),

/***/ "./src/presenter.js":
/*!**************************!*\
  !*** ./src/presenter.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((init_model, view) => {\r\n    let model = init_model\r\n  \r\n    const onAction = async ({type, ...params}) =>  {\r\n      switch(type) {\r\n        case 'hire':\r\n          break;\r\n      }\r\n    }\r\n  \r\n    return { onAction }\r\n  });\r\n  \n\n//# sourceURL=webpack://weatherreport/./src/presenter.js?");

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ \"./src/model.js\");\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window => {\r\n    const document = window.document\r\n    const weather_table_body = document.getElementById('weather_data')\r\n    const functions_table_body = document.getElementById('functions_data')\r\n    const listeners = []\r\n\r\n    const listen = l => listeners.push(l)\r\n\r\n    const displayError = e => {\r\n        const msg_board = document.getElementById('error_messages')\r\n        msg_board.innerText = e\r\n    }\r\n\r\n    const addWeather = p => {\r\n        const tr = weather_table_body.appendChild(document.createElement('tr'))\r\n        tr.insertCell().appendChild(document.createTextNode(p.getType()))\r\n        tr.insertCell().appendChild(document.createTextNode(p.getTime()))\r\n        tr.insertCell().appendChild(document.createTextNode(p.getPlace()))\r\n        tr.insertCell().appendChild(document.createTextNode(p.getValue()))\r\n        tr.insertCell().appendChild(document.createTextNode(p.getUnit()))\r\n        if (p.getPrecipType()) {\r\n            tr.insertCell().appendChild(document.createTextNode(p.getPrecipType()))\r\n        } else {\r\n            tr.insertCell()\r\n        }\r\n\r\n        if (p.getDirection()) {\r\n            tr.insertCell().appendChild(document.createTextNode(p.getDirection()))\r\n        } else {\r\n            tr.insertCell()\r\n        }\r\n\r\n    }\r\n    const addLastDay = p => {\r\n        const functions_tr = functions_table_body.appendChild(document.createElement('tr'))\r\n        functions_tr.insertCell().appendChild(document.createTextNode((0,_model_js__WEBPACK_IMPORTED_MODULE_0__.getMinTemperature)(p)))\r\n        functions_tr.insertCell().appendChild(document.createTextNode((0,_model_js__WEBPACK_IMPORTED_MODULE_0__.getMaxTemperature)(p)))\r\n        functions_tr.insertCell().appendChild(document.createTextNode((0,_model_js__WEBPACK_IMPORTED_MODULE_0__.getTotalPrecipitation)(p)))\r\n        functions_tr.insertCell().appendChild(document.createTextNode((0,_model_js__WEBPACK_IMPORTED_MODULE_0__.getAverageWindSpeed)(p)))\r\n    }\r\n\r\n    const update = model => {\r\n        while (weather_table_body.firstChild) weather_table_body.removeChild(weather_table_body.firstChild)\r\n        while (functions_table_body.firstChild) functions_table_body.removeChild(functions_table_body.firstChild)\r\n        model.weatherData().forEach(addWeather)\r\n        addLastDay(model.weatherData())\r\n\r\n\r\n    }\r\n\r\n    const prompt = window.prompt.bind(window)\r\n\r\n    return { listen, displayError, prompt, update }\r\n});\r\n\n\n//# sourceURL=webpack://weatherreport/./src/view.js?");

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
/******/ 			// no module.id needed
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/init.js");
/******/ 	
/******/ })()
;
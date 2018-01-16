(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("firebase-functions");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("firebase-admin");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// src/index.ts
const functions = __webpack_require__(0);
const admin = __webpack_require__(1);
const AddTodoItem = __webpack_require__(3);
admin.initializeApp(functions.config().firebase);
// export const addMessage = AddMessage.listener;
// export const makeUpperCase = UpCaseMessages.listener;
// export const adsenseAccountReportGenerate = AdsenseAccountReportGenerate.listener;
// export const feedItemIdMaker = FeedItemIdMaker;
// export const feedItemTimeStamper = FeedItemTimeStamper;
// export const userTimeStamper = UserTimeStamper;
exports.addTodoItem = AddTodoItem.listener;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const functions = __webpack_require__(0);
const admin = __webpack_require__(1);
const cors = __webpack_require__(4);
const todo_item_1 = __webpack_require__(5);
const corsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    // origin: API_URL,
    preflightContinue: false,
    origin: true
};
exports.listener = functions.https.onRequest((request, response) => __awaiter(this, void 0, void 0, function* () {
    const prayerRequest = admin.database().ref('todoItems');
    var corsFn = cors(corsOptions);
    corsFn(request, response, () => __awaiter(this, void 0, void 0, function* () {
        let newTodoItem = new todo_item_1.TodoItem();
        if (!request.query.id) {
            response.status(400).send("Error no Id!");
            return;
        }
        if (!request.query.content) {
            response.status(400).send("Error no content!");
            return;
        }
        newTodoItem.id = request.query.id;
        newTodoItem.content = request.query.content;
        newTodoItem.isDone = false;
        newTodoItem.createdAt = Date.now();
        newTodoItem.updatedAt = newTodoItem.createdAt;
        // let data = parseMessage(request.body);
        yield prayerRequest.push(newTodoItem);
        response.status(200).send("Success!");
    }));
}));


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

class TodoItem {
}
exports.TodoItem = TodoItem;


/***/ })
/******/ ])));
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("firebase-admin");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const admin = __webpack_require__(0);
const AddTodoItem = __webpack_require__(2);
const firebaseDevCredential = __webpack_require__(6);
// admin.initializeApp(functions.config().firebase);
admin.initializeApp({
    credential: admin.credential.cert(firebaseDevCredential),
    databaseURL: "https://todo-dev-a3a22.firebaseio.com"
});
// export const addMessage = AddMessage.listener;
// export const makeUpperCase = UpCaseMessages.listener;
// export const adsenseAccountReportGenerate = AdsenseAccountReportGenerate.listener;
// export const feedItemIdMaker = FeedItemIdMaker;
// export const feedItemTimeStamper = FeedItemTimeStamper;
// export const userTimeStamper = UserTimeStamper;
exports.addTodoItem = AddTodoItem.listener;


/***/ }),
/* 2 */
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
const functions = __webpack_require__(3);
const admin = __webpack_require__(0);
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
    const todoItemsDatabaseRef = admin.database().ref('todoItems');
    var corsFn = cors(corsOptions);
    corsFn(request, response, () => __awaiter(this, void 0, void 0, function* () {
        let newTodoItem = new todo_item_1.TodoItem();
        if (!request.query.content) {
            response.status(400).send("Error no content!");
            return;
        }
        newTodoItem.content = request.query.content;
        newTodoItem.isDone = false;
        newTodoItem.createdAt = admin.database.ServerValue.TIMESTAMP;
        newTodoItem.updatedAt = newTodoItem.createdAt;
        // let data = parseMessage(request.body);
        let pushedKey;
        yield todoItemsDatabaseRef.push(newTodoItem).then((newlyPushedData) => {
            pushedKey = newlyPushedData.key;
        });
        newTodoItem.id = pushedKey;
        yield todoItemsDatabaseRef.child(pushedKey).set(newTodoItem);
        response.status(200).send("Success!");
    }));
}));


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("firebase-functions");

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


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {"type":"service_account","project_id":"todo-dev-a3a22","private_key_id":"ddf4bd2624c16ba02fe942e0d7b95dc30856cef0","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDDn2ne7Y07UvsZ\nSctMEKj5gJPimUBUw9UWlsIm85oAz4ZQGmAYT2ou3e6zf/ShUUn8eMKv83qfi8cj\nLmfism09y9jePQZ/VB9Gc6vOuID7Yj2N+e4xGsL06GGF9kLVuONigM/gHw1mcZNE\nQtTYlBB4W/EC7RD3FfCAeKBVVXtabpo5Rc40tHQEBirTYpskff4F7XBFUutJ0aO0\nf6v/Z5A5OQ7yH3GOZoS3ocZs14dmGjdLZOM2X993qIbNqEZQT1+GAehqo1x0sitw\n98nZzsudfDlirnnSj6b8SntTp+tR0KsDpfMfmzJPD3+OSzZEmZ7TZp0DCrh+ScJ+\nhNzD5ZBhAgMBAAECggEAAIiXBpVhyPtjNXCy1gCGoXWVEa1m1ERbeK4NFgOclCt8\nu4uy3uYajUmsLL+o2GbLG53ttAKnPzenoaQvAtqHOz+q1gJXGfJOCohmu8/bhDQC\npHg9ytL+nKHkoDOpf4E7V4mv53XWOMUPCIThJT0UJWvkxqQEY5Qi/Yq2rzzmMvsw\nhmNsQ4jeJJsi3pPzluzSPOdWLQlyBB/82BDhckf/RH1S8HKrHE4j/wIkfjAo1SOl\nI+cAONk5SlDx7Yt2jtdMk3YYP2RaZO9wIXH7x4zm9h2UutNGu6poXol0rDMrHA0/\n1WfYDKVTVnSpY0BR6vmMnNU5dPPOsII2Qo3eAGeEAQKBgQDlaM+MjIhB6ljc9DNO\nRFl4rUNRRGmRj1Rz9kahZZEGYYHRry4Dr0K8xYC9deaU42q4Rw5hkviq0ksHBTjM\n6Ank9y5Eq+dSWOWDrRZaWWgaU1NvDxQQo41LeGpZrez22LM282meOGChdqV22SHf\nXxWBT8zzO3L7xSu0qJ0OVv8mgQKBgQDaTA+jdpMOsRY+4qneatUpAelhbCZ/8DCc\nJypYEG5HRBJIr/3ge5o4KFpR478mW1U6NHizQ4aDt0nQtwwmQ5kFdpfnysOBo7zO\nmdOCEjjYph2N86Oi6Vj0Hsza4+YxYgtbfp3IkMMA3iTMUsKyfbsg57owJnQWf0F5\nOZ34SRI54QKBgQDJkRjjpkrGl9DyewJlX3q5pIsEabbUNXp/1UDj6KjPUXdONLya\ncjCSSnq+fUxXP6ZyOcSyCP/Cn7ladsUcjTi8XE7j+aLrYL5wvvFn+yyUDOi/KSF5\nKSspx6iyGTafAXId8yu24FRPKj9iOJAhgpsTnnk2seJqwyiOuKQeiGPxgQKBgQDP\naI1DRpoaz27PeRTk2qSFPee8RMGftVq6QwwceCAPXkHxBiY1b7rruIt4Wud3TjgA\nAXLdAD+CTle4EvNcN8XgRvm1phVzy1rNAaLQZvfUAKD8Co1jcEqwR8NkBjzklr8r\nw3Wu5rwgyvAzoj6S0JtHfGSO8zpBVc+jmnbZPLQwgQKBgQCraMBvED0c+qCCuqtf\nf9OS+dv57UXIGUDhFhKNOhIgdpeOoaTFoe93D376h7Km8FDiv4u8mM5WggGFKyWs\nMbb16NBnRKhuv/y9bu2gZl/syhoEYXMqkbY60fPFd2xboPR/aDUzgH0SMKjrXfn0\n3ArJhi9H82k6ztR/+JmXN/p/bg==\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-5tnf9@todo-dev-a3a22.iam.gserviceaccount.com","client_id":"115561058107326504990","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5tnf9%40todo-dev-a3a22.iam.gserviceaccount.com"}

/***/ })
/******/ ])));
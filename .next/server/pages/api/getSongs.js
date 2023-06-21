"use strict";
(() => {
var exports = {};
exports.id = 501;
exports.ids = [501];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 2719:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const countrySongSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
    country: String,
    code: String,
    playlist: String,
    songsData: [
        {
            id: String,
            artist: String,
            song: String,
            country: String,
            release_date: String,
            image: String,
            date_added: Date
        }
    ]
});
let EuropeanSongs;
if ((mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).EuropeanSongs) {
    EuropeanSongs = mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("EuropeanSongs");
} else {
    EuropeanSongs = mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("EuropeanSongs", countrySongSchema);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EuropeanSongs);


/***/ }),

/***/ 3963:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GET)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_EuropeanSongs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2719);

// @ts-ignore

async function GET(req, res) {
    try {
        mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(process.env.DB_URI);
        // @ts-ignore
        const songs = await _models_EuropeanSongs__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z.find();
        return res.status(200).json({
            songs: songs
        });
    } catch (err) {
        res.status(200).json({
            hello: err
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(3963));
module.exports = __webpack_exports__;

})();
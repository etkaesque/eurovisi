"use strict";
(() => {
var exports = {};
exports.id = 2;
exports.ids = [2];
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

/***/ 5210:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DELETE)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_EuropeanSongs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2719);

// @ts-ignore

async function DELETE(req, res) {
    mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(process.env.DB_URI);
    const blacklist = [
        "Beyonc\xe9",
        "Kendrick Lamar",
        "Rema",
        "Selena Gomez",
        "Miley Cyrus",
        "Post Malone",
        "Ed Sheeran",
        "The Weeknd",
        "Taylor Swift",
        "Justin Bieber",
        "Ariana Grande",
        "David Guetta",
        "Drake",
        "Rihanna",
        "Coldplay",
        "Harry Styles",
        "Eminem",
        "Shakira",
        "Dua Lipa",
        "SZA",
        "Lady Gaga",
        "Elton John",
        "21 Savage",
        "Loreen",
        "FIFTY FIFTY"
    ];
    if (!Array.isArray(blacklist)) {
        return res.status(400).send("Blacklist should be an array of artist names.");
    }
    const lowerCasedBlacklist = blacklist.map((artist)=>artist.toLowerCase());
    try {
        // @ts-ignore
        const allSongs = await _models_EuropeanSongs__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z.find();
        let deletedCount = 0;
        for (let song of allSongs){
            const originalLength = song.songsData.length;
            // @ts-ignore
            song.songsData = song.songsData.filter((songData)=>!lowerCasedBlacklist.includes(songData.artist.toLowerCase()));
            const newLength = song.songsData.length;
            deletedCount += originalLength - newLength;
            if (originalLength !== newLength) {
                // The song list changed, so update the database
                await song.save();
            }
        }
        res.status(200).send(`Deleted ${deletedCount} songs from blacklisted artists.`);
    } catch (error) {
        res.status(500).send(error);
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(5210));
module.exports = __webpack_exports__;

})();
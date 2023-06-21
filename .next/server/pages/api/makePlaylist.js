"use strict";
(() => {
var exports = {};
exports.id = 802;
exports.ids = [802];
exports.modules = {

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 6948:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ POST)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function POST(req, res) {
    const { access_token } = req.cookies;
    const idsOfSongs = req.body.idsOfSongs.map((id)=>`spotify:track:${id}`);
    console.log(idsOfSongs);
    try {
        const responseID = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        const userID = responseID.data.id;
        if (userID) {
            const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                name: "Eurovision playlist",
                description: "Eurovision playlist from Eurovision Song Contest Generator",
                public: false
            }, {
                headers: {
                    Authorization: "Bearer " + access_token,
                    "Content-Type": "application/json"
                }
            });
            const playlistID = response.data.id;
            if (playlistID) {
                try {
                    const response = await axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                        uris: idsOfSongs,
                        position: 0
                    }, {
                        headers: {
                            Authorization: "Bearer " + access_token,
                            "Content-Type": "application/json"
                        }
                    });
                    console.log("songs should have been saved");
                    res.status(200).json({
                        response: response.data
                    });
                } catch (error) {
                    console.log("Error when trying to add songs to  a playlist: ", error);
                    res.status(400).json({
                        error: error
                    });
                }
            }
        }
    } catch (error) {
        res.status(400).json({
            response: "Something went wrong while creating a playlist",
            error: error
        });
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(6948));
module.exports = __webpack_exports__;

})();
"use strict";
(() => {
var exports = {};
exports.id = 330;
exports.ids = [330];
exports.modules = {

/***/ 8709:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getProfile)
/* harmony export */ });
async function getProfile(req, res) {
    const { access_token } = req.cookies;
    try {
        const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
                "Authorization": "Bearer " + access_token
            }
        });
        if (!response.ok) {
            console.log("Response from getting a profile was not ok");
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            error: error
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
var __webpack_exports__ = (__webpack_exec__(8709));
module.exports = __webpack_exports__;

})();
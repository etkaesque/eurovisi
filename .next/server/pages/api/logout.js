"use strict";
(() => {
var exports = {};
exports.id = 30;
exports.ids = [30];
exports.modules = {

/***/ 868:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GET)
/* harmony export */ });
async function GET(req, res) {
    res.setHeader("Set-Cookie", [
        `access_token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax`,
        `refresh_token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax`
    ]);
    console.log("User loged out");
    res.status(200).json({
        message: "Logged out successfully"
    });
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(868));
module.exports = __webpack_exports__;

})();
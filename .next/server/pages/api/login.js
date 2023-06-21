"use strict";
(() => {
var exports = {};
exports.id = 994;
exports.ids = [994];
exports.modules = {

/***/ 8110:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ GET)
});

;// CONCATENATED MODULE: external "querystring"
const external_querystring_namespaceObject = require("querystring");
var external_querystring_default = /*#__PURE__*/__webpack_require__.n(external_querystring_namespaceObject);
;// CONCATENATED MODULE: external "randomstring"
const external_randomstring_namespaceObject = require("randomstring");
var external_randomstring_default = /*#__PURE__*/__webpack_require__.n(external_randomstring_namespaceObject);
;// CONCATENATED MODULE: ./src/pages/api/login.ts

// @ts-ignore

let redirect_uri = "https://eurovisiongen.vercel.app/api/callback";
async function GET(req, res) {
    let state = external_randomstring_default().generate(12);
    let scope = " playlist-modify-private user-read-private user-read-email";
    let queryParams = external_querystring_default().stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    });
    res.redirect("https://accounts.spotify.com/authorize?" + queryParams);
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(8110));
module.exports = __webpack_exports__;

})();
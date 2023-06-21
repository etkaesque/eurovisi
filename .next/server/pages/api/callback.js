"use strict";
(() => {
var exports = {};
exports.id = 585;
exports.ids = [585];
exports.modules = {

/***/ 9489:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ callback)
});

;// CONCATENATED MODULE: external "url"
const external_url_namespaceObject = require("url");
;// CONCATENATED MODULE: ./src/pages/api/callback.ts

async function callback(req, res) {
    const { code, state } = req.query;
    console.log("code", code);
    console.log("state", state);
    if (state === null) {
        res.status(200).json({
            data: "State is not identified"
        });
        return;
    } else {
        const authOptions = {
            method: "POST",
            body: new external_url_namespaceObject.URLSearchParams({
                code: code,
                redirect_uri: "https://eurovisiongen.vercel.app/api/callback",
                grant_type: "authorization_code"
            }),
            headers: {
                "Authorization": "Basic " + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString("base64"),
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };
        try {
            const response = await fetch("https://accounts.spotify.com/api/token", authOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const { access_token, refresh_token } = data;
            res.setHeader("Set-Cookie", [
                `access_token=${access_token}; Path=/; HttpOnly; SameSite=Lax`,
                `refresh_token=${refresh_token}; Path=/; HttpOnly; SameSite=Lax`
            ]);
            // Redirect the user back to your main page
            res.redirect("/");
            console.log("Cookies are set.");
        } catch (error) {
            res.status(500).json({
                error: error
            });
        }
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(9489));
module.exports = __webpack_exports__;

})();
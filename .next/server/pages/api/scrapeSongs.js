"use strict";
(() => {
var exports = {};
exports.id = 557;
exports.ids = [557];
exports.modules = {

/***/ 1185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 2969:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GET)
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
mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(// @ts-ignore
process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log("Connected to DB")).catch((err)=>console.error("Received an error while connecting to DB", err));
async function GET(req, res) {
    console.log("Welcome to Eurovision scraper");
    const getSpotifyToken = async ()=>{
        console.log("Starting to fetch a token...");
        const client_id = process.env.SPOTIFY_CLIENT_ID;
        const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
        const authOptions = {
            url: "https://accounts.spotify.com/api/token",
            headers: {
                Authorization: "Basic " + btoa(client_id + ":" + client_secret)
            },
            body: new URLSearchParams({
                grant_type: "client_credentials"
            })
        };
        const response = await fetch(authOptions.url, {
            method: "POST",
            headers: authOptions.headers,
            body: authOptions.body
        });
        const data = await response.json();
        const token = data.access_token;
        console.log("Returning token...");
        return token;
    };
    const getPlaylist = async (item, token)=>{
        const response = await fetch(// @ts-ignore
        `https://api.spotify.com/v1/playlists/${item.playlist}/tracks`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        let data = await response.json();
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
        let tracks = data.items;
        // @ts-ignore
        tracks = tracks.filter((track)=>!blacklist.includes(track.track.artists[0].name));
        const songsData = tracks.map((track)=>{
            return {
                id: track.track.id,
                artist: track.track.artists[0].name,
                song: track.track.name,
                release_date: track.track.album.release_date,
                image: track.track.album.images[0].url,
                date_added: new Date()
            };
        });
        return songsData;
    };
    const delay = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms));
    async function fetchWithDelay(url, delayMs, retries = 3) {
        for(let i = 0; i < retries; i++){
            try {
                await delay(delayMs);
                const response = await fetch(url);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(`Error fetching data, attempt ${i + 1} of ${retries}`);
            }
        }
        throw new Error("Failed to fetch data after multiple attempts");
    }
    async function useArtistCountries(songsData, targetCountryCode) {
        const fetchPromises = songsData.map(async (song, index)=>{
            try {
                const data = await fetchWithDelay(`https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(song.artist)}&fmt=json`, index * 15000);
                if (!data.artists || data.artists.length === 0) {
                    return null;
                }
                const artist = data.artists.find((artist)=>artist.country === targetCountryCode);
                if (!artist) {
                    return null;
                }
                return {
                    ...song,
                    country: artist.country
                };
            } catch (error) {
                console.error(`Error fetching data for song: ${song.song}`, error);
                return {
                    ...song,
                    country: "ERROR"
                };
            }
        });
        const updatedSongsData = await Promise.all(fetchPromises);
        const filteredSongsData = updatedSongsData.filter((song)=>song !== null);
        return filteredSongsData;
    }
    const eurovisionCountries = [
        {
            country: "Albania",
            code: "AL",
            playlist: "7CfHr38WwpyBO2TAh3Jww6"
        },
        {
            country: "Australia",
            code: "AU",
            playlist: "37i9dQZEVXbK4fwx2r07XW"
        },
        {
            country: "Austria",
            code: "AT",
            playlist: "37i9dQZEVXbM1EaZ0igDlz"
        },
        {
            country: "Belgium",
            code: "BE",
            playlist: "37i9dQZEVXbND4ZYa46PaA"
        },
        {
            country: "Bulgaria",
            code: "BG",
            playlist: "37i9dQZEVXbNfM2w2mq1B8"
        },
        {
            country: "Croatia",
            code: "HR",
            playlist: "3qJqvztOsDD9z27yK7m1ha"
        },
        {
            country: "Cyprus",
            code: "CY",
            playlist: "37i9dQZEVXbNBxnXSWuAcX"
        },
        {
            country: "Czechia",
            code: "CZ",
            playlist: "37i9dQZEVXbLKI6MPixefZ"
        },
        {
            country: "Denmark",
            code: "DK",
            playlist: "37i9dQZEVXbMw2iUtFR5Eq"
        },
        {
            country: "Estonia",
            code: "EE",
            playlist: "37i9dQZEVXbLesry2Qw2xS"
        },
        {
            country: "Finland",
            code: "FI",
            playlist: "37i9dQZEVXbJQ9kF73GOT2"
        },
        {
            country: "France",
            code: "FR",
            playlist: "37i9dQZEVXbIPWwFssbupI"
        },
        {
            country: "Germany",
            code: "DE",
            playlist: "37i9dQZEVXbK8BKKMArIyl"
        },
        {
            country: "Greece",
            code: "GR",
            playlist: "37i9dQZEVXbJqdarpmTJDL"
        },
        {
            country: "Hungary",
            code: "HU",
            playlist: "37i9dQZEVXbMYsavqzfk6k"
        },
        {
            country: "Iceland",
            code: "IS",
            playlist: "37i9dQZEVXbKMzVsSGQ49S"
        },
        {
            country: "Ireland",
            code: "IE",
            playlist: "37i9dQZEVXbJIvhIOxXxdp"
        },
        {
            country: "Israel",
            code: "IL",
            playlist: "37i9dQZEVXbJ5J1TrbkAF9"
        },
        {
            country: "Italy",
            code: "IT",
            playlist: "37i9dQZEVXbJUPkgaWZcWG"
        },
        {
            country: "Latvia",
            code: "LV",
            playlist: "37i9dQZEVXbJWuzDrTxbKS"
        },
        {
            country: "Lithuania",
            code: "LT",
            playlist: "37i9dQZEVXbMx56Rdq5lwc"
        },
        {
            country: "Netherlands",
            code: "NL",
            playlist: "37i9dQZEVXbK4BFAukDzj3"
        },
        {
            country: "Norway",
            code: "NO",
            playlist: "37i9dQZEVXbLWYFZ5CkSvr"
        },
        {
            country: "Poland",
            code: "PL",
            playlist: "37i9dQZEVXbMZ5PAcNTDXd"
        },
        {
            country: "Portugal",
            code: "PT",
            playlist: "37i9dQZEVXbKyJS56d1pgi"
        },
        {
            country: "Romania",
            code: "RO",
            playlist: "37i9dQZF1DX2Q2OspJqwwG"
        },
        {
            country: "Slovakia",
            code: "SK",
            playlist: "37i9dQZEVXbMwW10JmAnzE"
        },
        {
            country: "Slovenia",
            code: "SI",
            playlist: "37i9dQZF1DXdCrbrHtTRdI"
        },
        {
            country: "Sweden",
            code: "SE",
            playlist: "37i9dQZEVXbKVvfnL1Us06"
        },
        {
            country: "United Kingdom",
            code: "GB",
            playlist: "37i9dQZEVXbMwmF30ppw50"
        },
        {
            country: "Spain",
            code: "ES",
            playlist: "37i9dQZEVXbJwoKy8qKpHG"
        },
        {
            country: "Switzerland",
            code: "CH",
            playlist: "37i9dQZEVXbKx6qX9uN66j"
        },
        {
            country: "Ukraine",
            code: "UA",
            playlist: "37i9dQZEVXbNcoJZ65xktI"
        }
    ];
    const token = await getSpotifyToken();
    const data = await Promise.all(eurovisionCountries.map(async (item)=>{
        const songsData = await getPlaylist(item, token);
        const updatedSongsData = await useArtistCountries(songsData, item.code);
        console.log({
            ...item,
            songsData: updatedSongsData
        });
        let country = await EuropeanSongs.findOne({
            code: item.code
        });
        if (!country) {
            country = new EuropeanSongs({
                ...item,
                songsData: updatedSongsData
            });
            await country.save();
        } else {
            for(let i = 0; i < updatedSongsData.length; i++){
                const newSong = updatedSongsData[i];
                const songExists = country.songsData.some(// @ts-ignore
                (song)=>song.id === newSong.id);
                if (!songExists) {
                    newSong.date_added = new Date();
                    country.songsData.push(newSong);
                }
                await country.save();
            }
        }
        return {
            ...item,
            songsData: updatedSongsData
        };
    }));
    res.status(200).json({
        data
    });
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(2969));
module.exports = __webpack_exports__;

})();
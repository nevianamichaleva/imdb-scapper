/* globals console module */
"use strict";

const httpRequester = require("./http-requester");
const htmlParser = require("./html-parser");
const modelsFactory = require("../models");


module.exports = {
    getMovieInfoFromUrl(url) {
        httpRequester.get(url)
            .then((result) => {
                const html = result.body;
                return htmlParser.parseMovieInformation(html);
            })
            .then(movieInfo => {
                let dbMovieDetails = modelsFactory.getMovieInfo(movieInfo);
                modelsFactory.saveMovieInfo(dbMovieDetails);
            })
            .catch((err) => {
                console.dir(err, { colors: true });
            });
    },
    showMovies() {
        return modelsFactory.showMovies();
    }
};
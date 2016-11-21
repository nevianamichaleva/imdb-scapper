/* globals console module */
"use strict";

const httpRequester = require("./http-requester");
const htmlParser = require("./html-parser");
const modelsFactory = require("../models");
const timer = require("./timer");
const constants = require("../config/constants");

module.exports = {
    getMoviesInfoFromUrls(urlsQueue) {
        httpRequester.get(urlsQueue.pop())
            .then((result) => {
                const html = result.body;
                return htmlParser.parseMovieInformation(html);
            })
            .then(movieInfo => {
                let dbMovieDetails = modelsFactory.getMovieInfo(movieInfo);
                modelsFactory.saveMovieInfo(dbMovieDetails);
                return timer.wait(constants.timeToNextRequest);
            })
            .then(() => {
                if (urlsQueue.isEmpty()) {
                    return;
                }

                this.getMoviesInfoFromUrls(urlsQueue);
            })
            .catch((err) => {
                console.dir(err, { colors: true });
            });
    },
    showMovies() {
        return modelsFactory.showMovies();
    }
};
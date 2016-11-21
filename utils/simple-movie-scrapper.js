/* globals console module */
"use strict";

const httpRequester = require("./http-requester");
const htmlParser = require("./html-parser");
const modelsFactory = require("../models");
const timer = require("../utils/timer");
const constants = require("../config/constants");

module.exports = {
    getMoviesFromUrls(urlsQueue) {
        httpRequester.get(urlsQueue.pop())
            .then((result) => {
                const selector = constants.selectorLinkOfMovieTitle;
                const html = result.body;
                return htmlParser.parseSimpleMovie(selector, html);
            })
            .then(movies => {
                let dbMovies = movies.map(movie => {
                    return modelsFactory.getSimpleMovie(movie.title, movie.url);
                });
                modelsFactory.insertManySimpleMovies(dbMovies);
                return timer.wait(constants.timeToNextRequest);
            })
            .then(() => {
                if (urlsQueue.isEmpty()) {
                    return;
                }

                this.getMoviesFromUrls(urlsQueue);
            })
            .catch((err) => {
                console.dir(err, { colors: true });
            });
    },
    showMovies() {
        return modelsFactory.showSimpleMovies();
    }
};
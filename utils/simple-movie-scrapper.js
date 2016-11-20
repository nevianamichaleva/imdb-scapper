/* globals console module */
"use strict";

const httpRequester = require("./http-requester");
const htmlParser = require("./html-parser");
const modelsFactory = require("../models");

module.exports = {
    getMoviesFromUrl(url) {
        let promise = new Promise((resolve, reject) => {
            httpRequester.get(url)
                .then((result) => {
                    const selector = ".col-title span[title] a";
                    const html = result.body;
                    return htmlParser.parseSimpleMovie(selector, html);
                })
                .then(movies => {
                    let dbMovies = movies.map(movie => {
                        return modelsFactory.getSimpleMovie(movie.title, movie.url);
                    });

                    modelsFactory.insertManySimpleMovies(dbMovies);
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
        return promise;
    }
};
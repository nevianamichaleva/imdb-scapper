/* globals console module */
"use strict";

const httpRequester = require("./http-requester");
const htmlParser = require("./html-parser");
const modelsFactory = require("../models");
const queuesFactory = require("../data-structures/queue");
const timer = require("../utils/timer");
const constants = require("../config/constants");

let urlsQueue = queuesFactory.getQueue();

constants.genres.forEach(genre => {
    for (let i = 0; i < constants.pagesCount; i += 1) {
        let url = `http://www.imdb.com/search/title?genres=${genre}&title_type=feature&0sort=moviemeter,asc&page=${i+1}&view=simple&ref_=adv_nxt`;
        urlsQueue.push(url);
    }
});

module.exports = {
    getMoviesFromUrl() {
        console.log(`Working with ${urlsQueue.pop()}`);
        httpRequester.get(urlsQueue.pop())
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
                return timer.wait(1000);
            })
            .then(() => {
                if (urlsQueue.isEmpty()) {
                    return;
                }

                this.getMoviesFromUrl(urlsQueue.pop());
            })
            .catch((err) => {
                console.dir(err, { colors: true });
            });
    },
    showMovies() {
        return modelsFactory.showSimpleMovies();
    }
};
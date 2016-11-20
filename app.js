/* globals console require setTimeout Promise */
"use strict";

const timer = require("./utils/timer");
const simpleMovieScrapper = require("./utils/simple-movie-scrapper.js");
const queuesFactory = require("./data-structures/queue");
const constants = require("./config/constants");

require("./config/mongoose")(constants.connectionString);

let urlsQueue = queuesFactory.getQueue();

constants.genres.forEach(genre => {
    for (let i = 0; i < constants.pagesCount; i += 1) {
        let url = `http://www.imdb.com/search/title?genres=${genre}&title_type=feature&0sort=moviemeter,asc&page=${i+1}&view=simple&ref_=adv_nxt`;
        urlsQueue.push(url);
    }
});

function getMoviesFromUrl(url) {
    console.log(`Working with ${url}`);
    simpleMovieScrapper.getMoviesFromUrl(url)
    .then(() => {
        return timer.wait(1000);
    })
    .then(() => {
        if (urlsQueue.isEmpty()) {
            return;
        }

        getMoviesFromUrl(urlsQueue.pop());
    })
    .catch((err) => {
        console.dir(err, { colors: true });
    });
}

const asyncPagesCount = 15;

Array.from({ length: asyncPagesCount })
    .forEach(() => getMoviesFromUrl(urlsQueue.pop()));
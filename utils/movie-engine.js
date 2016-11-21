/* globals console module */
"use strict";

const _ = require("lodash");

const simpleMovieScrapper = require("./simple-movie-scrapper");
const movieScrapper = require("./movie-scrapper");
const actorScrapper = require("./actor-scrapper");
const queuesFactory = require("../data-structures/queue");
const constants = require("../config/constants");
const modelsFactory = require("../models");

require("../config/mongoose")(constants.connectionString);

module.exports = {
    generateSimpleMovies() {
        let urlsQueue = queuesFactory.getQueue();
        const simpleMovieUrlTemplate = _.template("http://www.imdb.com/search/title?genres=<%=genre%>&title_type=feature&0sort=moviemeter,asc&page=<%=i+1%>&view=simple&ref_=adv_nxt");
        constants.genres.forEach(genre => {
            for (let i = 0; i < constants.pagesCount; i += 1) {
                let url = simpleMovieUrlTemplate({ genre, i });
                urlsQueue.push(url);
            }
        });
        Array.from({ length: constants.asyncPagesCount })
            .forEach(() => simpleMovieScrapper.getMoviesFromUrls(urlsQueue));
    },
    generateMovies() {
        let moviesQueue = queuesFactory.getQueue();
        let movieUrlTemplate = _.template("http://www.imdb.com/title/<%=movieId%>");

        modelsFactory.showSimpleMovies()
            .then((movies) => {
                for (let movie of movies) {
                    let movieId = movie.imdbId;
                    let url = movieUrlTemplate({ movieId });
                    moviesQueue.push(url);
                }
            })
            .then(() => {
                movieScrapper.getMoviesInfoFromUrls(moviesQueue);
            });
    },
    generateActors() {
        let actorsQueue = queuesFactory.getQueue();
        let actorUrlTemplate = _.template("http://www.imdb.com/name/<%=actorId%>");

        modelsFactory.showMovies()
            .then((movies) => {
                for (let movie of movies) {
                    for (let actor of movie.actorIDs) {
                        let url = actorUrlTemplate({ actorId: actor });
                        actorsQueue.push(url);
                    }
                }
            })
            .then(() => {
                actorScrapper.getActorsFromUrls(actorsQueue);
            });
    }
};
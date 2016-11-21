/* globals console require setTimeout Promise */
"use strict";

const _ = require("lodash");

const simpleMovieScrapper = require("./utils/simple-movie-scrapper");
const movieScrapper = require("./utils/movie-scrapper");
const actorScrapper = require("./utils/actor-scrapper");
const queuesFactory = require("./data-structures/queue");
const constants = require("./config/constants");

require("./config/mongoose")(constants.connectionString);


function generateSimpleMovies() {
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
}


function generateMovies() {
    let moviesQueue = queuesFactory.getQueue();
    let movieUrlTemplate = _.template("http://www.imdb.com/title/<%=movieId%>");

    simpleMovieScrapper.showMovies()
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
}


// Need to implement actors imdbId in movieinfo-model
function generateActors() {
    let actorsQueue = queuesFactory.getQueue();
    let actorUrlTemplate = _.template("http://www.imdb.com/name/<%=actorId%>");

    movieScrapper.showMovies()
        .then((movies) => {
            for (let movie of movies) {
                for (let actor of movie.actors) {
                    let actorId = actor.imdbId;
                    let url = actorUrlTemplate({ actorId });
                    actorsQueue.push(url);
                }
            }
        })
        .then(() => {
            actorScrapper.getActorFromUrls(actorsQueue);
        });
}
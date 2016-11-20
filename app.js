/* globals console require setTimeout Promise */
"use strict";


const simpleMovieScrapper = require("./utils/simple-movie-scrapper.js");
const constants = require("./config/constants");

require("./config/mongoose")(constants.connectionString);


// Array.from({ length: constants.asyncPagesCount })
//     .forEach(() => simpleMovieScrapper.getMoviesFromUrl());

simpleMovieScrapper.showMovies()
    .then((movies) => {
        console.log(movies);
    });
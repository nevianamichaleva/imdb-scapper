/* globals console require setTimeout Promise */
"use strict";

const movieEngine = require("./utils/movie-engine");

// Run one by one
movieEngine.generateSimpleMovies()
    .then(movieEngine.generateMovies())
    .then(movieEngine.generateActors());
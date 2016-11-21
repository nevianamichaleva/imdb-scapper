/* globals module require */

const SimpleMovie = require("./simple-movie-model");
const Actor = require("./actor-model");
const MovieInfo = require("./movieinfo-model");

module.exports = {
    getSimpleMovie(name, url) {
        return SimpleMovie.getSimpleMovieByNameAndUrl(name, url);
    },
    insertManySimpleMovies(movies) {
        SimpleMovie.insertMany(movies);
    },
    showSimpleMovies() {
        return new Promise((resolve, reject) => {
            SimpleMovie.find((err, simpleMovies) => {
                if (err) {
                    reject(err);
                }
                resolve(simpleMovies);
            });
        });
    },
    getActor(actor) {
        return new Actor({
            imageUrl: actor.image,
            name: actor.name,
            bio: actor.bio,
            movies: actor.movies
        });
    },
    saveActor(actor) {
        actor.save((err) => {
            if (err) {
                console.dir(err, { colors: true });
            }
        });
    },
    showActors() {
        return new Promise((resolve, reject) => {
            Actor.find((err, actors) => {
                if (err) {
                    reject(err);
                }
                resolve(actors);
            });
        });
    },
    getMovieInfo(movieinfo) {
        return new MovieInfo({
            imageUrl: movieinfo.image,
            trailerUrl: movieinfo.trailerUrl,
            title: movieinfo.title,
            description: movieinfo.description,
            categories: movieinfo.categories,
            dateRelease: movieinfo.dateRelease,
            actors: movieinfo.actors
        });
    },
    saveMovieInfo(movieinfo) {
        movieinfo.save((err) => {
            if (err) {
                console.dir(err, { colors: true });
            }
        });
    },
    showMovies() {
        return new Promise((resolve, reject) => {
            MovieInfo.find((err, movies) => {
                if (err) {
                    reject(err);
                }
                resolve(movies);
            });
        });
    }
};
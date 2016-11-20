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
    getActor(actor) {
        return new Actor({
            imageUrl: actor.image,
            name: actor.name,
            bio: actor.bio,
            movies: actor.movies
        });
    },
    saveActor(actor) {
        actor.save((err, actor) => {
            console.log(err);
            console.log(actor);
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
        movieinfo.save((err, movieinfo) => {
            console.log(err);
            console.log(movieinfo);
        });
    }
}
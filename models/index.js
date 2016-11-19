/* globals module require */

const SimpleMovie = require("./simple-movie-model");
const Actor = require("./actor-model");

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
    }
};
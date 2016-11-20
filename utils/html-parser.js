/* globals module require Promise */
"use strict";

const jsdom = require("jsdom").jsdom,
    doc = jsdom(),
    window = doc.defaultView,
    $ = require("jquery")(window),
    constants = require("../config/constants");

module.exports.parseSimpleMovie = (selector, html) => {
    $("body").html(html);
    let items = [];
    $(selector).each((index, item) => {
        const $item = $(item);

        items.push({
            title: $item.html(),
            url: $item.attr(constants.attributeHrefName)
        });
    });

    return Promise.resolve()
        .then(() => {
            return items;
        });
};

module.exports.parseActorInformation = (html) => {
    $("body").html(html);

    let movies = [];
    $(constants.selectorLinkOfFilmCategories).each((index, item) => {
        const movie = $(item).html();
        movies.push(movie);
    });

    let actor = {
        image: $(constants.selectorActorImage).attr(constants.attributeSrcName),
        name: $(constants.selectorActorName).html(),
        bio: $(constants.selectorActorBio).html(),
        movies
    };

    return Promise.resolve()
        .then(() => {
            return actor;
        });
};

module.exports.parseMovieInformation = (html) => {
    $("body").html(html);
    let actors = [];
    $(constants.selectorAllActors).each((index, item) => {
        const actor = $(item).text();
        actors.push(actor);
    });
    let genres = [];
    $(constants.selectorCategories).each((index, item) => {
        const category = $(item).text();
        genres.push(category);
    });

    let movieInfo = {
        image: $(constants.selectorMovieImage).attr(constants.attributeSrcName),
        trailer: $(constants.selectorMovieTrailer).attr(constants.attributeHrefName),
        title: $(constants.selectorMovieTitle).text(),
        description: $(constants.selectorMovieDescription).text(),
        categories: genres,
        dateRelease: $(constants.selectorMovieReleaseDate).attr(constants.attributeContentName),
        actors
    };

    return Promise.resolve()
        .then(() => {
            return movieInfo;
        });
};
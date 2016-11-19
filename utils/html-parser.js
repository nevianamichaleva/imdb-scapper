/* globals module require Promise */
"use strict";

const jsdom = require("jsdom").jsdom,
    doc = jsdom(),
    window = doc.defaultView,
    $ = require("jquery")(window);

module.exports.parseSimpleMovie = (selector, html) => {
    $("body").html(html);
    let items = [];
    $(selector).each((index, item) => {
        const $item = $(item);

        items.push({
            title: $item.html(),
            url: $item.attr("href")
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
    $("#filmography .filmo-category-section .filmo-row b a").each((index, item) => {
        const movie = $(item).html();
        movies.push(movie);
    });

    let actor = {
        image: $("#name-poster").attr("src"),
        name: $("#overview-top h1 span").html(),
        bio: $("#name-bio-text div div").html(),
        movies: movies
    };

    return Promise.resolve()
        .then(() => {
            return actor;
        });
};
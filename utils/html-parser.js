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
    $(".cast_list .itemprop a").each((index, item) => {
        const actor = $(item).text();
        actors.push(actor);
    });
    let genres = [];
    $("span[itemprop='genre']").each((index, item) => {
        const category = $(item).text();
        genres.push(category);
    });

    let movieInfo = {
        image: $(".poster a img").attr("src"),
        trailer: $(".slate a").attr("href"),
        title: $(".title_wrapper h1").text(),
        description: $("div[itemprop='description'] p").text(),
        categories: genres,
        dateRelease: $("meta[itemprop='datePublished']").attr("content"),
        actors
    };

    return Promise.resolve()
        .then(() => {
            return movieInfo;
        });
};
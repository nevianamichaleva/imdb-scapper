/* globals console module */
"use strict";

const httpRequester = require("./http-requester");
const htmlParser = require("./html-parser");
const modelsFactory = require("../models");


module.exports = {
    getActorFromUrl(url) {
        httpRequester.get(url)
            .then((result) => {
                const html = result.body;
                return htmlParser.parseActorInformation(html);
            })
            .then(actor => {
                let dbActor = modelsFactory.getActor(actor);
                modelsFactory.saveActor(dbActor);
            })
            .catch((err) => {
                console.dir(err, { colors: true });
            });
    }
}
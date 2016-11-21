/* globals console module */
"use strict";

const httpRequester = require("./http-requester");
const htmlParser = require("./html-parser");
const modelsFactory = require("../models");
const timer = require("./timer");


module.exports = {
    getActorsFromUrls(urlsQueue) {
        httpRequester.get(urlsQueue.pop())
            .then((result) => {
                const html = result.body;
                return htmlParser.parseActorInformation(html);
            })
            .then(actor => {
                let dbActor = modelsFactory.getActor(actor);
                modelsFactory.saveActor(dbActor);
                return timer.wait(1000);
            })
            .then(() => {
                if (urlsQueue.isEmpty()) {
                    return;
                }

                this.getActorsFromUrls(urlsQueue);
            })
            .catch((err) => {
                console.dir(err, { colors: true });
            });
    },
    showActors() {
        return modelsFactory.showActors()
    }
};
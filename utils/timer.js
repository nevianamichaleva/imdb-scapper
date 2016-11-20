/* globals module require Promise */
"use strict";

module.exports = {
    wait(time) {
        let promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
        return promise;
    }
};
/* globals require module */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let actorSchema = new Schema({
    imageUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    movies: {
        type: [String],
        required: true
    }
});

mongoose.model("Actor", actorSchema);
module.exports = mongoose.model("Actor");
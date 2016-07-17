"use strict"

const mongoose = require('mongoose'),
    q = require('q'),
    config = require('../config.json'),
    user = require('../models/user.model');

// process.env.MONGOLAB_URI
let uri = config.connectionStrings.user;
console.log('uri is ' + uri);
mongoose.connect(uri, function (err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + uri + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uri);
    }
});

let service = {};

service.authenticate = authenticate;
// service.getById = getById;
// service.update = update;

module.exports = service;

function authenticate(email, password) {
    let deferred = q.defer();

    user.findOne({ 'email': email, 'password': password }, function (error, user) {
        if (error) {
            console.log(error);
            deferred.reject(error);
        }
        else if (user) {
            deferred.resolve(user);
        }
    });

    return deferred.promise;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.apiRoute = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _jobs = require('./jobs.js');

var _jobs2 = _interopRequireDefault(_jobs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/list/:page/:limit', function (req, res) {
    var page = req.params.page;
    var limit = req.params.limit;
    var response = res;

    var task = _jobs2.default.find({}, null, { skip: page * limit }).limit(parseInt(limit));

    task.exec(function (err, job) {
        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify(job));
    });
});

exports.apiRoute = router;
//# sourceMappingURL=api.js.map

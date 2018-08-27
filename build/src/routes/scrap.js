"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrapRoute = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _scrapKarirpad = require('./scrap-karirpad.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/karirpad', _scrapKarirpad.karirpadRoute);

exports.scrapRoute = router;
//# sourceMappingURL=scrap.js.map

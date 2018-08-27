'use strict';

var _http = require('http');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _scrap = require('./routes/scrap.js');

var _api = require('./routes/api.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _express2.default();
var server = new _http.Server(app);

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  return res.send("You can buy a candle or you can hire your gmaps.");
});

app.use('/scrap', _scrap.scrapRoute);
app.use('/api', _api.apiRoute);

// start the server
var port = process.env.PORT || 8080;
var env = process.env.NODE_ENV || 'production';

server.listen(port, function (err) {
  if (err) {
    return console.error(err);
  }
  console.info('Server running on http://localhost:' + port + ' [' + env + ']');
});
//# sourceMappingURL=server.js.map

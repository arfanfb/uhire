"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.karirpadRoute = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _jobs = require('./jobs.js');

var _jobs2 = _interopRequireDefault(_jobs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/:total', function (req, res) {
  var MongoClient = _mongoose2.default.MongoClient;

  var total = req.params.total;

  var url = 'https://www.karirpad.com/Lowongan/load_vacancy/semuanya/null/' + total;
  var response = res;

  (0, _request2.default)(url, function (err, res, body) {
    if (err && res.statusCode !== 200) throw err;
    var $ = _cheerio2.default.load(body);

    $('.result').each(function (i, valueResult) {
      // Get Detail Information
      var slug = $(valueResult).attr('key') + '-karirpad';
      var title = $(valueResult).find('.result_title').find('a').text();
      var date = $(valueResult).find('.result_title').find('span').text().replace('Tanggal pemasangan ', '');
      var company_logo_url = $(valueResult).find('.comp_logo').find('img').attr('src');
      var company_name = $(valueResult).find('.comp_name').children().eq(0).find('a').text();
      var address = $(valueResult).find('.comp_name').children().eq(3).text();
      var education = $(valueResult).find('.comp_name').children().eq(5).text().replace(' Pendidikan : ', '');
      var age = $(valueResult).find('.comp_name').find('.add_s_salary').text();
      var salary = $(valueResult).find('.vac_salary').find('.bold').text();
      var gender = [];

      $(valueResult).find('.h25').each(function (j, valueGender) {
        if ($(valueGender).children().length === 0) {
          var tarr = $(valueGender).attr('src').split('/');
          var file = tarr[tarr.length - 1];
          gender.push(file.split('.')[0].replace('gender-', ''));
        }
      });

      _jobs2.default.find({ slug: slug }, function (err, job) {
        if (err) throw err;

        // object of the user
        if (job.length == 0) {
          var newJob = (0, _jobs2.default)({
            slug: slug,
            title: title,
            date: date,
            company_logo_url: company_logo_url,
            company_name: company_name,
            address: address,
            education: education,
            age: age,
            salary: salary,
            gender: JSON.stringify(gender)
          });

          newJob.save(function (err) {
            if (err) throw err;
          });
        }
      });
    });

    response.send('done');
  });
});

exports.karirpadRoute = router;
//# sourceMappingURL=scrap-karirpad.js.map

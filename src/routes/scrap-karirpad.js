"use strict";

import Express from 'express'
import request from 'request'
import cheerio from 'cheerio'
import mongoose from 'mongoose'
import Jobs from './jobs.js'

let router = Express.Router()

router.get('/:total', (req, res) => {
  var MongoClient = mongoose.MongoClient;

  let total = req.params.total

  let url = 'https://www.karirpad.com/Lowongan/load_vacancy/semuanya/null/' + total;
  let response = res;

  request(url, function (err, res, body) {
    if (err && res.statusCode !== 200) throw err;
    let $ = cheerio.load(body)

    $('.result').each((i, valueResult) => {
          // Get Detail Information
          let slug = $(valueResult).attr('key') + '-karirpad'
          let title = $(valueResult).find('.result_title').find('a').text()
          let date = $(valueResult).find('.result_title').find('span').text().replace('Tanggal pemasangan ','')
          let company_logo_url = $(valueResult).find('.comp_logo').find('img').attr('src')
          let company_name = $(valueResult).find('.comp_name').children().eq(0).find('a').text()
          let address = $(valueResult).find('.comp_name').children().eq(3).text()
          let education = $(valueResult).find('.comp_name').children().eq(5).text().replace(' Pendidikan : ','')
          let age = $(valueResult).find('.comp_name').find('.add_s_salary').text()
          let salary = $(valueResult).find('.vac_salary').find('.bold').text()
          let gender = []

          $(valueResult).find('.h25').each((j, valueGender) => {
              if ($(valueGender).children().length === 0) {
                  var tarr = $(valueGender).attr('src').split('/')
                  var file = tarr[tarr.length-1]
                  gender.push(file.split('.')[0].replace('gender-',''))
              }
          });

          Jobs.find({ slug: slug }, function(err, job) {
            if (err) throw err;

            // object of the user
            if (job.length == 0) {
              let newJob = Jobs({
                slug: slug,
                title: title,
                date: date,
                company_logo_url: company_logo_url,
                company_name: company_name,
                address: address,
                education: education,
                age: age,
                salary: salary,
                gender: JSON.stringify(gender),
              });

              newJob.save(function(err) {
                if (err) throw err;
              });
            }
          });
    });

    response.send('done')
  });
});

export { router as karirpadRoute }

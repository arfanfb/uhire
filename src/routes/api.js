"use strict";

import Express from 'express'
import mongoose from 'mongoose'
import Jobs from './jobs.js'

let router = Express.Router()

router.get('/list/:page/:limit', (req, res) => {
    let page = req.params.page
    let limit = req.params.limit
    let response = res

    let task = Jobs.find({}, null, { skip: page * limit }).limit(parseInt(limit));

    task.exec(function(err, job) {
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify(job));
    })
})

export { router as apiRoute }

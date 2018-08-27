"use strict";

import mongoose from 'mongoose'

mongoose.connect('mongodb://myUserAdmin:abc123@localhost:32768/Urbanhire', { autoIndex: false });

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const jobSchema = new Schema({
    id: ObjectId,
    slug: { type: String, required: true, unique: true },
    title: String,
    date: String,
    company_logo_url: String,
    company_name: String,
    address: String,
    education: String,
    age: String,
    salary: String,
    gender: String,
});

let Jobs = mongoose.model('Jobs', jobSchema);

module.exports = Jobs

"use strict";

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect('mongodb://myUserAdmin:abc123@localhost:32768/Urbanhire', { autoIndex: false });

var Schema = _mongoose2.default.Schema;
var ObjectId = Schema.ObjectId;

var jobSchema = new Schema({
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
    gender: String
});

var Jobs = _mongoose2.default.model('Jobs', jobSchema);

module.exports = Jobs;
//# sourceMappingURL=jobs.js.map

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Schema
var JobSchema = new Schema({
  job_id: { type: Schema.Types.ObjectId },
  title: { type: String },
  posting_date: { type: String },
  application_deadline: { type: String },
  location: { type: String, required:true },
  salary: { type: String },
  job_description: { type: String, default: '' },
  job_category: { type: String, default: '' }
});

var Job = mongoose.model("Job", JobSchema);
exports.Job = Job;
exports.JobSchema = JobSchema;
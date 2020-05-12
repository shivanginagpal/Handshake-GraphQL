var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Create Schema
var AppliedJobSchema = new Schema({
  applied_job_id: {
    type: String
   },
   student_id: {
    type: String
   }
});
    
module.exports = AppliedJob = mongoose.model('AppliedJob', AppliedJobSchema);
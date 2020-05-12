const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: ''
  },
  email: {
    type: String,
    required: true,
    default: ''
  },
  password: {
    type: String,
    required: true,
    default: ''
  },
  school: {
    type: String,
    default: '',
    required: true,
  }
});
    
module.exports = Student = mongoose.model('Student', StudentSchema); 
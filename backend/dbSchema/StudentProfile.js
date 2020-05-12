const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StudentProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Student'
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  },
  dob: {
    type: String
  },
  major: {
    type: String,
    required:true
  },
  career_obj: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: String,
        required: true
      },
      to: {
        type: String
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      education_major: {
        type: String,
        required: true
      },
      year_of_passing :{
        type: String,
        required: true
      },
      cgpa: {
        type: String
      }
    }
  ]
});

module.exports = StudentProfile = mongoose.model('studentprofile', StudentProfileSchema);
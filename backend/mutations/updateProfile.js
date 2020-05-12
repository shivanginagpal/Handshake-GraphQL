const Student = require("../dbSchema/StudentProfile");
const Company = require("../dbSchema/Company");
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const updateStudentBasic = async (args) => {

    console.log("the args are", args);
    const profileFields = {};
    if (args.student_id) profileFields.user = args.student_id;
    if (args.city) profileFields.city = args.city;
    if (args.state) profileFields.state = args.state;
    if (args.country) profileFields.country = args.country;
    if (args.dob) profileFields.dob = args.dob;
    if (args.career_obj) profileFields.career_obj = args.career_obj;
    if (args.major) profileFields.major = args.major;
    

    let student = await Student.findOne({ user: args.student_id });
    if (student) {
        await Student.findOneAndUpdate(
            { user: args.student_id },
            { $set: profileFields },
            { new: true })
        console.log("student is: ", student);
        return { status: 200, message: "STUDENT_BASIC_UPDATED" };
    }
    else {
        let newStudent = new Student(profileFields).save();
        if (newStudent) {
            return { status: 200, message: "STUDENT_BASIC_ADDED" };
        }
        else {
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
        }
    }
};

const updateStudentEducation = async (args) => {
    let newStudentEducation = {
        school: args.school,
        degree: args.degree,
        year_of_passing: args.year_of_passing,
        education_major: args.education_major,
        cgpa: args.cgpa
    };
    let student = await Student.findOne({ user: args.student_id });
    if (student) {
        student.education.unshift(newStudentEducation);
        student.save();
        return { status: 200, message: "STUDENT_EDUCATION_UPDATED" };
    }
    else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};

const updateStudentExperience = async (args) => {
    let newStudentExperience = {
        title: args.title,
        company: args.company,
        location: args.location,
        from: args.from,
        to: args.to,
        description: args.description

    };
    let student = await Student.findOne({ user: args.student_id });
    if (student) {
        student.experience.unshift(newStudentExperience);
        student.save();
        return { status: 200, message: "STUDENT_EXPERIENCE_ADDED" };
    }
    else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};

const updateCompanyProfile = async (args) => {
    console.log("the args are", args);
    const profileFields = {};
    if (args.name) profileFields.name = args.name;
    if (args.location) profileFields.location = args.location;
    if (args.description) profileFields.description = args.description;

    let company = await Company.findById( args.company_id );
    if (company) {
        await Company.findOneAndUpdate(
            { _id: args.company_id },
            { $set: profileFields },
            { new: true })
        return { status: 200, message: "COMPANY_PROFILE_UPDATED" };
    }
    else {
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};


exports.updateCompanyProfile = updateCompanyProfile;
exports.updateStudentEducation = updateStudentEducation;
exports.updateStudentExperience = updateStudentExperience;
exports.updateStudentBasic = updateStudentBasic;
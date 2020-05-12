const Student = require("../dbSchema/Student");
const Company = require("../dbSchema/Company");
const passwordHash = require('password-hash');

const studentSignup = async (args) => {
    let hashedPassword = passwordHash.generate(args.password);
    let newStudent = new Student({
        name: args.name,
        email: args.email,
        password: hashedPassword,
        school: args.school
    });
    let student = await Student.find({ email: args.email });
    if (student.length) {
        return { status: 400, message: "STUDENT_EXISTS" };
    }
    let savedStudent = await newStudent.save();
    if (savedStudent) {
        return { status: 200, message: "STUDENT_ADDED" };
    }
    else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};

const companySignup = async (args) => {
    let hashedPassword = passwordHash.generate(args.password);
    let newCompany = new Company({
        name: args.name,
        email: args.email,
        password: hashedPassword,
        location: args.location,
    });

    let company = await Company.find({ email: args.email });
    if (company.length) {
        return { status: 400, message: "COMPANY_EXISTS" };
    }
    let savedCompany = await newCompany.save();
    if (savedCompany) {
        return { status: 200, message: "COMPANY_ADDED" };
    }
    else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};

exports.studentSignup = studentSignup;
exports.companySignup = companySignup;
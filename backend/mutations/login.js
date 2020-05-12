const Student = require("../dbSchema/Student");
const Company = require("../dbSchema/Company");
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const login = async (args) => {
    let User = Company;
    if(args.userType === 'student'){
     User = Student 
    }
    let user = await User.findOne({ email: args.email });
    if (user.length === 0) {
        return { status: 401, message: "NO_USER" };
    }
    if (passwordHash.verify(args.password, user.password)) {
        const payload = { id: user._id, name: user.name, email: user.email, userType: args.userType };
        var token = jwt.sign(payload, secret, {
            expiresIn: 1008000
        });
        token = 'JWT ' + token;
        return { status: 200, message: token };
    }
    else {
        return { status: 401, message: "INCORRECT_PASSWORD" };
    }
}

exports.login = login;
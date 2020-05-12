const graphql = require('graphql');
const Student = require("../dbSchema/Student");
const Company = require("../dbSchema/Company");
const StudentProfile = require("../dbSchema/StudentProfile");
const { login } = require('../mutations/login');
const { studentSignup, companySignup } = require('../mutations/signup');
const { addJob, applyJob } = require('../mutations/job');
const { updateStudentBasic, updateStudentEducation, updateStudentExperience, updateCompanyProfile} = require('../mutations/updateProfile');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


const StudentType = new GraphQLObjectType({
    name: 'Student',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        school: { type: GraphQLString },
       
    })
});

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        location: { type: GraphQLString },
        description: { type: GraphQLString },
        jobs: {
            type: new GraphQLList(JobType),
            resolve(parent, args) {
                return parent.jobs;
            }
        }
    })
});

const JobType = new GraphQLObjectType({
    name: 'Job',
    fields: () => ({
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        posting_date: { type: GraphQLString },
        password: { type: GraphQLString },
        application_deadline: { type: GraphQLString },
        location: { type: GraphQLString },
        salary: { type: GraphQLString },
        job_description: { type: GraphQLString },
        job_category: { type: GraphQLString },
       
    })
});

const StudentProfileType = new GraphQLObjectType({
    name: 'StudentProfile',
    fields: () => ({
        user : {type: StudentType},
        student_id: { type: GraphQLID },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        dob: { type: GraphQLString },
        major: { type: GraphQLString },
        career_obj: { type: GraphQLString },
        experience: {
            type: new GraphQLList(ExperienceType),
            resolve(parent, args) {
                return parent.experience;
            }
        },
        education: {
            type: new GraphQLList(EducationType),
            resolve(parent, args) {
                return parent.education;
            }
        }
       
    })
});

const ExperienceType = new GraphQLObjectType({
    name: 'Experience',
    fields: () => ({
        experience_id: { type: GraphQLID },
        title: { type: GraphQLString },
        company: { type: GraphQLString },
        location: { type: GraphQLString },
        from : { type: GraphQLString },
        to: { type: GraphQLString },
        description: { type: GraphQLString }    
    })
});

const EducationType = new GraphQLObjectType({
    name: 'Education',
    fields: () => ({
        education_id: { type: GraphQLID },
        school: { type: GraphQLString },
        degree: { type: GraphQLString },
        education_major: { type: GraphQLString },
        year_of_passing : { type: GraphQLString },
        cgpa : { type: GraphQLString },
    })
});

const StudentListForJobType = new GraphQLObjectType({
    name: 'StudentList',
    fields: () => ({
        student_id: { type: GraphQLString },
        student : {
            type : StudentType,
            async resolve(parent, args){
                return await Student.findById(parent.student_id)
            }
        }
    })
})

const AppliedJobsForStudentType = new GraphQLObjectType({
    name: 'AppliedJobList',
    fields: () => ({
        applied_job_id: { type: GraphQLString },
        student_id: { type: GraphQLString },
        company : {
            type: CompanyType,
            async resolve(parent, args){
                return await Company.findOne({"jobs._id":parent.applied_job_id}, {"name":1, "jobs.$":1});   
            }
        }
    })
})

const StatusType = new GraphQLObjectType({
    name: 'Status',
    fields: () => ({
        status: { type: GraphQLString },
        message: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        student: {
            type: StudentType,
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                let student = await Student.findById(args.id);
                if (student) {
                    return student;
                }
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                let company = await Company.findById(args.id);
                if (company) {
                    return company;
                }
            }
        },
        jobs: {
            type: new GraphQLList(CompanyType),
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                let company = await Company.find();
                return company;

            }
        },
        studentProfile: {
            type : StudentProfileType,
            args : { student_id : {type: GraphQLString} },
            async resolve(parent, args) {
                let studentProfile = await StudentProfile.findOne({"user" : args.student_id}).populate('user', ['name', 'email']);
                return studentProfile;
            }
        },
        getAllStudents:{
            type : new GraphQLList(StudentProfileType),
            args : {id: {type: GraphQLString}},
            async resolve(parent,args) {
                let allStudents = await StudentProfile.find().populate('user', ['name', 'email', 'school']);
                return allStudents;
            }
        },
        getStudentsForJob:{
            type : new GraphQLList(StudentListForJobType),
            args : {job_id : {type: GraphQLString} },
            async resolve(parent, args) {
                let students = await AppliedJob.find({"applied_job_id" : args.job_id },{_id:0})
                return students;
            }
        },
        getAllJobsApplied:{
            type : new GraphQLList(AppliedJobsForStudentType),
            args : {student_id : {type: GraphQLString}},
            async resolve(parent, args) {
                let jobs = await AppliedJob.find({"student_id" : args.student_id},{_id:0})
                return jobs;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addStudent: {
            type: StatusType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                school: { type: GraphQLString },
            },
            async resolve(parent, args) {
                return studentSignup(args);
            }
        },
        addCompany: {
            type: StatusType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                location: { type: GraphQLString },
            },
            async resolve(parent, args) {
                return companySignup(args);
            }
        },
       
        login: {
            type: StatusType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                userType: {type: GraphQLString},
            },
            resolve(parent, args) {
                return login(args);
            }
        },

        addJob: {
            type: StatusType,
            args: {
                company_id: { type: GraphQLString },
                title: { type: GraphQLString },
                posting_date: { type: GraphQLString },
                application_deadline: { type: GraphQLString },
                location: { type: GraphQLString },
                salary: { type: GraphQLString },
                job_description: { type: GraphQLString },
                job_category: { type: GraphQLString },

            },
            resolve(parent, args) {
                return addJob(args);
            }
        },
        updateStudentBasic: {
            type: StatusType,
            args: {
                student_id: { type: GraphQLString },
                city: { type: GraphQLString },
                state: { type: GraphQLString },
                country: { type: GraphQLString },
                dob: { type: GraphQLString },
                major: { type: GraphQLString },
                career_obj: { type: GraphQLString },

            },
            resolve(parent, args) {
                return updateStudentBasic(args);
            }
        },

        updateStudentEducation: {
            type: StatusType,
            args: {
                student_id: { type: GraphQLString },
                school: { type: GraphQLString },
                degree: { type: GraphQLString },
                education_major: { type: GraphQLString },
                year_of_passing: { type: GraphQLString },
                cgpa: { type: GraphQLString },

            },
            resolve(parent, args) {
                return updateStudentEducation(args);
            }
        },

        updateStudentExperience: {
            type: StatusType,
            args: {
                student_id: { type: GraphQLString },
                title: { type: GraphQLString },
                company: { type: GraphQLString },
                location: { type: GraphQLString },
                from: { type: GraphQLString },
                to: { type: GraphQLString },
                description: { type: GraphQLString },

            },
            resolve(parent, args) {
                return updateStudentExperience(args);
            }
        },
        updateCompanyProfile: {
            type: StatusType,
            args: {
                company_id: { type: GraphQLString },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                location: { type: GraphQLString },
            },
            async resolve(parent, args) {
                return updateCompanyProfile(args);
            }
        },
        applyJob: {
            type: StatusType,
            args: {
                student_id: { type: GraphQLString },
                job_id: { type: GraphQLString },
                student_name: { type: GraphQLString },
            },
            resolve(parent, args) {
                return applyJob(args);
            }
        },
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
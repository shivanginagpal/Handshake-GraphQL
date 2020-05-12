const Company = require("../dbSchema/Company");
const AppliedJob = require("../dbSchema/AppliedJob");

const addJob = async (args) => {
    let company = await Company.findOne({ _id: args.company_id });
    if (company) {
        let job = {
            title: args.title,
            posting_date: args.posting_date,
            application_deadline: args.application_deadline,
            location: args.location,
            salary:args.salary,
            job_description:args.job_description,
            job_category: args.job_category,
        }
        company.jobs.push(job);
        let savedJob = await company.save();
        
        if (savedJob) {
            return { status: 200, message: "JOB_ADDED" };
        }
        else {
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
        }
    }
    else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};

const applyJob = async (args) => {
    let job = await AppliedJob.findOne( {$and : [{ "applied_job_id": args.job_id },{ "student_id" : args.student_id}]} );
    if (job) {
        return { status: 400, message: "JOB_ALREADY_APPLIED" };
    }
    else {
        var appliedJob = new AppliedJob({
            applied_job_id: (args.job_id).toString(),
            student_id: (args.student_id).toString()
        });
        let savedAppliedJob = await appliedJob.save();
        if (savedAppliedJob) {
            return { status: 200, message: "JOB_ADDED" };
        }
        else {
            return { status: 500, message: "INTERNAL_SERVER_ERROR" };
        }
    }
};

exports.addJob = addJob;
exports.applyJob = applyJob;
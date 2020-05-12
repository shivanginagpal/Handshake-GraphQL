import React, { Component } from 'react';
import Pagination from '../pagination/Pagination';


class CompanyPostedJobs extends Component {
    state = {
        companyjobs: [],
        currentCompanyJobs: [],
        currentPage: null,
        totalPages: null
    };
    onPageChanged = data => {
        console.log(this.props);
        var companyjobs = this.props.companyjobs;
        const { currentPage, totalPages, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const currentCompanyJobs = companyjobs.slice(offset, offset + pageLimit);
        this.setState({ currentPage, currentCompanyJobs, totalPages });
    }

    jobClick = (job_id) => {
        console.log("Came inside job-click");
        console.log(job_id);
        localStorage.setItem("job_id", job_id );
    }
    render() {
        
        var { companyjobs } = this.props;
        const { currentCompanyJobs } = this.state;
        const totalJobs = companyjobs.length;

        let jobDetails = currentCompanyJobs.map(job => (
            <div>
                <div className="card w-75" id="jobscard">
                    <div className="card-body">
                        <div className="row">
                            <strong>Job Title :</strong> {job.title}
                        </div>
                        <div className="row">
                            <strong>Posting Date :</strong>
                            {job.posting_date}
                        </div>
                        <div className="row">
                            <strong>Application Deadline :</strong>
                            {job.application_deadline}

                        </div>
                        <div className="row">
                            <strong>Salary : </strong> {job.salary}
                        </div>
                        <div className="row">
                            <strong>Job Decsription : </strong> {job.job_description}
                        </div>
                        <div className="row">
                            <strong>Job Category : </strong>{job.job_category}
                            {/* <strong>Job Id : </strong>{job._id} */}
                        </div>
                        <div className="row">
                            <a href="/studentAppliedJobs" onClick={() => this.jobClick(job._id)}> Student List</a>
                        </div>
                    </div>
                </div>
            </div>
        ))
        return (
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-12">
                        <div className="dash-one">
                            <h4 className="font-weight-bold">All Jobs</h4>
                            {jobDetails.length > 0 ? (
                                <div className="col-10">{jobDetails}</div>
                            ) : (
                                    <div>
                                        <h4 style={{ margin: "3em" }}>No jobs added! <br /> Click on Post Job to add a job opening.</h4>
                                    </div>
                                )}
                            <Pagination totalRecords={totalJobs} pageLimit={2} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default (CompanyPostedJobs)
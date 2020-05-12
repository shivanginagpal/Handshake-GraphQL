import React, { Component } from 'react';
import StudentNavbar from './StudentNavbar';
import { getStudentJobsQuery } from '../../queries/queries';
import { applyJobMutation } from '../../mutation/mutations';
import { graphql } from 'react-apollo';
import { Link } from "react-router-dom";
import swal from "sweetalert";
import * as compose from 'lodash.flowright';
import { Modal, ModalHeader, ModalBody } from "reactstrap";


class StudentHome extends Component {
    constructor() {
        super();
        this.state = {
          searchString: "",
          job:{},
          modal: false
        };
        this.searchChangeHandler = this.searchChangeHandler.bind(this);
      }
      searchChangeHandler(e) {
        this.setState({ searchString: e.target.value });
      }

      companyClick = (company_id) => {
        console.log("Came inside companyClick");
        console.log(company_id);
        localStorage.setItem("company_id", company_id );
    }

    showModal1 = (job) => {
        this.setState({
          modal: !this.state.modal,
          job: job
        });
      };

    applyJob = async (job_id) => {
        
        let mutationResponse = await this.props.applyJobMutation({
            variables: {
                job_id: job_id,
                student_id : localStorage.getItem("id")
            }
        });
        let response = mutationResponse.data.applyJob;
        if (response) {
            if (response.status === "200") {
                console.log("Success");
                //alert("Job Applied");
                swal({
                    title: "Congratulations!",
                    text: "You Successfully applied for the Job!",
                    icon: "success",
                    button: "OK"
                  }).then(() => {
                    window.location.reload();
                  })
            } else {
                swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You have already applied for this job!!',
                    button: "OK"
                  }).then(() => {
                    window.location.reload();
                })
            }
        }

    }

    render() {
        const closeBtn = (
            <button className="close" onClick={() => this.showModal1()}>
              &times;
            </button>
          );

        let company = null;
        let jobCard = [];

        if (this.props.data.jobs) {
            let tempCard = null;
            company = this.props.data.jobs;
            company.map(tempCompany => {
                
                tempCompany.jobs.map(job => {
                    
                    if (
                        (tempCompany.name
                        .toUpperCase()
                        .includes(this.state.searchString.toUpperCase())
                        ) || 
                        (job.title
                        .toUpperCase()
                        .includes(this.state.searchString.toUpperCase())
                        )
                    ){
                    console.log("In render");
                    tempCard = (
                        <div key={job._id}>

                            <div className="card w-50" id="jobscard">
                                <div className="card-body">
                                    <div className="row">
                                        <h5 className="card-title col-7">
                                            <h4> {job.title} | {job.job_category}</h4>
                                        </h5>
                                        <div className="col-3">
                                            <button
                                                type="button"
                                                className="btn btn-outline-success"
                                                onClick={() => this.showModal1(job)}
                                            >
                                                View Job Details
                                            </button>
                                        </div>

                                    </div>
                                    <p className="card-text" >
                                    <a href="/companyProfile" onClick={() => this.companyClick(tempCompany.id)}> <h4> {tempCompany.name}</h4></a>
                                       
                                    </p>
                                    <div className="row">
                                        <p className="card-text col-7" >
                                            {job.location}
                                        </p>
                                        <button
                                            class="btn btn-primary"
                                            onClick={() =>this.applyJob(job._id)}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    jobCard.push(tempCard);
                    }
                })

            }
        )
        }
        return (
            <div>
                <StudentNavbar />
                <nav className="navbar navbar-light bg-light">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                onChange={this.searchChangeHandler}
                value={this.state.searchString}
                placeholder="Search"
                aria-label="Search"
              />
              <Link
                to="/appliedJobs"
                className="btn btn-outline-dark my-2 my-sm-0"
              >
                View Applied Jobs
              </Link>
            </form>
          </nav>
                <div className="container">
                    <div class="container-fluid">
                        <div>
                            {jobCard}
                            {this.state.job != null ? (
                        <Modal
                      isOpen={this.state.modal}
                      toggle={() => this.showModal1()}
                      className="modal-popup"
                      scrollable
                    >
                      <ModalHeader
                        toggle={() => this.showModal1()}
                        close={closeBtn}
                      >
                        Job Details
                      </ModalHeader>
                      <ModalBody className="modal-body">
                        <div className="form-group">
                          <h4 className="font-weight-bold">
                            Job Name: {this.state.job.title}
                          </h4>
                        </div>
                        <div className="form-group">
                          <h4 className="font-weight-bold">
                            Job Description:{" "}
                            {this.state.job.job_description}
                          </h4>
                          <br />
                        </div>
                        <div className="form-group">
                          <h4 className="font-weight-bold">
                            Location:{this.state.job.location}
                          </h4>
                        </div>
                        <div className="form-group">
                          <h4 className="font-weight-bold">
                            Posting Date :
                            {this.state.job.posting_date}
                          </h4>
                        </div>
                        <div className="form-group">
                          <h4 className="font-weight-bold">
                            Application Deadline :
                            {this.state.job.application_deadline}
                          </h4>
                        </div>
                      </ModalBody>
                    </Modal> 
                    ) : (
                      null
                    )}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default compose(graphql( applyJobMutation,
    { name: "applyJobMutation" }),
    graphql(
    getStudentJobsQuery, {
    options: {
        variables: { id: null }
    }
}))(StudentHome);
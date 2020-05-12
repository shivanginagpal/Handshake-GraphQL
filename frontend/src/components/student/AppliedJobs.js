import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getAllJobsAppliedQuery} from '../../queries/queries';
import StudentNavbar from './StudentNavbar';

class AppliedJobs extends Component {
    render() {
        let company = null;
        let jobCard = [];

        if (this.props.data.getAllJobsApplied) {
            let tempCard = null;
            //  let jobs = this.props.data.getAllJobsApplied;
            console.log(this.props.data.getAllJobsApplied);
            company=this.props.data.getAllJobsApplied;
            company.map(tempCompany => {
                
                    tempCard = (
                        <div key={tempCompany.company.jobs[0]._id}>

                            <div className="card w-50" id="jobscard">
                                <div className="card-body">
                                    <div className="row">
                                        <h5 className="card-title col-7">
                                            <h4> {tempCompany.company.jobs[0].title} | {tempCompany.company.jobs[0].job_category}</h4>
                                        </h5>
                                        <div className="col-3">
                                        </div>

                                    </div>
                                    <p className="card-text" >
                                        <h4> {tempCompany.company.name}</h4>
                                    </p>
                                    <div className="row">
                                        <p className="card-text col-7" >
                                            {tempCompany.company.jobs[0].location}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                    jobCard.push(tempCard);
                    }
                )

        }
        return (
            <div>
                <StudentNavbar />
                <div className="container">
                {jobCard}
                </div>
                
            </div>
        )
    }
}

export default 
    graphql(
    getAllJobsAppliedQuery, {
    options: {
        variables: { student_id: localStorage.getItem("id") }
    }
})(AppliedJobs);
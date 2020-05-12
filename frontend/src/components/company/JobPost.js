import React, { Component } from 'react';
import CompanyNavbar from "./CompanyNavbar";
import { Redirect } from 'react-router-dom';
import { addJobMutation } from '../../mutation/mutations';
import { graphql } from 'react-apollo';

class jobPost extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            posting_date: '',
            app_deadline: '',
            salary: '',
            location: '',
            job_description: '',
            job_category: '',
            postFlag:false,
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmit(e) {
        e.preventDefault();

        let mutationResponse = await this.props.addJobMutation({
            variables: {
            title: this.state.title,
            posting_date: this.state.posting_date,
            application_deadline: this.state.app_deadline,
            salary: this.state.salary,
            location: this.state.location,
            job_description: this.state.job_description,
            job_category: this.state.job_category,
            company_id : localStorage.getItem("id")
            }
        });
        let response = mutationResponse.data.addJob;
        if (response) {
            if (response.status === "200") {
                this.setState({
                    success: true,
                    postFlag: true
                });
            } else {
                this.setState({
                    message: response.message,
                    
                });
            }
        }
    }

    render() {
        let redirectVal = null;
        if(this.state.postFlag === true){
            redirectVal = <Redirect to="/companyHome"/>;
        }
        return (
            <div>
            {redirectVal}
            <CompanyNavbar/>
            <div className="container">
            <div className="col-md-8 m-auto">
            
            <form onSubmit={this.onSubmit}>
                <div class="form-group"><p>Job Title: </p><input type="text" className="form-control form-control-lg" placeholder="Job Title" name="title" onChange={this.onChange} value={this.state.job_title} /></div>

                <div class="form-group"><p>Job Posting Date: </p><input type="date" className="form-control form-control-lg" placeholder="Posting Date" name="posting_date" value={this.state.posting_date} onChange={this.onChange} /></div>

                <div class="form-group"><p>Application Deadline: </p><input type="date" className="form-control form-control-lg" placeholder="Application Deadline" name="app_deadline" value={this.state.app_deadline} onChange={this.onChange} /></div>

                <div class="form-group"><p>Salary: </p><input type="text" className="form-control form-control-lg" placeholder="Salary" name="salary" value={this.state.salary} onChange={this.onChange} /></div>

                <div class="form-group"><p>Job Location: </p><input type="text" className="form-control form-control-lg" placeholder="Location" name="location" value={this.state.location} onChange={this.onChange} /></div>

                <div class="form-group"><p>Job Description: </p><input type="text" className="form-control form-control-lg" placeholder="Description" name="job_description" value={this.state.job_description} onChange={this.onChange} /></div>

                <div class="form-group"><p>Job Category: </p><input type="text" className="form-control form-control-lg" placeholder="Category" name="job_category" value={this.state.job_category} onChange={this.onChange} /></div>
               
                <br></br>
                <div class="form-group"><input type="submit" className="form-control form-control-lg btn btn-info" value="Post Job" /> </div>
            </form>
            </div>
            </div>
            </div>
        );
    }
}

export default graphql(addJobMutation, { name: "addJobMutation" })(jobPost);
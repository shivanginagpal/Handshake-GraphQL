import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import StudentNavbar from "./../student/StudentNavbar";
import { updateStudentBasic } from '../../mutation/mutations';
import { graphql } from 'react-apollo';
import { getStudentProfile } from '../../queries/queries';
import * as compose from 'lodash.flowright';

class StudentProfileBasic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dob: "",
      city: "",
      state: "",
      country: "",
      career_obj: "",
      major: "",
      postFlag: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(e) {
    e.preventDefault();

    let mutationResponse = await this.props.updateStudentBasic({
      variables: {
        name: this.state.name,
        dob: this.state.dob,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        career_obj: this.state.career_obj,
        student_id: localStorage.getItem("id"),
        major: this.state.major
      }
    });
    let response = mutationResponse.data.updateStudentBasic;
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
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    let redir = null;
    if (this.state.postFlag) {
      redir = window.location.replace("/studentProfile");
    }

    let name = null, dob = null, city = null, state = null, country = null, major = null, career_obj = null;
    if (this.props.data.studentProfile) {
      console.log(this.props.data.studentProfile);
      name = this.props.data.studentProfile.user.name;
      dob = this.props.data.studentProfile.dob;
      city = this.props.data.studentProfile.city;
      state = this.props.data.studentProfile.state;
      country = this.props.data.studentProfile.country;
      major = this.props.data.studentProfile.major;
      career_obj = this.props.data.studentProfile.career_obj;
    }
    return (
      <div>
        <StudentNavbar />
        {redir}
        <div className="studentbasic">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">
                  Enter your basic details
               </h1>
                <form noValidate onSubmit={this.onSubmit}>
                  <p>Name</p>
                  <TextFieldGroup
                    placeholder={name}
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  <p>Date Of Birth</p>
                  <TextFieldGroup
                    placeholder={dob}
                    name="dob"
                    value={this.state.dob}
                    onChange={this.onChange}
                  />
                  <p>City</p>
                  <TextFieldGroup
                    placeholder={city}
                    name="city"
                    value={this.state.city}
                    onChange={this.onChange}
                  />
                  <p>State</p>
                  <TextFieldGroup
                    placeholder={state}
                    name="state"
                    value={this.state.state}
                    onChange={this.onChange}
                  />
                  <p>Country</p>
                  <TextFieldGroup
                    placeholder={country}
                    name="country"
                    value={this.state.country}
                    onChange={this.onChange}
                  />
                  <bold>Major(Required)*</bold>
                  <TextFieldGroup
                    placeholder={major}
                    name="major"
                    value={this.state.major}
                    onChange={this.onChange}
                  />
                  <p>Career Objective</p>
                  <TextAreaFieldGroup
                    placeholder={career_obj}
                    name="career_obj"
                    value={this.state.career_obj}
                    onChange={this.onChange}
                  />
                  <input
                    type="submit"
                    value="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(graphql(updateStudentBasic,
  { name: "updateStudentBasic" }),
  graphql(
    getStudentProfile, {
    options: {
      variables: { student_id: localStorage.getItem("id") }
    }
}))(StudentProfileBasic);
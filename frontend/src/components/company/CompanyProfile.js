import React, { Component } from 'react';
import CompanyNavbar from "./CompanyNavbar";
import StudentNavbar from '../student/StudentNavbar';
import { graphql } from 'react-apollo';
import { getcompanyProfile } from '../../queries/queries';
import { Link } from 'react-router-dom';
import { isFieldEmpty } from '../common/HelperApis';

class CompanyProfile extends Component {

  render() {
    let userType = localStorage.getItem("userType");
    let nav;
    if (userType === 'student') {
      nav = <StudentNavbar />;
    } else {
      nav = <CompanyNavbar />;
    }
    let profileHeader = null;
    if (userType === 'company') {
      profileHeader = (
        <div className="row">
          <div className="col-md-6">
            <Link to="/CompanyHome" className="btn btn-light mb-3 float-left">
              Back To Company Home
            </Link>
          </div>
          <div className="navbar-nav ml-auto">
            <Link to="/editCompanyProfile" className="btn btn-light">
              <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
            </Link>
          </div>
        </div>
      )
    }
    let profileContent;
    if (this.props.data.company) {
      console.log(this.props.data);
      let company = this.props.data.company;
      profileContent = (
        <div className="text-center">
          <h1 className="display-6 text-center">{company.name}</h1>
          <p className="lead text-center">
            Company located {' '}
            <span>at {company.location}</span>
          </p>
          <p className="lead text-center">
            {' '}
            {isFieldEmpty(company.description) ? null : (
              <span> {company.description}</span>
            )}
          </p>
        </div>
      );
    }

    return (
      <div>
        {nav}
        <div className="profile">
          <div className="container">
            <div className="row">
            <div className="col-md-12">{profileHeader}</div>
              <div className="col-md-12">{profileContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default graphql(getcompanyProfile, {
  options: {
    variables: { id: localStorage.getItem("company_id") }
  }
})(CompanyProfile);
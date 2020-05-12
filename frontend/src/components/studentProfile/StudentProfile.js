import React, { Component } from 'react';
import { getStudentProfile } from '../../queries/queries';
import StudentProfileAction from '../studentProfileAdd/StudentProfileAction';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import StudentNavbar from "../student/StudentNavbar";
import { isFieldEmpty } from '../common/HelperApis';
import ProfStudentEducation from './ProfStudentEducation';
import ProfStudentExperience from './ProfStudentExperience';

class StudentProfile extends Component {

  render() {
    
    let profileContent;

    if (!this.props.data.studentProfile) {
        profileContent = (
          <div>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/studentProfileBasic" className="btn btn-lg btn-info">
              Update Profile
            </Link>
        </div>
        );
    } else {
     const {studentProfile} = this.props.data;
    profileContent = (
        <div>
          <div className="row">
              <StudentProfileAction />
            <div className="col-md-6" />
          </div>
          <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="text-center">
              <h1 className="display-6 text-center">{studentProfile.user.name}
              </h1>
              <h2 className="display-10 text-center">{studentProfile.career_obj}
                </h2>
              <p className="lead text-center">
                Student{' '}
                {isFieldEmpty(studentProfile.school) ? null : (
                  <span>at {studentProfile.school}</span>
                )}
              </p>
              {isFieldEmpty(studentProfile.city) ? null : <p>{studentProfile.city} , {studentProfile.state}</p>}
              {isFieldEmpty(studentProfile.major) ? null : <p>{studentProfile.major} </p>}
              
            </div>
          </div>
        </div>
       </div>
          
          <ProfStudentEducation education={studentProfile.education} />
          <ProfStudentExperience experience={studentProfile.experience} />
          
        </div>
      );
    }

    return (
    <div>
        <StudentNavbar />
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default graphql(getStudentProfile, {
    options: {
      variables: { student_id: localStorage.getItem("student_id") }
    }
  })(StudentProfile);

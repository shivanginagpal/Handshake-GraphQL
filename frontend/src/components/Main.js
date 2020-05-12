import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import CompanyHome from './company/CompanyHome';
import StudentHome from './student/StudentHome';
import CompanySignup from './Signup/CompanySignup';
import StudentSignup from './Signup/StudentSignup';
import Landing from './layout/Landing';
import JobPost from './company/JobPost';
import StudentAppliedJobs from './company/StudentAppliedJobs';
import AppliedJobs from './student/AppliedJobs';
import StudentProfileBasic from './studentProfileAdd/StudentProfileBasic';
import StudentEducation from './studentProfileAdd/StudentEducation';
import StudentExperience from './studentProfileAdd/StudentExperience';
import ViewAllStudents from './common/ViewAllStudents';
import CompanyProfile from './company/CompanyProfile';
import EditCompanyProfile from './company/EditCompanyProfile';
import StudentProfile from './studentProfile/StudentProfile';

class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Landing}/>
                <Route path="/login" component={Login} />
                <Route path="/studentsignup" component={StudentSignup} />
                <Route path="/companysignup" component={CompanySignup} />
                <Route path="/studentHome" component={StudentHome} />
                <Route path="/companyHome" component={CompanyHome} />
                <Route path="/jobPost" component={JobPost} />
                <Route path="/studentAppliedJobs" component={StudentAppliedJobs} />
                <Route path="/appliedJobs" component={AppliedJobs} />
                <Route path="/studentProfileBasic" component={StudentProfileBasic} />
                <Route path="/studentEducation" component={StudentEducation} />
                <Route path="/studentExperience" component={StudentExperience} />
                <Route path="/viewAllStudents" component={ViewAllStudents} />
                <Route path="/companyProfile" component={CompanyProfile} />
                <Route path="/editCompanyProfile" component={EditCompanyProfile}/>
                <Route path="/studentProfile" component={StudentProfile} />

            </div>
        )
    }
}
export default Main;
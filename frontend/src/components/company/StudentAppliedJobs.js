import React, { Component } from 'react';
import { getStudentsforJob } from '../../queries/queries';
import CompanyNavbar from './CompanyNavbar';
import { graphql } from 'react-apollo';

class StudentAppliedJobs extends Component {

  constructor() {
    super();
    this.state = {
      job_id: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    console.log("in componentDidMount");

  }

  reply_click = (student_id) => {
    console.log(student_id);
    this.props.history.push({
      pathname: "/companyViewStudentProfile",
      state: {
        student_id: student_id
      }
    });
  }

  onChange = (student, e) => {
    console.log(student);
    console.log(e);
    const updateAppliedJobData = {
      application_status: e.value,
      student_id: student.student_id,
      job_id: student.applied_job_id
    };
    console.log(updateAppliedJobData);
    this.props.updateAppliedJob(updateAppliedJobData);
  }

  render() {
    console.log("job_id", localStorage.getItem("job_id"));
    let students = this.props.data.getStudentsForJob;
    console.log(students);
    let studentDetails = null;
    if (students) {
      studentDetails = students.map(student => {
        console.log(student);
        return (
          <tr>
            <td>{<a href="#" onClick={() => this.reply_click(student.student.id)}> {student.student.name}</a>}</td>
            <td>Applied</td>

            <td>{student.student.school} </td>

          </tr>

        )
      }
      )
    }
    return (
      <div>
        <CompanyNavbar />
        <div class="container">
          <h2>Students List</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Application Status</th>
                <th>School</th>
              </tr>
            </thead>
            <tbody>
              {studentDetails}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
};

export default graphql(getStudentsforJob, {
  options: {
    variables: { job_id: localStorage.getItem("job_id") }
  }
})(StudentAppliedJobs);

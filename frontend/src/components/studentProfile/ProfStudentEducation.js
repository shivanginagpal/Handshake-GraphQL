import React, { Component } from 'react'

class ProfStudentEducation extends Component {
  render() {
    console.log("In Student Education");
    var { education } = this.props;
    console.log(education);

    const eduItems = education.map((edu, i) => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          {edu.year_of_passing}
        </p>
        <p>
          <strong>Degree:</strong> {edu.degree}
        </p>
        <p>
          <strong>Specialization:</strong> {edu.education_major}
        </p>
        <p>
          {edu.cgpa === '' ? null : (
            <span>
              <strong>CGPA: </strong> {edu.cgpa}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center text-info">Education</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
              <p className="text-center">No Education Listed</p>
            )}
        </div>
      </div>
    )

  }
}
export default ProfStudentEducation;
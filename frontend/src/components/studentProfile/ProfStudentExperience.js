import React, { Component } from 'react';

class ProfStudentExperience extends Component {
  render() {
    console.log("In Student Experience");
    var { experience } = this.props;

    const expItems = experience.map((exp, i) => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          {exp.from} to
          {exp.to}
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        <p>
          {exp.location === '' ? null : (
            <span>
              <strong>Location: </strong> {exp.location}
            </span>
          )}
        </p>
        <p>
          {exp.description === '' ? null : (
            <span>
              <strong>Description: </strong> {exp.description}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center text-info">Experience</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
              <p className="text-center">No Experience Listed</p>
            )}
        </div>
      </div>
    )
  }
}

export default ProfStudentExperience;
import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import StudentNavbar from '../student/StudentNavbar';
import CompanyNavbar from "../company/CompanyNavbar";
import { getAllStudentQueries } from '../../queries/queries';
import { Card, Row } from 'react-bootstrap';

class viewAllStudents extends Component {
    constructor() {
        super();
        this.state = {
            searchString: "",
        };
        this.searchChangeHandler = this.searchChangeHandler.bind(this);
    }
    searchChangeHandler(e) {
        this.setState({ searchString: e.target.value });
    }

    render() {
        let userType = localStorage.getItem("userType");
        let nav = {}
        if (userType === 'student'){
            nav = <StudentNavbar />;
        }else{
            nav = <CompanyNavbar />;
        }
        let studentCard = [];
        if (this.props.data.getAllStudents) {

            let tempCard = null;
            let students = this.props.data.getAllStudents;
            students.map(tempStudent => {

                if (
                    (tempStudent.user.name
                        .toUpperCase()
                        .includes(this.state.searchString.toUpperCase())
                    ) ||
                    (tempStudent.user.school
                        .toUpperCase()
                        .includes(this.state.searchString.toUpperCase())
                    )
                ) {
                    tempCard = (
                        <div key={tempStudent.user.id}>
                            <Card bg="light" style={{ width: "40rem", height: "14rem", margin: "2%" }}>
                                <Row>
                                    <Card.Body align="center">

                                        <Card.Title><h2>{tempStudent.user.name}</h2></Card.Title>
                                        <Card.Text><h4>{tempStudent.user.school} | {tempStudent.user.email}  </h4></Card.Text>
                                        <Card.Text><h4>{tempStudent.city}, {tempStudent.state},{tempStudent.country}</h4></Card.Text>
                                    </Card.Body>
                                </Row>
                            </Card>
                        </div>
                    )

                    studentCard.push(tempCard);
                }
            }
            )
        }
        return (
            <div>
                {nav}
                <div class="container-fluid">
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

                        </form>
                    </nav>

                    <div>  {studentCard}</div>

                </div>
            </div>
        )
    }
}


export default graphql(getAllStudentQueries, {
    options: {
        variables: { id: null }
    }
})(viewAllStudents);
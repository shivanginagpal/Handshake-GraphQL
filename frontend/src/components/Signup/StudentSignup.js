import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import { addStudentMutation } from '../../mutation/mutations';

class StudentSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            school: "",
            signupFlag: false,
            success: false
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        //prevent page from refresh
        e.preventDefault();
        let mutationResponse = await this.props.addStudentMutation({
            variables: {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                school: this.state.school,
                
            }
        });
        let response = mutationResponse.data.addStudent;
        if (response) {
            if (response.status === "200") {
                this.setState({
                    success: true,
                    signupFlag: true
                });
            } else {
                this.setState({
                    message: response.message,
                    signupFlag: true
                });
            }
        }
    }

    render() {
        let redirectVar = null;
        let message = "";
        if (localStorage.getItem("token")) {
            redirectVar = <Redirect to="/Home" />
        }
        else if (this.state.success) {
            alert("You have registered successfully");
            redirectVar = <Redirect to="/Login" />
        }
        else if(this.state.message === "USER_EXISTS" && this.state.signupFlag){
            message = "Email id is already registered"
        }
        return (
            <div>
                {redirectVar}
                <Row>
                
                    <Col>
                        <div class="container">
                            <div class="login-form">
                                <div class="main-div">
                                    <div class="panel">
                                        <h2>Signup for new Handshake Account</h2>
                                    </div>
                                    <form onSubmit={this.onSubmit}>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="name" onChange={this.onChange} placeholder="Name" pattern="^[A-Za-z0-9 ]+$" required />
                                        </div>
    
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="email" onChange={this.onChange} placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" required />
                                        </div>

                                        <div class="form-group">
                                            <input type="password" class="form-control" name="password" onChange={this.onChange} placeholder="Password" required />
                                        </div>

                                        <div class="form-group">
                                            <input type="text" class="form-control" name="school" onChange={this.onChange} placeholder="School" pattern="^[A-Za-z0-9 ]+$" required />
                                        </div>
                                        
                                        <div style={{ color: "#ff0000" }}>{message}</div><br />
                                        <button type="submit" class="btn btn-primary">Signup</button><br /><br />
                                        <div>Already have an account? <Link to='/login'>Login</Link></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default graphql(addStudentMutation, { name: "addStudentMutation" })(StudentSignup);
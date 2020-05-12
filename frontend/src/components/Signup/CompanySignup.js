import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import { addCompanyMutation } from '../../mutation/mutations';

class CompanySignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            location: "",
            signupFlag: false,
            success: false
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        //prevent page from refresh
        e.preventDefault();

        let mutationResponse = await this.props.addCompanyMutation({
            variables: {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                location: this.state.location,
            }
        });
        let response = mutationResponse.data.addCompany;
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
        //redirect based on successful signup
        let redirectVar = null;
        let message = "";
        if (localStorage.getItem("token")) {
            redirectVar = <Redirect to="/Home" />
        }
        else if (this.state.success) {
            alert("You have registered successfully");
            redirectVar = <Redirect to="/Login" />
        }
        else if (this.state.message === "USER_EXISTS" && this.state.signupFlag) {
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
                                        <h2>Signup for Handshake(Company) account</h2>
                                    </div>
                                    <form onSubmit={this.onSubmit}>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="name" onChange={this.onChange} placeholder="Name" pattern="^[A-Za-z0-9 ]+$" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control" name="email" onChange={this.onChange} placeholder="Email Id" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" name="password" onChange={this.onChange} placeholder="Password" required />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" name="location" onChange={this.onChange} placeholder="Location" pattern="^[A-Za-z0-9 ,-]+$" required />
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

export default graphql(addCompanyMutation, { name: "addCompanyMutation" })(CompanySignup);
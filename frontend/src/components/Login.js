import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { graphql } from 'react-apollo';
import { loginMutation } from '../mutation/mutations';
import classnames from 'classnames';
const jwt_decode = require('jwt-decode');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            userType: "",
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    onSubmit = async (e) => {
        e.preventDefault();
        let mutationResponse = await this.props.loginMutation({
            variables: {
                email: this.state.email,
                password: this.state.password,
                userType: this.state.userType
            }
        });
        let response = mutationResponse.data.login;
        if (response) {
            if (response.status === "200") {
                this.setState({
                    success: true,
                    data: response.message,
                    loginFlag: true
                });
            } else {
                this.setState({
                    message: response.message,
                    loginFlag: true
                });
            }
        }
    }

    render() {
        let redirectVar = null;
        let message = ""
        if (this.state.success) {
            let token = this.state.data;
            localStorage.setItem("token", token);
            var decoded = jwt_decode(token.split(' ')[1]);
            localStorage.setItem("id", decoded.id);
            localStorage.setItem("name", decoded.name);
            localStorage.setItem("email", decoded.email);
            localStorage.setItem("userType", decoded.userType);
            if (localStorage.getItem("userType") === 'student') {
                localStorage.setItem("student_id",localStorage.getItem("id") );
                redirectVar = window.location.replace("/studentHome")
            }
            else if (localStorage.getItem("userType") === 'company') {
                localStorage.setItem("company_id",localStorage.getItem("id") );
                redirectVar = window.location.replace("/companyHome")

            }
            else {
                redirectVar = <Redirect to="/login" />
                //window.location.replace("/login")
            }
        }
        else if (this.state.message === "NO_USER" && this.state.loginFlag) {
            message = "No user with this email id";
        }
        else if (this.state.message === "INCORRECT_PASSWORD" && this.state.loginFlag) {
            message = "Incorrect Password";
        }

        return (
            <div>
                {redirectVar}
                <div>
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your Handshake account</p>
                            <form onSubmit={this.onSubmit}>
                            <div style={{ color: "#ff0000" }}>{message}</div><br />
                                <div className="form-group">
                                    <input type="email"
                                        className={classnames('form-control form-control-lg')}
                                        placeholder="Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange} />

                                </div>
                                <div className="form-group">
                                    <input type="password"
                                        className={classnames('form-control form-control-lg')}
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange} />

                                </div>
                                <div>
                                    <div className={classnames('custom-control custom-radio custom-control-inline')} >
                                        <input type="radio" className={classnames('custom-control-input')}
                                            id="student"
                                            name="userType"
                                            value="student"
                                            onChange={this.onChange} />
                                        <label className="custom-control-label" htmlFor="student">Student</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" className="custom-control-input"
                                            id="company"
                                            name="userType"
                                            value="company"
                                            onChange={this.onChange} />
                                        <label className="custom-control-label" htmlFor="company">Company</label>

                                    </div>

                                </div>

                                <input type="submit" className="btn btn-info btn-block mt-4" />

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default graphql(loginMutation, { name: "loginMutation" })(Login);
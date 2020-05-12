import React, { Component } from 'react'
import TextFieldGroup from '../common/TextFieldGroup';
import StudentNavbar from "./../student/StudentNavbar";
import { graphql } from 'react-apollo';
import { updateStudentEducation } from '../../mutation/mutations'

 class StudentEducation extends Component {
    constructor(props){
        super(props);
        this.state = {
            school: "",
            degree: "",
            major: "",
            year_of_passing: "",
            cgpa:"",
            postFlag:false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    async onSubmit(e) {
        e.preventDefault();

        let mutationResponse = await this.props.updateStudentEducation({
            variables: {
                school:this.state.school,
                degree:this.state.degree,
                education_major: this.state.major,
                year_of_passing:this.state.year_of_passing,
                cgpa:this.state.cgpa,
                student_id : localStorage.getItem("id"),
            }
        });
        let response = mutationResponse.data.updateStudentEducation;
        if (response) {
            if (response.status === "200") {
                this.setState({
                    success: true,
                    postFlag: true
                });
            } else {
                this.setState({
                    message: response.message,   
                });
            }
        } 
    }
    render() {
    
        let redir = null;
        if(this.state.postFlag){
            redir =  window.location.replace("/studentProfile");
        }
        return (
            <div>
            <StudentNavbar />
            {redir}
            <div className="studentExp">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-6 text-center">
                                Enter Education details
                            </h1>
                            <form noValidate onSubmit={this.onSubmit}>

                                <TextFieldGroup
                                    placeholder="School Name"
                                    name="school"
                                    value={this.state.school}
                                    onChange={this.onChange}
                                />

                                <TextFieldGroup
                                    placeholder="Degree"
                                    name="degree"
                                    value={this.state.degree}
                                    onChange={this.onChange}
                                />

                                <TextFieldGroup
                                    placeholder="Major"
                                    name="major"
                                    value={this.state.major}
                                    onChange={this.onChange}
                
                                />

                                <TextFieldGroup
                                    placeholder="Graduated Year"
                                    name="year_of_passing"
                                    value={this.state.year_of_passing}
                                    onChange={this.onChange}
                                />

                                <TextFieldGroup
                                    placeholder="CGPA"
                                    name="cgpa"
                                    value={this.state.cgpa}
                                    onChange={this.onChange}
                                />

                                <input
                                    type="submit"
                                    value="submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
            </div>
        )
    }
}

export default graphql(updateStudentEducation, { name: "updateStudentEducation" })(StudentEducation);
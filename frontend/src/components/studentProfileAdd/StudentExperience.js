import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import StudentNavbar from "./../student/StudentNavbar";
import { graphql } from 'react-apollo';
import { updateStudentExperience } from '../../mutation/mutations'


 class StudentExperience extends Component {
     constructor(props) {
         super(props);
         this.state = {
             company: "",
             title: "",
             location: "",
             from: "",
             to: "",
             description: "",
             postFlag : false
         };
         this.onChange = this.onChange.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
     }

     onChange(e) {
         this.setState({
             [e.target.name]: e.target.value
         });
     }

     async onSubmit(e) {
        e.preventDefault();
        let mutationResponse = await this.props.updateStudentExperience({
            variables: {
                company: this.state.company,
                title: this.state.title,
                location: this.state.location,
                from: this.state.from,
                to: this.state.to,
                description: this.state.description,
                student_id : localStorage.getItem("id"),
            }
        });
        let response = mutationResponse.data.updateStudentExperience;
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
                        <div className="col-md m-auto">
                            <h1 className="display-6 text-center">
                                Enter your Experience details
                            </h1>
                            <form noValidate onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="Company Name"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                />

                                <TextFieldGroup
                                    placeholder="Title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                />

                                <TextFieldGroup
                                    placeholder="Company Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                />
                                
                                <TextFieldGroup
                                    placeholder="Start Date"
                                    name="from"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                />

                                <TextFieldGroup
                                    placeholder="End Date"
                                    name="to"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                />

                                <TextAreaFieldGroup
                                    placeholder="Work Description"
                                    name="description"
                                    value={this.state.description}
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
  
export default graphql(updateStudentExperience, { name: "updateStudentExperience" })(StudentExperience);

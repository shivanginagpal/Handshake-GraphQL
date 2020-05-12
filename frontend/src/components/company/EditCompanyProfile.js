import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { getcompanyProfile } from '../../queries/queries';
import { updateCompanyProfile } from '../../mutation/mutations';
import { graphql } from 'react-apollo';
import CompanyNavbar from "./CompanyNavbar";
import * as compose from 'lodash.flowright';

class EditCompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      description: "",
      postFlag: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(e) {
    e.preventDefault();
    let mutationResponse = await this.props.updateCompanyProfile({
      variables: {
        name: this.state.name,
        location: this.state.location,
        description: this.state.description,
        company_id: localStorage.getItem("id")
      }
    });
    let response = mutationResponse.data.updateCompanyProfile;
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
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {

    let redir = null;
    if(this.state.postFlag){
      redir =  window.location.replace("/companyProfile");
    }
    let name=null, location=null, description=null;
    if(this.props.data.company){
    name=this.props.data.company.name;
    location=this.props.data.company.location;
    description=this.props.data.company.description;
    }

    return (
      <div >
        <CompanyNavbar />
        {redir}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Edit Company Profile
               </h1>
              <form noValidate onSubmit={this.onSubmit}>
                <p>Company Name </p>
                <TextFieldGroup
                  placeholder={name}
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
        
                />
                <p>Location </p>
                <TextFieldGroup
                  placeholder={location}
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                />
                <p>Description</p>
                <TextFieldGroup
                  placeholder={description}
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
    );
  }
}

export default compose(graphql( updateCompanyProfile,
  { name: "updateCompanyProfile" }),
  graphql(
    getcompanyProfile, {
    options: {
    variables: { id: localStorage.getItem("id") }
  }
}))(EditCompanyProfile);
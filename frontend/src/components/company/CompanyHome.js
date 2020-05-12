import React, { Component } from 'react';
import CompanyNavbar from "./CompanyNavbar";
import { getCompanyJobsQuery } from '../../queries/queries';
import { graphql } from 'react-apollo';
import CompanyPostedJobs from './CompanyPostedJobs';

class CompanyHome extends Component {
    render() {
        let landingContent;
        if(!this.props.data.company ){
            landingContent = "Jobs will be displayed below:";
          console.log(landingContent);
        } else if(this.props.data.company)
          { console.log(this.props.data.company.jobs);
              landingContent = (
            <div>
              <div className="row">
              <div className="col-md-6">
                </div>
                <div className="col-md-6" />
              </div>
              <div>
              <CompanyPostedJobs companyjobs={this.props.data.company.jobs}/> 
            </div>
            </div>
          );
        }

        return (
            <div>
                <CompanyNavbar />
                {landingContent}
            </div>
        )
    }
}
export default graphql(getCompanyJobsQuery, {
    options: {
        variables: { id: localStorage.getItem("id") }
    }
})(CompanyHome);
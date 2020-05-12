import React,{Component} from "react";

class CompanyNavbar extends Component{
  constructor() {
    super();
    this.state = {
      name: localStorage.getItem("name")
    }
  }
  handleLogout(e){
    window.localStorage.clear();
  }
  render(){

     //let name = getUserName();
     return(
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="/companyHome">Company Dashboard</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
    
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/companyProfile"> Profile
                </a>
              </li>
            </ul>
    
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/jobPost"> Post Job
                </a>
              </li>
            </ul>

            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/ViewAllStudents"> Students
                </a>
              </li>
            </ul>
            
            <ul className="navbar-nav ml-auto">
              <li className="nav-item navbar-brand">
                Hi, {this.state.name}!
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={this.handleLogout.bind(this)}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

     );
 }
}

export default CompanyNavbar;
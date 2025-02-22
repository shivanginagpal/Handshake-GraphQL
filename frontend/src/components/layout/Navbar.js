import React, { Component } from 'react'

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div className="container">
      <a className="navbar-brand" href="landing.html">HandShake</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/"> Student
            </a>
          </li>
        </ul>

        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/"> Company
            </a>
          </li>
        </ul>
        
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Sign Up
        </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="/studentsignup">As Student</a>
            <a className="dropdown-item" href="/companysignup">As Company</a>
          </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">Login</a>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
        )
    }
}

export default Navbar;
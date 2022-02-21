import React from "react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth'

const Navbar = ({auth:{isAuthenticated,loading},logout}) => {
  const authLinks = (
    <ul>
          <li>
            <a href="profiles.html">Developers</a>
          </li>
        </ul>
  )

  const guestLinks = (
    <ul>
          <li>
            <a href="profiles.html">Developers</a>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
    </ul>
  )
  return (
    <>
      <nav className="navbar bg-dark">
        <h1>
          <a href="index.html">
            <i className="fas fa-code"></i> DevConnector
          </a>
        </h1>
      </nav>
    </>
  );
};

Navbar.propType = {
  logout : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth:state.auth
})

export default connect(mapStateToProps,{logout}) (Navbar);

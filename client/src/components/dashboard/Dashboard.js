import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Spinner from '../layout/Spinner'
import { getCurrentProfile } from '../../actions/profile'
import { Link } from 'react-router-dom'


const Dashboard = ({getCurrentProfile,auth:{user} ,profile:{profile,loading}}) => {
    useEffect(()=>{
        getCurrentProfile()
    },[])
  return (
    <>
      <section className="container">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user" /> Welcome {user && user.name}
        </p>
        {profile!==null ? <>Has</> : <>
        <p>Please Setup a profile</p>
        <Link to='/create-profile' className='btn btn-primary my-1'>
            CREATE PROFILE
        </Link>
        </>}
      </section>
    </>
  );
}

Dashboard.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth:state.auth,
    profile:state.profile
})

export default connect(mapStateToProps,{getCurrentProfile}) (Dashboard)
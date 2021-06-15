import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {logout} from "../store/actions/auth";




class Profile extends React.Component {


  
    render() {
        let mystyle = {
            maxWidth: "50rem",
            marginLeft:"300px",
            marginTop: "50px"
        }

      if(localStorage.getItem('token')){
      
        return (

            <>
               <div className="jumbotron" style={mystyle}>
               <h2>Profile</h2>
               <br/>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">UserName :</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {localStorage.getItem('username')}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email :</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {localStorage.getItem('email')}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-12">
                      <a className="btn btn-info "  onClick={() => this.props.logout()} href="/" > Logout </a>
                      <a className="btn btn-info ml-2" href="/">Change Password</a>
                    </div>
                  </div>
                </div>
              </div>
                        
            </>
        )
      }
      else{
        return <Redirect to="/" />
      }
    }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(Profile);
import React from 'react'
import { connect } from 'react-redux';
import * as actions from "../../store/actions/auth";
import {Link, Redirect } from "react-router-dom";

class Login extends React.Component { 

    state = {
        "username": "",
        "password": "",
    }


    onSubmit = e => {
        e.preventDefault();
        const {username, password} = this.state;
        this.props.login(username,password);
    }



    render() {
        const { error, } = this.props;
        const {username, password} = this.state;
    

        if (localStorage.getItem('token')) {
            return <Redirect to="/classroom/" />;
          }

        return (
            <>
            <div className="container">
            <div className="jumbotron mt-5">
            <h2 className="text-align: center; color: #206aaa;">Login Form</h2>
            {error && <p>{this.props.error.message}</p>}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Username</label>
                        <input type="password" value={username} name="username" onChange={e => this.setState({username: e.target.value})} className="form-control" id="exampleInputPassword1" placeholder="UserName" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" value={password} name="password" onChange={e => this.setState({password: e.target.value})} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <p>
                      Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </form>
            </div>    
            </div>
            </>
        )
    }
}


const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
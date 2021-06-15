import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";
import {Redirect} from "react-router-dom";

class Register extends React.Component {
    state = {
        username: "",
        email: "",
        password1: "",
        password2: ""
      };

    onSubmit = e => {
        e.preventDefault();
        const {username, email, password1, password2} = this.state;
        this.props.signup(username, email, password1, password2);

    }  
   

  render() {
        
        const { username, email, password1, password2 } = this.state;
        const { error } = this.props;

        if (localStorage.getItem('token')) {
            return <Redirect to="/" />;
        }

        return (
            <>
            <div className="container">
            <div className="jumbotron mt-3">
            <h2 className="text-align: center; color: #206aaa;">Register Form</h2>
            {error && <p>{this.props.error.message}</p>}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">UserName</label>
                        <input type="text" value={username} name="username" onChange={e => this.setState({username: e.target.value})} className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter Username" />
    
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" value={email} name="email" onChange={e => this.setState({email: e.target.value})} className="form-control" id="email" placeholder="Enter Your Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Password">Password</label>
                        <input type="password" value={password1} name="password1" onChange={e => this.setState({password1: e.target.value})} className="form-control" id="password" placeholder=" Enter Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Confirm Password">Confirm Password</label>
                        <input type="password" value={password2} name="password2" onChange={e => this.setState({password2: e.target.value})} className="form-control" id="confirmpassword" placeholder="Confirm Password" />
                    </div>                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>    
            </div>
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}


const mapDispatchToProps = dispatch => {
    return {
        signup: (username,email, password1, password2 ) => {
            dispatch(actions.authRegister(username, email, password1, password2))

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);



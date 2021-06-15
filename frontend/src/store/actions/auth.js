import * as actionTypes from "./actionTypes";
import axios from "axios";
import { trackPromise } from 'react-promise-tracker';

export const authStart = () =>{
    return {
        type: actionTypes.AUTH_START

    }
}

export const authSuccess = (token,user) =>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
    }
}

export const authFail = error =>{
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,

    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout()) 
        },expirationTime*1000)
    }
}

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLogin = (username, password) =>{
    return dispatch=>{
        dispatch(authStart());
        trackPromise(axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            username: username,
            password: password,

        })
        .then(res =>{
            const token = res.data.key;
            localStorage.setItem('token', token);
            axios.get('http://127.0.0.1:8000/rest-auth/user/', {headers: {'Authorization':'Token ' + localStorage.getItem('token')}})
            .then(response => {
                localStorage.setItem('username', response.data.username)
                localStorage.setItem('email', response.data.email)
            }).catch()   
            const expirationDate = new Date(new Date().getTime()+ 3600 * 1000);    
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        }))
    }
}


export const authRegister = (username, email, password1, password2) =>{
    return dispatch=>{
        dispatch(authStart());
        trackPromise(axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2,

        })
        .then(res =>{
            const token = res.data.key;
            localStorage.setItem('token', token);
            axios.get('http://127.0.0.1:8000/rest-auth/user/', {headers: {'Authorization':'Token ' + localStorage.getItem('token')}})
            .then(response => {
                localStorage.setItem('username', response.data.username)
                localStorage.setItem('email', response.data.email)
            }).catch()
            const expirationDate = new Date(new Date().getTime()+ 3600 * 1000);
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
            if(err.response.status===500)
            {
                this.setState({user:err.response.config.data.username})
            }
        }))
    }
}


export const authCheckState = () =>{
    return dispatch => {
        const token= localStorage.getItem('token');
        if(token === undefined){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(logout());
            }else{
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime())/ 1000) );
            }
        }
    }
}


export const loadUser = () => (dispatch, getState) => {
    //USER LOADIGN
    dispatch({
        type: actionTypes.USER_LOADING
    });

    axios.get('https://127.0.0.1:8000/rest-auth/user', tokenConfig(getState))
       .then(res => {
           dispatch({
               type: actionTypes.USER_LOADED,
               payload: res.data,
           })
       }).catch(err => {
        dispatch(authFail(err))
    })
}

export const tokenConfig = getState => {
    // get token from state
   const token= getState().auth.token;

    // headers
   const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //if token add to config
   if(token) {
        config.headers["Authorization"] = `Token ${token}` ;
    } 
   return config    
}
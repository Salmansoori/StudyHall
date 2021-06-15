import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const initialState = {
    token: localStorage.getItem('token'),
    error: null,
    loading: false,
    user: null,
}

const userLoading = (state, action) => {
    return updateObject(state, {
        error:null,
        user: null,
    })
}

const userLoaded = (state, action) => {
    return updateObject(state, {
        error: null,
        user: action.user,
    })
}

const authStart = (state, action) =>{
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) =>{
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false
    });
}

const authFail = (state, action) =>{
    return updateObject(state, {
        token: action.token,
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) =>{
    return updateObject(state, {
        token: null,
    });
}


const reducer = (state = initialState, action) => {
    switch (action.type){
        case action.type.USER_LOADING:
            return userLoading(state,action);
        case action.type.USER_LOADED:
            return userLoaded(state,action);
        case actionTypes.AUTH_START:
            return authStart(state,action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state,action);
        case actionTypes.AUTH_FAIL:
            return authFail(state,action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state,action);
        default:
            return state;    
    }
} 


export default reducer;
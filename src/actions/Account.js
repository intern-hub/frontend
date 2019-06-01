import {myFetch} from "../utils/MyFetch";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const SET_LOGIN_FAIL = "SET_LOGIN_FAIL";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const SET_REGISTER_FAIL = "LOGIN_FAIL";
export const HYDRATE = "HYDRATE";

export function loginUser(username, password, history) {
    return function (dispatch) {
        myFetch("https://internhub.us.to/api/auth/login", {
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        }).then(response => {
            if(!response.token) {
                console.error("Something went horribly wrong");
                return;
            }
            dispatch(loginSuccess());

            window.localStorage.setItem("token", response.token);
            history.push("/");
        }).catch(err => {
            let failMsg = err.message;
            if (err.message === "Bad credentials")
                failMsg = "Invalid username or password";
            dispatch(loginFail(failMsg));
        })
    }
}

export function logoutUser(history) {
    window.localStorage.removeItem("token");
    history.push("/");
}

export function registerUser(email, username, password, history) {
    return function (dispatch) {
        myFetch("https://internhub.us.to/api/auth/signup", {
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
        }).then(() => {
            dispatch(registerSuccess());
            dispatch(loginUser(username, password, history));
        }).catch(err => {
            let failMsg = err.message;
            dispatch(registerFail(failMsg));
        })
    }
}

export function fetchUserData() {
    return function(dispatch) {
        const token = window.localStorage.getItem("token");
        if(!token)
            return;


        myFetch("https://internhub.us.to/api/auth/me", {
            method: "GET",
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        }).then(response => {
            dispatch(loginSuccess());
            dispatch(hydrate(response));
        })
    }
}

function loginSuccess() {
    return {
        type: LOGIN_SUCCESS,
    }
}

function loginFail(msg) {
    return {
        type: LOGIN_FAIL,
        reason: msg
    }
}

function registerSuccess() {
    return {
        type: REGISTER_SUCCESS,
    }
}

function registerFail(msg) {
    return {
        type: REGISTER_FAIL,
        reason: msg
    }
}

export function setRegisterFail(fail) {
    return {
        type: SET_REGISTER_FAIL,
        registerFail: fail
    }
}

export function setLoginFail(fail) {
    return {
        type: SET_LOGIN_FAIL,
        loginFail: fail
    }
}

export function hydrate(obj) {
    return Object.assign({}, obj, {type: HYDRATE});
}

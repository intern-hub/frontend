import {LOGIN_FAIL, LOGIN_SUCCESS, SET_LOGIN_FAIL} from "../actions/Account";


export default function LoginReducer(state = {
    loginFail: false,
    loginReason: ''
}, action) {
    switch (action.type) {
        case LOGIN_FAIL:
            return Object.assign({}, state, {
                loginFail: true,
                loginMessage: action.reason
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                loginFail: false,
                loginMessage: ''
            });
        case SET_LOGIN_FAIL:
            return Object.assign({}, state, {
                loginFail: action.loginFail,
            });
        default:
            return state;
    }
}


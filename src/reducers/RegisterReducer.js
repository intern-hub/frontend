import {REGISTER_FAIL, REGISTER_SUCCESS, SET_REGISTER_FAIL} from "../actions/Auth";

export default function RegisterReducer(state = {
    registerFail: false,
    registerMessage: ''
}, action) {
    switch (action.type) {
        case REGISTER_FAIL:
            return Object.assign({}, state, {
                registerFail: true,
                registerMessage: action.reason
            });
        case REGISTER_SUCCESS:
            return Object.assign({}, state, {
                registerFail: false,
                registerMessage: ''
            });
        case SET_REGISTER_FAIL:
            return Object.assign({}, state, {
                registerFail: action.registerFail,
            });
        default:
            return state;
    }
}

import {HYDRATE, LOGIN_SUCCESS} from "../actions/Auth";

export default function AuthReducer(state = {
    isAuthenticated: false,
    username: '',
    id: '',
    email: ''
}, action) {
    switch (action.type) {
        case HYDRATE:
            return Object.assign({}, state, {
                username: action.username,
                id: action.id,
                email: action.email
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: true,
            });
        default:
            return state;
    }
}

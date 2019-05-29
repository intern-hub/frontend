import LoginReducer from "./LoginReducer";
import {combineReducers} from "redux";
import RegisterReducer from "./RegisterReducer";
import AuthReducer from "./AuthReducer";


const reducers = combineReducers({
    Login: LoginReducer,
    Register: RegisterReducer,
    Auth: AuthReducer
});

export default reducers;

import React from 'react';

import "./LoginPage.css";
import {Button} from "../../utils/button/Button";
import InternHubLogo from "../../utils/logo/InternHubLogo";
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import SimpleReactValidator from 'simple-react-validator';
import {bindActionCreators} from "redux";
import {loginUser, setLoginFail} from "../../actions/Auth";

import {toast} from "react-toastify";
import {withRouter} from "react-router";


class LoginPage extends React.PureComponent {

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.loginFail && !this.props.loginFail) {
            toast.error(nextProps.loginMessage);
            this.props.setLoginFail(false);
        }
    }

    handleSubmit({username, password}) {
        this.props.login(username, password, this.props.history);
    }

    render() {
        return (
            <div className="login-page">
                <div className="login-container">
                    <div className="login-header">
                        <div className="login-header-text">
                            Log In
                        </div>
                        <div className="login-logo">
                            <InternHubLogo black={true}/>
                        </div>
                    </div>
                    <LoginInput handleSubmit={this.handleSubmit.bind(this)}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loginFail: state.Login.loginFail,
        loginMessage: state.Login.loginMessage
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login: loginUser,
        setLoginFail: setLoginFail
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));

class LoginInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();

        this.state = {
            username: '',
            password: ''
        }
    }

    handleUserNameChange(evt) {
        this.setState({username: evt.target.value});
    }

    handlePasswordChange(evt) {
        this.setState({password: evt.target.value});
    }

    handleSubmit(evt) {
        evt.preventDefault();
        if (this.validator.allValid()) {
            this.props.handleSubmit(this.state);
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="login-input-container">
                    <div className="login-username">
                        <div>Username</div>
                        <input className="login-input" value={this.state.username}
                               onChange={this.handleUserNameChange.bind(this)}/>
                        {this.validator.message('username', this.state.username, 'required|alpha_num')}
                    </div>

                    <div className="login-password">
                        <div>Password</div>
                        <input type="password" className="login-input" value={this.state.password}
                               onChange={this.handlePasswordChange.bind(this)}/>
                        {this.validator.message('password', this.state.password, 'required')}
                    </div>

                    <div className="login-button-container">
                        <Button className="login-button" label={"Log In"}/>
                    </div>
                </div>
            </form>
        )
    }
}

LoginInput.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};


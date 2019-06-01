import React from 'react';

import "./LoginPage.css";
import {Button} from "../../utils/button/Button";
import InternHubLogo from "../../utils/logo/InternHubLogo";
import {connect} from 'react-redux';
import LinkWrapper from "../../utils/button/LinkWrapper.js";

import PropTypes from 'prop-types';
import SimpleReactValidator from 'simple-react-validator';
import {bindActionCreators} from "redux";
import {loginUser, setLoginFail} from "../../actions/Account";

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
                        <label className="login-label">Username</label><br/>
                        <input className="login-input" value={this.state.username}
                               onChange={this.handleUserNameChange.bind(this)}/>
                        <span className="login-validator">
                            {this.validator.message('username', this.state.username, 'required|alpha_num')}
                        </span>
                    </div>

                    <div className="login-password">
                        <label className="login-label">Password</label><br/>
                        <input type="password" className="login-input" value={this.state.password}
                               onChange={this.handlePasswordChange.bind(this)}/>
                        <span className="login-validator">
                            {this.validator.message('password', this.state.password, 'required')}
                        </span>
                        <LinkWrapper to={`/forgot-password`}>
                            <div className="login-forgot"><span className="login-forgot-text">Forgot Password?</span></div>
                        </LinkWrapper>
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


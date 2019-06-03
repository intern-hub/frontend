import React from 'react';

import "./RegisterPage.css";
import {Button} from "../../utils/button/Button";
import InternHubLogo from "../../utils/logo/InternHubLogo";
import SimpleReactValidator from 'simple-react-validator';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {toast} from "react-toastify";
import PropTypes from 'prop-types';
import {registerUser, setRegisterFail} from "../../actions/Account";
import {withRouter} from "react-router";

class RegisterPage extends React.PureComponent {
    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.registerFail && !this.props.registerFail) {
            toast.error(nextProps.registerMessage);
            this.props.setRegisterFail(false);
        }
    }

    handleSubmit({email, username, password}) {
        this.props.register(email, username, password, this.props.history);
    }

    render() {
        return (
            <div className="register-page">
                <div className="register-container">
                    <div className="register-header">
                        <div className="register-header-text">
                            Sign Up
                        </div>
                        <div className="register-logo">
                            <InternHubLogo black={true}/>
                        </div>
                    </div>
                    <RegisterInput handleSubmit={this.handleSubmit.bind(this)}/>
                </div>
            </div>
        );
    }
}


class RegisterInput extends React.PureComponent {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            email: '',
            username: '',
            password: ''
        }
    }

    handleEmailChange(evt) {
        this.setState({email: evt.target.value});
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
                <div className="register-input-container">
                    <div className="register-email">
                        <label className="register-label">Email</label><br/>
                        <input value={this.state.email} className="register-input"
                               onChange={this.handleEmailChange.bind(this)}/>
                        <span className="register-validator">
                            {this.validator.message('email', this.state.email, 'required|email')}
                        </span>
                    </div>

                    <div className="register-username">
                        <label className="register-label">Username</label><br/>
                        <input value={this.state.username} className="register-input"
                               onChange={this.handleUserNameChange.bind(this)}/>
                        <span className="register-validator">
                            {this.validator.message('username', this.state.username, 'required|alpha_num|min:4')}
                        </span>
                    </div>

                    <div className="register-password">
                        <label className="register-label">Password</label><br/>
                        <input value={this.state.password} type="password" className="register-input"
                               onChange={this.handlePasswordChange.bind(this)}/>
                        <span className="register-validator">
                            {this.validator.message('password', this.state.password, 'required|alpha_num|min:6')}
                        </span>
                    </div>

                    <div className="register-button-container">
                        <Button className="register-button" label={"Sign Up"}/>
                    </div>
                </div>
            </form>
        )
    }
}

RegisterInput.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        registerFail: state.Register.registerFail,
        registerMessage: state.Register.registerMessage
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        register: registerUser,
        setRegisterFail: setRegisterFail
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterPage));


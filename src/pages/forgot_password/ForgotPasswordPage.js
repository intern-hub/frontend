import React from 'react';

import "./ForgotPasswordPage.css";
import {Button} from "../../utils/button/Button";
import InternHubLogo from "../../utils/logo/InternHubLogo";

import PropTypes from 'prop-types';
import {withRouter} from "react-router";
import SimpleReactValidator from 'simple-react-validator';

import {toast} from "react-toastify";


class ForgotPasswordPage extends React.PureComponent {

    handleSubmit(state) {
        let email = state.email;
        fetch("https://internhub.us.to/api/auth/password/forgot", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(state)
        }).then(response => {
          const status = response.status;
          const data = status === 200 ? {} : response.json();
          return Promise.all([status, data]);
        }).then(([status, data]) => {
          if (status === 200) {
            toast.success("A password reset email will be sent to " + email + " shortly.");
            this.props.history.push("/");
          }
          else {
            toast.error(data.error);
          }
        });
    }

    render() {
        return (
            <div className="login-page">
                <div className="login-container">
                    <div className="login-header">
                        <div className="login-header-text">
                            Reset Password 
                        </div>
                        <div className="login-logo">
                            <InternHubLogo black={true}/>
                        </div>
                    </div>
                    <ForgotPasswordInput handleSubmit={this.handleSubmit.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default withRouter(ForgotPasswordPage);

class ForgotPasswordInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();

        this.state = {
            username: '',
            email: ''
        }
    }

    handleUserNameChange(evt) {
        this.setState({username: evt.target.value});
    }

    handleEmailChange(evt) {
        this.setState({email: evt.target.value});
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
                        <div>Email</div>
                        <input type="email" className="login-input" value={this.state.email}
                               onChange={this.handleEmailChange.bind(this)}/>
                        {this.validator.message('email', this.state.email, 'required|email')}
                    </div>

                    <div className="login-button-container">
                        <Button className="login-button" label={"Reset Password"}/>
                    </div>
                </div>
            </form>
        )
    }
}

ForgotPasswordInput.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};


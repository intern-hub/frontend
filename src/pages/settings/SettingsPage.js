import React from 'react';

import "./SettingsPage.css";
import {Button} from "../../utils/button/Button";
import Header from "../landing/header/Header";

import SimpleReactValidator from 'simple-react-validator';

import {myFetch} from "../../utils/MyFetch";
import {toast} from "react-toastify";

import {withRouter} from "react-router";
import {MyInput} from "../../utils/input/MyInput";

class SettingsPage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();

        this.state = {
            oldPassword: '',
            newPassword: ''
        }
    }

    componentDidMount() {
        if (!window.localStorage.getItem("token")) {
            this.props.history.push("/login");
        }
    }

    handleOldPasswordChange(evt) {
        this.setState({oldPassword: evt.target.value});
    }

    handleNewPasswordChange(evt) {
        this.setState({newPassword: evt.target.value});
    }

    handleSubmit(evt) {
        evt.preventDefault();
        if (this.validator.allValid()) {
            if (this.state.oldPassword === this.state.newPassword) {
                toast.error("New password must be different from current password");
                return;
            }
            const token = window.localStorage.getItem("token");
            myFetch('https://internhub.us.to/api/auth/password/change', {
                body: JSON.stringify({
                    oldPassword: this.state.oldPassword,
                    newPassword: this.state.newPassword
                }),
                headers: {
                  'Authorization': 'Bearer ' + token,
                  'Content-Type': 'application/json',
                },
                method: 'POST'
            }).then(response => {
                toast.success('Password updated successfully');
            }).catch(err => {
                toast.error(err.message);
            });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        return (
            <div>
              <Header/>
              <div className="body">
                <div className="body__title">Settings</div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className="settings-input-container">
                    <div className="settings-subtitle">Change Password</div>
                    <div className="settings-password">
                      <label className="settings-label">Current Password</label><br/>
                      <MyInput type="password" className="settings-input" value={this.state.oldPassword}
                               onChange={this.handleOldPasswordChange.bind(this)}/>
                        <span className="settings-validator">
                            {this.validator.message('oldPassword', this.state.oldPassword, 'required')}
                        </span>
                    </div>

                    <div className="settings-password">
                        <label className="settings-label">New Password</label><br/>
                        <MyInput type="password" className="settings-input" value={this.state.newPassword}
                               onChange={this.handleNewPasswordChange.bind(this)}/>
                        <span className="settings-validator">
                            {this.validator.message('newPassword', this.state.newPassword, 'required')}
                        </span>
                    </div>

                    <div className="settings-button-container">
                        <Button className="settings-button" label={"Submit"}/>
                    </div>
                </div>
            </form>

              </div>
          </div>
        );
    }
}

export default withRouter(SettingsPage);

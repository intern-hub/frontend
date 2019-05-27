import React from 'react';

import "./LoginPage.css";
import {Button} from "../../utils/button/Button";
import InternHubLogo from "../../utils/logo/InternHubLogo";

export class LoginPage extends React.PureComponent {
    render() {
        return (
            <div className="login-page">
                <div className="login-container">
                    <div className="login-header">
                        <div className="login-header-text">
                            Log In To
                        </div>
                        <div className="login-logo">
                            <InternHubLogo black={true}/>
                        </div>
                    </div>
                    <LoginInput/>
                </div>
            </div>
        );
    }
}


class LoginInput extends React.PureComponent {

    render() {
        return (
            <div className="login-input-container">
                <div className="login-username">
                    <div>Username</div>
                    <input className="login-input"/>
                </div>

                <div className="login-password">
                    <div>Password</div>
                    <input className="login-input"/>
                </div>

                <div className="login-button-container">
                    <Button className="login-button" label={"Log In"}/>
                </div>
            </div>
        )
    }
}

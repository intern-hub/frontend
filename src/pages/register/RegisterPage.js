import React from 'react';

import "./RegisterPage.css";
import {Button} from "../../utils/button/Button";
import InternHubLogo from "../../utils/logo/InternHubLogo";

export class RegisterPage extends React.PureComponent {
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
                    <RegisterInput/>
                </div>
            </div>
        );
    }
}


class RegisterInput extends React.PureComponent {

    render() {
        return (
            <div className="register-input-container">
                <div className="register-email">
                    <div>Email</div>
                    <input className="register-input"/>
                </div>

                <div className="register-username">
                    <div>Username</div>
                    <input className="register-input"/>
                </div>

                <div className="register-password">
                    <div>Password</div>
                    <input className="register-input"/>
                </div>

                <div className="register-button-container">
                    <Button className="register-button" label={"Sign Up"}/>
                </div>
            </div>
        )
    }
}

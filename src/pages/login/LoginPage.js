import React from 'react';

import "./LoginPage.css";
import {Button} from "../../utils/button/Button";
import logo from "../../img/logo-black.png";

export class LoginPage extends React.PureComponent {
    render() {
        return (
            <div className="login-page">
                <div className="login-container">
                    <div>Log in to</div>
                    <img src={logo} alt="Logo" className="icon__logo"/>

                    <LoginInput/>
                </div>
            </div>
        );
    }
}


class LoginInput extends React.PureComponent {

    render() {
        return (
            <div className="login-input">
                Username
                <input />

                Password
                <input />

                <Button style={{backgroundColor: "#60bCC2", color: "white"}} label={"Login"}/>
            </div>
        )
    }
}

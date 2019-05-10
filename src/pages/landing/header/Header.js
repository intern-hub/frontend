import React from 'react';

import "./Header.css";
import logo from "../../../img/logo.png";
import {Button} from "../../../utils/button/Button";

export class Header extends React.PureComponent {

    render() {
        return (
            <div className="header">
                <div className="header__title">
                    <img src={logo} alt="Logo" className="icon__logo"/>
                </div>
                <div className="header__btns">
                    <Button  className="header__register" label={"TEXT"}/>
                    <Button  className="header__sign-in" label={"TEXT"}/>
                </div>
            </div>
        )
    }
}

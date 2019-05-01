import React from 'react';

import "./Header.css";
import logo from "../../img/logo.png";
import {ReactComponent as Person} from "../../img/user.svg";

export class Header extends React.PureComponent {

    render() {
        return (
            <div className="header">
                <div className="header__title">
                    <img src={logo} alt="Logo" className="icon__logo"/>
                </div>
                <div className="header__company">
                    Companies
                </div>
                <div className="header__profile">
                    <Person className="icon__person"/>
                </div>
            </div>
        )
    }
}

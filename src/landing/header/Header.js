import React from 'react';

import "./Header.css";
import logo from "../../img/logo.png";
import {ReactComponent as Person} from "../../img/user.svg";

export class Header extends React.PureComponent {

    render() {
        return (
            <div className="h">
                <div className="h__t">
                    <img src={logo} alt="Logo" className="i__l"/>
                </div>
                <div className="h__co">
                    Companies
                </div>
                <div className="h__p">
                    <Person className="i__p"/>
                </div>
            </div>
        )
    }
}

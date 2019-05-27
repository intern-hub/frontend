import React from 'react';

import "./Header.css";
import {Button} from "../../../utils/button/Button";
import LinkWrapper from "../../../utils/button/LinkWrapper";
import InternHubLogo from "../../../utils/logo/InternHubLogo";

export class Header extends React.PureComponent {

    render() {
        return (
            <div className="header">
                <div className="header-logo">
                    <InternHubLogo/>
                </div>
                <div className="header__btns">
                    <LinkWrapper to={`/login`}>
                        <Button className="header__register" label={"Log In"}/>
                    </LinkWrapper>
                    <LinkWrapper to={`/register`}>
                        <Button className="header__sign-in" label={"Sign Up"}/>
                    </LinkWrapper>
                </div>
            </div>
        )
    }
}

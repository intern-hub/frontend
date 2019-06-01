import React from 'react';

import "./Header.css";
import {Button} from "../../../utils/button/Button";
import LinkWrapper from "../../../utils/button/LinkWrapper";
import InternHubLogo from "../../../utils/logo/InternHubLogo";
import {connect} from "react-redux";
import {logoutUser} from "../../../actions/Account";
import {withRouter} from "react-router";
import {ReactComponent as SettingsIcon} from "../../../img/heroicons/icon-cog.svg";

class Header extends React.PureComponent {

    logout() {
        logoutUser(this.props.history);
        window.location.reload();
    }

    getButtons() {
        return (
            this.props.isAuthenticated ? (
                <React.Fragment>
                    <div className="header-name"> Hello {this.props.username} </div>
                    <Button className="header__register" label={"Log Out"} onClick={this.logout.bind(this)}/>
                    <LinkWrapper to={`/settings`}>
                      <Button className="header__settings" label={""} children={<SettingsIcon className="header__icon"/>}/>
                    </LinkWrapper>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <LinkWrapper to={`/login`}>
                        <Button className="header__register" label={"Log In"}/>
                    </LinkWrapper>
                    <LinkWrapper to={`/register`}>
                        <Button className="header__sign-in" label={"Sign Up"}/>
                    </LinkWrapper>
                </React.Fragment>
            )
        );
    }

    render() {
        return (
            <div className="header">
                <div className="header-logo">
                    <InternHubLogo/>
                </div>
                <div className="header__btns">
                    {this.getButtons()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        username: state.Auth.username
    }
}

export default withRouter(connect(mapStateToProps)(Header));

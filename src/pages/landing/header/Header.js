import React from 'react';

import "./Header.css";
import {Button} from "../../../utils/button/Button";
import LinkWrapper from "../../../utils/button/LinkWrapper";
import InternHubLogo from "../../../utils/logo/InternHubLogo";
import {connect} from "react-redux";
import {logoutUser} from "../../../actions/Account";
import {withRouter} from "react-router";
import Dropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown';

class Header extends React.PureComponent {

    logout() {
        logoutUser(this.props.history);
        window.location.reload();
    }

    getButtons() {
        return (
            this.props.isAuthenticated ? (
                <React.Fragment>
                    <Dropdown className="account-dropdown">
                        <DropdownTrigger>
                            <Button className="header__settings" label={this.props.username + ' ▼'}/>
                        </DropdownTrigger>
                        <DropdownContent>
                            <ul className="account-dropdown__quick-links account-dropdown__segment">
                                <li className="account-dropdown__link">
                                    <LinkWrapper to={`/`}><span>Home</span></LinkWrapper>
                                </li>
                                <li className="account-dropdown__link">
                                    <LinkWrapper to={`/settings`}><span>Settings</span></LinkWrapper>
                                </li>
                            </ul>
                            <ul className="account-dropdown__quick-links account-dropdown__segment">
                                <li className="account-dropdown__link">
                                    <span onClick={this.logout.bind(this)}>Log Out</span>
                                </li>
                            </ul>
                        </DropdownContent>
                    </Dropdown> 
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

import React from 'react';
import blackLogo from "../../img/logo-black.png";
import logo from "../../img/logo.png";
import PropTypes from 'prop-types';
import LinkWrapper from "../button/LinkWrapper";

const InternHubLogo = (props) => {
    return (
        <LinkWrapper to={"/"}>
            <img src={props.black ? blackLogo : logo} alt="Logo" style={{height: "3rem", cursor: "pointer"}}/>
        </LinkWrapper>
    );
};

InternHubLogo.propTypes = {
    black: PropTypes.bool
};

InternHubLogo.defaultProps = {
    black: false
};

export default InternHubLogo;

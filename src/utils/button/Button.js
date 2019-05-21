import React from 'react';
import classNames from "classnames";
import PropTypes from 'prop-types';

import "./Button.css";

export const Button = (props) => {
    const names = classNames(
        props.className,
        "custom-button",
        "custom-button__corner--default",
        {"custom-button__corner--round": props.round}
    );

    return (
        <button style={props.style} disabled={props.disabled} id={props.id} className={names}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
                onClick={props.onClick}>
            {props.label}
            {props.children}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    disabled: false,
    onClick: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {}
};
